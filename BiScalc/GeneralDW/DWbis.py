import openpyxl
import pandas as pd
from datetime import datetime
import time
import itertools

from util.cdhsp import *
from util.item import *  # ITEM, ITEMTYPE
# from util.calcs import *

level = 100
ilevel = 740
job = 'PLD'

path = r'E:\Users\i\Documents\My Games\FINAL FANTASY XIV - KOREA\docs\7황금'
# file = r'730items.xlsx'
file = r'760items.xlsx'
print()
print(f'Loading {file} from {path}...')
# Load the Excel file
df = pd.read_excel(path + '\\' + file)
df.fillna(value=0, inplace=True)  # Fill NaN values with None
print(df.head())  # Display the first few rows for verification

df2 = df[df["획득"].isin(['제작'])]


class Character(StatsCalc):
    def __init__(self, name, job, level):
        super().__init__(level)
        self.level = level
        self.job = job

        self.crit = 0
        self.dh = 0
        self.det = 0
        self.sks = 0
        self.tenacity = 0
        self.piety = 0
        self.defense = 0
        pass
    pass

def main():
    start = time.time()
    wb = openpyxl.load_workbook(path + '\\' + file, data_only=True)
    ws = wb.active

    items = []
    for row in ws.iter_rows(min_row=2, values_only=True):
        item = ITEM(*row)
        items.append(item)

    items.sort(key=lambda x: x.id)


    pass
