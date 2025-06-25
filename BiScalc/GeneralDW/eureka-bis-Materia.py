import openpyxl
import pandas as pd
from datetime import datetime
import time
import itertools
from item import *  # ITEM, ITEMTYPE
from cdhsp import *
from calcs import *

path = r'E:\Users\i\Documents\My Games\FINAL FANTASY XIV - KOREA\docs\7황금'
# file = r'730items.xlsx'
file = r'760items.xlsx'

# Item Data
item_dict = getItemsetsFromDB(path)

# # ItemSet Data
# Weapon-physeos
jobs = {
    'PLD': [292, 321, 0, 0, 44, 114, 20, 94],
#    'WAR': [306, 321, 0, 0, 80, 80, 80, 80],
    'WAR': [306, 321, 0, 0, 80, 80, 80, 80],
    'DRK': [306, 321, 0, 0, 80, 80, 80, 80],
    'GNB': [292, 321, 0, 0, 0, 0, 0, 0],
    'SAM': [335, 306, 2, 1, 60, 84, 60, 108],
    'DRG': [351, 324, 1, 1, 60, 114, 60, 60],
    'BRD': [335, 292, 4, 2, 78, 114, 0, 114],
    'SMN': [335, 292, 5, 3, 114, 72, 36, 54],
    'RDM': [335, 292, 5, 3, 66, 84, 108, 36],
    'HEAL': [335, 292, 6, 4, 0, 0, 0, 0],
}

# job = 'PLD'
job = 'DRG'
# job = 'SAM'
# job = 'BRD'
# job = 'SMN'
# job = 'RDM'

verbose = False #True

LEVEL = 70
[base_attr, base_vit, i1, i2, w_crit, w_det, w_sks, w_dht] = jobs[job]
class1 = ['수호자', '학살자', '타격대', '정찰대', '유격대', '마술사', '치유사']
class2 = ['수호자', '공격대', '유격대', '마술사', '치유사']
직군 = class1[i1]
직군2 = class2[i2]

itemset = {}
# 고정 부위
itemset['hands'] = item_dict[직군]['손']  # ['+2']
itemset['legs'] = item_dict[직군]['다리']  # ['+2']
itemset['feet'] = item_dict[직군]['발']  # ['+2']
# 가변 부위
itemset['weapon'] = {'base': [112, 111, 0, 0, 0, 0, 0, 348, 0]}
itemset['head'] = item_dict[직군]['머리']
itemset['body'] = item_dict[직군]['몸통']
itemset['earrings'] = item_dict['Sync']['귀']
itemset['necklace'] = item_dict['Sync']['목']
itemset['bracelets'] = item_dict['Sync']['팔']
itemset['ring1'] = item_dict['Sync']['반지'].copy()
itemset['ring2'] = item_dict['Sync']['반지'].copy()
itemset['food'] = item_dict['음식']['음식']
# 제왕비취s
itemset['earrings'].update(item_dict[직군2]['귀'])
itemset['necklace'].update(item_dict[직군2]['목'])
itemset['bracelets'].update(item_dict[직군2]['팔'])
itemset['ring1'].update(item_dict[직군2]['반지'])
itemset['ring2'].update(item_dict[직군2]['반지'])
# Haste items
itemset['head'].update(item_dict['Haste']['머리'])
itemset['earrings'].update(item_dict['Haste']['귀'])
itemset['ring1'].update(item_dict['Haste']['반지'])

# STATS
base_stats = {}
base_stats['attr'] = base_attr  # LevelMod[LEVEL]['attr']
base_stats['vital'] = base_vit  # LevelMod[LEVEL]['vital']
base_stats['dh'] = LevelMod[LEVEL]['main']
base_stats['crit'] = LevelMod[LEVEL]['main']
base_stats['det'] = LevelMod[LEVEL]['main']
base_stats['sks'] = LevelMod[LEVEL]['main']
base_stats['tncpt'] = LevelMod[LEVEL]['main']
base_stats['Elemental'] = 3558
base_stats['haste'] = 0

# 장비 SET
equips = {}
materiaA = {'dh': 0, 'crit': 0, 'det': 0, 'sks': 0, 'tncpt': 0}
materiaB = {'dh': 0, 'crit': 0, 'det': 0, 'sks': 0, 'tncpt': 0}
materiaAn = 0
materiaBn = 0

