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
params += '&fs_gb=감귤'
# params += '&year=2021'
params += '&fs_nm=전체'

url += params
print(url)