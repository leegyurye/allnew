import requests
import json
import pandas as pd
import os.path
import xml.etree.ElementTree as ET
import math

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
params += '&numOfRows=10000'
params += '&fs_gb=감'
params += '&year=2021'
params += '&fs_nm=전체'

url += params
print(url)

# response = requests.get(url)
# # print(response)
# # print('-' * 50)

# contents = response.text
# # print(type(contents))
# # print(contents)
# # print('-' * 50)

# dataList = []

# pageNo = 1 
# numOfRows = 300
# nPage = 0

# while(True):
#     response = requests.get(url)
#     contents = response.text
#     xmlTree = ET.fromstring(contents)

#     if xmlTree.find('Header').find('ReturnCode').text == '00':
#         totalCount = int(xmlTree.find('Header').find('RecordCount').text)
#         # print('데이터 총 개수 : ', totalCount)  

#         listTree = xmlTree.find('Body') 
#         if listTree is not None: 
#             listTree = listTree.findall('Model')

#         for node in listTree:
#             sido = node.find("sido").text
#             sgg = node.find("sgg").text
#             year = node.find("year").text
#             fs_nm = node.find("fs_nm").text
#             fs_gb = node.find("fs_gb").text
#             type_gb = node.find("type_gb").text
#             clt_area = node.find("clt_area").text
#             area_rate = node.find("area_rate").text
#             sido_p_area_od = node.find("sido_p_area_od").text
#             if sgg is None :
#                 sgg = ""            
            
#             onedict = {'시도명':sido, \
#                        '시군명':sgg, '년도':year, \
#                        '품목':fs_nm, '과수명':fs_gb, \
#                        '구분':type_gb, '재배면적(ha)':clt_area, '면적비율':area_rate, \
#                        '시도별면적순위':sido_p_area_od}
#             dataList.append(onedict)

#         if totalCount == 0:
#             break
#         nPage = math.ceil(totalCount / numOfRows)
#         if (pageNo == nPage):
#             break 

#         pageNo += 1
#     else :
#         break


# print(type(dataList))

# myframe = pd.DataFrame(dataList)
# print(myframe)

# # savedFilename = 'xx_ulsanByke.json'

# # myframe = pd.DataFrame(dataList)
# # myframe.to_csv(savedFilename)