# OUTPUT
expDmg = 0.0
BiS_stats = base_stats.copy()
BiS = {}
materiaAr = {'dh': 0, 'crit': 0, 'det': 0, 'sks': 0, 'tncpt': 0}
materiaBr = {'dh': 0, 'crit': 0, 'det': 0, 'sks': 0, 'tncpt': 0}

##########


def dh2tnc(statvalues):
    if 직군 == '수호자' or 직군 == '치유사':
        statvalues[eStats['tncpt']] = statvalues[eStats['dh']]
        statvalues[eStats['dh']] = None


def addMateria(tmp_stats, in_equips, matA, matB, NmatA, NmatB):

    # add Materia
    matsA = {}
    matsB = {}

    if NmatA == 9:
        pass

    for cA in itertools.product(range(0, matA['dh']+1),
                                range(0, matA['crit']+1),
                                range(0, matA['det']+1),
                                range(0, matA['sks']+1)):
        if sum(cA) == NmatA:
            for cB in itertools.product(range(0, matB['dh']+1),
                                        range(0, matB['crit']+1),
                                        range(0, matB['det']+1),
                                        range(0, matB['sks']+1)):
                if sum(cB) == NmatB:
                    sum_stats = tmp_stats.copy()

                    for st in range(0, len(cA)):
                        sum_stats[istats[2+st]] += cA[st]*16
                        sum_stats[istats[2+st]] += cB[st]*8
                        matsA[istats[2+st]] = cA[st]
                        matsB[istats[2+st]] = cB[st]

                    compareBiS(sum_stats, in_equips, matsA, matsB)
                pass


def compareBiS(tmp_stats, in_equips, matA, matB):  # , NmatA, NmatB):
    global materiaAr, materiaBr

    result = ExpDmgSum(tmp_stats['attr'], tmp_stats['dh'], tmp_stats['crit'],
                       tmp_stats['det'], tmp_stats['sks'], tmp_stats['tncpt'], tmp_stats['haste'])

    global expDmg, BiS_stats, BiS, verbose

    if result > expDmg:
        expDmg = result
        BiS = in_equips.copy()
        BiS_stats.update(tmp_stats)
        materiaAr = matA.copy()
        materiaBr = matB.copy()

        # print('{:8.3f} - {}'.format(expDmg, datetime.now()))

        # print(BiS)
        # for id in iequips:
        #     if id in BiS:
        #         print(f'{id:8} : {BiS[id]}')
        # print(BiS_stats)
        # print(matA)
        # print(matB)

    if verbose:
        print('{:8.3f} - {}'.format(expDmg, datetime.now()))

        # print(BiS)
        for id in iequips:
            if id in in_equips:
                print(f'{id:8} : {in_equips[id]}')
        print(tmp_stats)
        print(matA)
        print(matB)
        print('\033[16A')

def calcPart(part, in_stats, NextChain=None, *args, **kwargs):
    for partname, value in itemset[part].items():
        equips[part] = {partname: value}
        part_stat = in_stats.copy()
        addStats(part_stat, value)

        if NextChain == None:
            compareBiS(part_stat, equips)  # , expDmg, BiS_stats, BiS)
        else:
            NextChain(part_stat, *args, **kwargs)
            pass

def calcPart(part, in_stats, matA=materiaA, matB=materiaB, NmatA=materiaAn, NmatB=materiaBn, NextChain=None, *args, **kwargs):
    for partname, value in itemset[part].items():
        equips[part] = {partname: value}
        part_stat = in_stats.copy()
        addStats(part_stat, value)

        if NextChain != None:
            NextChain(part_stat, *args, **kwargs)
            pass
        # else:
            # compareBiS(part_stat, equips, expDmg, BiS_stats, BiS)


def BodyPart(in_stats, NextChain, matA=materiaA, matB=materiaB, iNmatA=materiaAn, iNmatB=materiaBn, *args, **kwargs):
    part = 'body'

    for body, value in itemset[part].items():
        equips[part] = {body: value}
        part_stat = in_stats.copy()
        addStats(part_stat, value)

        if body != '기린' and body != '주홍':
            NextChain(part_stat, matA, matB, iNmatA, iNmatB, *args, **kwargs)
        else:  # body => '기린' or '주홍'
            mlimit = 110
            oNmatA = iNmatA + 5

            if body == '주홍':
                rem_val = list(equips['head'].values())[0]
                rem_val = [-x for x in rem_val]
                addStats(part_stat, rem_val)
                equips['head'].clear()
                mlimit = 179

            partMatA = matA.copy()
            stats_end = eStats['tncpt']+(직군 == '수호자')
            for i in range(eStats['dh'], stats_end):
                partMatA[istats[i]] += min(int((mlimit - value[i]) / 16), 5)

            NextChain(part_stat, partMatA, matB, oNmatA, iNmatB, *args, **kwargs)

