// https://www.akhmorning.com/allagan-studies/modifiers/levelmods/
const LevelMod = {
    70: { main: 292, sub: 364, div: 900, crit: 200, dh:550, det: 140, sks: 130, ten: 112, pty: 150, ten_miti: 200 },
    90: { main: 390, sub: 390, div: 1900, crit: 200, dh:550, det: 140, sks: 130, ten: 112, pty: 150, ten_miti: 200 },
    100: { main: 440, sub: 420, div: 2780, crit: 200, dh:550, det: 140, sks: 130, ten: 112, pty: 150, ten_miti: 200 },
};

class StatsCalc {
    constructor(lvmod = 70) {
        this.level = lvmod;
        this.crit = LevelMod[this.level].sub;
        this.dh = LevelMod[this.level].sub;
        this.det = LevelMod[this.level].main;
        this.sks = LevelMod[this.level].sub;
        this.ten = LevelMod[this.level].sub;
        this.pty = LevelMod[this.level].main;

        this.crit_rate = 0.05;
        this.crit_power = 0.4;
        this.dh_rate = 0.0;
        this.det = 0.0;
        this.sks = 0.0;
        this.ten = 0.0;
        this.pty = 0.0;
        this.GCD = 250;
        this.GCDmod = 0;
    }

    // calc Base
    calcMain(mul, stat) {
        return (mul * (stat - LevelMod[this.level].main)) / LevelMod[this.level].div;
    }
    calcSub(mul, stat) {
        return (mul * (stat - LevelMod[this.level].sub)) / LevelMod[this.level].div;
    }

    // Critical Hit
    critRate(stat, synergy = 0) {
        const calc = Math.floor(this.calcSub(LevelMod[this.level].crit, stat) + synergy * 10 + 50) / 1000;
        return calc;
    }
    critBonus(stat, synergy = 0) {
        const bonus = Math.floor(this.calcSub(LevelMod[this.level].crit, stat) + 400) / 1000;
        return bonus;
    }
    critExDmg(stat, synergy = 0) {
        return 1 + calc * bonus;
    }
    // Direct Hit
    dhRate(stat, synergy = 0) {
        const calc = Math.floor(this.calcSub(LevelMod[this.level].dh, stat) + synergy * 10) / 1000;
        return calc;
    }
    dhExDmg(stat, synergy = 0) {
        const calc = Math.floor(this.calcSub(LevelMod[this.level].crit, stat) + synergy * 10) / 1000;
        return 1 + calc * 0.25;
    }
    // Determination
    detExDmg(stat) {
        const calc = (1000 + Math.floor(this.calcMain(LevelMod[this.level].det, stat))) / 1000;
        return calc;
    }
    // Skill Speed
    sksExDmg(stat) {
        const calc = (1000 + Math.floor(this.calcSub(LevelMod[this.level].sks, stat))) / 1000;
        return calc;
    }
    sksMod(stat, GCD = 250) {
        const calc = Math.floor((GCD * (1000 + Math.ceil(130 * (364 - stat) / 900))) / 10000) / 10;
        return calc;
    }
    // Tenacity
    tenExDmg(stat) {
        const calc = (1000 + Math.floor(this.calcSub(LevelMod[this.level].ten, stat))) / 1000;
        return calc;
    }
    hasteExDmg(stat, GCD = 250) {
        const calc = GCD / (GCD - Math.ceil((GCD * stat) / 100));
        return calc;
    }

    expDmgSum(GCD = 250, levelmod = 70) {
        let result = 10000;
        result *= this.dhExDmg(sum['dh']);
        result *= this.critExDmg(sum['crit']);
        result *= this.detExDmg(sum['det']);
        result *= this.sksExDmg(sum['sks']);
        result *= this.tenExDmg(sum['tncpt']);
        this.GCDmod = this.sksMod(sum['sks'], GCD);
        result *= this.hasteExDmg(sum['haste'], GCDmod);
        return result;
    }
}

function expDmgSum(attr, dh, crit, det, sks, tncpt, haste, levelmod = 70, GCD = 250) {
    const calc = new StatsCalc(levelmod);
    const GCDmod = calc.sksMod(sks, GCD);
    let result = attr;
    result *= calc.dhExDmg(dh);
    result *= calc.critExDmg(crit);
    result *= calc.detExDmg(det);
    result *= calc.sksExDmg(sks);
    result *= calc.tenExDmg(tncpt);
    result *= calc.hasteExDmg(haste, GCDmod);
    return result;
}
