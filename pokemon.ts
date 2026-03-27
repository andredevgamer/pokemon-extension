/**
 * Engine base para jogo estilo Pokémon no MakeCode Arcade
 * Foco: versatilidade, sprites, batalha, captura, party e evolução
 */
//% color="#E3350D" weight=95 icon="\uf6d5" block="Pokemon Engine"
//% groups=["Espécies", "Criaturas", "Golpes", "Batalha", "Captura", "Progressão", "Party", "Bolsa", "Sprites", "Leitura", "Outros"]
namespace pokemon {

    // =========================================================
    // ENUMS
    // =========================================================

    //% blockNamespace=pokemon
    export enum PokeType {
        //% block="normal"
        Normal = 0,
        //% block="fogo"
        Fire = 1,
        //% block="água"
        Water = 2,
        //% block="planta"
        Grass = 3,
        //% block="elétrico"
        Electric = 4,
        //% block="gelo"
        Ice = 5,
        //% block="lutador"
        Fighting = 6,
        //% block="veneno"
        Poison = 7,
        //% block="terra"
        Ground = 8,
        //% block="voador"
        Flying = 9,
        //% block="psíquico"
        Psychic = 10,
        //% block="inseto"
        Bug = 11,
        //% block="pedra"
        Rock = 12,
        //% block="fantasma"
        Ghost = 13,
        //% block="dragão"
        Dragon = 14,
        //% block="sombrio"
        Dark = 15,
        //% block="aço"
        Steel = 16,
        //% block="fada"
        Fairy = 17
    }

    //% blockNamespace=pokemon
    export enum MoveCategory {
        //% block="físico"
        Physical = 0,
        //% block="especial"
        Special = 1,
        //% block="status"
        Status = 2
    }

    //% blockNamespace=pokemon
    export enum MoveTarget {
        //% block="oponente"
        Opponent = 0,
        //% block="si mesmo"
        Self = 1
    }

    //% blockNamespace=pokemon
    export enum Ailment {
        //% block="nenhum"
        None = 0,
        //% block="queimadura"
        Burn = 1,
        //% block="veneno"
        Poison = 2,
        //% block="paralisia"
        Paralysis = 3,
        //% block="sono"
        Sleep = 4,
        //% block="congelamento"
        Freeze = 5
    }

    //% blockNamespace=pokemon
    export enum GrowthRate {
        //% block="rápido"
        Fast = 0,
        //% block="médio"
        Medium = 1,
        //% block="lento"
        Slow = 2
    }

    //% blockNamespace=pokemon
    export enum BattleSide {
        //% block="jogador"
        Player = 0,
        //% block="inimigo"
        Enemy = 1
    }

    // =========================================================
    // CLASSES
    // =========================================================

    //% blockNamespace=pokemon
    export class MoveData {
        name: string
        type: PokeType
        category: MoveCategory
        power: number
        accuracy: number
        maxPP: number
        pp: number
        target: MoveTarget
        effectAilment: Ailment
        effectChance: number
        healPercent: number
        recoilPercent: number
        priority: number
        atkStageDelta: number
        defStageDelta: number
        spAtkStageDelta: number
        spDefStageDelta: number
        spdStageDelta: number

        constructor(
            name: string,
            type: PokeType,
            category: MoveCategory,
            power: number,
            accuracy: number,
            pp: number
        ) {
            this.name = name
            this.type = type
            this.category = category
            this.power = power
            this.accuracy = accuracy
            this.maxPP = pp
            this.pp = pp
            this.target = MoveTarget.Opponent
            this.effectAilment = Ailment.None
            this.effectChance = 0
            this.healPercent = 0
            this.recoilPercent = 0
            this.priority = 0
            this.atkStageDelta = 0
            this.defStageDelta = 0
            this.spAtkStageDelta = 0
            this.spDefStageDelta = 0
            this.spdStageDelta = 0
        }
    }

    //% blockNamespace=pokemon
    export class Species {
        dexId: number
        name: string
        type1: PokeType
        type2: PokeType

        baseHP: number
        baseAtk: number
        baseDef: number
        baseSpAtk: number
        baseSpDef: number
        baseSpd: number

        catchRate: number
        expYield: number
        growth: GrowthRate

        evolveLevel: number
        evolvesToDexId: number

        front: Image
        back: Image
        icon: Image

        constructor(
            dexId: number,
            name: string,
            type1: PokeType,
            type2: PokeType,
            baseHP: number,
            baseAtk: number,
            baseDef: number,
            baseSpAtk: number,
            baseSpDef: number,
            baseSpd: number
        ) {
            this.dexId = dexId
            this.name = name
            this.type1 = type1
            this.type2 = type2

            this.baseHP = baseHP
            this.baseAtk = baseAtk
            this.baseDef = baseDef
            this.baseSpAtk = baseSpAtk
            this.baseSpDef = baseSpDef
            this.baseSpd = baseSpd

            this.catchRate = 120
            this.expYield = 50
            this.growth = GrowthRate.Medium

            this.evolveLevel = 0
            this.evolvesToDexId = 0

            this.front = img`
                . . . . . . . . . . . . . . . .
                . . . . . . . 1 1 . . . . . . .
                . . . . . . 1 1 1 1 . . . . . .
                . . . . . 1 1 1 1 1 1 . . . . .
                . . . . 1 1 1 1 1 1 1 1 . . . .
                . . . 1 1 1 1 1 1 1 1 1 1 . . .
                . . . 1 1 1 1 1 1 1 1 1 1 . . .
                . . . 1 1 1 1 1 1 1 1 1 1 . . .
                . . . . 1 1 1 1 1 1 1 1 . . . .
                . . . . . 1 1 1 1 1 1 . . . . .
                . . . . . . 1 1 1 1 . . . . . .
                . . . . . . . 1 1 . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
                . . . . . . . . . . . . . . . .
            `
            this.back = this.front.clone()
            this.icon = img`
                . . . . . . . . 
                . . 1 1 1 1 . . 
                . 1 1 1 1 1 1 . 
                . 1 1 1 1 1 1 . 
                . 1 1 1 1 1 1 . 
                . . 1 1 1 1 . . 
                . . . 1 1 . . . 
                . . . . . . . . 
            `
        }
    }

