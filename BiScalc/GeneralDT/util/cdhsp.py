import math

LevelMod = {
        70 : dict(main=292, sub=364, div=900, mA = 16, mB=6),
        80 : dict(main=340, sub=380, div=1300, mA = 24, mB=8),
        90 : dict(main=390, sub=400, div=1900, mA = 36, mB=12),
        100 : dict(main=440, sub=420, div=2800, mA = 54, mB=18),
        }

class Stats():
    def __init__(self, attr=0, dh=0, crit=0, det=0, sks=0, tenacity=0, piety=0, defence=0) -> None:
        self.attr = attr
        self.dh = dh
        self.crit = crit
        self.det = det
        self.sks = sks
        self.tenacity = tenacity
        self.piety = piety
        self.defence = defence
        pass

class StatsCalc(Stats):
    def __init__(self, level=100) -> None:
        self.level = level
        super().__init__(
            0
            , dh = LevelMod[level]['sub']
            , crit = LevelMod[level]['sub']
            , det = LevelMod[level]['main']
            , sks = LevelMod[level]['sub']
            , tenacity = LevelMod[level]['sub']
            , piety = LevelMod[level]['sub']
            , defence = 0)
        pass

    def calcMain(self, mul, stat) -> float:
        # calc = (mul*(stat-LevelMod[self.level]['main'])/LevelMod[self.level]['div'])
        # return calc
        return (mul*(stat-LevelMod[self.level]['main'])/LevelMod[self.level]['div'])
    def calcSub(self, mul, stat) -> float:
        # calc = (mul*(stat-LevelMod[self.level]['sub'])/LevelMod[self.level]['div'])
        # return calc
        return (mul*(stat-LevelMod[self.level]['sub'])/LevelMod[self.level]['div'])

    def dhAutoMul(self, stat, synergy=0) -> float:
        ### autoMult(DH) = ⌊ 140 × ( DH - Level Lv, SUB)/ Level Lv, DIV ⌋ / 10
        ### Multiplier with Det = (1 + autoMultDH + detMult)
        # calc = int(self.calcMain(140, stat) + synergy*10) / 10
        # return calc
        return int(self.calcMain(140, stat) + synergy*10) / 10
    def dhRate(self, stat, synergy=0) -> float:
        ### p(DH) = ⌊ 550 × ( DH - Level Lv, SUB)/ Level Lv, DIV ⌋ / 10
        ### =INT(550*(DH-420)/2780)/1000
        # calc = int(self.calcSub(550, stat) + synergy*10) / 1000
        # return calc
        return int(self.calcSub(550, stat) + synergy*10) / 1000
    def dh_exDmg(self, stat, synergy=0) -> float:
        # rate = self.dhRate(stat, synergy)
        # expdmg = (1 + rate*0.25)
        # # print('dh {}', expdmg)
        # return expdmg
        return (1 + self.dhRate(stat, synergy) * 0.25)

    def critRate(self, stat, synergy=0) -> float:
        ### p(CRIT) = ⌊ 200 × ( CRIT - Level Lv, SUB)/ Level Lv, DIV  + 50 ⌋ / 10
        ###  =(INT(200*(Crit-420)/2780)+50)/1000
        # calc = int(self.calcSub(200, stat) + 50 + synergy*10) / 1000
        # return calc
        return int(self.calcSub(200, stat) + 50 + synergy*10) / 1000
    def critBonus(self, stat, synergy=0) -> float:
        ### f(CRIT) = 1400 + ⌊ 200 × ( CRIT - Level Lv, SUB)/ Level Lv, DIV ⌋
        ### =(INT(200*(Crit-420)/2780)+1400)/1000
        # calc = int(self.calcSub(200, stat) + 400 + synergy*10) / 1000
        # return calc
        return int(self.calcSub(200, stat) + 400 + synergy*10) / 1000
    def crit_exDmg(self, stat, synergy=0) -> float:
        rate = self.critRate(stat, synergy)
        bonus = self.critBonus(stat, synergy)
        # expdmg = (1 + rate*bonus)
        # return expdmg
        return (1 + rate * bonus)

    def det_exDmg(self, stat) -> float:
        ### f(DET) = ⌊ 140 × ( DET - Level Lv, MAIN )/ Level Lv, DIV + 1000 ⌋
        ### =(1000+INT(140*(Det-440)/2780))/1000
        # calc = (1000 + int(self.calcMain(140, stat)) / 1000
        # return calc
        return (1000 + int(self.calcMain(140, stat))) / 1000

    def sks_exDmg(self, stat) -> float:
        ### f(SPD) = ( 1000 + ⌊ 130 × ( Speed - Level Lv, SUB )/ Level Lv, DIV ⌋ ) / 1000
        ### =(1000+INT(130*(Speed-420)/2780))/1000
        # calc = (1000 + int(self.calcSub(130, stat))) / 1000
        # return calc
        return (1000 + int(self.calcSub(130, stat))) / 1000
    def GCDmod(self, stat, haste = 0, GCD=2.5) -> int:
        ### f(GCD) = ⌊ ((GCD * (1000 + ⌈ 130 × ( Level Lv, SUB - Speed)/ Level Lv, DIV)⌉ ) / 10000)/100 ⌋
        ### =(INT(GCD*(1000+CEILING(130*(420-Speed)/2780))/10000)/100)
        calc = int(GCD*1000*(1000 + math.ceil(-self.calcSub(130, stat)))/10000) / 100
        return calc

    def ten_exDmg(self, stat) -> float:
        ### f(TNCPT) = ( 1000 + ⌊ 112 × ( TNCPT - Level Lv, SUB )/ Level Lv, DIV ⌋ ) / 1000

        # calc = (1000 + int(self.calcSub(112, stat))) / 1000
        # # print('ten {}', calc)
        # return calc
        return (1000 + int(self.calcSub(112, stat))) / 1000
    def ten_miti(self, defence) -> float:
        ### Incoming Damage Mitigation: f(Def) = 100 - ⌊ 15 × Def/ Level Lv, DIV ⌋ (as a %)
        ###  =(100-INT(15*Def/2780))/100
        calc = (100 - int(15 * defence / LevelMod[self.level]['div'])) / 100
        # print('ten {}', calc)
        return calc

    def haste_exDmg(self, stat, GCD=250) -> float:
        # term = math.ceil(GCD*stat)/100
        # GCD_haste = (GCD - term)
        calc = GCD / (GCD - math.ceil(GCD*stat)/100)
        # print('haste {}', calc)
        return calc

    # def ExpDmgSum(attr, dh, crit, det, sks, tncpt, haste, levelmod=70, GCD=250):
    #     calc = StatsCalc(levelmod)
    #     GCDmod = calc.sks_mod(sks, GCD)
    #     result = attr
    def ExpDmgMult(self, sum):
        # calc = StatsCalc(levelmod)
        result = sum['attr']
        result *= self.dh_exDmg(sum['dh'])
        result *= self.crit_exDmg(sum['crit'])
        result *= self.det_exDmg(sum['det'])
        result *= self.sks_exDmg(sum['sks'])
        # result *= self.ten_exDmg(sum['tncpt'])
        # GCDmod = self.sks_mod(self, sum['sks'], GCD)
        # result *= self.haste_exDmg(sum['haste'], GCDmod)
        return result

    def mitigationP(self, defence):
        calc = (100-math.floor(15*defence/LevelMod[self.level]['div']))/100
        return calc


def test():
    stsc = StatsCalc(70)

    dhex = stsc.dh_exDmg(500)
    print(dhex)


if __name__ == "__main__":
	test()
