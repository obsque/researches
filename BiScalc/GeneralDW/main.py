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
               if item['획득'] == '제작' or item['획득'] == '석판' or item['획득'] == '일반']
len(items_week1)
print(f'Loaded {len(items_week1)} items from {file_path}.')

base.equips['weapon'] = ITEM(ITEMTYPE.weapon)

석판상한 = 900

