# coding=utf-8
import requests
from bs4 import BeautifulSoup
import json
import os.path as path

main_url = "http://imas.gamedbs.jp/mlth/"

r = requests.get(main_url)

soup = BeautifulSoup(r.content, "lxml")

res = soup.find_all("li", "hvr-grow")
result_dict = {}
new_img = []
save_dir = "data/"

name_list = {}
for i, idol in enumerate(res):
    name_list[i] = idol.text
    
headers ={
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.103 Safari/537.36"
}

# 保存idol 名字信息到name.json
def output_nameinfo():
    name_list = {}
    for i, idol in enumerate(res):
        name_list[i] = idol.text
    with open('name.json', 'w') as f:
        json.dump(name_list, f)


# 输出新的图片信息
def output_newinfo():
    print("the new img is ", new_img)
    data = json.load(open("name.json"))
    for img in new_img:
        tmp = img.split('-')
        print(data[str(int(tmp[0])-1)])
        print(tmp[1])

def img_exist(filename):
    return path.exists(filename)

def download_img(img_url, num, i):
    try:
        img_r = requests.get(img_url, headers=headers, timeout=10)
        if img_r.status_code == 200:
            with open(save_dir+str(num)+"-"+str(i)+".png", 'wb') as f:
                f.write(img_r.content)
                print(str(num)+"_"+str(i)+".png writedown ok")
                return True
        else:
            print(str(num)+"_"+str(i)+".png error")
            return False
    except Exception as e:
        print(str(num)+"_"+str(i)+".png timeout")
        return False

def get_info(url, num):
    try:
        r = requests.get(url, headers=headers, timeout=10)
        # print(r.status_code)
        if r.status_code == 200:
            print("loading No.%s idol info ok"%num)
            return True, r
        else:
            print("loading No.%s idol info error"%num)
            return False, None
    except Exception as e:
        print("loading No.%s idol info timeout"%num)
        return False, None


# imghome_url = "http://imas.gamedbs.jp/mlth/chara/show/"
# for num in range(1,56):
#     # print("now loading No.%s idol"%num)
#     url = imghome_url+str(num)
#     status1 = False
#     while status1==False:
#         # print(url)
#         status1, r = get_info(url, num)
#     soup = BeautifulSoup(r.content, "lxml")
#     loading_spans = soup.find("div", "chara-img-wrapper") \
#                         .find_all("span",attrs={"data-target": ".chara-loading-img"})
#     # 只有一个图片或者没有的时候
#     if len(loading_spans)==0:
#         img = soup.find("img","chara-loading-img")
#         if img==None:
#             print("No.%s idol no img?"%num)
#             i = 0
#         else:
#             filename = str(num)+"-0.png"
#             if not img_exist(save_dir+filename):
#                 img_url = img.attrs['src']
#                 status = False
#                 while status==False:
#                     status = download_img(img_url, num, 1)
#             else:
#                 print("pass No.0 pic")
#             i = 1
#     else:
#         print("No.%s idol has %d pic" %(num, len(loading_spans)))
#         for i, span in enumerate(loading_spans):
#             filename = str(num)+"-"+str(i)+".png"
#             if not img_exist(save_dir+filename):
#                 img_url = span.attrs['data-img-url']
#                 status = False
#                 while status==False:
#                     status = download_img(img_url, num, i)
#                 # r = requests.get(img_url)
#                 # tmpname = img_url.split("/")[-1]
#                 # print("now saving No.%d pic" %(i))
#                 # with open(save_dir+filename,'wb') as f:
#                 #     f.write(r.content)
#                 new_img.append(filename)
#             else:
#                 print("pass No.%d pic" %(i))
#         i += 1
#     result_dict[num] = [name_list[num-1], i]

# with open('info.json','w') as f:
#     json.dump(result_dict, f)



if path.exists("name.json"):
    output_newinfo()
else:
    output_nameinfo()·