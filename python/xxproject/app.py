from fastapi import FastAPI
from pydantic import BaseModel
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

@app.get('/graph_temperature')
async def graph_temperature():
    return data.graph_temperature()

@app.get('/getdata_fruit')
async def getdata_fruit():
    return data.getdata_fruit()

@app.get('/dropdata_fruit')
async def dropdata_fruit():
    return data.dropdata_fruit()

@app.get('/getdata_citrus')
async def getdata_citrus():
    return data.getdata_citrus()

@app.get('/getdata_apple')
async def getdata_apple():
    return data.getdata_apple()

@app.get('/getdata_peach')
async def getdata_peach():
    return data.getdata_peach()

@app.get('/graph_citrus')
async def graph_citrus():
    return data.graph_citrus()

@app.get('/graph_apple')
async def graph_apple():
    return data.graph_apple()

@app.get('/graph_peach')
async def graph_peach():
    return data.graph_peach()

@app.get('/graph_combined1')
async def graph_combined1():
    return data.graph_combined1()

@app.get('/graph_combined2')
async def graph_combined2():
    return data.graph_combined2()

@app.get('/graph_combined3')
async def graph_combined3():
    return data.graph_combined3()

@app.get('/get_map_citrus')
async def get_map_citrus():
    return data.get_map_citrus()

@app.get('/get_map_apple')
async def get_map_apple():
    return data.get_map_apple()

@app.get('/get_map_peach')
async def get_map_peach():
    return data.get_map_peach()


######################################################

@app.get('/sql_temperature')
async def sql_temperature():
    return data.sql_temperature()

@app.get('/sql_citrus')
async def sql_citrus():
    return data.sql_citrus()

@app.get('/sql_apple')
async def sql_apple():
    return data.sql_apple()

@app.get('/sql_peach')
async def sql_peach():
    return data.sql_peach()