    //% blockNamespace=pokemon
    export class Monster {
        species: Species
        nickname: string
        level: number
        exp: number

        maxHp: number
        hp: number
        atk: number
        def: number
        spAtk: number
        spDef: number
        spd: number

        ailment: Ailment
        ailmentTurns: number

        moves: MoveData[]

        ivHP: number
        ivAtk: number
        ivDef: number
        ivSpAtk: number
        ivSpDef: number
        ivSpd: number
        atkStage: number
        defStage: number
        spAtkStage: number
        spDefStage: number
        spdStage: number

        constructor(species: Species, level: number) {
            this.species = species
            this.nickname = species.name
            this.level = clamp(level, 1, 100)
            this.exp = expForLevel(this.level, species.growth)

            this.ivHP = randint(0, 15)
            this.ivAtk = randint(0, 15)
            this.ivDef = randint(0, 15)
            this.ivSpAtk = randint(0, 15)
            this.ivSpDef = randint(0, 15)
            this.ivSpd = randint(0, 15)

            this.maxHp = calcHP(species.baseHP, this.ivHP, this.level)
            this.atk = calcStat(species.baseAtk, this.ivAtk, this.level)
            this.def = calcStat(species.baseDef, this.ivDef, this.level)
            this.spAtk = calcStat(species.baseSpAtk, this.ivSpAtk, this.level)
            this.spDef = calcStat(species.baseSpDef, this.ivSpDef, this.level)
            this.spd = calcStat(species.baseSpd, this.ivSpd, this.level)

            this.hp = this.maxHp
            this.ailment = Ailment.None
            this.ailmentTurns = 0
            this.moves = []
            this.atkStage = 0
            this.defStage = 0
            this.spAtkStage = 0
            this.spDefStage = 0
            this.spdStage = 0
        }
    }

    //% blockNamespace=pokemon
    export class Party {
        mons: Monster[]

        constructor() {
            this.mons = []
        }
    }

    //% blockNamespace=pokemon
    export class Bag {
        pokeBalls: number
        greatBalls: number
        ultraBalls: number
        potions: number
        superPotions: number
        hyperPotions: number
        revives: number

        constructor() {
            this.pokeBalls = 5
            this.greatBalls = 0
            this.ultraBalls = 0
            this.potions = 3
            this.superPotions = 0
            this.hyperPotions = 0
            this.revives = 0
        }
    }

    // =========================================================
    // ESTADO INTERNO
    // =========================================================

    let _lastText = ""
    let _speciesDex: Species[] = []

    // =========================================================
    // HELPERS
    // =========================================================

    function clamp(v: number, min: number, max: number): number {
        if (v < min) return min
        if (v > max) return max
        return v
    }

    function alive(mon: Monster): boolean {
        return mon && mon.hp > 0
    }

    function calcHP(base: number, iv: number, level: number): number {
        return Math.max(5, Math.idiv((base * 2 + iv) * level, 100) + level + 10)
    }

    function calcStat(base: number, iv: number, level: number): number {
        return Math.max(5, Math.idiv((base * 2 + iv) * level, 100) + 5)
    }

    function expForLevel(level: number, growth: GrowthRate): number {
        if (growth == GrowthRate.Fast) return level * level * level
        if (growth == GrowthRate.Slow) return Math.idiv(5 * level * level * level, 4)
        return Math.idiv(6 * level * level * level, 5)
    }

    function refreshStats(mon: Monster, keepHpRatio: boolean) {
        let oldMax = mon.maxHp
        let oldHp = mon.hp

        mon.maxHp = calcHP(mon.species.baseHP, mon.ivHP, mon.level)
        mon.atk = calcStat(mon.species.baseAtk, mon.ivAtk, mon.level)
        mon.def = calcStat(mon.species.baseDef, mon.ivDef, mon.level)
        mon.spAtk = calcStat(mon.species.baseSpAtk, mon.ivSpAtk, mon.level)
        mon.spDef = calcStat(mon.species.baseSpDef, mon.ivSpDef, mon.level)
        mon.spd = calcStat(mon.species.baseSpd, mon.ivSpd, mon.level)

        if (keepHpRatio) {
            if (oldMax <= 0) mon.hp = mon.maxHp
            else mon.hp = Math.idiv(oldHp * mon.maxHp, oldMax)
            if (mon.hp < 1 && oldHp > 0) mon.hp = 1
        } else {
            mon.hp = mon.maxHp
        }
    }

    function sameTypeAttackBonus(mon: Monster, move: MoveData): number {
        if (move.type == mon.species.type1 || move.type == mon.species.type2) return 15
        return 10
    }

