from pandas import Series, DataFrame

mylist = [30, 40, 50]
myindex = ['윤봉길', '김유신', '신사임당']
myseries = Series(data=mylist, index=myindex)
print('\nmyseries')
print(myseries)

sdata1 = {
    '용산구' : [3, 12, 21],
    '마포구' : [6, 15, 24],
    '서대문구' : [9, 18, 27]
}
myindex1 = ['윤봉길', '김유신', '이순신']
myframe1 = DataFrame(data=sdata1, index=myindex1)
print('\nmyframe')
print(myframe1)

sdata2 = {
    '용산구' : [5, 20, 35],
    '마포구' : [10, 25, 40],
    '은평구' : [15, 30, 45]
}
myindex2 = ['윤봉길', '김유신', '이완용']
myframe2 = DataFrame(data=sdata2, index=myindex2)
print('\nmyframe2')
print(myframe2)

print('\nDataFrame + Series')
result = myframe1.add(myseries, axis = 0)
print(result)

print('\nDataFrame + DataFrame')
result = myframe1.add(myframe2, fill_value = 20)
print(result)

print('\nDataFrame - DataFrame')
result = myframe1.sub(myframe2, fill_value = 10)
print(result)