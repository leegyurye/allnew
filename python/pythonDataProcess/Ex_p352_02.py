import pandas as pd
from pandas import DataFrame

data1 = {
    'name' : ['김유신', '김유신', '이순신', '박영효', '이순신', '이순신', '김유신'],
    'korean' : [60, 50, 40, 80, 30, 55, 45]
}
df1 = DataFrame(data=data1)
# print(df1)

data2 = {
    'name' : ['이순신', '김유신', '신사임당'],
    'english' : [60, 55, 80]
}
df2 = DataFrame(data=data2)
# print(df2)

result1 = pd.merge(df1, df2, on=['name'], indicator=False)
print(result1)

result2 = pd.merge(df1, df2, how='outer', indicator=False)
print(result2)