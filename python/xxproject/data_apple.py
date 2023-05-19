import requests
import json
import pandas as pd
import os.path

BASE_DIR = os.path.dirname(os.path.dirname(os.path.relpath("./")))
secret_file = os.path.join(BASE_DIR, '../secret.json')

with open(secret_file) as f:
    secrets = json.loads(f.read())

def get_secret(setting, secrets=secrets):
    try:
        return secrets[setting]
    except KeyError:
        errorMsg = "Set the {} environment variable.".format(setting)
        return errorMsg

url = 'https://apis.data.go.kr/1390804/Nihhs_Fruit_Area3/ctlArea'

params = '?serviceKey=' + get_secret("data_apiKey")
params += '&pageNo=1'
params += '&numOfRows=17'
params += '&fs_gb=감귤'
params += '&year=2021'
params += '&fs_nm=전체'

url += params
print(url)

response = requests.get(url)
print(response)
print('-' * 50)

# contents = response.xml
# print(type(contents))
# print(contents)
# print('-' * 50)

# dict = json.loads(contents)
# print(type(dict))
# print(dict)
# print('-' * 50)

# items = dict['items'][0]
# print(type(items))
# print(items)
# print('-' * 50)

# item = ['gPntCnt', 'hPntCnt', 'accExamCnt', 'statusDt']
# # validItem = {key : value for key, value in items.fromkeys(item).items()}
# # print(validItem)

# validItem = {}
# for _ in item:
#     validItem[_] = items[_]
# print(type(validItem))
# print(validItem)
# print('-' * 50)

# df = pd.DataFrame.from_dict(validItem, orient='index').rename(columns={0:"result"})
# print(type(df))
# print(df)
# print('-' * 50)