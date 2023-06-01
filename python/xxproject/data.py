import requests, json, os.path, math, sqlalchemy, folium, os
import pandas as pd
import matplotlib.pyplot as plt
import xml.etree.ElementTree as ET
from pymongo import mongo_client
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from sqlalchemy import *
from models import *
import pydantic
import base64

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

# 몽고DB연결
HOSTNAME = get_secret("ATLAS_Hostname")
USERNAME = get_secret("ATLAS_Username")
PASSWORD = get_secret("ATLAS_Password")

client = mongo_client.MongoClient(f'mongodb+srv://{USERNAME}:{PASSWORD}@{HOSTNAME}')
print('Connected to Mongodb....')

db = client['project']
collection = db['temperature']
collection2 = db['fruit']

# MySQL연결
HOSTNAME = get_secret("Mysql_Hostname")
PORT = get_secret("Mysql_Port")
USERNAME = get_secret("Mysql_Username")
PASSWORD = get_secret("Mysql_Password")
DBNAME = get_secret("Mysql_DBname")

DB_URL = f'mysql+pymysql://{USERNAME}:{PASSWORD}@{HOSTNAME}:{PORT}/{DBNAME}'
print('Connected to Mysql....')

engine = sqlalchemy.create_engine(DB_URL)
Session = sessionmaker(bind=engine)
session = Session()

class db_conn:
    def __init__(self):
        self.engine = create_engine(DB_URL, pool_recycle=500)

    def sessionmaker(self):
        Session = sessionmaker(bind=self.engine)
        session = Session()
        return session
    
    def connection(self):
        conn = self.engine.connection()
        return conn


def healthCheck():
    return "OK"

def getdata_temperature():
    url = 'https://kosis.kr/openapi/Param/statisticsParameterData.do'
    params = '?method=getList&apiKey=' + get_secret("kosisData_apiKey")
    params += '&itmId=T10+&objL1=ALL&objL2=&objL3=&objL4=&objL5=&objL6=&objL7=&objL8=&format=json&jsonVD=Y&prdSe=Y&startPrdDe=2011&endPrdDe=2021&orgId=101&tblId=DT_1YL9801'
    url += params
    response = requests.get(url)
    contents = response.text
    data_dict = json.loads(contents)
    collection.insert_many(data_dict)
    return json.loads(contents)

def dropdata_temperature():
    collection.drop()
    return {"result: {} drop complete..."}

def getcleandata_temperature():
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

    df['년도'] = df['년도'].astype(int)

    df = df[(df['년도'] >= 2011) & (df['년도'] <= 2020)]

    data = df.to_json(orient='records')

    return json.loads(data)

def getdata_fruit_all():
    url = 'https://apis.data.go.kr/1390804/Nihhs_Fruit_Area3/ctlArea'
    params = '?serviceKey=' + get_secret("data_apiKey")
    params += '&pageNo=1'
    params += '&numOfRows=8624'
    params += '&fs_nm=전체'
    url += params

    dataList = []

    pageNo = 1
    numOfRows = 8624

    while True:
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
                if sgg is None:
                    sgg = ""

                onedict = {'시도명': sido, '시군명': sgg, '년도': year,
                           '품목': fs_nm, '과수명': fs_gb,
                           '구분': type_gb, '재배면적(ha)': clt_area, '면적비율': area_rate,
                           '시도별면적순위': sido_p_area_od}
                dataList.append(onedict)

            if totalCount == 0:
                break
            nPage = math.ceil(totalCount / numOfRows)
            if pageNo == nPage:
                break

            pageNo += 1
        else:
            break

    collection2.insert_many(dataList)

    result = collection2.find_one({}, {'_id': 0})
    return result 


def dropdata_fruit_all():
    collection2.drop()
    return {"result: {} drop complete..."}

def getdata_fruit(fruit):
    data = list(collection2.find({}))
    
    for item in data:
        item.pop('_id', None)

    df = pd.DataFrame(data)
    columns = ['년도', '시도명', '과수명', '재배면적(ha)']
    df = df[columns]
    df['년도'] = df['년도'].astype(int)
    df = df[(df['년도'] >= 2011) & (df['년도'] <= 2020)]
    df = df[df['과수명'] == fruit]
    data = df.to_json(orient='records')

    return json.loads(data)

