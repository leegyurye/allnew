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

@app.get('/graph_temperature')
async def graph_temperature():
    return data.graph_temperature()


    ##################################################333
class get_temperature(Base):
    __tablename__ = "temperature"

    PRD_DE = Column(INT, nullable=False, primary_key=True)
    DT = Column(TEXT, nullable=False)
    C1_NM = Column(TEXT, nullable=False)

class get_citrus(Base):
    __tablename__ = "citrus"

    year = Column(INT, nullable=False, primary_key=True)
    sido = Column(TEXT, nullable=False)
    fs_gb = Column(TEXT, nullable=False)
    clt_area = Column(FLOAT, nullable=False)

class get_apple(Base):
    __tablename__ = "apple"

    year = Column(INT, nullable=False, primary_key=True)
    sido = Column(TEXT, nullable=False)
    fs_gb = Column(TEXT, nullable=False)
    clt_area = Column(FLOAT, nullable=False)

class get_peach(Base):
    __tablename__ = "peach"

    year = Column(INT, nullable=False, primary_key=True)
    sido = Column(TEXT, nullable=False)
    fs_gb = Column(TEXT, nullable=False)
    clt_area = Column(FLOAT, nullable=False)


    ##############################################3

@app.get('/sql_fruit/{fruit}')
async def sql_fruit(fruit: str):
    return data.sql_fruit(fruit)