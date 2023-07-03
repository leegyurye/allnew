import pandas as pd
import numpy as np

# 날짜 범위 생성 (예시: 2023년 1월 1일부터 2023년 12월 31일까지)
start_date = pd.Timestamp('2023-01-01')
end_date = pd.Timestamp('2023-12-31')
date_range = pd.date_range(start=start_date, end=end_date)

# 데이터 생성
cities = ['서울', '런던', '뉴욕']
data = np.random.randint(low=-10, high=40, size=(len(date_range), len(cities)))

# 데이터프레임 생성
df = pd.DataFrame(data, index=date_range, columns=cities)

# CSV 파일로 저장
df.to_csv('weather.csv', index_label='날짜')
