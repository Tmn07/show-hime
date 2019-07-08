# coding=utf-8
import requests
import os.path as path

# url file
# https://shop.asobistore.jp/feature/ml6th_special/princess/
# https://shop.asobistore.jp/feature/ml6th_special/fairy/
# https://shop.asobistore.jp/feature/ml6th_special/angel/

# data = $(".js-tab-menu-item img")
# for(i=0;i<13;i++){
#     console.log(data[i].src)
# }

filename = 'unit.txt'
f = open(filename)
data = f.readlines()

save_dir = "test/"

for url in data:
    pname = url.strip().split('/')[-1]
    r = requests.get(url.strip(), timeout=3)
    with open(save_dir+pname, 'wb') as f:
        f.write(r.content)
        print(pname + " writedown ok")