def dataframe_combined(fruit):
    if fruit == '감귤':
        regions = ["충청북도", "경상북도"]
        fruit_name = '감귤'
        combined_table = get_combined_citrus
    elif fruit == '사과':
        regions = ["경기도", "강원도"]
        fruit_name = '사과'
        combined_table = get_combined_apple
    elif fruit == '복숭아':
        regions = ["충청북도", "경상북도"]
        fruit_name = '복숭아'
        combined_table = get_combined_peach
    else:
        raise ValueError("유효하지 않은 과일입니다.")

    df_combined_list = []

    for region in regions:
        # Temperature data
        data_temp = list(collection.find({'C1_NM': region}))

        for item in data_temp:
            item.pop('_id', None)

        df_temp = pd.DataFrame(data_temp)
        df_temp = df_temp.rename(columns={'PRD_DE': '년도', 'DT': '평균기온', 'C1_NM': '지역'})

        df_temp = df_temp[['년도', '평균기온', '지역']]

        df_temp['년도'] = df_temp['년도'].astype(int)
        df_temp = df_temp[(df_temp['년도'] >= 2011) & (df_temp['년도'] <= 2020)]
        df_temp['평균기온'] = df_temp['평균기온'].astype(float)

        # Fruit data
        data_fruit = list(collection2.find({'시도명': region}))

        for item in data_fruit:
            item.pop('_id', None)

        df_fruit = pd.DataFrame(data_fruit)

        df_fruit['년도'] = df_fruit['년도'].astype(int)
        df_fruit = df_fruit[(df_fruit['년도'] >= 2011) & (df_fruit['년도'] <= 2020)]
        df_fruit = df_fruit[df_fruit['과수명'] == fruit_name]
        df_fruit['재배면적(ha)'] = df_fruit['재배면적(ha)'].astype(float)
        df_fruit = df_fruit.groupby('년도')['재배면적(ha)'].sum().reset_index()
        df_fruit['지역'] = region
        df_fruit['과수명'] = fruit_name

        # merge
        df_region = pd.merge(df_temp, df_fruit, on=['년도', '지역'])
        df_combined_list.append(df_region)

        # MySQL에 삽입
        for item in df_region.to_dict("records"):
            existing_data = session.query(combined_table).filter_by(PRD_DE=item['년도'], DT=item['평균기온'], C1_NM=item['지역'], clt_area=item['재배면적(ha)'], fs_gb=item['과수명']).first()
            if not existing_data:
                combined_table_data = combined_table(PRD_DE=item['년도'], DT=item['평균기온'], C1_NM=item['지역'], clt_area=item['재배면적(ha)'], fs_gb=item['과수명'])
                session.add(combined_table_data)

    session.commit()

    df_combined = pd.concat(df_combined_list, ignore_index=True)

    return df_combined.to_dict("records")


def graph_fruit(fruit, regions):
    plt.rcParams['font.family'] = 'AppleGothic'
    plt.figure(figsize=(10, 6))

    if fruit == '감귤':
        regions = ["충청북도", "경상북도"]
    elif fruit == '사과':
        regions = ["경기도", "강원도"]
    elif fruit == '복숭아':
        regions = ["충청북도", "경상북도"]
    else:
        raise ValueError("유효하지 않은 과일입니다.")

    for region in regions:
        if fruit == '감귤':
            query = session.query(get_combined_citrus).filter(get_combined_citrus.C1_NM == region)
        elif fruit == '사과':
            query = session.query(get_combined_apple).filter(get_combined_apple.C1_NM == region)
        elif fruit == '복숭아':
            query = session.query(get_combined_peach).filter(get_combined_peach.C1_NM == region)

        data = [item.__dict__ for item in query]

        df = pd.DataFrame(data)

        df['PRD_DE'] = df['PRD_DE'].astype(int)

        df = df[(df['PRD_DE'] >= 2011) & (df['PRD_DE'] <= 2020)]

        df = df[df['fs_gb'] == fruit]

        df['clt_area'] = df['clt_area'].astype(float)

        df = df.groupby('PRD_DE')['clt_area'].sum().reset_index()

        plt.plot(df['PRD_DE'], df['clt_area'], label=region)

    plt.title(f'{regions[0]}-{regions[1]} {fruit} 재배 면적 비교')
    plt.xlabel('년도')
    plt.ylabel('재배면적(ha)')
    plt.legend()

    filename = f'{fruit}.png'
    plt.savefig(filename)

    return {"filename": filename}


