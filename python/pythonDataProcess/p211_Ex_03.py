import numpy as np
import pandas as pd
from pandas import Series, DataFrame

filename = '과일매출현황.csv'

print('\n# 원본 데이터프레임')
myframe = pd.read_csv(filename, index_col='과일명')
print(myframe)

mydict = {'구입액':50, '수입량':20}
myframe.fillna(mydict, inplace=True)

print('\n# 누락 데이터 채워넣기')
print(myframe)

print('\n# 구입액과 수입량의 각 소계')
print(myframe.sum(axis=0))

print('\n# 과일별 소계')
print(myframe.sum(axis=1))

print('\n# 구입액과 수입량의 평균')
print(myframe.mean(axis=0))

print('\n# 과일별 평균')
print(myframe.mean(axis=1))