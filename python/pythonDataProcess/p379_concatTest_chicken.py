import pandas as pd

afile = 'pelicana.csv'
bfile = 'cheogajip.csv'

atable = pd.read_csv(afile, index_col=0, header=0, encoding='utf-8')
btable = pd.read_csv(bfile, index_col=0, header=0, encoding='utf-8')

print(atable)
print('-' * 50)
print(btable)

mylist = []
mylist.append(atable)
mylist.append(btable)
result = pd.concat(objs=mylist, axis=0, ignore_index=True)
filename = 'result_chicken.csv'
result.to_csv(filename, encoding='utf-8')
print(filename + ' saved...')
print(result)