const LevelMod = {
    70: { main: 292, sub: 364, div: 900 },
    80: { main: 340, sub: 380, div: 1300 },
    90: { main: 390, sub: 400, div: 1900 },
    100: { main: 440, sub: 420, div: 2780 }
};

class StatsCalc {
    constructor(lvmod = 100) {
        this.levelmod = lvmod;
    }

    calcMain(mul, stat) {
        const calc = (mul * (stat - LevelMod[this.levelmod].main)) / LevelMod[this.levelmod].div;
        return calc;
    }
    calcSub(mul, stat) {
        const calc = (mul * (stat - LevelMod[this.levelmod].sub)) / LevelMod[this.levelmod].div;
        return calc;
    }

    // p(DH) = ⌊ 550 × ( DH - Level Lv, SUB)/ Level Lv, DIV ⌋ / 10
    // =INT(550*(DH-420)/2780)/1000
    dhRate(stat, synergy = 0) {
        const calc = Math.floor(this.calcSub(550, stat) + synergy * 10) / 1000;
        return calc;
    }
    dhExDmg(stat, synergy = 0) {
        const rate = this.dhRate(stat, synergy);
        return 1 + rate * 0.25;
    }

    // p(CRIT) = ⌊ 200 × ( CRIT - Level Lv, SUB)/ Level Lv, DIV  + 50 ⌋ / 10
    // =(INT(200*(Crit-420)/2780)+50)/1000
    critRate(stat, synergy = 0) {
        const calc = Math.floor(this.calcSub(200, stat) + 50 + synergy * 10) / 1000;
        return calc;
    }
    // f(CRIT) = 1400 + ⌊ 200 × ( CRIT - Level Lv, SUB)/ Level Lv, DIV ⌋
    // =(INT(200*(Crit-420)/2780)+1400)/1000
    critBonus(stat, synergy = 0) {
        const calc = Math.floor(this.calcSub(200, stat) + 400 + synergy * 10) / 1000;
        return calc;
    }
    critExDmg(stat, synergy = 0) {
        const calc = this.critRate(stat, synergy);
        const bonus = this.critBonus(stat, synergy);
        return 1 + calc * bonus;
    }


    // f(DET) = ⌊ 140 × ( DET - Level Lv, MAIN )/ Level Lv, DIV + 1000 ⌋
    // =(1000+INT(140*(Det-440)/2780))/1000
    detExDmg(stat) {
        const calc = (1000 + Math.floor(this.calcMain(140, stat))) / 1000;
        return calc;
    }

    //
    // =(1000+INT(130*(Speed-420)/2780))/1000
    sksExDmg(stat) {
        const calc = (1000 + Math.floor(this.calcSub(130, stat))) / 1000;
        return calc;
    }

    // =(INT(GCD*(1000+CEILING(130*(420-Speed)/2780))/10000)/100)
    sksMod(stat, GCD = 2.50) {
        const calc = Math.floor(GCD*1000*(1000 + Math.ceil(-this.calcSub(130, stat))) / 10000) / 100
        return calc;
    }

    tenExDmg(stat) {
        const calc = (1000 + Math.floor(this.calcSub(112, stat))) / 1000;
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
        var GCDmod = this.sksMod(sum['sks'], GCD);
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

// test();
