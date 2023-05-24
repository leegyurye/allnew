import requests, json, os.path, math
import pandas as pd
import matplotlib.pyplot as plt
import xml.etree.ElementTree as ET
from pymongo import mongo_client

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

    ###################################################################

def graph_citrus2():
    plt.rcParams['font.family'] = 'AppleGothic'
    plt.figure(figsize=(10,6))
    
    data = list(collection2.find())

    for item in data:
        item.pop('_id', None)

    df = pd.DataFrame(data)

    df['년도'] = df['년도'].astype(int)
    df = df[(df['년도'] >= 1982) & (df['년도'] <= 2021)]
    df = df[df['과수명'] == '감귤']
    df['재배면적(ha)'] = df['재배면적(ha)'].astype(float)
    df = df.groupby(['년도'])['재배면적(ha)'].sum().reset_index()

    plt.plot(df['년도'], df['재배면적(ha)'])

    plt.title('전체 지역 감귤 재배 면적 변화')
    plt.xlabel('년도')
    plt.ylabel('재배면적(ha)')

    filename = 'citrus2.png'
    plt.savefig(filename)

    return {"filename": filename}

def graph_apple2():
    plt.rcParams['font.family'] = 'AppleGothic'
    plt.figure(figsize=(10,6))
    
    data = list(collection2.find())

    for item in data:
        item.pop('_id', None)

    df = pd.DataFrame(data)

    df['년도'] = df['년도'].astype(int)
    df = df[(df['년도'] >= 1982) & (df['년도'] <= 2021)]
    df = df[df['과수명'] == '사과']
    df['재배면적(ha)'] = df['재배면적(ha)'].astype(float)
    df = df.groupby(['년도'])['재배면적(ha)'].sum().reset_index()

    plt.plot(df['년도'], df['재배면적(ha)'])

    plt.title('전체 지역 사과 재배 면적 변화')
    plt.xlabel('년도')
    plt.ylabel('재배면적(ha)')

    filename = 'apple2.png'
    plt.savefig(filename)

    return {"filename": filename}

def graph_peach2():
    plt.rcParams['font.family'] = 'AppleGothic'
    plt.figure(figsize=(10,6))
    
    data = list(collection2.find())

    for item in data:
        item.pop('_id', None)

    df = pd.DataFrame(data)

    df['년도'] = df['년도'].astype(int)
    df = df[(df['년도'] >= 1982) & (df['년도'] <= 2021)]
    df = df[df['과수명'] == '복숭아']
    df['재배면적(ha)'] = df['재배면적(ha)'].astype(float)
    df = df.groupby(['년도'])['재배면적(ha)'].sum().reset_index()

    plt.plot(df['년도'], df['재배면적(ha)'])

    plt.title('전체 지역 복숭아 재배 면적 변화')
    plt.xlabel('년도')
    plt.ylabel('재배면적(ha)')

    filename = 'peach2.png'
    plt.savefig(filename)

    return {"filename": filename}

def graph_2():
    plt.rcParams['font.family'] = 'AppleGothic'
    plt.figure(figsize=(10,6))
    
    data = list(collection2.find())

    for item in data:
        item.pop('_id', None)

    df = pd.DataFrame(data)

    df['년도'] = df['년도'].astype(int)
    df = df[(df['년도'] >= 1982) & (df['년도'] <= 2021)]
    df = df[df['과수명'] == '포도']
    df['재배면적(ha)'] = df['재배면적(ha)'].astype(float)
    df = df.groupby(['년도'])['재배면적(ha)'].sum().reset_index()

    plt.plot(df['년도'], df['재배면적(ha)'])

    plt.title('전체 지역 복숭아 재배 면적 변화')
    plt.xlabel('년도')
    plt.ylabel('재배면적(ha)')

    filename = 'peach2.png'
    plt.savefig(filename)

    return {"filename": filename}