def graph_combined(fruit):
    plt.rcParams['font.family'] = 'AppleGothic'
    fig, (ax1, ax2) = plt.subplots(2, 1, figsize=(10, 12))

    if fruit == '사과':
        regions = ["경기도", "강원도"]
    elif fruit == '감귤' or fruit == '복숭아':
        regions = ["충청북도", "경상북도"]
    else:
        raise ValueError("유효하지 않은 과일입니다.")

    # Temperature
    colors = ['red', 'green']
    for i, region in enumerate(regions):
        if fruit == '사과':
            query = session.query(get_combined_apple).filter_by(C1_NM=region)
        else:
            query = session.query(get_combined_citrus).filter_by(C1_NM=region)
        data = [item.__dict__ for item in query]

        df = pd.DataFrame(data)

        df['PRD_DE'] = df['PRD_DE'].astype(int)

        df = df[(df['PRD_DE'] >= 2011) & (df['PRD_DE'] <= 2020)]

        df['DT'] = df['DT'].astype(float)
        
        df = df.groupby('PRD_DE')['DT'].mean().reset_index()

        ax1.plot(df['PRD_DE'], df['DT'], label=f'{region} 평균기온', color=colors[i])

    # Fruit
    for region in regions:
        if fruit == '감귤':
            query = session.query(get_combined_citrus).filter_by(C1_NM=region, fs_gb='감귤')
        elif fruit == '복숭아':
            query = session.query(get_combined_peach).filter_by(C1_NM=region, fs_gb='복숭아')
        elif fruit == '사과':
            query = session.query(get_combined_apple).filter_by(C1_NM=region, fs_gb='사과')

        data = [item.__dict__ for item in query]

        df = pd.DataFrame(data, columns=['PRD_DE', 'DT', 'C1_NM', 'clt_area', 'fs_gb'])

        df['PRD_DE'] = df['PRD_DE'].astype(int)

        df = df[(df['PRD_DE'] >= 2011) & (df['PRD_DE'] <= 2020)]

        df = df[df['fs_gb'] == fruit]

        df['clt_area'] = df['clt_area'].astype(float)
        df = df.groupby('PRD_DE')['clt_area'].sum().reset_index()

        ax2.plot(df['PRD_DE'], df['clt_area'], label=f'{region} {fruit} 재배면적')

    ax1.set_title(f'{regions[0]}-{regions[1]} 평균기온 & {fruit} 재배 면적 비교')
    ax1.set_xlabel('년도')
    ax1.set_ylabel('평균기온(℃)')
    ax2.set_ylabel('재배면적(ha)')
    ax1.legend(loc='upper left')
    ax2.legend(loc='upper right')

    filename = f'combined_{fruit}.png'
    IMAGE_DIR = '/allnew/python/xxnode/public/'
    filepath = os.path.join(IMAGE_DIR, filename)

    # 이미지 파일 저장
    plt.savefig(filepath)
    
    os.chdir(IMAGE_DIR)

    with open(filename, "rb") as image_file:
        binary_image = image_file.read()
        binary_image = base64.b64encode(binary_image)
        binary_image = binary_image.decode('UTF-8')
        img_df = pd.DataFrame({'filename':filename,'image_data':[binary_image]})
        img_df.to_sql('images', con=engine, if_exists='append', index=False)

    if fruit == '감귤' or fruit == '사과' or fruit == '복숭아':
        result = session.query(images).filter(images.filename == f'combined_{fruit}.png').all()
    else:
        raise ValueError("유효하지 않은 과일입니다.")

    IMAGE = [item.image_data for item in result]
    
    for image_data in IMAGE:
        binary_image = base64.b64decode(image_data)
        filename = f'combined_{fruit}.png'
        with open(filename, "wb") as image_file:
            image_file.write(binary_image)
    return "이미지 파일 저장이 완료되었습니다."


def get_map_fruit(fruit):
    regions_df = pd.read_csv('regions.csv')
    regions_coordinates = {row['지역명']: [row['위도'], row['경도']] for index, row in regions_df.iterrows()}

    filenames = []

    for year in range(2011, 2021):
        m = folium.Map(location=[36.5, 128], zoom_start=7)

        data = list(collection2.find({'년도': str(year)}))
        for item in data:
            item.pop('_id', None)

        df = pd.DataFrame(data)
        df = df[df['과수명'] == fruit]
        df['재배면적(ha)'] = df['재배면적(ha)'].astype(float)
        df = df.groupby('시도명')['재배면적(ha)'].sum().reset_index()

        max_area = df['재배면적(ha)'].max()
        min_area = df['재배면적(ha)'].min()

        for region in df['시도명'].unique():
            area = df[df['시도명']==region]['재배면적(ha)'].values[0]
            
            if area > 2000:
                color = 'red'
                scale = 500
            elif area == 0:
                color = 'black'
                scale = 1
            else:
                color = 'yellow'
                scale = 10

            folium.CircleMarker(
                regions_coordinates[region],
                radius = (area / scale),
                color=color,
                fill=True,
                fill_color=color,
                fill_opacity=0.6,
                popup=f'{region} {year}년 {fruit} 재배 면적: {area}'
            ).add_to(m)
        
        filename = f'map/{fruit.lower()}_map_{year}.html'
        m.save(filename)
        filenames.append(filename)

    return {"filename": filename}