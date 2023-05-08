numbers = (i for i in range(1, 101))

data = list(numbers)

item = [3, 6, 9]

for i in data:
    n10 = int(i / 10)
    n1 = i % 10
    if i % 10 == 1:
        print()
    if i < 10:
        if i in item:
            print('  👏', end="")
        else:
            print("%5d" % i, end="")
    else:
        if n10 in item and n1 in item:
            print(' 👏👏', end="")
        elif n10 in item or n1 in item:
            print('  👏', end="")
        else:
            print("%5d" % i, end="")



# numbers = [i for i in range(1, 101)]
#
# # print(list(numbers))
#
# for i in range(1, 101):
#     i = str(i)
#     clap = i.count('3') or i.count('6') or i.count('9')
#
#     if clap == 0:
#         print(i, end = ' ')
#
#     else:
#         print('짝' * clap, end = ' ')