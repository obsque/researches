from itertools import permutations

# input_str = '발리가르만다'
input_str = '유웨야와타'
perm = permutations(input_str)

cases = []
# print(len(perm))
for p in perm:
    # print(''.join(p))
    str = ''.join(p)
    cases.append(str)

    # if '다리' in str and '가만' in str : print(str)
    if '웨유' in str or '와유' in str : print(str)
    # print(str)