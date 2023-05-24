from sqlalchemy import Column, TEXT, INT, FLOAT
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

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

class get_combined1(Base):
    __tablename__ = "combined1"

    PRD_DE = Column(INT, nullable=False, primary_key=True)
    DT = Column(FLOAT, nullable=False)
    C1_NM = Column(TEXT, nullable=False)
    clt_area = Column(FLOAT, nullable=False)
    fs_gb = Column(TEXT, nullable=False)
    