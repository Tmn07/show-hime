from os import listdir
import json

d = listdir('./loading')

dic = {}
name_data = json.load(open("name.json"))

# print(name_data)
for num in range(1,57):
    idol_name = name_data[str(num-1)]
    dic[num] = [idol_name, []]

# print(dic)

for img in d:
    tmp = img.split('-')
    idol_id = tmp[0]
    img_id = tmp[1].split('.')[0]
    # if dic.has_key(idol_id):
    dic[int(idol_id)][1].append(img_id)
    # else:
    #     dic[idol_id] = [idol_name, [img_id]]

with open('minfo2.json', 'w') as f:
    json.dump(dic, f)
# print(dic)
