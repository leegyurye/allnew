from sqlalchemy import *
from sqlalchemy.ext.declarative import declarative_base

Base = declarative_base()

class get_combined_citrus(Base):
    __tablename__ = "combined_citrus"

    PRD_DE = Column(INT, nullable=False, primary_key=True)
    DT = Column(FLOAT, nullable=False)
    C1_NM = Column(TEXT, nullable=False)
    clt_area = Column(FLOAT, nullable=False)
    fs_gb = Column(TEXT, nullable=False)

class get_combined_apple(Base):
    __tablename__ = "combined_apple"

    PRD_DE = Column(INT, nullable=False, primary_key=True)
    DT = Column(FLOAT, nullable=False)
    C1_NM = Column(TEXT, nullable=False)
    clt_area = Column(FLOAT, nullable=False)
    fs_gb = Column(TEXT, nullable=False)

class get_combined_peach(Base):
    __tablename__ = "combined_peach"

    PRD_DE = Column(INT, nullable=False, primary_key=True)
    DT = Column(FLOAT, nullable=False)
    C1_NM = Column(TEXT, nullable=False)
    clt_area = Column(FLOAT, nullable=False)
    fs_gb = Column(TEXT, nullable=False)

class images(Base):
    __tablename__ = "images"

    id = Column(INT, nullable=False, primary_key=True)
    filename = Column(TEXT, nullable=False)
    image_data = Column(BLOB, nullable=False)