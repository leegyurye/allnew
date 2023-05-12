from pandas import Series

mylist1 = [40, 50, 60]
myindex1 = ['성춘향', '이몽룡', '심봉사']
myseries1 = Series(data=mylist1, index=myindex1)
print('\n# 시리즈 01')
print(myseries1)
print('-' * 40)

mylist2 = [20, 40, 70]
myindex2 = ['성춘향', '이몽룡', '뺑덕어멈']
myseries2 = Series(data=mylist2, index=myindex2)
print('\n# 시리즈 02')
print(myseries2)
print('-' * 40)

print('\n# 두 시리즈 덧셈')
seriesadd = myseries1.add(myseries2, fill_value = 10)
print(seriesadd)
print('-' * 40)

print('\n# 두 시리즈 뺄셈')
seriessub = myseries1.sub(myseries2, fill_value = 30)
print(seriessub)
print('-' * 40)