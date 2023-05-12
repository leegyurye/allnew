import urllib.request
from bs4 import BeautifulSoup
from pandas import DataFrame

url = "https://movie.daum.net/ranking/reservation"
html = urllib.request.urlopen(url)
soup = BeautifulSoup(html, 'html.parser')

infos = soup.findAll('div', attrs={'class':'thumb_cont'})

print('-' * 40)
print(infos)
print('-' * 40)