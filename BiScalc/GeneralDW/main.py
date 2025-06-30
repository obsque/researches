import os
import openpyxl
import pandas as pd
from datetime import datetime
import time
import itertools

from util.cdhsp import *
from util.item import *  # ITEM, ITEMTYPE

class ItemSet:
    def __init__(self, level, job):
        self.job = job
        self.level = level
        # self.calc = StatsCalc(level)
        pass
    pass

path = r'E:\Users\i\Documents\My Games\FINAL FANTASY XIV - KOREA\docs\7황금'
# file = r'730items.xlsx'
file = r'760items.xlsx'
file_path = os.path.join(path, file)
print(f'\nLoading {file} from {path}...')
# Load the Excel file

### by dict/list
item_dict = getItemsetsFromDB(file_path)

items_week1 = [item
               for item in item_dict
               if item['획득'] == '제작' or item['획득'] == '석판' or item['획득'] == '일반']
print(f'Loaded {len(items_week1)} items from {file_path}.')
