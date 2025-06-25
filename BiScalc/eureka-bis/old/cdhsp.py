import math

LevelMod = {
        # 70 : dict(main=364, div=900),
        70 : dict(main=364, div=900, attr=305, vital=320),
        90 : dict(main=400, div=1900, attr=0, vital=0),
        }

class StatsCalc:
    def __init__(self, lvmod=70) -> None:
        self.levelmod = lvmod
        pass

    def calc_base(self, mul, stat) -> float:
        calc = (mul*(stat-LevelMod[self.levelmod]['main'])/LevelMod[self.levelmod]['div'])
        return calc

    def dh_exDmg(self, stat, synergy=0) -> float:
        calc = int(self.calc_base(550, stat) + synergy*10) / 1000
        expdmg = (1 + calc*0.25)
        # print('dh {}', expdmg)
        return expdmg

    def crit_exDmg(self, stat, synergy=0) -> float:
        calc = int(self.calc_base(200, stat) + 50 + synergy*10) / 1000
        bonus = int(self.calc_base(200, stat) + 400) / 1000
        expdmg = (1 + calc*bonus)
        # print('crit {}', expdmg)
        return expdmg

    def det_exDmg(self, stat) -> float:
        calc = int(1000 + self.calc_base(140, stat)) / 1000
        # print('det {}', calc)
        return calc

    def sks_exDmg(self, stat) -> float:
        calc = (1000 + int(self.calc_base(130, stat))) / 1000
        # print('sks {}', calc)
        return calc
    
    def sks_mod(self, stat, GCD=250) -> int:
        calc = int(GCD*(1000+math.ceil(130*(364-stat)/900))/10000) /10
        return calc

    def ten_exDmg(self, stat) -> float:
        calc = (1000 + int(self.calc_base(100, stat))) / 1000
        # print('ten {}', calc)
        return calc
    
    def haste_exDmg(self, stat, GCD=250) -> float:
        # term = math.ceil(GCD*stat)/100
        # GCD_haste = (GCD - term)
        calc = GCD / (GCD - math.ceil(GCD*stat)/100)
        # print('haste {}', calc)
        return calc
    
    def ExpDmgSum(self, GCD=250, levelmod=70):
        # calc = StatsCalc(levelmod)
        result = 10000
        result *= self.dh_exDmg(sum['dh'])
        result *= self.crit_exDmg(sum['crit'])
        result *= self.det_exDmg(sum['det'])
        result *= self.sks_exDmg(sum['sks'])
        result *= self.ten_exDmg(sum['tncpt'])
        GCDmod = self.sks_mod(self, sum['sks'], GCD)
        result *= self.haste_exDmg(sum['haste'], GCDmod)
        return result


def ExpDmgSum(attr, dh, crit, det, sks, tncpt, haste, levelmod=70, GCD=250):
    calc = StatsCalc(levelmod)
    GCDmod = calc.sks_mod(sks, GCD)
    result = attr
    result *= calc.dh_exDmg(dh)
    result *= calc.crit_exDmg(crit)
    result *= calc.det_exDmg(det)
    result *= calc.sks_exDmg(sks)
    result *= calc.ten_exDmg(tncpt)
    result *= calc.haste_exDmg(haste, GCD=GCDmod)
    return result


def test():
    stsc = StatsCalc(70)

    dhex = stsc.dh_exDmg(500)
    print(dhex)


if __name__ == "__main__":
	test()
