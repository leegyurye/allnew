from fastapi import FastAPI
import data

app = FastAPI()

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

@app.get('/getcleandata_fruit')
async def getcleandata_fruit():
    return data.getcleandata_fruit()

@app.get('/graph_fruit')
async def graph_fruit():
    return data.graph_fruit()

@app.get('/graph_combined')
async def graph_combined():
    return data.graph_combined()