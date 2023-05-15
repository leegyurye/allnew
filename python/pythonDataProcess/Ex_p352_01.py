import pandas as pd

afile = 'data03.csv'
bfile = 'data04.csv'

atable = pd.read_csv(afile, index_col=0, header=0, encoding='utf-8')
btable = pd.read_csv(bfile, index_col=0, header=None, encoding='utf-8', names=['이름', '성별', '국어', '영어', '수학'])

print(atable)
print('-' * 50)
print(btable)

atable['반'] = '일반'
btable['반'] = '이반'

mylist = []
mylist.append(atable)
mylist.append(btable)

result = pd.concat(objs=mylist, axis=0, ignore_index=False)
print(result)
filename = 'Ex_p352_01.csv'
result.to_csv(filename, encoding='utf-8')
print(filename + ' saved...')
