from fastapi import FastAPI
from pydantic import BaseModel
from typing import List
import data
from data import db_conn

app = FastAPI()

db = db_conn()
session = db.sessionmaker()

@app.get('/')
async def healthCheck():
    return "OK"

@app.get('/getdata_temperature')
async def getdata_temperature():
    return data.getdata_temperature()

@app.get('/dropdata_temperature')
async def dropdata_temperature():
    return data.dropdata_temperature()

@app.get('/getcleandata_temperature')
async def getcleandata_temperature():
    return data.getcleandata_temperature()

@app.get('/getdata_fruit_all')
async def getdata_fruit_all():
    return data.getdata_fruit_all()

@app.get('/dropdata_fruit_all')
async def dropdata_fruit_all():
    return data.dropdata_fruit_all()

@app.get('/getdata_fruit/{fruit}')
async def getdata_fruit(fruit: str):
    return data.getdata_fruit(fruit)

#dataframe과 MySQL 삽입 동시에 진행
@app.get('/dataframe_combined/{fruit}')
async def dataframe_combined(fruit: str):
    return data.dataframe_combined(fruit)

@app.get('/graph_fruit/{fruit}/{regions}')
async def get_graph_fruit(fruit: str, regions: str):
    return data.graph_fruit(fruit, regions)

@app.get('/graph_combined/{fruit}')
async def graph_combined(fruit: str):
    return data.graph_combined(fruit)
    
@app.get('/get_map_fruit/{fruit}')
async def get_map_fruit(fruit: str):
    return data.get_map_fruit(fruit)