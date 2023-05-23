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
collection2 = db['projectdb2']

@app.get('/')
async def healthCheck():
    return "OK"

@app.get('/graph_combined')
async def graph_combined():
    regions = ["충청북도", "경상북도"]
    plt.rcParams['font.family'] = 'AppleGothic'
    plt.figure(figsize=(10,6))

    # Temperature
    for region in regions:
        data = list(collection.find({'C1_NM': region}))

        for item in data:
            item.pop('_id', None)

        df = pd.DataFrame(data)
        df = df.rename(columns={'PRD_DE': '년도', 'DT': '평균기온', 'C1_NM': '지역'})

        df['년도'] = df['년도'].astype(int)

        df = df[(df['년도'] >= 2011) & (df['년도'] <= 2020)]

        df['평균기온'] = df['평균기온'].astype(float)
        
        df = df.groupby('년도')['평균기온'].mean().reset_index()

        plt.plot(df['년도'], df['평균기온'], label=f'{region} 평균기온')

    # Fruit
    for region in regions:
        data = list(collection2.find({'시도명': region}))

        for item in data:
            item.pop('_id', None)

        df = pd.DataFrame(data)
        
        df['년도'] = df['년도'].astype(int)

        df = df[(df['년도'] >= 2011) & (df['년도'] <= 2020)]

        df['재배면적(ha)'] = df['재배면적(ha)'].astype(float)
        df = df.groupby('년도')['재배면적(ha)'].sum().reset_index()

        plt.plot(df['년도'], df['재배면적(ha)'], label=f'{region} 감귤 재배면적')

    plt.title('충청북도-경상북도 평균기온 & 감귤 재배 면적 비교')
    plt.xlabel('년도')
    plt.legend()

    filename = 'combined.png'
    plt.savefig(filename)

    return {"filename": filename}