    function typeEffectSingle(attackType: PokeType, defendType: PokeType): number {
        if (defendType < 0) return 10

        switch (attackType) {
            case PokeType.Normal:
                if (defendType == PokeType.Rock || defendType == PokeType.Steel) return 5
                if (defendType == PokeType.Ghost) return 0
                return 10

            case PokeType.Fire:
                if (defendType == PokeType.Grass || defendType == PokeType.Ice || defendType == PokeType.Bug || defendType == PokeType.Steel) return 20
                if (defendType == PokeType.Fire || defendType == PokeType.Water || defendType == PokeType.Rock || defendType == PokeType.Dragon) return 5
                return 10

            case PokeType.Water:
                if (defendType == PokeType.Fire || defendType == PokeType.Ground || defendType == PokeType.Rock) return 20
                if (defendType == PokeType.Water || defendType == PokeType.Grass || defendType == PokeType.Dragon) return 5
                return 10

            case PokeType.Grass:
                if (defendType == PokeType.Water || defendType == PokeType.Ground || defendType == PokeType.Rock) return 20
                if (defendType == PokeType.Fire || defendType == PokeType.Grass || defendType == PokeType.Poison || defendType == PokeType.Flying || defendType == PokeType.Bug || defendType == PokeType.Dragon || defendType == PokeType.Steel) return 5
                return 10

            case PokeType.Electric:
                if (defendType == PokeType.Water || defendType == PokeType.Flying) return 20
                if (defendType == PokeType.Electric || defendType == PokeType.Grass || defendType == PokeType.Dragon) return 5
                if (defendType == PokeType.Ground) return 0
                return 10

            case PokeType.Ice:
                if (defendType == PokeType.Grass || defendType == PokeType.Ground || defendType == PokeType.Flying || defendType == PokeType.Dragon) return 20
                if (defendType == PokeType.Fire || defendType == PokeType.Water || defendType == PokeType.Ice || defendType == PokeType.Steel) return 5
                return 10

            case PokeType.Fighting:
                if (defendType == PokeType.Normal || defendType == PokeType.Ice || defendType == PokeType.Rock || defendType == PokeType.Dark || defendType == PokeType.Steel) return 20
                if (defendType == PokeType.Poison || defendType == PokeType.Flying || defendType == PokeType.Psychic || defendType == PokeType.Bug || defendType == PokeType.Fairy) return 5
                if (defendType == PokeType.Ghost) return 0
                return 10

            case PokeType.Poison:
                if (defendType == PokeType.Grass || defendType == PokeType.Fairy) return 20
                if (defendType == PokeType.Poison || defendType == PokeType.Ground || defendType == PokeType.Rock || defendType == PokeType.Ghost) return 5
                if (defendType == PokeType.Steel) return 0
                return 10

            case PokeType.Ground:
                if (defendType == PokeType.Fire || defendType == PokeType.Electric || defendType == PokeType.Poison || defendType == PokeType.Rock || defendType == PokeType.Steel) return 20
                if (defendType == PokeType.Grass || defendType == PokeType.Bug) return 5
                if (defendType == PokeType.Flying) return 0
                return 10

            case PokeType.Flying:
                if (defendType == PokeType.Grass || defendType == PokeType.Fighting || defendType == PokeType.Bug) return 20
                if (defendType == PokeType.Electric || defendType == PokeType.Rock || defendType == PokeType.Steel) return 5
                return 10

            case PokeType.Psychic:
                if (defendType == PokeType.Fighting || defendType == PokeType.Poison) return 20
                if (defendType == PokeType.Psychic || defendType == PokeType.Steel) return 5
                if (defendType == PokeType.Dark) return 0
                return 10

            case PokeType.Bug:
                if (defendType == PokeType.Grass || defendType == PokeType.Psychic || defendType == PokeType.Dark) return 20
                if (defendType == PokeType.Fire || defendType == PokeType.Fighting || defendType == PokeType.Poison || defendType == PokeType.Flying || defendType == PokeType.Ghost || defendType == PokeType.Steel || defendType == PokeType.Fairy) return 5
                return 10

            case PokeType.Rock:
                if (defendType == PokeType.Fire || defendType == PokeType.Ice || defendType == PokeType.Flying || defendType == PokeType.Bug) return 20
                if (defendType == PokeType.Fighting || defendType == PokeType.Ground || defendType == PokeType.Steel) return 5
                return 10

            case PokeType.Ghost:
                if (defendType == PokeType.Psychic || defendType == PokeType.Ghost) return 20
                if (defendType == PokeType.Dark) return 5
                if (defendType == PokeType.Normal) return 0
                return 10

            case PokeType.Dragon:
                if (defendType == PokeType.Dragon) return 20
                if (defendType == PokeType.Steel) return 5
                if (defendType == PokeType.Fairy) return 0
                return 10

            case PokeType.Dark:
                if (defendType == PokeType.Psychic || defendType == PokeType.Ghost) return 20
                if (defendType == PokeType.Fighting || defendType == PokeType.Dark || defendType == PokeType.Fairy) return 5
                return 10

            case PokeType.Steel:
                if (defendType == PokeType.Ice || defendType == PokeType.Rock || defendType == PokeType.Fairy) return 20
                if (defendType == PokeType.Fire || defendType == PokeType.Water || defendType == PokeType.Electric || defendType == PokeType.Steel) return 5
                return 10

            case PokeType.Fairy:
                if (defendType == PokeType.Fighting || defendType == PokeType.Dragon || defendType == PokeType.Dark) return 20
                if (defendType == PokeType.Fire || defendType == PokeType.Poison || defendType == PokeType.Steel) return 5
                return 10
        }

        return 10
    }

    function totalTypeEffect(moveType: PokeType, target: Monster): number {
        let e1 = typeEffectSingle(moveType, target.species.type1)
        let e2 = 10
        if (target.species.type2 != target.species.type1) {
            e2 = typeEffectSingle(moveType, target.species.type2)
        }
        return Math.idiv(e1 * e2, 10)
    }

    function accuracyCheck(acc: number): boolean {
        return Math.percentChance(clamp(acc, 1, 100))
    }

    function canAct(mon: Monster): boolean {
        if (!alive(mon)) {
            _lastText = mon.nickname + " está fora de combate."
            return false
        }

        if (mon.ailment == Ailment.Sleep) {
            if (mon.ailmentTurns > 0) {
                mon.ailmentTurns--
                _lastText = mon.nickname + " está dormindo."
                return false
            } else {
                mon.ailment = Ailment.None
            }
        }

        if (mon.ailment == Ailment.Freeze) {
            if (!Math.percentChance(20)) {
                _lastText = mon.nickname + " está congelado."
                return false
            } else {
                mon.ailment = Ailment.None
            }
        }

        if (mon.ailment == Ailment.Paralysis) {
            if (Math.percentChance(25)) {
                _lastText = mon.nickname + " está paralisado."
                return false
            }
        }

        return true
    }

