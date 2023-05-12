import urllib.request
from bs4 import BeautifulSoup
from pandas import DataFrame
import matplotlib
import matplotlib.pyplot as plt
from matplotlib import font_manager

font_location = 'c:/windows/fonts/malgun.ttf'
font_name = font_manager.FontProperties(fname=font_location).get_name()
matplotlib.rc('font', family=font_name)

url = "https://movie.daum.net/ranking/reservation"
html = urllib.request.urlopen(url)
soup = BeautifulSoup(html, 'html.parser')

infos = soup.findAll('div', attrs={'class':'thumb_cont'})

result = []
for info in infos:
    mytitle = info.find('a', attrs={'class':'link_txt'})
    title = mytitle.string

    mygrade = info.find('span', attrs={'class':'txt_grade'})
    grade = mygrade.string

    mynum = info.find('span', attrs={'class':'txt_num'})
    num = mynum.string.replace('%', '')

    result.append((title, grade, num))
# print(result)

print('-' * 40)

mycolumn = ['제목', '평점', '예매율']

myframe = DataFrame(result, columns=mycolumn)
newdf = myframe.set_index(keys=['제목'])
print(newdf)
print('-' * 40)

filename = 'daumMovie2.csv'
myframe.to_csv(filename, encoding='utf8', index=True)
print(filename, ' saved...', sep='')
print('finished')

newdf = myframe.loc[:, ['제목', '평점', '예매율']]
newdf = newdf.set_index('제목')
newdf.astype(float).plot(kind='barh', rot=0, legend=True)
plt.title('영화별 평점과 예매율')

filename = 'movie.png'
plt.savefig(filename)
print(filename + ' saved...')
plt.show()