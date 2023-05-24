import requests, json, os.path, math
import pandas as pd
import matplotlib.pyplot as plt
import xml.etree.ElementTree as ET
from pymongo import mongo_client
import folium

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
    return {"get data..."}

def dropdata_temperature():
    collection.drop()
    return {"drop data..."}

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

def graph_temperature():
    regions = ["충청북도", "경상북도", "강원도", "경기도"]
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

        df = df[(df['년도'] >= 2011) & (df['년도'] <= 2020)]

        df['평균기온'] = df['평균기온'].astype(float)

        plt.plot(df['년도'], df['평균기온'], label=region)

    plt.title('지역별 평균기온 비교')
    plt.xlabel('년도')
    plt.ylabel('평균기온')
    plt.legend()

    filename = 'temperature.png'
    plt.savefig(filename)

    return {"filename": filename}

def getdata_fruit():
    url = 'https://apis.data.go.kr/1390804/Nihhs_Fruit_Area3/ctlArea'
    params = '?serviceKey=' + get_secret("data_apiKey")
    params += '&pageNo=1'
    params += '&numOfRows=10000'
    params += '&fs_nm=전체'
    url += params

    dataList = []

    pageNo = 1 
    numOfRows = 10000

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

    collection2.insert_many(dataList)
    return {"get data..."}

def dropdata_fruit():
    collection2.drop()
    return {"drop data..."}

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

def graph_citrus():
    regions = ["충청북도", "경상북도"]
    plt.rcParams['font.family'] = 'AppleGothic'
    plt.figure(figsize=(10,6))

    for region in regions:
        data = list(collection2.find({'시도명': region}))

        for item in data:
            item.pop('_id', None)

        df = pd.DataFrame(data)

        df['년도'] = df['년도'].astype(int)
        
        df = df[(df['년도'] >= 2011) & (df['년도'] <= 2020)]

        df = df[df['과수명'] == '감귤']

        df['재배면적(ha)'] = df['재배면적(ha)'].astype(float)

        df = df.groupby('년도')['재배면적(ha)'].sum().reset_index()

        plt.plot(df['년도'], df['재배면적(ha)'], label=region)

    plt.title('충청북도-경상북도 감귤 재배 면적 비교')
    plt.xlabel('년도')
    plt.ylabel('재배면적(ha)')
    plt.legend()

    filename = 'citrus.png'
    plt.savefig(filename)

    return {"filename": filename}

def graph_combined1():
    regions = ["충청북도", "경상북도"]
    plt.rcParams['font.family'] = 'AppleGothic'
    fig, ax1 = plt.subplots(figsize=(10,6))
    
    ax2 = ax1.twinx()

    # Temperature
    colors = ['red', 'green']
    for i, region in enumerate(regions):
        data = list(collection.find({'C1_NM': region}))

        for item in data:
            item.pop('_id', None)

        df = pd.DataFrame(data)
        df = df.rename(columns={'PRD_DE': '년도', 'DT': '평균기온', 'C1_NM': '지역'})

        df['년도'] = df['년도'].astype(int)

        df = df[(df['년도'] >= 2011) & (df['년도'] <= 2020)]

        df['평균기온'] = df['평균기온'].astype(float)
        
        df = df.groupby('년도')['평균기온'].mean().reset_index()

        ax1.plot(df['년도'], df['평균기온'], label=f'{region} 평균기온', color=colors[i])

    # Fruit
    for region in regions:
        data = list(collection2.find({'시도명': region}))

        for item in data:
            item.pop('_id', None)

        df = pd.DataFrame(data)
        
        df['년도'] = df['년도'].astype(int)

        df = df[(df['년도'] >= 2011) & (df['년도'] <= 2020)]

        df = df[df['과수명'] == '감귤']

        df['재배면적(ha)'] = df['재배면적(ha)'].astype(float)
        df = df.groupby('년도')['재배면적(ha)'].sum().reset_index()

        ax2.plot(df['년도'], df['재배면적(ha)'], label=f'{region} 감귤 재배면적')

    ax1.set_title('충청북도-경상북도 평균기온 & 감귤 재배 면적 비교')
    ax1.set_xlabel('년도')
    ax1.set_ylabel('평균기온(℃)')
    ax2.set_ylabel('재배면적(ha)')
    ax1.legend(loc='upper left')
    ax2.legend(loc='upper right')

    filename = 'combined1.png'
    plt.savefig(filename)

    return {"filename": filename}


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