    function tryApplyAilment(target: Monster, ailment: Ailment, chance: number) {
        if (ailment == Ailment.None) return
        if (target.ailment != Ailment.None) return
        if (chance <= 0) return
        if (!Math.percentChance(chance)) return

        target.ailment = ailment
        if (ailment == Ailment.Sleep) target.ailmentTurns = randint(1, 3)
        else target.ailmentTurns = 0
    }

    function applyEndTurnAilment(mon: Monster) {
        if (!alive(mon)) return

        if (mon.ailment == Ailment.Burn) {
            mon.hp -= Math.max(1, Math.idiv(mon.maxHp, 16))
        } else if (mon.ailment == Ailment.Poison) {
            mon.hp -= Math.max(1, Math.idiv(mon.maxHp, 8))
        }

        if (mon.hp < 0) mon.hp = 0
    }

    function ballBonus(ballKind: number): number {
        if (ballKind == 1) return 15
        if (ballKind == 2) return 25
        return 10
    }

    function clampStage(stage: number): number {
        return clamp(stage, -6, 6)
    }

    function stagedStat(stat: number, stage: number): number {
        let clamped = clampStage(stage)
        if (clamped >= 0) return Math.max(1, Math.idiv(stat * (2 + clamped), 2))
        return Math.max(1, Math.idiv(stat * 2, 2 + Math.abs(clamped)))
    }

    function changeBattleStages(mon: Monster, atk: number, def: number, spAtk: number, spDef: number, spd: number) {
        mon.atkStage = clampStage(mon.atkStage + atk)
        mon.defStage = clampStage(mon.defStage + def)
        mon.spAtkStage = clampStage(mon.spAtkStage + spAtk)
        mon.spDefStage = clampStage(mon.spDefStage + spDef)
        mon.spdStage = clampStage(mon.spdStage + spd)
    }

    function moveHasStageEffect(move: MoveData): boolean {
        return move.atkStageDelta != 0 ||
            move.defStageDelta != 0 ||
            move.spAtkStageDelta != 0 ||
            move.spDefStageDelta != 0 ||
            move.spdStageDelta != 0
    }

    function describeStageDelta(statName: string, delta: number): string {
        if (delta == 0) return ""
        if (delta > 0) return statName + " +" + delta
        return statName + " " + delta
    }

    function stageMessage(move: MoveData): string {
        let parts: string[] = []
        let atkText = describeStageDelta("ATK", move.atkStageDelta)
        let defText = describeStageDelta("DEF", move.defStageDelta)
        let spAtkText = describeStageDelta("SATK", move.spAtkStageDelta)
        let spDefText = describeStageDelta("SDEF", move.spDefStageDelta)
        let spdText = describeStageDelta("SPD", move.spdStageDelta)

        if (atkText) parts.push(atkText)
        if (defText) parts.push(defText)
        if (spAtkText) parts.push(spAtkText)
        if (spDefText) parts.push(spDefText)
        if (spdText) parts.push(spdText)

        return parts.join(" ")
    }

    // =========================================================
    // ESPÉCIES
    // =========================================================

    /**
     * Cria uma espécie base
     */
    //% block="criar espécie dex %dexId nome %name tipo1 %type1 tipo2 %type2 hp %baseHP atk %baseAtk def %baseDef satk %baseSpAtk sdef %baseSpDef spd %baseSpd"
    //% group="Espécies"
    export function createSpecies(
        dexId: number,
        name: string,
        type1: PokeType,
        type2: PokeType,
        baseHP: number,
        baseAtk: number,
        baseDef: number,
        baseSpAtk: number,
        baseSpDef: number,
        baseSpd: number
    ): Species {
        return new Species(dexId, name, type1, type2, baseHP, baseAtk, baseDef, baseSpAtk, baseSpDef, baseSpd)
    }

    /**
     * Define imagens da espécie
     */
    //% block="definir imagens de %sp frente %front costas %back ícone %icon"
    //% front.shadow=screen_image_picker
    //% back.shadow=screen_image_picker
    //% icon.shadow=screen_image_picker
    //% group="Espécies"
    export function setSpeciesImages(sp: Species, front: Image, back: Image, icon: Image) {
        sp.front = front
        sp.back = back
        sp.icon = icon
    }

    /**
     * Define captura e experiência
     */
    //% block="definir dados extras de %sp captura %catchRate expBase %expYield crescimento %growth"
    //% group="Espécies"
    export function setSpeciesMeta(sp: Species, catchRate: number, expYield: number, growth: GrowthRate) {
        sp.catchRate = clamp(catchRate, 1, 255)
        sp.expYield = Math.max(1, expYield)
        sp.growth = growth
    }

    /**
     * Define evolução por nível
     */
    //% block="espécie %sp evolui no nível %level para dex %toDexId"
    //% group="Espécies"
    export function setEvolution(sp: Species, level: number, toDexId: number) {
        sp.evolveLevel = clamp(level, 0, 100)
        sp.evolvesToDexId = Math.max(0, toDexId)
    }

    /**
     * Registra espécie na dex da engine
     */
    //% block="registrar espécie %sp"
    //% group="Espécies"
    export function registerSpecies(sp: Species) {
        _speciesDex.push(sp)
    }

    /**
     * Busca espécie pelo dex id
     */
    //% block="espécie por dex %dexId"
    //% group="Espécies"
    export function speciesByDex(dexId: number): Species {
        for (let i = 0; i < _speciesDex.length; i++) {
            if (_speciesDex[i].dexId == dexId) return _speciesDex[i]
        }
        return null
    }

    // =========================================================
    // GOLPES
    // =========================================================

    //% block="criar golpe dano %name tipo %type categoria %category poder %power precisão %accuracy pp %pp"
    //% group="Golpes"
    export function createDamageMove(
        name: string,
        type: PokeType,
        category: MoveCategory,
        power: number,
        accuracy: number,
        pp: number
    ): MoveData {
        return new MoveData(name, type, category, power, accuracy, pp)
    }

