import pandas as pd
import matplotlib.pyplot as plt
from matplotlib import font_manager

# 폰트 경로 설정
font_path = '/usr/share/fonts/truetype/nanum/NanumGothic.ttf'
font_prop = font_manager.FontProperties(fname=font_path)

# CSV 파일 읽기
df = pd.read_csv('weather.csv', index_col='날짜')

# 그래프 그리기
df.plot()
plt.xlabel('날짜', fontproperties=font_prop)
plt.ylabel('온도', fontproperties=font_prop)
plt.title('날짜별 온도', fontproperties=font_prop)
plt.legend(loc='best', prop=font_prop)

# 그래프를 localhost:8000에 띄우기
plt.savefig('weather.png')  # 그래프를 이미지로 저장
plt.show()

