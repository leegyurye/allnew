def square_number(nums):
    for i in nums:
        yield i * i

mynum = [1, 2, 3, 4, 5]
result = square_number(mynum)

for i in range(len(mynum)):
    print(f"Square value of mynum[{i}] = {mynum[i]} : {next(result)}")


# mynum = [1, 2, 3, 4, 5]
#
# def square_number(nums):
#     for num in nums:
#         yield num ** 2
#         return
#
# for num in mynum:
#     print("Square value of mynum[] = {} : {}".format(counter, num, (num*num)))
