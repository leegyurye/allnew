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

@app.get('/sql_temperature')
async def sql_temperature():
    return data.sql_temperature()

@app.get('/graph_temperature')
async def graph_temperature():
    return data.graph_temperature()

@app.get('/getdata_fruit_all')
async def getdata_fruit_all():
    return data.getdata_fruit_all()

@app.get('/dropdata_fruit')
async def dropdata_fruit():
    return data.dropdata_fruit()

@app.get('/getdata_fruit/{fruit}')
async def getdata_fruit(fruit: str):
    return data.getdata_fruit(fruit)

# @app.get('/getdata_citrus')
# async def getdata_citrus():
#     return data.getdata_citrus()

# @app.get('/getdata_apple')
# async def getdata_apple():
#     return data.getdata_apple()

# @app.get('/getdata_peach')
# async def getdata_peach():
#     return data.getdata_peach()

@app.get('/sql_fruit/{fruit}')
async def sql_fruit(fruit: str):
    return data.sql_fruit(fruit)

# @app.get('/sql_citrus')
# async def sql_citrus():
#     return data.sql_citrus()

# @app.get('/sql_apple')
# async def sql_apple():
#     return data.sql_apple()

# @app.get('/sql_peach')
# async def sql_peach():
#     return data.sql_peach()

@app.get('/graph_fruit/{fruit}')
async def get_graph_fruit(fruit: str, regions: List[str]):
    return data.graph_fruit(fruit, regions)


# @app.get('/graph_citrus')
# async def graph_citrus():
#     return data.graph_citrus()

# @app.get('/graph_apple')
# async def graph_apple():
#     return data.graph_apple()

# @app.get('/graph_peach')
# async def graph_peach():
#     return data.graph_peach()

@app.get('/graph_combined_citrus')
async def graph_combined_citrus():
    return data.graph_combined_citrus()

@app.get('/graph_combined_apple')
async def graph_combined_apple():
    return data.graph_combined_apple()

@app.get('/graph_combined_peach')
async def graph_combined_peach():
    return data.graph_combined_peach()

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

@app.get('/dataframe_combined_citrus')
async def dataframe_combined_citrus():
    return data.dataframe_combined_citrus()

@app.get('/dataframe_combined_apple')
async def dataframe_combined_apple():
    return data.dataframe_combined_apple()

@app.get('/dataframe_combined_peach')
async def dataframe_combined_peach():
    return data.dataframe_combined_peach()

@app.get('/sql_combined_citrus')
async def sql_combined_citrus():
    return data.sql_combined_citrus()

@app.get('/sql_combined_apple')
async def sql_combined_apple():
    return data.sql_combined_apple()

@app.get('/sql_combined_peach')
async def sql_combined_peach():
    return data.sql_combined_peach()






