import pandas as pd

# 전체 데이터 프린트
filename = 'seoul.csv'
df = pd.read_csv(filename)
print(df)

# 강남구 신사동만 프린트
result = df.loc[(df['시군구'] == ' 서울특별시 강남구 신사동')]
print(result)

# 강남구 신사동 중에서 단지명이 삼지인 곳만 프린트, & 조건을 사용
result = df.loc[(df['시군구'] == ' 서울특별시 강남구 신사동') & (df['단지명'] == '삼지')]
print(result)

# 도로명을 인덱스로 만듦(기존에는 숫자로 되어있었음)
newdf = df.set_index(keys=['도로명'])
print(newdf)

# 도로명(인덱스) 중 '언주로'만 프린트
result = newdf.loc[['언주로']]
print(result)

# 도로명(인덱스) 중 '동일로'만 프린트
result = newdf.loc[['동일로']]
print(result)

# 도로명(인덱스) 중 '동일로'의 갯수 확인
result = newdf.loc['동일로']
count = len(newdf.loc['동일로'])
print(result)
print('count : ', count)