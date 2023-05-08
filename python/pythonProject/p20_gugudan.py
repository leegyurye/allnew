while True:
    n = input("Input number (q : quit)")

    if n == 'q':
        print("Exit")
        break
    else:
        if int(n) > 9 or int(n) < 2:
                print("input number range 2~9!!")
        else:
            for i in range(1, 10):
                print(f'{int(n)} * {i} = {int(n) * i}')