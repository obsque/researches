import openpyxl
from enum import Enum

class ArmType(Enum):
    a수호자 = 1
    b학살자 = 2
    c타격대 = 3
    d정찰대 = 4
    e유격대 = 5
    f마술사 = 6
    g치유사 = 7
    pass
class AccType(Enum):
    a수호자 = 1
    b공격대 = 2
    c유격대 = 3
    d마술사 = 4
    e치유사 = 5
    pass
JOB = {
    'PLD': [ ArmType.a수호자, AccType.a수호자 ],
    'WAR': [ ArmType.a수호자, AccType.a수호자 ],
    'DRK': [ ArmType.a수호자, AccType.a수호자 ],
    'GNB': [ ArmType.a수호자, AccType.a수호자 ],
    'DRG': [ ArmType.b학살자, AccType.b공격대 ],
    'RPR': [ ArmType.b학살자, AccType.b공격대 ],
    'MNK': [ ArmType.c타격대, AccType.b공격대 ],
    'SAM': [ ArmType.c타격대, AccType.b공격대 ],
    'NIN': [ ArmType.d정찰대, AccType.c유격대 ],
    'VPR': [ ArmType.d정찰대, AccType.c유격대 ],
    'BRD': [ ArmType.e유격대, AccType.c유격대 ],
    'MCH': [ ArmType.e유격대, AccType.c유격대 ],
    'DNC': [ ArmType.e유격대, AccType.c유격대 ],
    'BLM': [ ArmType.f마술사, AccType.d마술사 ],
    'SMN': [ ArmType.f마술사, AccType.d마술사 ],
    'RDM': [ ArmType.f마술사, AccType.d마술사 ],
    'PCT': [ ArmType.f마술사, AccType.d마술사 ],
    'WHM': [ ArmType.g치유사, AccType.e치유사 ],
    'SCH': [ ArmType.g치유사, AccType.e치유사 ],
    'AST': [ ArmType.g치유사, AccType.e치유사 ],
    'SGE': [ ArmType.g치유사, AccType.e치유사 ],
}
iequips = ['weapon', 'head', 'body', 'hands', 'legs', 'feet',
           'earrings', 'necklace', 'bracelets', 'ring1', 'ring2', 'food']

istats = ['attr', 'vital'
          , 'dh', 'crit', 'det', 'sks', 'tncpt'
          , 'matA', 'matB'
        #   , 'Elemental', 'haste'
          ] #, 'materia']
eStats = {'attr': 0, 'vital': 1,
          'dh': 2, 'crit': 3, 'det': 4, 'sks': 5, 'tncpt': 6,
          'matA': 7, 'matB': 8,
        #   'Elemental': 9, 'haste': 10,
          }

class ITEMTYPE(Enum):
    weapon = 'W'
    head = 'B'
    body = 'A'
    hands = 'B'
    legs = 'A'
    feet = 'B'
    earrings = 'C'
    necklace = 'C'
    bracelets = 'C'
    ring = 'C'
    etc = '0'

class Specs:
    def __init__(self, attr=0, vital=0, dh=0, crit=0, det=0,
                 sks=0, tncpt=0, elemental=0, haste=0):
        self.attr = attr
        self.vital = vital
        self.DH = dh
        self.CRT = crit
        self.DET = det
        self.SKS = sks
        self.TenPt = tncpt
        self.matA = 0
        self.matB = 0
        # self.elemental = elemental
        # self.haste = haste

# class ITEM(Specs):
class ITEM():
    def __init__(self, type=ITEMTYPE.etc): # -> None:
        # super().__init__()
        self.type = type
        self.slot = 0

        self.specs = {x:0 for x in istats}  # Initialize all stats to 0
        pass

def getItemsetsFromDB(path):
    wb = openpyxl.load_workbook(path)

    # sheet = wb['DB']
    sheet = wb[wb.sheetnames[0]]  # Assuming the first sheet is the one we want
    # mr = sheet.max_row
    # mc = sheet.max_column

    # Item Data
    item_dict = []
    headers = [cell.value for cell in sheet[1]]  # Get headers from the first row
    print(f'{headers}')
    for row in sheet.iter_rows(2, values_only=True):
        temp = ITEM(type=ITEMTYPE(row[0]))
        # print(row)
        # (직군, 부위, name, Attr, vital, 직격, 극대, 의지, 시속, 불굴신앙, 속성, Haste, 마테)
        row_dict = {headers[i]: row[i] for i in range(len(headers))}
        item_dict.append(row_dict)

    return item_dict



def test():

    pass

if __name__ == "__main__":
	test()
