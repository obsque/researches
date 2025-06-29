from datetime import datetime
from util.item import *  # ITEM, ITEMTYPE
from util.cdhsp import *

calc = StatsCalc()

GCD = 2.50
for i in range(420, 2800):
    GCD15 = calc.GCDmod(i, 1.5)
    GCD25 = calc.GCDmod(i, 2.5)
    if GCD25 != GCD:
        print(f'{i:4} {GCD25:.2f} {GCD15:.2f}')
        GCD = GCD25
        pass