    //% block="criar golpe de status %name tipo %type precisão %accuracy pp %pp aplica %ailment chance %chance"
    //% group="Golpes"
    export function createStatusMove(
        name: string,
        type: PokeType,
        accuracy: number,
        pp: number,
        ailment: Ailment,
        chance: number
    ): MoveData {
        let m = new MoveData(name, type, MoveCategory.Status, 0, accuracy, pp)
        m.effectAilment = ailment
        m.effectChance = chance
        return m
    }

    //% block="criar golpe de cura %name tipo %type cura %healPercent precisão %accuracy pp %pp"
    //% group="Golpes"
    export function createHealMove(
        name: string,
        type: PokeType,
        healPercent: number,
        accuracy: number,
        pp: number
    ): MoveData {
        let m = new MoveData(name, type, MoveCategory.Status, 0, accuracy, pp)
        m.target = MoveTarget.Self
        m.healPercent = clamp(healPercent, 1, 100)
        return m
    }

    //% block="definir extra do golpe %move status %ailment chance %chance cura %healPercent recuo %recoilPercent prioridade %priority alvo %target"
    //% group="Golpes"
    export function setMoveExtras(
        move: MoveData,
        ailment: Ailment,
        chance: number,
        healPercent: number,
        recoilPercent: number,
        priority: number,
        target: MoveTarget
    ) {
        move.effectAilment = ailment
        move.effectChance = clamp(chance, 0, 100)
        move.healPercent = clamp(healPercent, 0, 100)
        move.recoilPercent = clamp(recoilPercent, 0, 100)
        move.priority = clamp(priority, -7, 7)
        move.target = target
    }

    //% block="definir mudanÃ§a de status do golpe %move atk %atk def %def satk %spAtk sdef %spDef spd %spd alvo %target"
    //% group="Golpes"
    export function setMoveStatChanges(
        move: MoveData,
        atk: number,
        def: number,
        spAtk: number,
        spDef: number,
        spd: number,
        target: MoveTarget
    ) {
        move.atkStageDelta = clamp(atk, -6, 6)
        move.defStageDelta = clamp(def, -6, 6)
        move.spAtkStageDelta = clamp(spAtk, -6, 6)
        move.spDefStageDelta = clamp(spDef, -6, 6)
        move.spdStageDelta = clamp(spd, -6, 6)
        move.target = target
    }

    // =========================================================
    // CRIATURAS
    // =========================================================

    //% block="criar monstro da espécie %sp no nível %level"
    //% group="Criaturas"
    export function createMonster(sp: Species, level: number): Monster {
        return new Monster(sp, level)
    }

    //% block="definir apelido de %mon para %nickname"
    //% group="Criaturas"
    export function setNickname(mon: Monster, nickname: string) {
        mon.nickname = nickname
    }

    //% block="ensinar golpe %move para %mon"
    //% group="Criaturas"
    export function teachMove(mon: Monster, move: MoveData): boolean {
        if (mon.moves.length >= 4) {
            _lastText = mon.nickname + " já tem 4 golpes."
            return false
        }
        mon.moves.push(move)
        _lastText = mon.nickname + " aprendeu " + move.name + "."
        return true
    }

    //% block="esquecer golpe índice %index de %mon"
    //% group="Criaturas"
    export function forgetMove(mon: Monster, index: number): boolean {
        if (index < 0 || index >= mon.moves.length) return false
        mon.moves.removeAt(index)
        return true
    }

    //% block="curar totalmente %mon"
    //% group="Criaturas"
    export function healFull(mon: Monster) {
        mon.hp = mon.maxHp
        mon.ailment = Ailment.None
        mon.ailmentTurns = 0
        for (let i = 0; i < mon.moves.length; i++) {
            mon.moves[i].pp = mon.moves[i].maxPP
        }
        _lastText = mon.nickname + " foi restaurado."
    }

    //% block="restaurar pp de %mon"
    //% group="Criaturas"
    export function restorePP(mon: Monster) {
        for (let i = 0; i < mon.moves.length; i++) {
            mon.moves[i].pp = mon.moves[i].maxPP
        }
    }

    // =========================================================
    // BATALHA
    // =========================================================

    //% block="efetividade do tipo %attackType contra %defender"
    //% group="Batalha"
    export function typeEffectAgainstMonster(attackType: PokeType, defender: Monster): number {
        return totalTypeEffect(attackType, defender)
    }

