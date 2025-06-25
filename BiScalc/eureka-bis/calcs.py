from item import *

def AddMateria(value, mb, mslot, addval=16, maxval=110) -> bool:
    if value[mb] == None:
        value[mb] = addval
        value[mslot] = istats[mb]
        return True
    elif value[mb] + addval <= maxval:
        value[mb] += addval
        value[mslot] = istats[mb]
        return True
    else:
        return False

def addStats(temp_stats, equip_stats):
    for i in  range(0, 9):  # len(stats)):
            # if istats[i] in istats:
            cellvalue = equip_stats[i]
            if cellvalue != None:
                temp_stats[istats[i]] += cellvalue


# def addStats(temp_stats, equip_stats):
#     for stats in equip_stats.values():  # range(0, len(sum)):
#         for i in range(0, 9):  # len(stats)):
#             # if istats[i] in istats:
#             cellvalue = stats[i]
#             if cellvalue != None:
#                 temp_stats[istats[i]] += cellvalue

# def calcChainFinal(input_stats, part):
#     for partname, value in itemset[part].items():
#         equips[part] = {partname: value}
#         addStats(input_stats, value)

