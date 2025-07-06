import os
import openpyxl
import pandas as pd
from datetime import datetime
import time
import itertools

from util.cdhsp import *
from util.xiv import *  # ITEM, ITEMTYPE

class ItemSet:
    def __init__(self, level, job):
        self.job = job
        self.level = level
        # self.calc = StatsCalc(level)
        self.equips = {
            'weapon': None,
            'head': None,
            'body': None,
            'hands': None,
            'legs': None,
            'feet': None,
            'neck': None,
            'ear': None,
            'wrist': None,
            'ring1': None,
            'ring2': None,
        }
        pass
    pass

base = ItemSet(100, 'PLD')

path = r'E:\Users\i\Documents\My Games\FINAL FANTASY XIV - KOREA\docs\7황금'
file = r'760items.xlsx'
file_path = os.path.join(path, file)
print(f'\nLoading {file} from {path}...')


### Load the Excel file
### by dict/list
item_dict = getItemsetsFromDB(file_path)
len(item_dict)
items_week1 = [item
               for item in item_dict
               if item.obtain == '제작' or item.obtain == '석판' or item.obtain == '일반']
len(items_week1)
print(f'Loaded {len(items_week1)} items from {file_path}.')

### Week 1
석판상한 = 900

# 'weapon'
base.equips[iequips[0]] = [x for x in item_dict if x.slot == Slot.w무기 and x.type == JOB[base.job][0]]
for x in item_dict:
    if x.slot == Slot.w무기 and x.type == JOB[base.job][0]:
        base.equips[iequips[0]] = x


# for slot in base.equips:
for i in range(list(Slot).index(Slot.h머리), list(Slot).index(Slot.f발) + 1):
    base.equips[iequips[i]] = [ x for x in items_week1
                               if x.slot == Slot[iequips[i]] and x.type == JOB[base.job][1]]
    pass
for i in range(list(Slot).index(Slot.e귀걸이), list(Slot).index(Slot.r팔찌) + 1):
    base.equips[iequips[i]] = [ x for x in items_week1
                               if x.slot == Slot[iequips[i]] and x.type == JOB[base.job][2]]
    pass
base.equips['ring1'] = [ x for x in items_week1
                               if x.slot == Slot[iequips[i]] and x.type == JOB[base.job][2]]
base.equips['ring2'] = [ x for x in items_week1
                               if x.slot == Slot[iequips[i]] and x.type == JOB[base.job][2]]
