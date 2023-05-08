import random

class Binary_digits:
    def __init__(self, x):
        self.x = x

    def binary_digits(self):
        result = []
        num = self.x
        while num > 0:
            digit = num % 2
            result.insert(0, digit)
            num //= 2
        return result

input = random.randint(4, 16)
binary_converter = Binary_digits(input)
binary = binary_converter.binary_digits()
print(f'{input} binary digits = {binary}')
