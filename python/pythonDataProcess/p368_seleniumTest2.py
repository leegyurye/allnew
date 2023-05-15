import time
from selenium import webdriver
from selenium.webdriver.common.by import By

driver = webdriver.Chrome()
print(type(driver))
print('-' * 50)

print('Go Go~!!')
url = 'https://www.daum.net/'
driver.get(url)

search_textbox = driver.find_element(By.NAME, 'q')

word = '고양이'
search_textbox.send_keys(word)

search_textbox.submit()

wait = 3
print(str(wait) + '동안 기다립니다.')
time.sleep(wait)

imagefile = 'xx_capture2.png'
driver.save_screenshot(imagefile)
print(imagefile + '이미지 저장')

wait = 3
driver.implicitly_wait(wait)

driver.quit()
print('Broser Exit~!!')