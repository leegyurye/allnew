import random

def binary_digits(x):
    result = []
    while x > 0:
        digit = x % 2
        result.insert(0, digit)
        x //= 2
    return result

input = random.randint(4, 16)

binary = binary_digits(input)
print(f'{input} binary digits = {binary}')