    //% block="usar golpe índice %moveIndex de %attacker em %defender"
    //% group="Batalha"
    export function useMove(attacker: Monster, defender: Monster, moveIndex: number): number {
        if (!attacker || !defender) {
            _lastText = "Monstro inválido."
            return 0
        }

        if (moveIndex < 0 || moveIndex >= attacker.moves.length) {
            _lastText = "Golpe inválido."
            return 0
        }

        if (!canAct(attacker)) return 0

        let move = attacker.moves[moveIndex]

        if (move.pp <= 0) {
            _lastText = move.name + " sem PP."
            return 0
        }

        move.pp--

        if (!accuracyCheck(move.accuracy)) {
            _lastText = attacker.nickname + " errou " + move.name + "."
            return 0
        }

        if (move.healPercent > 0 && move.target == MoveTarget.Self) {
            let heal = Math.max(1, Math.idiv(attacker.maxHp * move.healPercent, 100))
            attacker.hp += heal
            if (attacker.hp > attacker.maxHp) attacker.hp = attacker.maxHp
            _lastText = attacker.nickname + " recuperou " + heal + " HP."
            applyEndTurnAilment(attacker)
            return -heal
        }

        if (move.category == MoveCategory.Status && move.power <= 0) {
            let target = move.target == MoveTarget.Self ? attacker : defender
            if (moveHasStageEffect(move)) {
                changeBattleStages(
                    target,
                    move.atkStageDelta,
                    move.defStageDelta,
                    move.spAtkStageDelta,
                    move.spDefStageDelta,
                    move.spdStageDelta
                )
            }
            if (move.target == MoveTarget.Self) {
                _lastText = attacker.nickname + " usou " + move.name + "."
            } else {
                tryApplyAilment(defender, move.effectAilment, move.effectChance)
                _lastText = attacker.nickname + " usou " + move.name + "."
            }
            let stageText = stageMessage(move)
            if (stageText.length > 0) {
                _lastText += " " + stageText + "."
            }
            applyEndTurnAilment(attacker)
            applyEndTurnAilment(defender)
            return 0
        }

        let atkStat = move.category == MoveCategory.Physical ? stagedStat(attacker.atk, attacker.atkStage) : stagedStat(attacker.spAtk, attacker.spAtkStage)
        let defStat = move.category == MoveCategory.Physical ? stagedStat(defender.def, defender.defStage) : stagedStat(defender.spDef, defender.spDefStage)

        if (attacker.ailment == Ailment.Burn && move.category == MoveCategory.Physical) {
            atkStat = Math.max(1, Math.idiv(atkStat, 2))
        }

        let stab = sameTypeAttackBonus(attacker, move)
        let eff = totalTypeEffect(move.type, defender)
        let variance = randint(85, 100)

        let base = Math.idiv((((2 * attacker.level) / 5) + 2) * move.power * Math.max(1, atkStat), Math.max(1, defStat))
        base = Math.idiv(base, 50) + 2

        let dmg = Math.max(1, Math.idiv(base * stab, 10))
        dmg = Math.max(1, Math.idiv(dmg * eff, 10))
        dmg = Math.max(1, Math.idiv(dmg * variance, 100))

        defender.hp -= dmg
        if (defender.hp < 0) defender.hp = 0

        tryApplyAilment(defender, move.effectAilment, move.effectChance)

        if (move.recoilPercent > 0 && alive(attacker)) {
            let recoil = Math.max(1, Math.idiv(dmg * move.recoilPercent, 100))
            attacker.hp -= recoil
            if (attacker.hp < 0) attacker.hp = 0
        }

        _lastText = attacker.nickname + " usou " + move.name + " e causou " + dmg + " de dano."

        if (eff >= 20) _lastText += " Foi super efetivo."
        else if (eff > 0 && eff <= 5) _lastText += " Não foi muito efetivo."
        else if (eff == 0) _lastText += " Não teve efeito."

        applyEndTurnAilment(attacker)
        applyEndTurnAilment(defender)

        if (defender.hp <= 0) _lastText += " " + defender.nickname + " caiu."

        return dmg
    }

    //% block="quem age primeiro entre %a usando %aMove e %b usando %bMove"
    //% group="Batalha"
    export function goesFirst(a: Monster, aMove: number, b: Monster, bMove: number): boolean {
        let aPriority = 0
        let bPriority = 0

        if (aMove >= 0 && aMove < a.moves.length) aPriority = a.moves[aMove].priority
        if (bMove >= 0 && bMove < b.moves.length) bPriority = b.moves[bMove].priority

        if (aPriority != bPriority) return aPriority > bPriority

        let aSpd = a.spd
        let bSpd = b.spd

        aSpd = stagedStat(aSpd, a.spdStage)
        bSpd = stagedStat(bSpd, b.spdStage)

        if (a.ailment == Ailment.Paralysis) aSpd = Math.max(1, Math.idiv(aSpd, 2))
        if (b.ailment == Ailment.Paralysis) bSpd = Math.max(1, Math.idiv(bSpd, 2))

        if (aSpd == bSpd) return Math.percentChance(50)
        return aSpd > bSpd
    }

    //% block="executar turno entre %a golpe %aMove e %b golpe %bMove"
    //% group="Batalha"
    export function runTurn(a: Monster, aMove: number, b: Monster, bMove: number) {
        let aFirst = goesFirst(a, aMove, b, bMove)

        if (aFirst) {
            useMove(a, b, aMove)
            if (alive(b)) useMove(b, a, bMove)
        } else {
            useMove(b, a, bMove)
            if (alive(a)) useMove(a, b, aMove)
        }
    }

    // =========================================================
    // CAPTURA
    // =========================================================

    //% block="criar bolsa"
    //% group="Bolsa"
    export function createBag(): Bag {
        return new Bag()
    }

    //% block="adicionar %amount pokebolas na %bag"
    //% group="Bolsa"
    export function addPokeBalls(bag: Bag, amount: number) {
        bag.pokeBalls += Math.max(0, amount)
    }

    //% block="adicionar %amount great balls na %bag"
    //% group="Bolsa"
    export function addGreatBalls(bag: Bag, amount: number) {
        bag.greatBalls += Math.max(0, amount)
    }

    //% block="adicionar %amount ultra balls na %bag"
    //% group="Bolsa"
    export function addUltraBalls(bag: Bag, amount: number) {
        bag.ultraBalls += Math.max(0, amount)
    }

    //% block="chance de captura de %target com bônus da bola %ballBonusValue"
    //% group="Captura"
    export function captureChance(target: Monster, ballBonusValue: number): number {
        if (target.hp <= 0) return 100

        let maxHp = Math.max(1, target.maxHp)
        let hpFactor = Math.idiv((3 * maxHp - 2 * target.hp) * target.species.catchRate * ballBonusValue, 3 * maxHp)

        let statusBonus = 10
        if (target.ailment == Ailment.Sleep || target.ailment == Ailment.Freeze) statusBonus = 20
        else if (target.ailment != Ailment.None) statusBonus = 15

        let chance = Math.idiv(hpFactor * statusBonus, 15)
        chance = Math.idiv(chance, 2)

        return clamp(chance, 1, 95)
    }

    //% block="tentar capturar %target com bonus %bonus"
    //% group="Captura"
    export function tryCapture(target: Monster, bonus: number): boolean {
        let chance = captureChance(target, bonus)
        let ok = Math.percentChance(chance)
        if (ok) _lastText = target.nickname + " foi capturado."
        else _lastText = target.nickname + " escapou."
        return ok
    }

