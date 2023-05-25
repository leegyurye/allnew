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


    
##########################################################

def sql_citrus():
    items = getdata_citrus()

    for item in items:
        citrus_data = get_citrus(year=item['년도'], sido=item['시도명'], fs_gb=item['과수명'], clt_area=item['재배면적(ha)'])
        session.add(citrus_data)

    session.commit()
    session.close()

    return {"insert sql_citrus"}

def sql_apple():
    items = getdata_apple()

    for item in items:
        apple_data = get_apple(year=item['년도'], sido=item['시도명'], fs_gb=item['과수명'], clt_area=item['재배면적(ha)'])
        session.add(apple_data)

    session.commit()
    session.close()

    return {"insert sql_apple"}

def sql_peach():
    items = getdata_peach()

    for item in items:
        peach_data = get_peach(year=item['년도'], sido=item['시도명'], fs_gb=item['과수명'], clt_area=item['재배면적(ha)'])
        session.add(peach_data)

    session.commit()
    session.close()

    return {"insert sql_peach"}


    #########################################

def getdata_citrus():
    data = list(collection2.find({}))

    for item in data:
        item.pop('_id', None)

    df = pd.DataFrame(data)

    columns = ['년도', '시도명', '과수명', '재배면적(ha)']

    df = df[columns]

    df['년도'] = df['년도'].astype(int)

    df = df[(df['년도'] >= 2011) & (df['년도'] <= 2020)]

    df = df[df['과수명'] == '감귤']

    data = df.to_json(orient='records')

    return json.loads(data)

def getdata_apple():
    data = list(collection2.find({}))
    
    for item in data:
        item.pop('_id', None)

    df = pd.DataFrame(data)

    columns = ['년도', '시도명', '과수명', '재배면적(ha)']

    df = df[columns]

    df['년도'] = df['년도'].astype(int)

    df = df[(df['년도'] >= 2011) & (df['년도'] <= 2020)]

    df = df[df['과수명'] == '사과']

    data = df.to_json(orient='records')

    return json.loads(data)

def getdata_peach():
    data = list(collection2.find({}))
    
    for item in data:
        item.pop('_id', None)

    df = pd.DataFrame(data)

    columns = ['년도', '시도명', '과수명', '재배면적(ha)']

    df = df[columns]

    df['년도'] = df['년도'].astype(int)

    df = df[(df['년도'] >= 2011) & (df['년도'] <= 2020)]

    df = df[df['과수명'] == '복숭아']

    data = df.to_json(orient='records')

    return json.loads(data)

######################################################

def graph_citrus():
    regions = ["충청북도", "경상북도"]
    plt.rcParams['font.family'] = 'AppleGothic'
    plt.figure(figsize=(10,6))

    for region in regions:
        query = session.query(get_citrus).filter_by(sido=region)
        data = [item.__dict__ for item in query]

        df = pd.DataFrame(data)

        df['year'] = df['year'].astype(int)

        df = df[(df['year'] >= 2011) & (df['year'] <= 2020)]

        df = df[df['fs_gb'] == '감귤']

        df['clt_area'] = df['clt_area'].astype(float)

        df = df.groupby('year')['clt_area'].sum().reset_index()

        plt.plot(df['year'], df['clt_area'], label=region)

    plt.title('충청북도-경상북도 감귤 재배 면적 비교')
    plt.xlabel('년도')
    plt.ylabel('재배면적(ha)')
    plt.legend()

    filename = 'citrus.png'
    plt.savefig(filename)

    return {"filename": filename}

def graph_apple():
    regions = ["경기도", "강원도"]
    plt.rcParams['font.family'] = 'AppleGothic'
    plt.figure(figsize=(10,6))

    for region in regions:
        query = session.query(get_apple).filter_by(sido=region)
        data = [item.__dict__ for item in query]

        df = pd.DataFrame(data)

        df['year'] = df['year'].astype(int)

        df = df[(df['year'] >= 2011) & (df['year'] <= 2020)]

        df = df[df['fs_gb'] == '사과']

        df['clt_area'] = df['clt_area'].astype(float)

        df = df.groupby('year')['clt_area'].sum().reset_index()

        plt.plot(df['year'], df['clt_area'], label=region)

    plt.title('경기도-강원도 사과 재배 면적 비교')
    plt.xlabel('년도')
    plt.ylabel('재배면적(ha)')
    plt.legend()

    filename = 'apple.png'
    plt.savefig(filename)

    return {"filename": filename}

def graph_peach():
    regions = ["충청북도", "경상북도"]
    plt.rcParams['font.family'] = 'AppleGothic'
    plt.figure(figsize=(10,6))

    for region in regions:
        query = session.query(get_peach).filter_by(sido=region)
        data = [item.__dict__ for item in query]

        df = pd.DataFrame(data)

        df['year'] = df['year'].astype(int)

        df = df[(df['year'] >= 2011) & (df['year'] <= 2020)]

        df = df[df['fs_gb'] == '복숭아']

        df['clt_area'] = df['clt_area'].astype(float)

        df = df.groupby('year')['clt_area'].sum().reset_index()

        plt.plot(df['year'], df['clt_area'], label=region)

    plt.title('충청북도-경상북도 복숭아 재배 면적 비교')
    plt.xlabel('년도')
    plt.ylabel('재배면적(ha)')
    plt.legend()

    filename = 'peach.png'
    plt.savefig(filename)

    return {"filename": filename}




