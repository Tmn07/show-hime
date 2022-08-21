# coding=utf-8
import requests
from bs4 import BeautifulSoup
import json
import os.path as path

def img_exist(filename):
    return path.exists(filename)

data_dir = "new/"


headers ={
	"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36"
}

def download_img(img_url, num, i):
	try:
		img_r = requests.get(img_url, headers=headers, timeout=10)
		if img_r.status_code == 200:
			with open(data_dir+str(num)+"-"+str(i)+".png", 'wb') as f:
			# with open(data_dir+str(num)+"-5.png", 'wb') as f:
				f.write(img_r.content)
				print(str(num)+"-"+str(i)+".png writedown ok")
				return True
		else:
			print(str(num)+"-"+str(i)+".png error")
			return False
	except Exception as e:
		print(str(num)+"-"+str(i)+".png timeout")
		return False

def get_info(url, num):
	try:
		r = requests.get(url, headers=headers, timeout=10)
		if r.status_code == 200:
			print("loading No.%s idol info ok"%num)
			return True, r
		else:
			print("loading No.%s idol info error"%num)
			return False, None
	except Exception as e:
		print("loading No.%s idol info timeout"%num)
		return False, None


def get_idol_3dimg(idol_num):
	error_list = []
	imghome_url = "http://imas.gamedbs.jp/mlth/chara/show/"
	num = idol_num
	url = imghome_url+str(num)
	status1 = False
	while status1==False:
		status1, r = get_info(url, num)
	# r = requests.get(url)
	soup = BeautifulSoup(r.content, "lxml")
	div = soup.find("div", "chara-img-wrapper")
	# d3_spans = div.find_all("span",attrs={"data-target": ".chara-profile-img"}) # 3d
	d3_spans = div.find_all("span",attrs={"data-target": ".chara-loading-img"})   # loading
	

	# 全部存下来，命名规则有问题
	# for i, span in enumerate(d3_spans):
	# 	if img_exist(data_dir+str(num)+"-"+str(i)+".png"):
	# 		print (str(num)+"-"+str(i)+" exist")
	# 		continue
	# 	# print(i)
	# 	img_url = span.attrs['data-img-url']
	# 	status = False
	# 	while status==False:
	# 		status = download_img(img_url, num, i)

	span = d3_spans[-1]
	img_url = span.attrs['data-img-url']
	download_img(img_url, num, 5)


for num in range(1,56):
	print("now loading No.%s idol"%num)
	get_idol_3dimg(num)