    //% block="jogar pokebola em %target da %bag"
    //% group="Captura"
    export function throwPokeBall(bag: Bag, target: Monster): boolean {
        if (bag.pokeBalls <= 0) {
            _lastText = "Sem pokebolas."
            return false
        }
        bag.pokeBalls--
        return tryCapture(target, ballBonus(0))
    }

    //% block="jogar great ball em %target da %bag"
    //% group="Captura"
    export function throwGreatBall(bag: Bag, target: Monster): boolean {
        if (bag.greatBalls <= 0) {
            _lastText = "Sem great balls."
            return false
        }
        bag.greatBalls--
        return tryCapture(target, ballBonus(1))
    }

    //% block="jogar ultra ball em %target da %bag"
    //% group="Captura"
    export function throwUltraBall(bag: Bag, target: Monster): boolean {
        if (bag.ultraBalls <= 0) {
            _lastText = "Sem ultra balls."
            return false
        }
        bag.ultraBalls--
        return tryCapture(target, ballBonus(2))
    }

    // =========================================================
    // PROGRESSÃO
    // =========================================================

    //% block="dar %amount exp para %mon"
    //% group="Progressão"
    export function giveExp(mon: Monster, amount: number) {
        mon.exp += Math.max(0, amount)
        _lastText = mon.nickname + " ganhou " + amount + " EXP."
    }

    //% block="exp necessária para próximo nível de %mon"
    //% group="Progressão"
    export function expToNextLevel(mon: Monster): number {
        if (mon.level >= 100) return 0
        return Math.max(0, expForLevel(mon.level + 1, mon.species.growth) - mon.exp)
    }

    //% block="tentar subir nível de %mon"
    //% group="Progressão"
    export function tryLevelUp(mon: Monster): boolean {
        if (mon.level >= 100) return false

        let needed = expForLevel(mon.level + 1, mon.species.growth)
        if (mon.exp < needed) return false

        mon.level++
        refreshStats(mon, false)
        _lastText = mon.nickname + " subiu para o nível " + mon.level + "."
        return true
    }

    //% block="dar exp de vitória de %defeated para %winner"
    //% group="Progressão"
    export function awardBattleExp(winner: Monster, defeated: Monster) {
        let amount = Math.max(1, Math.idiv(defeated.species.expYield * defeated.level, 7))
        giveExp(winner, amount)
    }

    //% block="resetar estado de batalha de %mon"
    //% group="Batalha"
    export function resetBattleState(mon: Monster) {
        if (!mon) return
        mon.atkStage = 0
        mon.defStage = 0
        mon.spAtkStage = 0
        mon.spDefStage = 0
        mon.spdStage = 0
    }

    //% block="pode evoluir %mon"
    //% group="Progressão"
    export function canEvolve(mon: Monster): boolean {
        return mon.species.evolveLevel > 0 &&
            mon.level >= mon.species.evolveLevel &&
            mon.species.evolvesToDexId > 0 &&
            speciesByDex(mon.species.evolvesToDexId) != null
    }

    //% block="evoluir %mon"
    //% group="Progressão"
    export function evolve(mon: Monster): boolean {
        if (!canEvolve(mon)) return false

        let newSpecies = speciesByDex(mon.species.evolvesToDexId)
        if (!newSpecies) return false

        let oldName = mon.nickname
        mon.species = newSpecies
        if (mon.nickname == oldName) mon.nickname = newSpecies.name
        refreshStats(mon, true)

        _lastText = oldName + " evoluiu para " + newSpecies.name + "."
        return true
    }

    // =========================================================
    // PARTY
    // =========================================================

    //% block="criar party"
    //% group="Party"
    export function createParty(): Party {
        return new Party()
    }

    //% block="adicionar %mon à %party"
    //% group="Party"
    export function addToParty(party: Party, mon: Monster): boolean {
        if (party.mons.length >= 6) {
            _lastText = "Party cheia."
            return false
        }
        party.mons.push(mon)
        return true
    }

    //% block="monstro índice %index da %party"
    //% group="Party"
    export function partyMember(party: Party, index: number): Monster {
        if (index < 0 || index >= party.mons.length) return null
        return party.mons[index]
    }

    //% block="líder da %party"
    //% group="Party"
    export function partyLead(party: Party): Monster {
        for (let i = 0; i < party.mons.length; i++) {
            if (party.mons[i].hp > 0) return party.mons[i]
        }
        return null
    }

    //% block="trocar posição %a com %b na %party"
    //% group="Party"
    export function swapParty(party: Party, a: number, b: number) {
        if (a < 0 || a >= party.mons.length) return
        if (b < 0 || b >= party.mons.length) return
        let temp = party.mons[a]
        party.mons[a] = party.mons[b]
        party.mons[b] = temp
    }

    // =========================================================
    // ITENS
    // =========================================================

    //% block="usar poção em %mon da %bag"
    //% group="Bolsa"
    export function usePotion(bag: Bag, mon: Monster): boolean {
        if (bag.potions <= 0) {
            _lastText = "Sem poções."
            return false
        }
        if (mon.hp <= 0) {
            _lastText = "Não pode usar em monstro caído."
            return false
        }
        bag.potions--
        mon.hp += 20
        if (mon.hp > mon.maxHp) mon.hp = mon.maxHp
        _lastText = mon.nickname + " recuperou HP."
        return true
    }

    //% block="usar super poção em %mon da %bag"
    //% group="Bolsa"
    export function useSuperPotion(bag: Bag, mon: Monster): boolean {
        if (bag.superPotions <= 0) return false
        if (mon.hp <= 0) return false
        bag.superPotions--
        mon.hp += 50
        if (mon.hp > mon.maxHp) mon.hp = mon.maxHp
        return true
    }

    //% block="usar hyper poção em %mon da %bag"
    //% group="Bolsa"
    export function useHyperPotion(bag: Bag, mon: Monster): boolean {
        if (bag.hyperPotions <= 0) return false
        if (mon.hp <= 0) return false
        bag.hyperPotions--
        mon.hp += 120
        if (mon.hp > mon.maxHp) mon.hp = mon.maxHp
        return true
    }

