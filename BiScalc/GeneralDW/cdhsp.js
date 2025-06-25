const LevelMod = {
    70: { main: 364, div: 900 },
    90: { main: 400, div: 1900 },
    100: { main: 420, div: 2800 },
};

class StatsCalc {
    constructor(lvmod = 70) {
        this.levelmod = lvmod;
    }

    calcBase(mul, stat) {
        return (mul * (stat - LevelMod[this.levelmod].main)) / LevelMod[this.levelmod].div;
    }

    dhExDmg(stat, synergy = 0) {
        const calc = Math.floor(this.calcBase(550, stat) + synergy * 10) / 1000;
        return 1 + calc * 0.25;
    }

    critExDmg(stat, synergy = 0) {
        const calc = Math.floor(this.calcBase(200, stat) + 50 + synergy * 10) / 1000;
        const bonus = Math.floor(this.calcBase(200, stat) + 400) / 1000;
        return 1 + calc * bonus;
    }

    detExDmg(stat) {
        const calc = (1000 + Math.floor(this.calcBase(140, stat))) / 1000;
        return calc;
    }

    sksExDmg(stat) {
        const calc = (1000 + Math.floor(this.calcBase(130, stat))) / 1000;
        return calc;
    }

    sksMod(stat, GCD = 250) {
        const calc = Math.floor((GCD * (1000 + Math.ceil(130 * (364 - stat) / 900))) / 10000) / 10;
        return calc;
    }

    tenExDmg(stat) {
        const calc = (1000 + Math.floor(this.calcBase(100, stat))) / 1000;
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
        const GCDmod = this.sksMod(sum['sks'], GCD);
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

function test() {
    const stsc = new StatsCalc(70);
    const dhex = stsc.dhExDmg(500);
    console.log(dhex);
}

test();