def graph_apple():
    regions = ["경기도", "강원도"]
    plt.rcParams['font.family'] = 'AppleGothic'
    plt.figure(figsize=(10,6))

    for region in regions:
        data = list(collection2.find({'시도명': region}))

        for item in data:
            item.pop('_id', None)

        df = pd.DataFrame(data)

        df['년도'] = df['년도'].astype(int)
        
        df = df[(df['년도'] >= 2011) & (df['년도'] <= 2020)]

        df = df[df['과수명'] == '사과']

        df['재배면적(ha)'] = df['재배면적(ha)'].astype(float)

        df = df.groupby('년도')['재배면적(ha)'].sum().reset_index()

        plt.plot(df['년도'], df['재배면적(ha)'], label=region)

    plt.title('경기도-강원도 사과 재배 면적 비교')
    plt.xlabel('년도')
    plt.ylabel('재배면적(ha)')
    plt.legend()

    filename = 'apple.png'
    plt.savefig(filename)

    return {"filename": filename}

def graph_combined2():
    regions = ["경기도", "강원도"]
    plt.rcParams['font.family'] = 'AppleGothic'
    fig, ax1 = plt.subplots(figsize=(10,6))
    
    ax2 = ax1.twinx()

    # Temperature
    colors = ['red', 'green']
    for i, region in enumerate(regions):
        data = list(collection.find({'C1_NM': region}))

        for item in data:
            item.pop('_id', None)

        df = pd.DataFrame(data)
        df = df.rename(columns={'PRD_DE': '년도', 'DT': '평균기온', 'C1_NM': '지역'})

        df['년도'] = df['년도'].astype(int)

        df = df[(df['년도'] >= 2011) & (df['년도'] <= 2020)]

        df['평균기온'] = df['평균기온'].astype(float)
        
        df = df.groupby('년도')['평균기온'].mean().reset_index()

        ax1.plot(df['년도'], df['평균기온'], label=f'{region} 평균기온', color=colors[i])

    # Fruit
    for region in regions:
        data = list(collection2.find({'시도명': region}))

        for item in data:
            item.pop('_id', None)

        df = pd.DataFrame(data)
        
        df['년도'] = df['년도'].astype(int)

        df = df[(df['년도'] >= 2011) & (df['년도'] <= 2020)]

        df = df[df['과수명'] == '사과']

        df['재배면적(ha)'] = df['재배면적(ha)'].astype(float)
        df = df.groupby('년도')['재배면적(ha)'].sum().reset_index()

        ax2.plot(df['년도'], df['재배면적(ha)'], label=f'{region} 사과 재배면적')

    ax1.set_title('충청북도-경상북도 평균기온 & 사과 재배 면적 비교')
    ax1.set_xlabel('년도')
    ax1.set_ylabel('평균기온(℃)')
    ax2.set_ylabel('재배면적(ha)')
    ax1.legend(loc='upper left')
    ax2.legend(loc='upper right')

    filename = 'combined2.png'
    plt.savefig(filename)

    return {"filename": filename}

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

def graph_peach():
    regions = ["충청북도", "경상북도"]
    plt.rcParams['font.family'] = 'AppleGothic'
    plt.figure(figsize=(10,6))

    for region in regions:
        data = list(collection2.find({'시도명': region}))

        for item in data:
            item.pop('_id', None)

        df = pd.DataFrame(data)

        df['년도'] = df['년도'].astype(int)
        
        df = df[(df['년도'] >= 2011) & (df['년도'] <= 2020)]

        df = df[df['과수명'] == '복숭아']

        df['재배면적(ha)'] = df['재배면적(ha)'].astype(float)

        df = df.groupby('년도')['재배면적(ha)'].sum().reset_index()

        plt.plot(df['년도'], df['재배면적(ha)'], label=region)

    plt.title('충청북도-경상북도 복숭아 재배 면적 비교')
    plt.xlabel('년도')
    plt.ylabel('재배면적(ha)')
    plt.legend()

    filename = 'peach.png'
    plt.savefig(filename)

    return {"filename": filename}

