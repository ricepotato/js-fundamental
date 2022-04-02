x = 1

def outer():
    x = 10

    def inner():
        print(x)

    return inner


inner = outer()
inner() # 10