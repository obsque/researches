import openpyxl
import pandas as pd
from datetime import datetime
import time
import itertools

from item import *  # ITEM, ITEMTYPE
from cdhsp import *
from calcs import *

path = "E:\GIT\eureka-bis\items.xlsx"

# Item Data
item_dict = getItemsetsFromDB(path)

# # ItemSet Data
# Weapon-physeos
jobs = {
    'PLD': [292, 321, 0, 0, 44, 114, 20, 94],
    'WAR': [306, 321, 0, 0, 80, 80, 80, 80],
    'DRK': [306, 321, 0, 0, 80, 80, 80, 80],
    'GNB': [292, 321, 0, 0, 0, 0, 0, 0],
    'SAM': [335, 306, 2, 1, 60, 84, 60, 108],
    'BRD': [335, 292, 4, 2, 78, 114, 0, 114],
    'SMN': [335, 292, 5, 3, 114, 72, 36, 54],
    'RDM': [335, 292, 5, 3, 66, 84, 108, 36],
    'HEAL': [335, 292, 6, 4, 0, 0, 0, 0],
}

# character
LEVEL = 70
SYNC_LV = 300

class Stats:
    def __init__(self) -> None:
        self.attr = 0
        self.vital = 0
        self.dh = 0
        self.crit = 0
        self.det = 0
        self.sks = 0
        self.tnp = 0
        pass




##########
start_time = time.time()



# R E S U L T
end_time = time.time()
print(f'{end_time-start_time:10.6f} s.')
print(f'{expDmg:8.3f}')
# print(BiS)
for id in iequips:
    if id in BiS:
        print(f'{id:9} : {BiS[id]}')
print(BiS_stats)
print(materiaAr)
print(materiaBr)