    //% block="usar revive em %mon da %bag"
    //% group="Bolsa"
    export function useRevive(bag: Bag, mon: Monster): boolean {
        if (bag.revives <= 0) return false
        if (mon.hp > 0) return false
        bag.revives--
        mon.hp = Math.max(1, Math.idiv(mon.maxHp, 2))
        mon.ailment = Ailment.None
        mon.ailmentTurns = 0
        return true
    }

    // =========================================================
    // SPRITES E ILUSTRAÇÕES
    // =========================================================

    /**
     * Cria sprite de batalha do monstro
     */
    //% block="criar sprite de batalha de %mon lado %side"
    //% group="Sprites"
    export function createBattleSprite(mon: Monster, side: BattleSide): Sprite {
        let imgToUse = side == BattleSide.Player ? mon.species.back : mon.species.front
        let s = sprites.create(imgToUse, SpriteKind.Player)

        if (side == BattleSide.Player) {
            s.setPosition(42, 92)
            s.setScale(1.4, ScaleAnchor.Middle)
        } else {
            s.setPosition(118, 48)
            s.setScale(1.4, ScaleAnchor.Middle)
        }

        return s
    }

    /**
     * Cria sprite de overworld usando o ícone da espécie
     */
    //% block="criar sprite overworld de %mon em x %x y %y"
    //% group="Sprites"
    export function createOverworldSprite(mon: Monster, x: number, y: number): Sprite {
        let s = sprites.create(mon.species.icon, SpriteKind.Player)
        s.setPosition(x, y)
        return s
    }

    /**
     * Troca imagem do sprite para frente ou costas
     */
    //% block="mostrar %mon em sprite %sprite lado %side"
    //% group="Sprites"
    export function applyMonsterImage(mon: Monster, sprite: Sprite, side: BattleSide) {
        if (!sprite || !mon) return
        sprite.setImage(side == BattleSide.Player ? mon.species.back : mon.species.front)
    }

    /**
     * Faz sprite flutuar
     */
    //% block="animar flutuação do sprite %sprite amplitude %amplitude intervalo %interval"
    //% group="Sprites"
    export function animateFloat(sprite: Sprite, amplitude: number, interval: number) {
        if (!sprite) return
        let baseY = sprite.y
        let up = false
        game.onUpdateInterval(Math.max(50, interval), function () {
            if (!sprite) return
            up = !up
            sprite.y = up ? baseY - amplitude : baseY
        })
    }

    // =========================================================
    // LEITURA
    // =========================================================

    //% block="nome de %mon"
    //% group="Leitura"
    export function nameOf(mon: Monster): string {
        return mon.nickname
    }

    //% block="nome da espécie de %mon"
    //% group="Leitura"
    export function speciesNameOf(mon: Monster): string {
        return mon.species.name
    }

    //% block="hp atual de %mon"
    //% group="Leitura"
    export function hp(mon: Monster): number {
        return mon.hp
    }

    //% block="hp máximo de %mon"
    //% group="Leitura"
    export function maxHp(mon: Monster): number {
        return mon.maxHp
    }

    //% block="nível de %mon"
    //% group="Leitura"
    export function level(mon: Monster): number {
        return mon.level
    }

    //% block="%mon está fora de combate"
    //% group="Leitura"
    export function isFainted(mon: Monster): boolean {
        return mon.hp <= 0
    }

    //% block="status de %mon"
    //% group="Leitura"
    export function ailmentOf(mon: Monster): Ailment {
        return mon.ailment
    }

    //% block="nome do golpe índice %index de %mon"
    //% group="Leitura"
    export function moveName(mon: Monster, index: number): string {
        if (index < 0 || index >= mon.moves.length) return ""
        return mon.moves[index].name
    }

    //% block="pp do golpe índice %index de %mon"
    //% group="Leitura"
    export function movePP(mon: Monster, index: number): number {
        if (index < 0 || index >= mon.moves.length) return 0
        return mon.moves[index].pp
    }

    //% block="texto da última ação"
    //% group="Leitura"
    export function lastText(): string {
        return _lastText
    }

    //% block="resumo de %mon"
    //% group="Leitura"
    export function summary(mon: Monster): string {
        return mon.nickname +
            " (" + mon.species.name + ")" +
            " Lv" + mon.level +
            " HP " + mon.hp + "/" + mon.maxHp +
            " ATK " + mon.atk +
            " DEF " + mon.def +
            " SATK " + mon.spAtk +
            " SDEF " + mon.spDef +
            " SPD " + mon.spd
    }

    //% block="nome do tipo %type"
    //% group="Leitura"
    export function typeName(type: PokeType): string {
        switch (type) {
            case PokeType.Normal: return "Normal"
            case PokeType.Fire: return "Fogo"
            case PokeType.Water: return "Agua"
            case PokeType.Grass: return "Planta"
            case PokeType.Electric: return "Eletrico"
            case PokeType.Ice: return "Gelo"
            case PokeType.Fighting: return "Lutador"
            case PokeType.Poison: return "Veneno"
            case PokeType.Ground: return "Terra"
            case PokeType.Flying: return "Voador"
            case PokeType.Psychic: return "Psiquico"
            case PokeType.Bug: return "Inseto"
            case PokeType.Rock: return "Pedra"
            case PokeType.Ghost: return "Fantasma"
            case PokeType.Dragon: return "Dragao"
            case PokeType.Dark: return "Sombrio"
            case PokeType.Steel: return "Aco"
            case PokeType.Fairy: return "Fada"
        }
        return "Desconhecido"
    }

    // =========================================================
    // OUTROS
    // =========================================================

    //% block="encontro aleatório chance %percent \\%"
    //% group="Outros"
    export function randomEncounter(percent: number): boolean {
        return Math.percentChance(clamp(percent, 0, 100))
    }

    //% block="limpar dex registrada"
    //% group="Outros"
    export function clearRegisteredSpecies() {
        _speciesDex = []
    }
}
