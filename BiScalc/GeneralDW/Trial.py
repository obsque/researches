import os
import openpyxl
import pandas as pd
from datetime import datetime
import time
import itertools

from util.cdhsp import *
import io
from enum import Enum, auto
from util.xiv import *  # ITEM, ITEMTYPE

start = time.time()

class ItemSet:
    def __init__(self, level, job):
        self.job = job
        self.level = level
        # self.calc = StatsCalc(level)
        self.equips = { x: [] for x in iequips }  # Initialize all equipment slots with empty lists
        pass
    pass

base = ItemSet(100, 'PLD')
### Load the Excel file
path = r'E:\Users\i\Documents\My Games\FINAL FANTASY XIV - KOREA\docs\7황금'
file = r'760items.xlsx'
file_path = os.path.join(path, file)
print(f'\nLoading {file} from {path}...')

def getItemsFromDB(file_path, req_sks=0):
    item_dict = {}

    wb = openpyxl.load_workbook(file_path)
    sheet = wb[wb.sheetnames[0]]  # Assuming the first sheet is the one we want
    ### Item Data
    headers = [cell.value for cell in sheet[1]]  # Get headers from the first row
    ### ['부위', '직군', '획득', '주', '극', '의', '시', '직', '굴/신']
    ItemHeaders = Enum('ItemHeaders', {header.replace('/', '_'): auto() for header in headers})
    temp = {}
    for row in sheet.iter_rows(2, values_only=True):
        if row[0] not in item_dict:
            item_dict[row[0]] = []

        ### JOB 착용가능 type 직군 확인
        #부위
        if row[0] == 'food':
            pass
        elif row[6] != None and req_sks == 0:
            continue
        #직군
        elif row[1] not in [j.value for j in JOB[base.job]]:
            continue
        ### 획득: 출발 / 최종
        elif row[2] not in ['제작', '일반', '석판', '토벌']:
            continue
        idata = {headers[i]: row[i] for i in range(2, len(headers))}
        idata[headers[1]] = row[1] if row[1] is not None else temp[headers[1]]

        item_dict[row[0]].append(idata)
        # item_dict.append(idata)
        temp = idata
        pass
    return item_dict

item_dict = getItemsFromDB(file_path)
# print(f'{base.job} - {len(item_dict)} items.')
print(len(base.equips))

# iequips의 각 슬롯에 대해 item_dict에서 해당 부위의 아이템을 대입
for slot in range(len(iequips)):
    if iequips[slot] == 'ring2':
        base.equips[iequips[slot]] = item_dict[dequips[slot-1]]
    else:
        base.equips[iequips[slot]] = item_dict[dequips[slot]]
    pass

### Calculation

### Week 1
TombMax = 900
TombCosts = {'W':900, 'A':825, 'B':495, 'C':375}


def AddStat(slot_idx, input_stat):
    if slot_idx == len(list(base.equips.keys())):
        # key = list(base.equips.keys())[slot_idx]
        print(f'AddStat: {input_stat}')
        print(iset)
        return

    key = list(base.equips.keys())[slot_idx]
    for s in base.equips[key]:
        iset[key] = s
        istat = {
            'attr': int(s['주'] or 0),
            'dh': int(s['직'] or 0),
            'crit': int(s['극'] or 0),
            'det': int(s['의'] or 0),
            'sks': int(s['시'] or 0),
            'tncpt': int(s['굴/신'] or 0),
            'matA': int(s.get('matA', 0) or 0),
            'matB': int(s.get('matB', 0) or 0)
        }
        # 5개 중 큰 값 2개 추출
        stat_keys = list(istat.keys())[1:6] #['dh', 'crit', 'det', 'sks', 'tncpt']
        top2 = sorted([istat[k] for k in stat_keys], reverse=True)[:2]

        istat = {k: input_stat.get(k, 0) + int(istat.get(k, 0) or 0)
                 for k in input_stat}

        AddStat(slot_idx +1, istat.copy())
        pass
    pass

def CalculateMateria(input_stat):
    multiply = 1.0


    return multiply

stat_base = {k: 0 for v,k in enumerate(istats)}
iset = {k: None for v,k in enumerate(base.equips)}
AddStat(0, stat_base)


end = time.time()
elapsed = end - start
print(f'Time taken: {elapsed:.2f} seconds')