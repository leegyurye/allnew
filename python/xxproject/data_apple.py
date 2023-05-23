import requests
import json
import os.path
import xml.etree.ElementTree as ET
import math
import pandas as pd
from fastapi import FastAPI
from pymongo import mongo_client
import matplotlib.pyplot as plt


app = FastAPI()

BASE_DIR = os.path.dirname(os.path.dirname(os.path.relpath("./")))
secret_file = os.path.join(BASE_DIR, '../secret.json')

with open(secret_file) as f:
    secrets = json.loads(f.read())

def get_secret(setting, secrets=secrets):
    try:
        return secrets[setting]
    except KeyError:
        errorMsg = "Set the {} environment variable.".format(setting)
        raise Exception(errorMsg)

HOSTNAME = get_secret("ATLAS_Hostname")
USERNAME = get_secret("ATLAS_Username")
PASSWORD = get_secret("ATLAS_Password")

client = mongo_client.MongoClient(f'mongodb+srv://{USERNAME}:{PASSWORD}@{HOSTNAME}')

db = client['project']
collection = db['projectdb2']

@app.get('/')
async def healthCheck():
    return "OK"

@app.get('/getdata_fruit')
async def getdata_fruit():
    url = 'https://apis.data.go.kr/1390804/Nihhs_Fruit_Area3/ctlArea'
    params = '?serviceKey=' + get_secret("data_apiKey")
    params += '&pageNo=1'
    params += '&numOfRows=10000'
    params += '&fs_gb=감귤'
    params += '&fs_nm=전체'
    url += params

    dataList = []

    pageNo = 1 
    numOfRows = 300

    while(True):
        response = requests.get(url)
        contents = response.text
        xmlTree = ET.fromstring(contents)

        if xmlTree.find('Header').find('ReturnCode').text == '00':
            totalCount = int(xmlTree.find('Header').find('RecordCount').text)
            listTree = xmlTree.find('Body') 
            if listTree is not None: 
                listTree = listTree.findall('Model')

            for node in listTree:
                sido = node.find("sido").text
                sgg = node.find("sgg").text
                year = node.find("year").text
                fs_nm = node.find("fs_nm").text
                fs_gb = node.find("fs_gb").text
                type_gb = node.find("type_gb").text
                clt_area = node.find("clt_area").text
                area_rate = node.find("area_rate").text
                sido_p_area_od = node.find("sido_p_area_od").text
                if sgg is None :
                    sgg = ""            

                onedict = {'시도명':sido, \
                        '시군명':sgg, '년도':year, \
                        '품목':fs_nm, '과수명':fs_gb, \
                        '구분':type_gb, '재배면적(ha)':clt_area, '면적비율':area_rate, \
                        '시도별면적순위':sido_p_area_od}
                dataList.append(onedict)

            if totalCount == 0:
                break
            nPage = math.ceil(totalCount / numOfRows)
            if (pageNo == nPage):
                break 

            pageNo += 1
        else :
            break

    collection.insert_many(dataList)
    return {"get data..."}

@app.get('/dropdata_fruit')
async def dropdata_fruit():
    collection.drop()
    return {"drop data..."}


@app.get('/getcleandata_fruit')
async def getcleandata_fruit():
    data = list(collection.find({}))

    for item in data:
        item.pop('_id', None)

    df = pd.DataFrame(data)

    columns = ['년도', '시도명', '과수명', '재배면적(ha)']
    df = df[columns]

    data = df.to_json(orient='records')

    return json.loads(data)

@app.get('/graph_fruit')
async def graph_fruit():
    regions = ["충청북도", "경상북도"]
    plt.rcParams['font.family'] = 'Malgun'
    plt.figure(figsize=(10,6))

    for region in regions:
        data = list(collection.find({'시도명': region}))

        for item in data:
            item.pop('_id', None)

        df = pd.DataFrame(data)

        df['년도'] = df['년도'].astype(int)
        
        df = df[(df['년도'] >= 2011) & (df['년도'] <= 2021)]

        df['재배면적(ha)'] = df['재배면적(ha)'].astype(float)

        df = df.groupby('년도')['재배면적(ha)'].sum().reset_index()

        plt.plot(df['년도'], df['재배면적(ha)'], label=region)

    plt.title('충청북도-경상북도 감귤 재배 면적 비교')
    plt.xlabel('년도')
    plt.ylabel('재배면적(ha)')
    plt.legend()

    filename = 'fruit.png'
    plt.savefig(filename)

    return {"filename": filename}