def graph_combined3():
    regions = ["충청북도", "경상북도"]
    plt.rcParams['font.family'] = 'AppleGothic'
    fig, ax1 = plt.subplots(figsize=(10,6))
    
    ax2 = ax1.twinx()

    # Temperature
    colors = ['red', 'green']
    for i, region in enumerate(regions):
        data = list(collection.find({'C1_NM': region}))

        for item in data:
            item.pop('_id', None)

        df = pd.DataFrame(data)
        df = df.rename(columns={'PRD_DE': '년도', 'DT': '평균기온', 'C1_NM': '지역'})

        df['년도'] = df['년도'].astype(int)

        df = df[(df['년도'] >= 2011) & (df['년도'] <= 2020)]

        df['평균기온'] = df['평균기온'].astype(float)
        
        df = df.groupby('년도')['평균기온'].mean().reset_index()

        ax1.plot(df['년도'], df['평균기온'], label=f'{region} 평균기온', color=colors[i])

    # Fruit
    for region in regions:
        data = list(collection2.find({'시도명': region}))

        for item in data:
            item.pop('_id', None)

        df = pd.DataFrame(data)
        
        df['년도'] = df['년도'].astype(int)

        df = df[(df['년도'] >= 2011) & (df['년도'] <= 2020)]

        df = df[df['과수명'] == '복숭아']

        df['재배면적(ha)'] = df['재배면적(ha)'].astype(float)
        df = df.groupby('년도')['재배면적(ha)'].sum().reset_index()

        ax2.plot(df['년도'], df['재배면적(ha)'], label=f'{region} 복숭아 재배면적')

    ax1.set_title('충청북도-경상북도 평균기온 & 복숭아 재배 면적 비교')
    ax1.set_xlabel('년도')
    ax1.set_ylabel('평균기온(℃)')
    ax2.set_ylabel('재배면적(ha)')
    ax1.legend(loc='upper left')
    ax2.legend(loc='upper right')

    filename = 'combined3.png'
    plt.savefig(filename)

    return {"filename": filename}

def get_map_citrus():
    regions_df = pd.read_csv('regions.csv')
    regions_coordinates = {row['지역명']: [row['위도'], row['경도']] for index, row in regions_df.iterrows()}

    filenames = []

    for year in range(2011, 2021):
        m = folium.Map(location=[36.5, 128], zoom_start=7)

        data = list(collection2.find({'년도': str(year)}))
        for item in data:
            item.pop('_id', None)

        df = pd.DataFrame(data)
        df = df[df['과수명'] == '감귤']
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
                scale = 0.5
            else:
                color = 'yellow'
                scale = 2

            folium.CircleMarker(
                regions_coordinates[region],
                radius = (area / scale),
                color=color,
                fill=True,
                fill_color=color,
                fill_opacity=0.6,
                popup=f'{region} {year}년 감귤 재배 면적: {area}'
            ).add_to(m)
        
        filename = f'map/citrus_map_{year}.html'
        m.save(filename)
        filenames.append(filename)

    return filenames

def get_map_apple():
    regions_df = pd.read_csv('regions.csv')
    regions_coordinates = {row['지역명']: [row['위도'], row['경도']] for index, row in regions_df.iterrows()}

    filenames = []

    for year in range(2011, 2021):
        m = folium.Map(location=[36.5, 128], zoom_start=7)

        data = list(collection2.find({'년도': str(year)}))
        for item in data:
            item.pop('_id', None)

        df = pd.DataFrame(data)
        df = df[df['과수명'] == '사과']
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
                scale = 0.5
            else:
                color = 'yellow'
                scale = 50

            folium.CircleMarker(
                regions_coordinates[region],
                radius = (area / scale),
                color=color,
                fill=True,
                fill_color=color,
                fill_opacity=0.6,
                popup=f'{region} {year}년 사과 재배 면적: {area}'
            ).add_to(m)
        
        filename = f'map/apple_map_{year}.html'
        m.save(filename)
        filenames.append(filename)

    return filenames

def get_map_peach():
    regions_df = pd.read_csv('regions.csv')
    regions_coordinates = {row['지역명']: [row['위도'], row['경도']] for index, row in regions_df.iterrows()}

    filenames = []

    for year in range(2011, 2021):
        m = folium.Map(location=[36.5, 128], zoom_start=7)

        data = list(collection2.find({'년도': str(year)}))
        for item in data:
            item.pop('_id', None)

        df = pd.DataFrame(data)
        df = df[df['과수명'] == '복숭아']
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
                scale = 0.5
            else:
                color = 'yellow'
                scale = 50

            folium.CircleMarker(
                regions_coordinates[region],
                radius = (area / scale),
                color=color,
                fill=True,
                fill_color=color,
                fill_opacity=0.6,
                popup=f'{region} {year}년 복숭아 재배 면적: {area}'
            ).add_to(m)
        
        filename = f'map/peach_map_{year}.html'
        m.save(filename)
        filenames.append(filename)

    return filenames