# For Accessories

def AccPart(part, in_stats, NextChain=None, matA=materiaA, matB=materiaB, iNmatA=materiaAn, iNmatB=materiaBn, *args, **kwargs):
    for partname, value in itemset[part].items():
        equips[part] = {partname: value}
        part_stat = in_stats.copy()
        addStats(part_stat, value)

        if partname != '제왕비취':
            if NextChain == None:
                # , expDmg, BiS_stats, BiS)
                addMateria(part_stat, equips, matA, matB, iNmatA, iNmatB)
            else:
                NextChain(part_stat, matA, matB, iNmatA, iNmatB, *args, **kwargs)
                pass

        else:  # partname == '제왕비취':
            mlimit = 53
            oNmatA = iNmatA + 2
            oNmatB = iNmatB + 3

            remainA = 2
            partMatA = matA.copy()
            partMatB = matB.copy()
            stats_end = eStats['tncpt']+(직군 == '수호자')
            for i in range(eStats['dh'], stats_end):
                calcA = min(int((mlimit - value[i]) / 16), 2)
                if calcA == 1:
                    partMatA[istats[i]] += calcA
                    partMatB[istats[i]] += 0
                    continue
                partMatB[istats[i]] = min(math.floor((mlimit - value[i]) / 16), 3)

            if NextChain == None:
                addMateria(part_stat, equips, partMatA, partMatB,
                           oNmatA, oNmatB)  # , expDmg, BiS_stats, BiS)
            else:
                NextChain(part_stat, matA, matB, oNmatA, oNmatB, *args, **kwargs)
                pass


# 가변 부위
def Ring2Chain(in_stats, *args, **kwargs):
    AccPart('ring2', in_stats, None, *args, **kwargs)

def Ring1Chain(in_stats, *args, **kwargs):
    AccPart('ring1', in_stats, Ring2Chain, *args, **kwargs)

def BraceletsChain(in_stats, *args, **kwargs):
    # print(f"@@@@@@ bracelets @@@@@@ {datetime.now()}")
    AccPart('bracelets', in_stats, Ring1Chain, *args, **kwargs)

def NecklaceChain(in_stats, *args, **kwargs):
    # print(f"@@@@@ 'necklace @@@@@ {datetime.now()}")
    AccPart('necklace', in_stats, BraceletsChain, *args, **kwargs)

def EarringsChain(in_stats, *args, **kwargs):
    # print(f"@@@ earrings @@@")
    AccPart('earrings', in_stats, NecklaceChain, *args, **kwargs)

def ChainBody(in_stats, *args, **kwargs):
    BodyPart(in_stats, EarringsChain, materiaA, materiaB, materiaAn, materiaBn)

def ChainHead(in_stats, *args, **kwargs):
    calcPart('head', in_stats, NextChain=ChainBody, *args, **kwargs)

def ChainFood(in_stats, *args, **kwargs):
    calcPart('food', in_stats, NextChain=ChainHead, *args, **kwargs)

# 고정 부위
def ChainFeet(in_stats, *args, **kwargs):
    calcPart('feet', in_stats, NextChain=ChainFood, *args, **kwargs)
def ChainLegs(in_stats, *args, **kwargs):
    calcPart('legs', in_stats, NextChain=ChainFeet, *args, **kwargs)
def ChainHands(in_stats, *args, **kwargs):
    calcPart('hands', in_stats, NextChain=ChainLegs, *args, **kwargs)


# 무기
def WeaponPart(in_stats, dh=0, crit=0, det=0, sks=0, NextChain=None, *args, **kwargs):
    for weapon, w_value in itemset['weapon'].items():
        # statlist = [36, 54, 80, 96, 114]
        # # for stat1 in statlist:
        w_value[eStats['dh']] = min(dh, 114)
        w_value[eStats['crit']] = min(crit, 114)
        w_value[eStats['det']] = min(det, 114)
        w_value[eStats['sks']] = min(sks, 114)
        # w_value[eStats['tncpt']] = 0

    dh2tnc(w_value)
    equips['weapon'] = {job: w_value}

    part_stats = in_stats.copy()
    addStats(part_stats, w_value)
    NextChain(part_stats, *args, **kwargs)

##########
start_time = time.time()

WeaponPart(base_stats, w_dht, w_crit, w_det, w_sks, ChainHands)

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
