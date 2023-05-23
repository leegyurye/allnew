from fastapi import FastAPI
import data2

app = FastAPI()

#############################################

@app.get('/graph_citrus2')
async def graph_citrus2():
    return data2.graph_citrus2()

@app.get('/graph_apple2')
async def graph_apple2():
    return data2.graph_apple2()

@app.get('/graph_peach2')
async def graph_peach2():
    return data2.graph_peach2()