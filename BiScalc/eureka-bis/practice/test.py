l1 = [1, 2, 3]
l2 = [4, 5, 6]
l3 = l1 + l2

def itercombs():
    import itertools

    for i in range(4, 0):
        print(i)

    A = range(0,5)
    B = range(0,4)
    C = range(0,2)

    for comb in itertools.product(A, B, C):
        print(comb)
        pass


if __name__ == '__main__':

    pass
