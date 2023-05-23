import requests, json, os
import pandas as pd
import matplotlib.pyplot as plt
from fastapi import FastAPI
from pymongo import mongo_client

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
        return errorMsg

HOSTNAME = get_secret("ATLAS_Hostname")
USERNAME = get_secret("ATLAS_Username")
PASSWORD = get_secret("ATLAS_Password")

client = mongo_client.MongoClient(f'mongodb+srv://{USERNAME}:{PASSWORD}@{HOSTNAME}')
print('Connected to Mongodb....')

db = client['project']
collection = db['projectdb']

@app.get('/')
async def healthCheck():
    return "OK"

@app.get('/getdata_temperature')
async def getdata_temperature():
    url = 'https://kosis.kr/openapi/Param/statisticsParameterData.do'
    params = '?method=getList&apiKey=' + get_secret("kosisData_apiKey")
    params += '&itmId=T10+&objL1=ALL&objL2=&objL3=&objL4=&objL5=&objL6=&objL7=&objL8=&format=json&jsonVD=Y&prdSe=Y&startPrdDe=2011&endPrdDe=2021&orgId=101&tblId=DT_1YL9801'
    url += params
    response = requests.get(url)
    contents = response.text
    data_dict = json.loads(contents)
    collection.insert_many(data_dict)
    return {"get data..."}

@app.get('/dropdata_temperature')
async def dropdata_temperature():
    collection.drop()
    return {"drop data..."}

@app.get('/getcleandata_temperature')
async def getcleandata_temperature():
    data = list(collection.find({}))

    for item in data:
        item.pop('_id', None)

    df = pd.DataFrame(data)

    columns = ['PRD_DE', 'DT', 'C1_NM']
    df = df[columns]

    df = df.rename(columns={
        'PRD_DE': '년도',
        'DT': '평균기온',
        'C1_NM': '지역'
    })
    data = df.to_json(orient='records')

    return json.loads(data)

@app.get('/graph_temperature')
async def graph_temperature():
    regions = ["충청북도", "경상북도"]
    plt.rcParams['font.family'] = 'AppleGothic'
    plt.figure(figsize=(10,6))

    for region in regions:
        data = list(collection.find({'C1_NM': region}))

        for item in data:
            item.pop('_id', None)

        df = pd.DataFrame(data)

        df = df.rename(columns={
            'PRD_DE': '년도',
            'DT': '평균기온',
            'C1_NM': '지역'
        })

        df['년도'] = df['년도'].astype(int)
        df['평균기온'] = df['평균기온'].astype(float)

        df = df.groupby('년도')['평균기온'].mean().reset_index()

        plt.plot(df['년도'], df['평균기온'], label=region)

    plt.title('충청북도-경상북도 평균기온 비교')
    plt.xlabel('년도')
    plt.ylabel('평균기온')
    plt.legend()

    filename = 'temperature.png'
    plt.savefig(filename)

    return {"filename": filename}
