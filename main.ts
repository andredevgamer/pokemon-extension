namespace SpriteKind {
    export const Npc = SpriteKind.create()
    export const Decor = SpriteKind.create()
}

enum Mode { Title, World, Battle, Inventory }
enum BattleMenu { Actions, Moves, Bag }
enum OverlayView { Bag, Party, Map }

class Actor {
    sprite: Sprite
    role: string
    name: string
    lines: string[]
    mon: pokemon.Monster
    species: pokemon.Species
}

function tile(c: number): Image {
    let i = image.create(16, 16)
    i.fill(c)
    return i
}

function grass(): Image {
    let i = tile(7)
    for (let x = 1; x < 16; x += 4) i.setPixel(x, 4 + x % 3, 2)
    return i
}

function tallGrass(): Image {
    let i = tile(7)
    for (let x = 1; x < 16; x += 3) {
        i.drawLine(x, 6, x, 15, 2)
        if (x < 15) i.setPixel(x + 1, 9, 2)
    }
    i.drawLine(0, 12, 15, 12, 6)
    return i
}

function path(): Image {
    let i = tile(4)
    for (let x = 0; x < 16; x += 4) i.setPixel(x, 5, 5)
    return i
}

function tree(): Image {
    let i = tile(7)
    i.fillRect(2, 2, 12, 9, 2)
    i.fillRect(6, 11, 4, 5, 6)
    return i
}

function floorHome(): Image {
    let i = tile(1)
    for (let x = 0; x < 16; x += 4) i.drawLine(x, 0, x, 15, 15)
    return i
}

function floorLab(): Image {
    let i = tile(9)
    for (let y = 0; y < 16; y += 4) i.drawLine(0, y, 15, y, 1)
    return i
}

function wall(): Image {
    let i = tile(13)
    i.fillRect(1, 1, 14, 14, 1)
    i.drawRect(0, 0, 16, 16, 15)
    return i
}

function flower(): Image {
    let i = tile(7)
    i.setPixel(5, 5, 12)
    i.setPixel(10, 5, 12)
    i.setPixel(7, 9, 13)
    return i
}

function water(): Image {
    let i = tile(9)
    for (let x = 0; x < 16; x += 4) i.drawLine(x, 0, x + 2, 15, 1)
    return i
}

let grassTile = grass()
let tallGrassTile = tallGrass()
let pathTile = path()
let treeTile = tree()
let homeTile = floorHome()
let labTile = floorLab()
let wallTile = wall()
let flowerTile = flower()
let waterTile = water()

let ashImg = img`
    . . . 1 1 1 . .
    . . 1 2 2 1 1 .
    . . . 1 1 1 . .
    . . 8 8 8 8 8 .
    . . 8 8 1 8 8 .
    . . . 1 1 1 . .
    . . 1 1 . 1 1 .
    . . 1 . . . 1 .
`

let momImg = img`
    . . 5 5 5 5 . .
    . 5 1 1 1 1 5 .
    . . 5 5 5 5 . .
    . 5 d d d d 5 .
    . 5 d 5 5 d 5 .
    . . 5 5 5 5 . .
    . 5 5 . . 5 5 .
    . 5 . . . . 5 .
`

let doctorImg = img`
    . . f f f f . .
    . f 1 1 1 1 f .
    . . f f f f . .
    . 1 1 1 1 1 1 .
    . 1 1 2 2 1 1 .
    . . 1 1 1 1 . .
    . 1 1 . . 1 1 .
    . 1 . . . . 1 .
`

let rivalImg = img`
    . . 4 4 4 4 . .
    . 4 1 1 1 1 4 .
    . . 4 4 4 4 . .
    . 8 8 8 8 8 8 .
    . 8 8 4 4 8 8 .
    . . 4 4 4 4 . .
    . 4 4 . . 4 4 .
    . 4 . . . . 4 .
`

let houseImg = img`
    . 4 4 4 4 4 4 .
    4 1 1 1 1 1 1 4
    4 1 9 9 9 9 1 4
    4 1 9 5 5 9 1 4
    4 1 9 5 5 9 1 4
    4 1 9 9 9 9 1 4
    4 1 1 1 1 1 1 4
    4 4 4 4 4 4 4 4
`

let labImg = img`
    . c c c c c c .
    c 1 1 1 1 1 1 c
    c 1 9 9 9 9 1 c
    c 1 9 5 5 9 1 c
    c 1 9 5 5 9 1 c
    c 1 9 9 9 9 1 c
    c 1 1 1 1 1 1 c
    c c c c c c c c
`

let bedImg = img`
    b b b b b b b b
    b c c c c c c b
    b c c c c c c b
    b 8 8 8 8 8 8 b
    b 8 8 8 8 8 8 b
    b 8 8 8 8 8 8 b
    b b b b b b b b
    . . . . . . . .
`

let pcImg = img`
    . 1 1 1 1 1 1 .
    1 9 9 9 9 9 9 1
    1 9 5 5 5 5 9 1
    1 9 5 1 1 5 9 1
    1 9 5 5 5 5 9 1
    1 9 9 9 9 9 9 1
    . 1 1 1 1 1 1 .
    . . 1 1 1 1 . .
`

let stairImg = img`
    1 1 1 1 1 1 1 1
    1 7 7 7 7 7 7 1
    1 7 7 7 7 7 7 1
    1 7 7 7 7 7 7 1
    1 7 7 7 7 7 7 1
    1 7 7 7 7 7 7 1
    1 1 1 1 1 1 1 1
    . . . . . . . .
`

let titleCharizard = img`
    . . 7 7 7 7 . .
    . 7 6 6 6 6 7 .
    . 7 6 f 6 6 7 .
    . . 7 7 7 7 . .
    . 7 7 . . 7 7 .
    7 7 . . . . 7 7
    . 7 . . . . 7 .
    . . 7 7 7 7 . .
`

let charmander = pokemon.createSpecies(4, "Charmander", pokemon.PokeType.Fire, pokemon.PokeType.Fire, 39, 52, 43, 60, 50, 65)
let bulbasaur = pokemon.createSpecies(1, "Bulbasaur", pokemon.PokeType.Grass, pokemon.PokeType.Poison, 45, 49, 49, 65, 65, 45)
let squirtle = pokemon.createSpecies(7, "Squirtle", pokemon.PokeType.Water, pokemon.PokeType.Water, 44, 48, 65, 50, 64, 43)
let pidgey = pokemon.createSpecies(16, "Pidgey", pokemon.PokeType.Normal, pokemon.PokeType.Flying, 40, 45, 40, 35, 35, 56)
let rattata = pokemon.createSpecies(19, "Rattata", pokemon.PokeType.Normal, pokemon.PokeType.Normal, 30, 56, 35, 25, 35, 72)
pokemon.registerSpecies(charmander)
pokemon.registerSpecies(bulbasaur)
pokemon.registerSpecies(squirtle)
pokemon.registerSpecies(pidgey)
pokemon.registerSpecies(rattata)
pokemon.setSpeciesImages(charmander, img`
    . 7 7 7 7 . . .
    7 6 6 6 6 7 . .
    7 6 f 6 6 7 . .
    . 7 7 7 7 . . .
    . . 7 . . . . .
    . . . . . . . .
    . . . . . . . .
    . . . . . . . .
`, img`
    . 7 7 7 7 . . .
    7 6 6 6 6 7 . .
    7 6 6 f 6 7 . .
    . 7 7 7 7 . . .
    . . 7 . . . . .
    . . . . . . . .
    . . . . . . . .
    . . . . . . . .
`, img`
    . 7 7 7 . . . .
    7 6 f 6 7 . . .
    . 7 7 7 . . . .
    . . 7 . . . . .
    . . . . . . . .
    . . . . . . . .
    . . . . . . . .
    . . . . . . . .
`)
pokemon.setSpeciesImages(bulbasaur, img`
    . 2 2 2 . . . .
    2 2 3 2 2 . . .
    2 f 2 2 2 . . .
    . 3 3 3 . . . .
    . . 3 . . . . .
    . . . . . . . .
    . . . . . . . .
    . . . . . . . .
`, img`
    . 2 2 2 . . . .
    2 2 3 2 2 . . .
    2 2 f 2 2 . . .
    . 3 3 3 . . . .
    . . 3 . . . . .
    . . . . . . . .
    . . . . . . . .
    . . . . . . . .
`, img`
    . 2 2 2 . . . .
    2 f 2 2 2 . . .
    . 3 3 3 . . . .
    . . 3 . . . . .
    . . . . . . . .
    . . . . . . . .
    . . . . . . . .
    . . . . . . . .
`)
pokemon.setSpeciesImages(squirtle, img`
    . 1 1 1 . . . .
    1 9 9 9 1 . . .
    1 9 f 9 1 . . .
    . 1 1 1 . . . .
    . . 1 . . . . .
    . . . . . . . .
    . . . . . . . .
    . . . . . . . .
`, img`
    . 1 1 1 . . . .
    1 9 9 9 1 . . .
    1 9 9 f 1 . . .
    . 1 1 1 . . . .
    . . 1 . . . . .
    . . . . . . . .
    . . . . . . . .
    . . . . . . . .
`, img`
    . 1 1 1 . . . .
    1 9 f 9 1 . . .
    . 1 1 1 . . . .
    . . 1 . . . . .
    . . . . . . . .
    . . . . . . . .
    . . . . . . . .
    . . . . . . . .
`)
pokemon.setSpeciesImages(pidgey, img`
    . . . 1 1 . . .
    . . 1 1 1 1 . .
    . 1 1 f 1 1 1 .
    . . 1 1 1 1 . .
    . . . 1 1 . . .
    . . . . 1 . . .
    . . . . . . . .
    . . . . . . . .
`, img`
    . . . 1 1 . . .
    . . 1 1 1 1 . .
    . 1 1 1 f 1 1 .
    . . 1 1 1 1 . .
    . . . 1 1 . . .
    . . . . 1 . . .
    . . . . . . . .
    . . . . . . . .
`, img`
    . . 1 1 1 . . .
    . 1 1 f 1 1 . .
    . . 1 1 1 . . .
    . . . 1 . . . .
    . . . . . . . .
    . . . . . . . .
    . . . . . . . .
    . . . . . . . .
`)
pokemon.setSpeciesImages(rattata, img`
    . . 5 5 5 . . .
    . 5 5 f 5 5 . .
    . 5 5 5 5 5 . .
    . . 5 5 5 . . .
    . . . 5 . . . .
    . . . . . . . .
    . . . . . . . .
    . . . . . . . .
`, img`
    . . 5 5 5 . . .
    . 5 5 5 f 5 . .
    . 5 5 5 5 5 . .
    . . 5 5 5 . . .
    . . . 5 . . . .
    . . . . . . . .
    . . . . . . . .
    . . . . . . . .
`, img`
    . . 5 5 5 . . .
    . 5 5 f 5 5 . .
    . . 5 5 5 . . .
    . . . 5 . . . .
    . . . . . . . .
    . . . . . . . .
    . . . . . . . .
    . . . . . . . .
`)
pokemon.setSpeciesMeta(pidgey, 255, 50, pokemon.GrowthRate.Medium)
pokemon.setSpeciesMeta(rattata, 255, 51, pokemon.GrowthRate.Fast)

let scratch = pokemon.createDamageMove("Scratch", pokemon.PokeType.Normal, pokemon.MoveCategory.Physical, 40, 100, 35)
let growl = pokemon.createStatusMove("Growl", pokemon.PokeType.Normal, 100, 40, pokemon.Ailment.None, 0)
pokemon.setMoveStatChanges(growl, -1, 0, 0, 0, 0, pokemon.MoveTarget.Opponent)
let ember = pokemon.createDamageMove("Ember", pokemon.PokeType.Fire, pokemon.MoveCategory.Special, 40, 100, 25)
let dragonClaw = pokemon.createDamageMove("Dragon Claw", pokemon.PokeType.Dragon, pokemon.MoveCategory.Physical, 80, 100, 15)
let tackle = pokemon.createDamageMove("Tackle", pokemon.PokeType.Normal, pokemon.MoveCategory.Physical, 40, 100, 35)
let vineWhip = pokemon.createDamageMove("Vine Whip", pokemon.PokeType.Grass, pokemon.MoveCategory.Physical, 45, 100, 25)
let waterGun = pokemon.createDamageMove("Water Gun", pokemon.PokeType.Water, pokemon.MoveCategory.Special, 40, 100, 25)

let bag = pokemon.createBag()
pokemon.addPokeBalls(bag, 10)
bag.potions = 2
let party = pokemon.createParty()

let pokeballIcon = img`
    . . 2 2 2 2 . .
    . 2 2 2 2 2 2 .
    2 2 2 2 2 2 2 2
    2 2 2 1 1 2 2 2
    f f f 1 1 f f f
    . f f f f f f .
    . . f f f f . .
    . . . . . . . .
`
let potionIcon = img`
    . . . 1 1 . . .
    . . 1 1 1 1 . .
    . . 1 5 5 1 . .
    . 1 1 5 5 1 1 .
    . 1 2 2 2 2 1 .
    . 1 2 2 2 2 1 .
    . . 1 2 2 1 . .
    . . . 1 1 . . .
`
let mapIcon = img`
    . 1 1 1 1 1 1 .
    1 5 5 5 5 5 5 1
    1 5 9 9 9 9 5 1
    1 5 9 2 2 9 5 1
    1 5 9 2 2 9 5 1
    1 5 9 9 9 9 5 1
    1 5 5 5 5 5 5 1
    . 1 1 1 1 1 1 .
`
let bagBallItem = AdvancedSlots.createItem("Pokebola", pokeballIcon, 99, "ball")
let bagPotionItem = AdvancedSlots.createItem("Pocao", potionIcon, 99, "heal")
let bagMapItem = AdvancedSlots.createItem("Map", mapIcon, 1, "map")
let bagInventory = AdvancedSlots.createInventory(6)

let playerName = "Red"
let rivalName = "Blue"
let mode = Mode.Title
let currentMap = "title"
let currentArea = "Pokemon X"
let storyId = "story"
let actors: Actor[] = []
let mapSprites: Sprite[] = []
let battleEnemy: pokemon.Monster = null
let battleLabel = ""
let battleMenu = BattleMenu.Actions
let playerBattleSprite: Sprite = null
let enemyBattleSprite: Sprite = null

let player = sprites.create(ashImg, SpriteKind.Player)
player.z = 10
performanceHelper.trackSprite(player)

let hud = image.create(160, 18)
let hudSprite = worldTools.createUi(hud, 80, 9, 100)
let battleLayer = image.create(160, 120)
let battleLayerSprite = worldTools.createUi(battleLayer, 80, 60, 100)
let inventoryLayer = image.create(160, 120)
let inventoryLayerSprite = worldTools.createUi(inventoryLayer, 80, 60, 105)
let battleDialog = pokemonUI.createDialog(pokemonUI.Theme.Dark)
let battleMenuUi = pokemonUI.createMenu(pokemonUI.Theme.Dark)
performanceHelper.trackSprite(battleDialog)
performanceHelper.trackSprite(battleMenuUi)
pokemonUI.setTitle(battleDialog, "")
pokemonUI.setTitle(battleMenuUi, "ACOES")
pokemonUI.setPosition(battleDialog, 4, 72)
pokemonUI.setPosition(battleMenuUi, 92, 68)
pokemonUI.setVisible(battleDialog, false)
pokemonUI.setVisible(battleMenuUi, false)
inventoryLayerSprite.setFlag(SpriteFlag.Invisible, true)

let titleSprite: Sprite = null
let titlePrompt: Sprite = null
let skipDebugEnabled = true
let titleSelection = 0
let overlayView = OverlayView.Bag
let partyInventory = AdvancedSlots.createInventory(6)
let partyDetailOpen = false
let partyDetailTab = 0
let overlayCloseSelected = false
let wildBattle = false
let encounterCooldown = 0
let lastStepX = -1
let lastStepY = -1
let mapSelection = 0

function disposeSprite(sprite: Sprite): Sprite {
    if (sprite) basicBehaviors.destroySprite(sprite)
    return null
}

function story(): number { return WorldEvents.getQuestStage(storyId) }
function setStory(n: number) { WorldEvents.setQuestStage(storyId, n) }
function px(t: number): number { return t * 16 + 8 }
function lead(): pokemon.Monster { return pokemon.partyLead(party) }

function blank(w: number, h: number, fill: number): number[][] {
    let a: number[][] = []
    for (let y = 0; y < h; y++) {
        a[y] = []
        for (let x = 0; x < w; x++) a[y][x] = fill
    }
    return a
}

function box(a: number[][], t: number) {
    let w = a[0].length
    let h = a.length
    for (let x = 0; x < w; x++) a[0][x] = a[h - 1][x] = t
    for (let y = 0; y < h; y++) a[y][0] = a[y][w - 1] = t
}

function rect(a: number[][], x: number, y: number, w: number, h: number, t: number) {
    for (let yy = y; yy < y + h; yy++) for (let xx = x; xx < x + w; xx++) a[yy][xx] = t
}

function mapFrom(a: number[][]): tiles.TileMapData {
    let h = a.length
    let w = a[0].length
    let data = control.createBuffer(4 + w * h)
    data.setNumber(NumberFormat.UInt16LE, 0, w)
    data.setNumber(NumberFormat.UInt16LE, 2, h)
    let o = 4
    for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
        data.setUint8(o, a[y][x])
        o++
    }
    return tiles.createTilemap(data, image.create(w, h), [grassTile, pathTile, treeTile, homeTile, labTile, wallTile, flowerTile, waterTile, tallGrassTile], TileScale.Sixteen)
}

function applyWalls() {
    for (let l of tiles.getTilesByType(treeTile)) tiles.setWallAt(l, true)
    for (let l2 of tiles.getTilesByType(wallTile)) tiles.setWallAt(l2, true)
    for (let l3 of tiles.getTilesByType(waterTile)) tiles.setWallAt(l3, true)
}

function clearWorld() {
    basicBehaviors.destroyAll(mapSprites)
    actors = []
    WorldEvents.clearAllTriggers()
    stateCache.clearKey("hud_area")
    stateCache.clearKey("hud_balls")
    lastStepX = -1
    lastStepY = -1
}

function addDecor(img: Image, x: number, y: number, scale = 1): Sprite {
    let s = worldTools.createDecor(img, x, y, 3)
    if (scale != 1) s.setScale(scale, ScaleAnchor.Middle)
    mapSprites.push(s)
    return s
}

function addNpc(role: string, name: string, x: number, y: number, img: Image, lines: string[]): Actor {
    let s = worldTools.createNpc(img, x, y, 6)
    mapSprites.push(s)
    let a = new Actor()
    a.sprite = s
    a.role = role
    a.name = name
    a.lines = lines
    actors.push(a)
    return a
}

function addStarter(sp: pokemon.Species, x: number, y: number) {
    let m = pokemon.createMonster(sp, 5)
    let s = pokemon.createOverworldSprite(m, x, y)
    s.setFlag(SpriteFlag.Ghost, true)
    s.z = 6
    performanceHelper.trackSprite(s)
    pokemon.animateFloat(s, 1, 240)
    mapSprites.push(s)
    let a = new Actor()
    a.sprite = s
    a.role = "starter"
    a.name = sp.name
    a.lines = [sp.name, "Tipo " + pokemon.typeName(sp.type1), "Nivel 5"]
    a.species = sp
    actors.push(a)
}

function nearestActor(): Actor {
    let best: Actor = null
    let bestD = 24
    for (let a of actors) {
        let d = worldTools.distance(player, a.sprite)
        if (d <= bestD) {
            best = a
            bestD = d
        }
    }
    return best
}

function teachStarter(mon: pokemon.Monster) {
    if (mon.species == charmander) {
        pokemon.teachMove(mon, scratch)
        pokemon.teachMove(mon, growl)
        pokemon.teachMove(mon, ember)
        pokemon.teachMove(mon, dragonClaw)
    } else if (mon.species == bulbasaur) {
        pokemon.teachMove(mon, tackle)
        pokemon.teachMove(mon, growl)
        pokemon.teachMove(mon, vineWhip)
    } else {
        pokemon.teachMove(mon, tackle)
        pokemon.teachMove(mon, growl)
        pokemon.teachMove(mon, waterGun)
    }
}

function teachEarlyTrainer(mon: pokemon.Monster) {
    pokemon.teachMove(mon, tackle)
    pokemon.teachMove(mon, growl)
}

function trainerAiTier(): number {
    if (story() < 4) return 0
    if (story() < 10) return 1
    return 2
}

function chooseEnemyMove(mon: pokemon.Monster, target: pokemon.Monster): number {
    if (!mon || mon.moves.length == 0) return 0
    let tier = trainerAiTier()
    if (tier <= 0) {
        if (mon.moves.length > 1 && target && target.atkStage >= 1 && Math.percentChance(15)) return 1
        return 0
    }
    if (tier == 1) {
        if (mon.moves.length > 1 && target && target.atkStage >= 1 && Math.percentChance(20)) return 1
        return 0
    }
    let bestIndex = 0
    let bestScore = -9999
    for (let i = 0; i < mon.moves.length; i++) {
        let move = mon.moves[i]
        if (!move || move.pp <= 0) continue
        let score = move.power
        if (move.category == pokemon.MoveCategory.Status) {
            if (target && target.atkStage >= 0) score = 18
            else score = 2
        }
        if (score > bestScore) {
            bestScore = score
            bestIndex = i
        }
    }
    return bestIndex
}

function teachWild(mon: pokemon.Monster) {
    if (mon.species == pidgey) {
        pokemon.teachMove(mon, tackle)
        pokemon.teachMove(mon, growl)
    } else if (mon.species == rattata) {
        pokemon.teachMove(mon, tackle)
        pokemon.teachMove(mon, growl)
    }
}

function wildEncounter(): pokemon.Monster {
    let species = Math.percentChance(55) ? pidgey : rattata
    let mon = pokemon.createMonster(species, randint(2, 4))
    teachWild(mon)
    return mon
}

function tryRouteEncounter() {
    if (mode != Mode.World || currentMap != "route1" || story() < 4) return
    if (encounterCooldown > 0) return
    let loc = player.tilemapLocation()
    if (!loc) return
    let tx = Math.idiv(player.x, 16)
    let ty = Math.idiv(player.y, 16)
    if (tx == lastStepX && ty == lastStepY) return
    lastStepX = tx
    lastStepY = ty
    if (!tiles.tileAtLocationEquals(loc, tallGrassTile)) return
    if (!Math.percentChance(18)) return
    encounterCooldown = 12
    wildBattle = true
    let mon = wildEncounter()
    startBattle(mon, mon.species.name)
}

function counter(sp: pokemon.Species): pokemon.Species {
    if (sp == charmander) return squirtle
    if (sp == squirtle) return bulbasaur
    return charmander
}

function ensurePlayerStarter(): pokemon.Monster {
    let mon = lead()
    if (mon) return mon
    let fallback = pokemon.createMonster(charmander, 5)
    teachStarter(fallback)
    pokemon.setNickname(fallback, "Charmander")
    pokemon.addToParty(party, fallback)
    return fallback
}

function setupRivalForDebug() {
    let rivalMon = pokemon.createMonster(counter(ensurePlayerStarter().species), 4)
    teachEarlyTrainer(rivalMon)
    rivalMon.hp = Math.max(1, rivalMon.hp - 2)
    for (let a of actors) {
        if (a.role == "rival") a.mon = rivalMon
    }
}

function openSkipMenu() {
    if (!skipDebugEnabled) return
    game.showLongText(
        "DEBUG SKIP\n1 Titulo\n2 Quarto\n3 Casa\n4 Pallet\n5 Laboratorio\n6 Batalha Rival\n7 Vencer batalha\n8 Perder batalha",
        DialogLayout.Full
    )
    let code = game.askForString("Skip?")
    if (code == "1") {
        setStory(0)
        showTitle()
    } else if (code == "2") {
        setStory(0)
        bedroom(false)
    } else if (code == "3") {
        setStory(1)
        downstairs(false)
    } else if (code == "4") {
        setStory(1)
        town("home")
    } else if (code == "5") {
        setStory(2)
        lab("entry")
    } else if (code == "6") {
        setStory(3)
        lab("entry")
        setupRivalForDebug()
        for (let a of actors) {
            if (a.role == "rival" && a.mon) {
                startBattle(a.mon, rivalName)
                break
            }
        }
    } else if (code == "7" && mode == Mode.Battle) {
        if (battleEnemy) battleEnemy.hp = 0
        endBattle(true)
    } else if (code == "8" && mode == Mode.Battle) {
        if (lead()) lead().hp = 0
        endBattle(false)
    }
}

function openPauseMenu() {
    game.showLongText("MENU\n1 Bolsa\n2 Skip", DialogLayout.Bottom)
    let code = game.askForString("Opcao?")
    if (code == "2") openSkipMenu()
    else openInventory()
}

function titleMenuImage(): Image {
    let img = image.create(98, 34)
    img.fill(1)
    img.drawRect(0, 0, 98, 34, 15)
    let options = ["NOVO JOGO", "IR P/ BATALHA", "POS BATALHA"]
    for (let i = 0; i < options.length; i++) {
        let y = 4 + i * 10
        if (i == titleSelection) {
            img.fillRect(3, y - 1, 92, 9, 10)
            img.print(">", 6, y, 1, image.font5)
            img.print(options[i], 14, y, 1, image.font5)
        } else {
            img.print(options[i], 14, y, 15, image.font5)
        }
    }
    return img
}

function refreshTitleMenu() {
    if (mode != Mode.Title || !titlePrompt) return
    titlePrompt.setImage(titleMenuImage())
    titlePrompt.setPosition(80, 100)
}

function quickStartBattle() {
    titleSprite = disposeSprite(titleSprite)
    titlePrompt = disposeSprite(titlePrompt)
    player.setFlag(SpriteFlag.Invisible, false)
    playerName = "Red"
    rivalName = "Blue"
    setStory(3)
    WorldEvents.setFlag("lab_intro", true)
    lab("entry")
    ensurePlayerStarter()
    setupRivalForDebug()
    for (let a of actors) {
        if (a.role == "rival" && a.mon) {
            startBattle(a.mon, rivalName)
            break
        }
    }
}

function quickStartAfterBattle() {
    titleSprite = disposeSprite(titleSprite)
    titlePrompt = disposeSprite(titlePrompt)
    player.setFlag(SpriteFlag.Invisible, false)
    playerName = "Red"
    rivalName = "Blue"
    let mon = ensurePlayerStarter()
    while (mon.level < 6) {
        pokemon.giveExp(mon, pokemon.expToNextLevel(mon))
        if (!pokemon.tryLevelUp(mon)) break
    }
    pokemon.healFull(mon)
    setStory(4)
    WorldEvents.setFlag("town_intro", true)
    WorldEvents.setFlag("lab_intro", true)
    town("lab")
}

function inventoryText(): string {
    return "Inventario\nPokebolas: " + bag.pokeBalls + "\nPocoes: " + bag.potions + "\n\nPokemon\n" + (lead() ? pokemon.summary(lead()) : "Nenhum")
}

function syncBagInventory() {
    bagInventory.clear()
    bagInventory.add(bagMapItem, 1)
    if (bag.pokeBalls > 0) bagInventory.add(bagBallItem, bag.pokeBalls)
    if (bag.potions > 0) bagInventory.add(bagPotionItem, bag.potions)
}

function shortLabel(name: string, max = 8): string {
    if (!name) return ""
    if (name.length <= max) return name
    return name.substr(0, max - 1)
}

function syncPartyInventory() {
    partyInventory.clear()
    for (let i = 0; i < 6; i++) {
        if (i >= party.mons.length) continue
        let mon = party.mons[i]
        let icon = mon.species && mon.species.icon ? mon.species.icon : img`
            . . . . . . . .
            . 1 1 1 1 1 1 .
            . 1 . . . . 1 .
            . 1 . 1 1 . 1 .
            . 1 . 1 1 . 1 .
            . 1 . . . . 1 .
            . 1 1 1 1 1 1 .
            . . . . . . . .
        `
        let viewItem = AdvancedSlots.createItem(shortLabel(pokemon.nameOf(mon)), icon, 1, "party")
        partyInventory.set(i, viewItem, 1)
    }
}

function itemDescription(slot: AdvancedSlots.Slot): string[] {
    if (!slot || slot.isEmpty()) return ["Slot vazio", "Selecione um item", "para ver detalhes."]
    if (slot.item.id == "Map") return ["Mapa do mundo", "Mostra rotas e", "teleporta."]
    if (slot.item.id == "Pokebola") return ["Capsula classica", "Usada para capturar", "pokemon selvagens."]
    if (slot.item.id == "Pocao") return ["Recupera HP", "Cura 20 pontos", "fora da batalha."]
    return ["Item comum", "Sem descricao", "detalhada."]
}

function itemTypeLabel(slot: AdvancedSlots.Slot): string {
    if (!slot || slot.isEmpty()) return "Vazio"
    if (slot.item.type == "map") return "Mapa"
    if (slot.item.type == "ball") return "Poke Ball"
    if (slot.item.type == "heal") return "Cura"
    return "Item"
}

function itemPanelColor(slot: AdvancedSlots.Slot): number {
    if (!slot || slot.isEmpty()) return 13
    if (slot.item.type == "map") return 9
    if (slot.item.type == "ball") return 2
    if (slot.item.type == "heal") return 8
    return 9
}

function bagStatCard(target: Image, x: number, y: number, w: number, label: string, value: string, fill: number) {
    target.fillRect(x, y, w, 12, fill)
    target.drawRect(x, y, w, 12, 15)
    target.print(label, x + 4, y + 3, 1, image.font5)
    target.print(value, x + w - 18, y + 3, 15, image.font5)
}

function drawCloseBadge(target: Image, x: number, y: number) {
    target.fillRect(x, y, 12, 12, overlayCloseSelected ? 10 : 2)
    target.drawRect(x, y, 12, 12, 15)
    target.print("X", x + 4, y + 3, 15, image.font5)
}

function inventoryTab(target: Image, x: number, y: number, label: string, active: boolean, fill: number) {
    target.fillRect(x, y, 26, 10, active ? fill : 15)
    target.drawRect(x, y, 26, 10, active ? 1 : 13)
    target.print(label, x + 4, y + 3, active ? 1 : 13, image.font5)
}

function drawItemPreview(target: Image, slot: AdvancedSlots.Slot, x: number, y: number) {
    let accent = itemPanelColor(slot)
    target.fillRect(x, y, 58, 56, 15)
    target.drawRect(x, y, 58, 56, 13)
    target.drawRect(x + 1, y + 1, 56, 54, 1)
    target.fillRect(x + 3, y + 3, 52, 10, accent)
    target.print("DETALHES", x + 11, y + 6, 1, image.font5)
    if (!slot || slot.isEmpty()) {
        target.print("Selecione", x + 10, y + 22, 1, image.font5)
        target.print("um item", x + 15, y + 30, 1, image.font5)
        return
    }
    target.fillRect(x + 18, y + 16, 22, 22, 1)
    target.drawRect(x + 18, y + 16, 22, 22, accent)
    target.drawTransparentImage(slot.item.icon, x + 25, y + 23)
    target.print(slot.item.id, x + 6, y + 41, 1, image.font5)
    target.fillRect(x + 5, y + 48, 22, 6, accent)
    target.print("x" + slot.amount, x + 9, y + 49, 1, image.font5)
    target.print(itemTypeLabel(slot), x + 30, y + 49, 1, image.font5)
}

function typeLabel(mon: pokemon.Monster): string {
    if (!mon) return "-"
    if (mon.species.type1 == mon.species.type2) return pokemon.typeName(mon.species.type1)
    return pokemon.typeName(mon.species.type1) + "/" + pokemon.typeName(mon.species.type2)
}

function moveCategoryLabel(move: pokemon.MoveData): string {
    if (move.category == pokemon.MoveCategory.Physical) return "Fisico"
    if (move.category == pokemon.MoveCategory.Special) return "Especial"
    return "Status"
}

function drawPartyTabs(target: Image, x: number, y: number) {
    let tabs = ["INFO", "STAT", "MOVE"]
    for (let i = 0; i < tabs.length; i++) {
        inventoryTab(target, x + i * 28, y, tabs[i], partyDetailTab == i, partyDetailTab == i ? 10 : 8)
    }
}

function drawPartyDetail(target: Image, mon: pokemon.Monster) {
    target.fillRect(4, 4, 152, 112, 15)
    target.drawRect(4, 4, 152, 112, 1)
    target.drawRect(6, 6, 148, 108, 13)
    target.fillRect(8, 8, 144, 16, 10)
    target.fillRect(10, 10, 54, 12, 1)
    target.print("DETALHES", 16, 14, 15, image.font5)
    drawCloseBadge(target, 140, 10)
    drawPartyTabs(target, 12, 30)
    if (!mon) {
        target.print("Sem pokemon", 54, 60, 1, image.font5)
        return
    }
    if (partyDetailTab == 0) {
        if (mon.species && mon.species.icon) {
            target.fillRect(18, 48, 34, 34, 1)
            target.drawRect(18, 48, 34, 34, 13)
            target.drawTransparentImage(mon.species.icon, 31, 61)
        }
        target.print("Nome " + pokemon.nameOf(mon), 64, 48, 1, image.font5)
        target.print("Especie " + mon.species.name, 64, 60, 13, image.font5)
        target.print("Nivel " + mon.level, 64, 72, 10, image.font5)
        target.print("Tipo " + typeLabel(mon), 64, 84, 1, image.font5)
        target.print("HP " + mon.hp + "/" + mon.maxHp, 64, 96, 1, image.font5)
        hpBar(target, 64, 106, 74, mon.hp, mon.maxHp)
    } else if (partyDetailTab == 1) {
        target.fillRect(16, 46, 124, 56, 12)
        target.drawRect(16, 46, 124, 56, 13)
        target.print("HP   " + mon.hp + "/" + mon.maxHp, 24, 54, 1, image.font5)
        target.print("ATK  " + mon.atk, 24, 64, 1, image.font5)
        target.print("DEF  " + mon.def, 24, 74, 1, image.font5)
        target.print("SATK " + mon.spAtk, 24, 84, 1, image.font5)
        target.print("SDEF " + mon.spDef, 24, 94, 1, image.font5)
        target.print("SPD  " + mon.spd, 24, 104, 1, image.font5)
    } else {
        for (let i = 0; i < 4; i++) {
            let move = i < mon.moves.length ? mon.moves[i] : null
            let yy = 44 + i * 16
            target.fillRect(12, yy, 136, 14, move ? 15 : 12)
            target.drawRect(12, yy, 136, 14, 13)
            if (!move) {
                target.print("-", 77, yy + 4, 13, image.font5)
            } else {
                let powerText = move.category == pokemon.MoveCategory.Status ? "--" : "" + move.power
                target.print(shortLabel(move.name, 10), 16, yy + 2, 1, image.font5)
                target.print(shortLabel(pokemon.typeName(move.type), 7), 16, yy + 8, 13, image.font5)
                target.print(moveCategoryLabel(move), 62, yy + 2, 10, image.font5)
                target.print("PP " + move.pp, 104, yy + 2, 1, image.font5)
                target.print("P " + powerText + " A " + move.accuracy, 62, yy + 8, 1, image.font5)
            }
        }
    }
}

function openInventory() {
    syncBagInventory()
    overlayView = OverlayView.Bag
    partyDetailOpen = false
    partyDetailTab = 0
    overlayCloseSelected = false
    mode = Mode.Inventory
    basicBehaviors.lockPlayer(player)
    stateCache.clearKey("inventory_key")
    drawOverlay(true)
}

function openParty() {
    syncPartyInventory()
    overlayView = OverlayView.Party
    partyDetailOpen = false
    partyDetailTab = 0
    overlayCloseSelected = false
    mode = Mode.Inventory
    basicBehaviors.lockPlayer(player)
    stateCache.clearKey("party_key")
    drawOverlay(true)
}

function openMapOverlay() {
    overlayView = OverlayView.Map
    partyDetailOpen = false
    partyDetailTab = 0
    overlayCloseSelected = false
    if (miniMap.visitedCount() > 0) {
        let current = miniMap.current()
        mapSelection = 0
        for (let i = 0; i < miniMap.visitedCount(); i++) {
            if (miniMap.visitedId(i) == current) {
                mapSelection = i
                break
            }
        }
    } else mapSelection = 0
    mode = Mode.Inventory
    basicBehaviors.lockPlayer(player)
    stateCache.clearKey("map_key")
    drawOverlay(true)
}

function closeOverlay() {
    inventoryLayer.fill(0)
    inventoryLayerSprite.setFlag(SpriteFlag.Invisible, true)
    partyDetailOpen = false
    partyDetailTab = 0
    overlayCloseSelected = false
    mapSelection = 0
    mode = Mode.World
    basicBehaviors.unlockPlayer(player)
}

function partyText(): string {
    if (party.mons.length == 0) return "Sua party esta vazia."
    let txt = ""
    for (let i = 0; i < party.mons.length; i++) txt += (i + 1) + ". " + pokemon.summary(party.mons[i]) + "\n"
    return txt
}

function drawHud(force = false) {
    if (mode != Mode.World && mode != Mode.Inventory) {
        hud.fill(0)
        hudSprite.setFlag(SpriteFlag.Invisible, true)
        return
    }
    hudSprite.setFlag(SpriteFlag.Invisible, false)
    let changed = force
    changed = stateCache.setText("hud_area", currentArea) || changed
    changed = stateCache.setText("hud_balls", "" + bag.pokeBalls) || changed
    let mon = lead()
    changed = stateCache.setText("hud_party", mon ? pokemon.nameOf(mon) + "|" + mon.level + "|" + mon.hp : "none") || changed
    if (!changed) return
    hud.fill(0)
    hud.fillRect(0, 0, 160, 18, 1)
    hud.drawRect(0, 0, 160, 18, 15)
    hud.drawLine(0, 17, 159, 17, 13)
    hud.fillRect(2, 2, 38, 14, 8)
    hud.fillRect(42, 2, 72, 14, 15)
    hud.fillRect(116, 2, 42, 14, 10)
    hud.print("P.X", 12, 6, 1, image.font5)
    hud.print(currentArea, 46, 6, 1, image.font5)
    hud.print("PB " + bag.pokeBalls, 122, 6, 1, image.font5)
    if (mon) {
        hpBar(hud, 86, 10, 22, mon.hp, mon.maxHp)
    }
}

function drawInventory(force = false) {
    if (mode != Mode.Inventory || overlayView != OverlayView.Bag) {
        inventoryLayer.fill(0)
        inventoryLayerSprite.setFlag(SpriteFlag.Invisible, true)
        return
    }
    let slot = bagInventory.getSelected()
    let key = "" + bagInventory.getSelectedIndex() + "|" + bag.pokeBalls + "|" + bag.potions
    if (!force && !stateCache.setText("inventory_key", key)) return
    inventoryLayerSprite.setFlag(SpriteFlag.Invisible, false)
    inventoryLayer.fill(12)
    for (let y = 0; y < 120; y += 8) inventoryLayer.drawLine(0, y, 159, y, y % 16 == 0 ? 12 : 13)
    inventoryLayer.fillRect(4, 4, 152, 112, 15)
    inventoryLayer.drawRect(4, 4, 152, 112, 1)
    inventoryLayer.drawRect(6, 6, 148, 108, 13)
    inventoryLayer.fillRect(8, 8, 144, 16, 10)
    inventoryLayer.fillRect(10, 10, 44, 12, 1)
    inventoryLayer.print("BOLSA", 18, 14, 15, image.font5)
    inventoryLayer.print(playerName, 100, 14, 1, image.font5)
    inventoryLayer.print("PB " + bag.pokeBalls, 100, 6, 1, image.font5)
    inventoryLayer.print("PT " + bag.potions, 130, 6, 1, image.font5)
    drawCloseBadge(inventoryLayer, 140, 10)
    inventoryLayer.drawLine(8, 26, 151, 26, 13)

    inventoryTab(inventoryLayer, 12, 30, "TODOS", true, 9)
    inventoryTab(inventoryLayer, 40, 30, "BALL", slot && !slot.isEmpty() && slot.item.type == "ball", 2)
    inventoryTab(inventoryLayer, 68, 30, "CURA", slot && !slot.isEmpty() && slot.item.type == "heal", 8)

    inventoryLayer.fillRect(10, 42, 78, 66, 12)
    inventoryLayer.drawRect(10, 42, 78, 66, 13)
    inventoryLayer.drawRect(11, 43, 76, 64, 15)
    inventoryLayer.fillRect(12, 44, 74, 8, 1)
    inventoryLayer.print("ITENS", 39, 46, 15, image.font5)
    bagInventory.drawGridOn(inventoryLayer, 14, 50, 2, 36, 20)

    drawItemPreview(inventoryLayer, slot, 92, 30)

    let lines = itemDescription(slot)
    inventoryLayer.fillRect(92, 88, 58, 18, 15)
    inventoryLayer.drawRect(92, 88, 58, 18, 13)
    inventoryLayer.print(lines[0], 95, 91, 1, image.font5)
    inventoryLayer.print(lines[1], 95, 99, 13, image.font5)
}

function drawParty(force = false) {
    if (mode != Mode.Inventory || overlayView != OverlayView.Party) {
        return
    }
    let selected = partyInventory.getSelectedIndex()
    let mon = selected < party.mons.length ? party.mons[selected] : null
    let key = "" + selected + "|" + party.mons.length + "|" + partyDetailOpen + "|" + partyDetailTab + "|" + (mon ? pokemon.nameOf(mon) + "|" + mon.level + "|" + mon.hp : "none")
    if (!force && !stateCache.setText("party_key", key)) return
    inventoryLayerSprite.setFlag(SpriteFlag.Invisible, false)
    inventoryLayer.fill(12)
    for (let y = 0; y < 120; y += 8) inventoryLayer.drawLine(0, y, 159, y, y % 16 == 0 ? 12 : 13)
    inventoryLayer.fillRect(4, 4, 152, 112, 15)
    inventoryLayer.drawRect(4, 4, 152, 112, 1)
    inventoryLayer.drawRect(6, 6, 148, 108, 13)
    inventoryLayer.fillRect(8, 8, 144, 16, 10)
    inventoryLayer.fillRect(10, 10, 56, 12, 1)
    inventoryLayer.print("POKEMON", 16, 14, 15, image.font5)
    inventoryLayer.print(playerName, 110, 14, 1, image.font5)
    drawCloseBadge(inventoryLayer, 140, 10)
    inventoryLayer.drawLine(8, 26, 151, 26, 13)

    inventoryLayer.fillRect(10, 30, 78, 78, 12)
    inventoryLayer.drawRect(10, 30, 78, 78, 13)
    inventoryLayer.drawRect(11, 31, 76, 76, 15)
    partyInventory.drawGridOn(inventoryLayer, 14, 36, 2, 36, 20)
    if (partyDetailOpen) drawPartyDetail(inventoryLayer, mon)
    else {
        inventoryLayer.fillRect(92, 30, 58, 78, 15)
        inventoryLayer.drawRect(92, 30, 58, 78, 13)
        inventoryLayer.drawRect(93, 31, 56, 76, 1)
        inventoryLayer.fillRect(95, 33, 52, 10, 8)
        inventoryLayer.print("RESUMO", 108, 36, 1, image.font5)
        if (!mon) {
            inventoryLayer.print("Escolha", 107, 58, 1, image.font5)
            inventoryLayer.print("um slot", 108, 68, 1, image.font5)
        } else {
            if (mon.species && mon.species.icon) {
                inventoryLayer.fillRect(110, 49, 20, 20, 1)
                inventoryLayer.drawRect(110, 49, 20, 20, 13)
                inventoryLayer.drawTransparentImage(mon.species.icon, 116, 55)
            }
            inventoryLayer.print(shortLabel(pokemon.nameOf(mon), 9), 98, 74, 1, image.font5)
            inventoryLayer.print("Lv" + mon.level, 98, 84, 10, image.font5)
            inventoryLayer.print("A ver detalhes", 97, 96, 13, image.font5)
        }
    }
}

function teleportTo(id: string) {
    if (id == "town") town("route1")
    else if (id == "route1") route1("south")
    else if (id == "viridian") viridian("south")
}

function drawMapOverlay(force = false) {
    if (mode != Mode.Inventory || overlayView != OverlayView.Map) return
    let selectedId = miniMap.visitedId(mapSelection)
    let key = "" + mapSelection + "|" + selectedId + "|" + overlayCloseSelected + "|" + miniMap.current() + "|" + miniMap.visitedCount()
    if (!force && !stateCache.setText("map_key", key)) return
    inventoryLayerSprite.setFlag(SpriteFlag.Invisible, false)
    inventoryLayer.fill(12)
    for (let y = 0; y < 120; y += 8) inventoryLayer.drawLine(0, y, 159, y, y % 16 == 0 ? 12 : 13)
    inventoryLayer.fillRect(4, 4, 152, 112, 15)
    inventoryLayer.drawRect(4, 4, 152, 112, 1)
    inventoryLayer.drawRect(6, 6, 148, 108, 13)
    inventoryLayer.fillRect(8, 8, 144, 16, 9)
    inventoryLayer.fillRect(10, 10, 36, 12, 1)
    inventoryLayer.print("MAP", 20, 14, 15, image.font5)
    drawCloseBadge(inventoryLayer, 140, 10)
    miniMap.draw(inventoryLayer, 10, 30, 88, 54)
    inventoryLayer.fillRect(102, 30, 48, 78, 15)
    inventoryLayer.drawRect(102, 30, 48, 78, 13)
    inventoryLayer.drawRect(103, 31, 46, 76, 1)
    inventoryLayer.fillRect(105, 33, 42, 10, 8)
    inventoryLayer.print("LOCAIS", 111, 36, 1, image.font5)
    for (let i = 0; i < miniMap.visitedCount() && i < 6; i++) {
        let id = miniMap.visitedId(i)
        let yy = 48 + i * 9
        if (i == mapSelection && !overlayCloseSelected) {
            inventoryLayer.fillRect(105, yy - 1, 40, 8, 10)
            inventoryLayer.print(">", 107, yy, 1, image.font5)
        }
        inventoryLayer.print(shortLabel(miniMap.nodeName(id), 8), 113, yy, 1, image.font5)
    }
    if (selectedId.length > 0) {
        inventoryLayer.fillRect(10, 90, 88, 18, 15)
        inventoryLayer.drawRect(10, 90, 88, 18, 13)
        inventoryLayer.print(shortLabel(miniMap.nodeName(selectedId), 14), 14, 94, 1, image.font5)
        inventoryLayer.print(shortLabel(miniMap.nodeDescription(selectedId), 14), 14, 102, 13, image.font5)
    }
}

function drawOverlay(force = false) {
    if (overlayView == OverlayView.Bag) drawInventory(force)
    else if (overlayView == OverlayView.Party) drawParty(force)
    else drawMapOverlay(force)
}

function inventoryColumns(): number {
    return 2
}

function hpBar(img: Image, x: number, y: number, w: number, hp: number, maxHp: number) {
    img.fillRect(x, y, w, 4, 1)
    let fill = maxHp <= 0 ? 0 : Math.idiv(w * hp, maxHp)
    let c = 7
    if (hp * 4 < maxHp) c = 2
    else if (hp * 2 < maxHp) c = 4
    img.fillRect(x, y, fill, 4, c)
    img.drawRect(x, y, w, 4, 15)
}

function wrapBattleText(text: string): string[] {
    let words = text.split(" ")
    let lines: string[] = []
    let line = ""
    for (let word of words) {
        let next = line.length == 0 ? word : line + " " + word
        if (next.length > 18 && line.length > 0) {
            lines.push(line)
            line = word
        } else {
            line = next
        }
    }
    if (line.length > 0) lines.push(line)
    while (lines.length > 4) {
        let tail = lines.pop()
        lines[lines.length - 1] = lines[lines.length - 1] + " " + tail
    }
    return lines
}

function battleText(lines: string[]) {
    pokemonUI.setLines(battleDialog, lines)
    pokemonUI.setVisible(battleDialog, true)
}

function battleLastText() {
    battleText(wrapBattleText(pokemon.lastText()))
}

function animateAttackSprite(sprite: Sprite, enemySide: boolean) {
    if (!sprite) return
    let startX = sprite.x
    let startY = sprite.y
    let dash = enemySide ? -8 : 8
    sprite.x = startX + dash
    sprite.y = startY - 2
    pause(70)
    sprite.x = startX
    sprite.y = startY
}

function refreshBattlePrompt() {
    if (mode != Mode.Battle || !lead()) return
    if (battleMenu == BattleMenu.Actions) {
        pokemonUI.setTitle(battleMenuUi, "ACOES")
        battleText(["O que", pokemon.nameOf(lead()) + " fara?"])
        return
    }
    if (battleMenu == BattleMenu.Bag) {
        pokemonUI.setTitle(battleMenuUi, "BOLSA")
        let selectedBag = pokemonUI.selectedOption(battleMenuUi)
        if (selectedBag == "Pocao") battleText(["Pocao", "Cura 20 HP"])
        else if (selectedBag == "Pokebola") battleText(["Pokebola", "Captura pokemon"])
        else battleText(["Escolha", "um item."])
        return
    }
    pokemonUI.setTitle(battleMenuUi, "GOLPES")
    let selected = pokemonUI.selectedIndex(battleMenuUi)
    if (selected < 0 || selected >= lead().moves.length) {
        battleText(["Selecione um golpe."])
        return
    }
    let move = lead().moves[selected]
    let powerText = move.category == pokemon.MoveCategory.Status ? "--" : "" + move.power
    battleText([shortLabel(move.name, 14), "PREC " + move.accuracy, "PODER " + powerText])
}

function actionMenu() {
    battleMenu = BattleMenu.Actions
    pokemonUI.setOptions(battleMenuUi, ["Lutar", "Bolsa", "Correr"])
    refreshBattlePrompt()
}

function moveMenu() {
    battleMenu = BattleMenu.Moves
    let options: string[] = []
    for (let i = 0; i < 4; i++) options.push(shortLabel(pokemon.moveName(lead(), i) || "-", 10))
    pokemonUI.setOptions(battleMenuUi, options)
    refreshBattlePrompt()
}

function battleBagMenu() {
    battleMenu = BattleMenu.Bag
    pokemonUI.setOptions(battleMenuUi, ["Pocao", "Pokebola", "Voltar"])
    refreshBattlePrompt()
}

function drawBattle(force = false) {
    if (mode != Mode.Battle || !battleEnemy || !lead()) {
        battleLayer.fill(0)
        battleLayerSprite.setFlag(SpriteFlag.Invisible, true)
        return
    }
    let key = battleLabel + "|" + battleEnemy.hp + "|" + lead().hp
    if (!force && !stateCache.setText("battle_key", key)) return
    battleLayerSprite.setFlag(SpriteFlag.Invisible, false)
    battleLayer.fill(0)
    battleLayer.fillRect(0, 0, 160, 80, 15)
    battleLayer.fillRect(0, 24, 160, 16, 14)
    battleLayer.fillRect(0, 40, 160, 28, 7)
    battleLayer.drawLine(0, 23, 159, 23, 13)
    battleLayer.drawLine(0, 39, 159, 39, 13)
    battleLayer.fillRect(92, 32, 42, 6, 6)
    battleLayer.drawRect(92, 32, 42, 6, 13)
    battleLayer.fillRect(16, 46, 56, 8, 6)
    battleLayer.drawRect(16, 46, 56, 8, 13)
    battleLayer.fillRect(8, 8, 72, 22, 1)
    battleLayer.drawRect(8, 8, 72, 22, 13)
    battleLayer.drawRect(9, 9, 70, 20, 15)
    battleLayer.print(battleLabel, 12, 12, 15, image.font5)
    battleLayer.print("Lv" + battleEnemy.level, 54, 12, 10, image.font5)
    hpBar(battleLayer, 12, 22, 52, battleEnemy.hp, battleEnemy.maxHp)
    battleLayer.fillRect(82, 40, 70, 26, 1)
    battleLayer.drawRect(82, 40, 70, 26, 13)
    battleLayer.drawRect(83, 41, 68, 24, 15)
    battleLayer.print(pokemon.nameOf(lead()), 86, 44, 15, image.font5)
    battleLayer.print("Lv" + lead().level, 126, 44, 10, image.font5)
    battleLayer.print("HP", 86, 50, 15, image.font5)
    hpBar(battleLayer, 104, 50, 36, lead().hp, lead().maxHp)
    battleLayer.print("" + lead().hp + "/" + lead().maxHp, 96, 57, 7, image.font5)
}

function hideBattle() {
    pokemonUI.setVisible(battleDialog, false)
    pokemonUI.setVisible(battleMenuUi, false)
    battleLayer.fill(0)
    battleLayerSprite.setFlag(SpriteFlag.Invisible, true)
    playerBattleSprite = disposeSprite(playerBattleSprite)
    enemyBattleSprite = disposeSprite(enemyBattleSprite)
    stateCache.clearKey("battle_key")
}

function startBattle(enemy: pokemon.Monster, label: string) {
    mode = Mode.Battle
    battleEnemy = enemy
    battleLabel = label
    basicBehaviors.lockPlayer(player)
    pokemon.resetBattleState(lead())
    pokemon.resetBattleState(battleEnemy)
    playerBattleSprite = pokemon.createBattleSprite(lead(), pokemon.BattleSide.Player)
    enemyBattleSprite = pokemon.createBattleSprite(battleEnemy, pokemon.BattleSide.Enemy)
    playerBattleSprite.setFlag(SpriteFlag.RelativeToCamera, true)
    enemyBattleSprite.setFlag(SpriteFlag.RelativeToCamera, true)
    playerBattleSprite.setPosition(40, 68)
    enemyBattleSprite.setPosition(118, 32)
    playerBattleSprite.z = 110
    enemyBattleSprite.z = 110
    performanceHelper.trackSprite(playerBattleSprite)
    performanceHelper.trackSprite(enemyBattleSprite)
    actionMenu()
    pokemonUI.setVisible(battleMenuUi, true)
    battleText([label + " quer lutar!", "Vai " + pokemon.nameOf(lead()) + "!"])
    drawBattle(true)
}

function finishWildCapture() {
    if (!battleEnemy) return
    pokemon.addToParty(party, battleEnemy)
    hideBattle()
    battleEnemy = null
    wildBattle = false
    mode = Mode.World
    basicBehaviors.unlockPlayer(player)
    drawHud(true)
}

function endBattle(win: boolean) {
    let p = lead()
    if (win && p && battleEnemy) {
        pokemon.awardBattleExp(p, battleEnemy)
        if (story() == 3 && p.level < 6) {
            pokemon.giveExp(p, pokemon.expToNextLevel(p))
        }
        while (pokemon.tryLevelUp(p)) {
        }
    } else if (p) {
        pokemon.healFull(p)
    }
    hideBattle()
    battleEnemy = null
    wildBattle = false
    mode = Mode.World
    basicBehaviors.unlockPlayer(player)
    if (story() == 3) {
        setStory(4)
        if (p) pokemon.healFull(p)
        WorldEvents.runDialog(win ?
            [rivalName + ": Ainda nao acabou.", "Doutor Lard: Excelente primeira batalha."] :
            [rivalName + ": Eu levei essa.", "Doutor Lard: Seus pokemon foram curados."]
        )
    }
    drawHud(true)
}

function enemyTurn() {
    animateAttackSprite(enemyBattleSprite, true)
    pokemon.useMove(battleEnemy, lead(), chooseEnemyMove(battleEnemy, lead()))
    drawBattle(true)
    if (pokemon.isFainted(lead())) {
        battleLastText()
        pause(500)
        endBattle(false)
    } else battleLastText()
}

function useMove(i: number) {
    if (pokemon.moveName(lead(), i) == "") {
        battleText(["Golpe vazio."])
        return
    }
    animateAttackSprite(playerBattleSprite, false)
    pokemon.useMove(lead(), battleEnemy, i)
    drawBattle(true)
    if (pokemon.isFainted(battleEnemy)) {
        battleLastText()
        pause(500)
        endBattle(true)
    } else {
        battleLastText()
        pause(400)
        enemyTurn()
        if (mode == Mode.Battle) actionMenu()
    }
}

function trigger(id: string, mapId: string, x: number, y: number, w: number, h: number, cb: () => void) {
    WorldEvents.addTrigger(id, mapId, x * 16, y * 16, w * 16, h * 16, cb, false)
}

function bedroom(fromStairs: boolean) {
    clearWorld()
    currentMap = "bedroom"
    currentArea = "Quarto"
    let a = blank(10, 8, 3)
    box(a, 5)
    tiles.setTilemap(mapFrom(a))
    applyWalls()
    addDecor(bedImg, px(3), px(2))
    addDecor(stairImg, px(8), px(5))
    addNpc("computer", "PC", px(7), px(2), pcImg, ["Seu computador."])
    WorldEvents.setMap(currentMap)
    trigger("stairs", currentMap, 7, 5, 2, 1, function () { downstairs(true) })
    tiles.placeOnTile(player, tiles.getTileLocation(fromStairs ? 7 : 4, 5))
    mode = Mode.World
    basicBehaviors.unlockPlayer(player)
    scene.cameraFollowSprite(player)
    if (!WorldEvents.getFlag("bed_intro")) {
        WorldEvents.setFlag("bed_intro", true)
        WorldEvents.runDialog([playerName + ", desca e fale com sua mae."])
    }
    drawHud(true)
}

function downstairs(fromBedroom: boolean) {
    clearWorld()
    currentMap = "home"
    currentArea = "Casa"
    let a = blank(12, 9, 3)
    box(a, 5)
    tiles.setTilemap(mapFrom(a))
    applyWalls()
    addDecor(stairImg, px(9), px(2))
    addNpc("mom", "Mae", px(3), px(5), momImg, ["Mae: O laboratorio fica ao norte."])
    WorldEvents.setMap(currentMap)
    trigger("up", currentMap, 8, 2, 2, 1, function () { bedroom(true) })
    trigger("out", currentMap, 5, 7, 2, 1, function () { if (story() < 1) setStory(1); town("home") })
    tiles.placeOnTile(player, tiles.getTileLocation(fromBedroom ? 8 : 5, fromBedroom ? 3 : 6))
    mode = Mode.World
    basicBehaviors.unlockPlayer(player)
    scene.cameraFollowSprite(player)
    drawHud(true)
}

function bringToLab() {
    if (story() >= 2) return
    basicBehaviors.lockPlayer(player)
    WorldEvents.runDialog([
        "Doutor Lard: Ei, " + playerName + "!",
        "Ainda e cedo para sair sem um pokemon.",
        "Venha comigo ao laboratorio."
    ], function () {
        setStory(2)
        lab("entry")
    })
}

function town(spawn: string) {
    clearWorld()
    currentMap = "town"
    currentArea = "Pallet Town"
    miniMap.visit("town")
    let a = blank(18, 16, 0)
    box(a, 2)
    rect(a, 8, 1, 2, 14, 1)
    rect(a, 4, 12, 10, 2, 1)
    rect(a, 4, 9, 3, 3, 5)
    rect(a, 11, 9, 3, 3, 5)
    rect(a, 6, 3, 6, 3, 5)
    a[0][8] = 1
    a[0][9] = 1
    a[11][5] = 1
    a[11][12] = 1
    a[6][9] = 1
    tiles.setTilemap(mapFrom(a))
    applyWalls()
    addDecor(houseImg, px(5), px(10), 2)
    addDecor(houseImg, px(12), px(10), 2)
    addDecor(labImg, px(9), px(4), 2)
    addNpc("sign", "Placa", px(9), px(14), img`
        c c c c . . . .
        c 1 9 c . . . .
        c c c c . . . .
        . 6 6 . . . . .
        . 6 6 . . . . .
        . . . . . . . .
        . . . . . . . .
        . . . . . . . .
    `, ["Pallet Town", "A Route 1 fica ao norte."])
    WorldEvents.setMap(currentMap)
    trigger("enter_home", currentMap, 5, 11, 1, 1, function () { downstairs(false) })
    trigger("enter_lab", currentMap, 9, 6, 1, 1, function () { if (story() >= 2) lab("entry"); else WorldEvents.runDialog(["O laboratorio ainda esta fechado."]) })
    trigger("north_exit", currentMap, 8, 0, 2, 1, function () {
        if (story() < 2) bringToLab()
        else route1("south")
    })
    tiles.placeOnTile(player, tiles.getTileLocation(
        spawn == "lab" ? 9 : spawn == "route1" ? 9 : 5,
        spawn == "lab" ? 7 : spawn == "route1" ? 1 : 12
    ))
    mode = Mode.World
    basicBehaviors.unlockPlayer(player)
    scene.cameraFollowSprite(player)
    if (!WorldEvents.getFlag("town_intro")) {
        WorldEvents.setFlag("town_intro", true)
        WorldEvents.runDialog(["Pallet Town agora e sua cidade inicial.", "O laboratorio do Doutor Lard fica acima."])
    }
    drawHud(true)
}

function route1(spawn: string) {
    clearWorld()
    currentMap = "route1"
    currentArea = "Route 1"
    miniMap.visit("route1")
    let a = blank(14, 28, 0)
    box(a, 2)
    rect(a, 6, 1, 2, 26, 1)
    rect(a, 5, 6, 4, 3, 1)
    rect(a, 4, 15, 6, 2, 1)
    rect(a, 5, 22, 4, 2, 1)
    rect(a, 4, 10, 2, 3, 8)
    rect(a, 8, 18, 2, 3, 8)
    rect(a, 1, 3, 3, 4, 2)
    rect(a, 10, 4, 3, 5, 2)
    rect(a, 1, 11, 3, 5, 2)
    rect(a, 10, 13, 3, 4, 2)
    rect(a, 1, 20, 3, 5, 2)
    rect(a, 10, 21, 3, 4, 2)
    a[0][6] = 1
    a[0][7] = 1
    a[27][6] = 1
    a[27][7] = 1
    tiles.setTilemap(mapFrom(a))
    applyWalls()
    addNpc("sign", "Placa", px(7), px(3), img`
        c c c c . . . .
        c 1 9 c . . . .
        c c c c . . . .
        . 6 6 . . . . .
        . 6 6 . . . . .
        . . . . . . . .
        . . . . . . . .
        . . . . . . . .
    `, ["Route 1", "Viridian City ao norte."])
    addNpc("kid", "Garoto", px(5), px(14), ashImg, ["Garoto: Viridian fica logo acima."])
    addNpc("walker", "Morador", px(8), px(24), momImg, ["Morador: A rota e tranquila no comeco."])
    WorldEvents.setMap(currentMap)
    trigger("south_back", currentMap, 6, 27, 2, 1, function () { town("route1") })
    trigger("north_out", currentMap, 6, 0, 2, 1, function () { viridian("south") })
    tiles.placeOnTile(player, tiles.getTileLocation(spawn == "north" ? 7 : 7, spawn == "north" ? 2 : 25))
    mode = Mode.World
    basicBehaviors.unlockPlayer(player)
    scene.cameraFollowSprite(player)
    drawHud(true)
}

function viridian(spawn: string) {
    clearWorld()
    currentMap = "viridian"
    currentArea = "Viridian City"
    miniMap.visit("viridian")
    let a = blank(22, 18, 0)
    box(a, 2)
    rect(a, 10, 1, 2, 16, 1)
    rect(a, 6, 13, 10, 2, 1)
    rect(a, 4, 8, 3, 3, 5)
    rect(a, 9, 4, 4, 3, 5)
    rect(a, 15, 8, 3, 3, 5)
    rect(a, 4, 3, 4, 3, 4)
    rect(a, 14, 3, 4, 3, 4)
    rect(a, 2, 2, 3, 3, 6)
    rect(a, 17, 2, 3, 3, 6)
    a[17][10] = 1
    a[17][11] = 1
    a[12][11] = 1
    a[7][11] = 1
    tiles.setTilemap(mapFrom(a))
    applyWalls()
    addDecor(houseImg, px(5), px(9), 2)
    addDecor(labImg, px(11), px(5), 2)
    addDecor(houseImg, px(16), px(9), 2)
    addDecor(img`
        . 4 4 4 4 4 4 .
        4 1 1 1 1 1 1 4
        4 1 2 2 2 2 1 4
        4 1 2 5 5 2 1 4
        4 1 2 5 5 2 1 4
        4 1 2 2 2 2 1 4
        4 1 1 1 1 1 1 4
        4 4 4 4 4 4 4 4
    `, px(6), px(4), 2)
    addDecor(img`
        . 4 4 4 4 4 4 .
        4 1 1 1 1 1 1 4
        4 1 a a a a 1 4
        4 1 a 5 5 a 1 4
        4 1 a 5 5 a 1 4
        4 1 a a a a 1 4
        4 1 1 1 1 1 1 4
        4 4 4 4 4 4 4 4
    `, px(16), px(4), 2)
    addNpc("sign", "Placa", px(11), px(15), img`
        c c c c . . . .
        c 1 9 c . . . .
        c c c c . . . .
        . 6 6 . . . . .
        . 6 6 . . . . .
        . . . . . . . .
        . . . . . . . .
        . . . . . . . .
    `, ["Viridian City", "A cidade segue em expansao."])
    addNpc("nurse", "Curandeira", px(6), px(7), momImg, ["Curandeira: Seus pokemon foram curados."])
    addNpc("shopper", "Lojista", px(16), px(7), doctorImg, ["Lojista: Ainda estamos abrindo a loja."])
    addNpc("oldman", "Morador", px(11), px(11), rivalImg, ["Morador: O norte da cidade ainda esta fechado."])
    WorldEvents.setMap(currentMap)
    trigger("south_back", currentMap, 10, 17, 2, 1, function () { route1("north") })
    trigger("north_block", currentMap, 10, 0, 2, 1, function () { WorldEvents.runDialog(["A saida norte sera aberta depois."]) })
    trigger("west_block", currentMap, 0, 12, 1, 3, function () { WorldEvents.runDialog(["Essa area fica para depois."]) })
    trigger("east_block", currentMap, 21, 12, 1, 3, function () { WorldEvents.runDialog(["Essa area fica para depois."]) })
    tiles.placeOnTile(player, tiles.getTileLocation(11, spawn == "south" ? 15 : 15))
    mode = Mode.World
    basicBehaviors.unlockPlayer(player)
    scene.cameraFollowSprite(player)
    drawHud(true)
}

function lab(spawn: string) {
    clearWorld()
    currentMap = "lab"
    currentArea = "Laboratorio"
    let a = blank(16, 10, 4)
    box(a, 5)
    tiles.setTilemap(mapFrom(a))
    applyWalls()
    addNpc("professor", "Doutor Lard", px(7), px(2), doctorImg, ["Escolha seu inicial."])
    addNpc("rival", rivalName, px(12), px(6), rivalImg, [rivalName + ": Eu quero o melhor."])
    addStarter(bulbasaur, px(4), px(6))
    addStarter(charmander, px(7), px(6))
    addStarter(squirtle, px(10), px(6))
    WorldEvents.setMap(currentMap)
    trigger("exit_lab", currentMap, 7, 8, 2, 1, function () {
        if (story() >= 4) town("lab")
        else WorldEvents.runDialog(["Doutor Lard: Primeiro pegue seu pokemon inicial."])
    })
    tiles.placeOnTile(player, tiles.getTileLocation(8, spawn == "entry" ? 8 : 7))
    mode = Mode.World
    basicBehaviors.unlockPlayer(player)
    scene.cameraFollowSprite(player)
    if (!WorldEvents.getFlag("lab_intro")) {
        WorldEvents.setFlag("lab_intro", true)
        WorldEvents.runDialog(["Doutor Lard: Charmander, Bulbasaur ou Squirtle.", "Escolha um pokemon nivel 5."])
    }
    drawHud(true)
}

function chooseStarter(sp: pokemon.Species) {
    if (story() != 2 || party.mons.length > 0) return
    let mine = pokemon.createMonster(sp, 5)
    teachStarter(mine)
    let nick = game.askForString("Nome do pokemon?")
    if (nick && nick.length > 0) pokemon.setNickname(mine, nick)
    pokemon.addToParty(party, mine)
    let rivalMon = pokemon.createMonster(counter(sp), 4)
    teachEarlyTrainer(rivalMon)
    rivalMon.hp = Math.max(1, rivalMon.hp - 2)
    for (let a of actors) if (a.role == "rival") a.mon = rivalMon
    setStory(3)
    WorldEvents.runDialog([
        "Voce escolheu " + sp.name + ".",
        rivalName + " pegou " + rivalMon.species.name + ".",
        "Agora vai comecar sua primeira batalha!"
    ], function () {
        game.showLongText("Tutorial: Use Lutar para abrir seus golpes. Growl reduz o ataque inimigo. Seu pokemon sobe de nivel e aumenta status de forma permanente.", DialogLayout.Full)
        startBattle(rivalMon, rivalName)
    })
}

function interact(a: Actor) {
    if (!a) return
    if (a.role == "computer") openInventory()
    else if (a.role == "nurse") {
        for (let mon of party.mons) pokemon.healFull(mon)
        WorldEvents.runDialog(["Curandeira: Seu time foi curado."])
    }
    else if (a.role == "mom") WorldEvents.runDialog(story() < 2 ? ["Mae: O Doutor Lard esta esperando por voce."] : ["Mae: Estou orgulhosa de voce."])
    else if (a.role == "professor") WorldEvents.runDialog(story() < 4 ? ["Doutor Lard: Escolha seu parceiro pokemon."] : ["Doutor Lard: Continue treinando seu time."])
    else if (a.role == "rival") {
        if (story() < 3) WorldEvents.runDialog([rivalName + ": Eu nao vou perder."])
        else if (story() == 3 && a.mon) WorldEvents.runDialog([rivalName + ": Vamos batalhar!"], function () { startBattle(a.mon, rivalName) })
        else WorldEvents.runDialog([rivalName + ": Da proxima eu ganho."])
    } else if (a.role == "starter") chooseStarter(a.species)
    else if (a.lines.length > 0) WorldEvents.runDialog(a.lines)
}

function titleImage(): Image {
    let i = image.create(160, 120)
    for (let y = 0; y < 120; y++) i.drawLine(0, y, 159, y, y < 34 ? 9 : y < 70 ? 1 : 7)
    i.fillRect(0, 82, 160, 38, 6)
    i.drawTransparentImage(titleCharizard, 28, 24)
    i.drawTransparentImage(ashImg, 110, 58)
    i.fillRect(18, 8, 124, 20, 1)
    i.drawRect(18, 8, 124, 20, 15)
    i.print("POKEMON X", 46, 14, 15, image.font5)
    i.fillRect(48, 92, 64, 14, 1)
    i.drawRect(48, 92, 64, 14, 15)
    i.print("Andre R.", 62, 96, 15, image.font5)
    return i
}

function showTitle() {
    mode = Mode.Title
    titleSelection = 0
    player.setFlag(SpriteFlag.Invisible, true)
    hideBattle()
    hudSprite.setFlag(SpriteFlag.Invisible, true)
    titleSprite = disposeSprite(titleSprite)
    titlePrompt = disposeSprite(titlePrompt)
    titleSprite = basicBehaviors.createScreenSprite(titleImage(), 120)
    titlePrompt = basicBehaviors.createScreenSprite(titleMenuImage(), 121)
    titlePrompt.setPosition(80, 100)
}

function beginGame() {
    titleSprite = disposeSprite(titleSprite)
    titlePrompt = disposeSprite(titlePrompt)
    player.setFlag(SpriteFlag.Invisible, false)
    game.showLongText("No mundo de Pokemon, amizade, pesquisa e batalhas caminham juntas. Sua historia comeca hoje em Pallet Town.", DialogLayout.Full)
    game.showLongText("Doutor Lard estuda pokemon e esta preparando dois jovens para sua primeira grande jornada.", DialogLayout.Full)
    game.showLongText("Primeiro vamos registrar voce e o seu rival principal.", DialogLayout.Full)
    game.showLongText("Doutor Lard: Como voce se chama?", DialogLayout.Bottom)
    playerName = game.askForString("Seu nome?")
    if (!playerName || playerName.length == 0) playerName = "Red"
    game.showLongText("Doutor Lard: E o nome do seu rival?", DialogLayout.Bottom)
    rivalName = game.askForString("Nome do rival?")
    if (!rivalName || rivalName.length == 0) rivalName = "Blue"
    setStory(0)
    bedroom(false)
}

controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (mode == Mode.Title) {
        if (titleSelection == 0) beginGame()
        else if (titleSelection == 1) quickStartBattle()
        else quickStartAfterBattle()
        return
    }
    if (mode == Mode.World) {
        let actor = nearestActor()
        if (actor) interact(actor)
        else openInventory()
        return
    }
    if (mode == Mode.Inventory) {
        if (overlayCloseSelected) {
            if (overlayView == OverlayView.Party && partyDetailOpen) {
                partyDetailOpen = false
                overlayCloseSelected = false
                drawOverlay(true)
            } else closeOverlay()
            return
        }
        if (overlayView == OverlayView.Bag) {
            let slot = bagInventory.getSelected()
            if (!slot || slot.isEmpty()) return
            if (slot.item.id == "Map") {
                openMapOverlay()
            } else if (slot.item.id == "Pocao" && lead()) {
                if (pokemon.usePotion(bag, lead())) {
                    syncBagInventory()
                    drawOverlay(true)
                } else game.showLongText("Nao foi possivel usar a Pocao.", DialogLayout.Bottom)
            } else {
                game.showLongText("Esse item nao pode ser usado agora.", DialogLayout.Bottom)
            }
        } else if (overlayView == OverlayView.Party) {
            let mon = party.mons[partyInventory.getSelectedIndex()]
            if (!mon) return
            if (!partyDetailOpen) {
                partyDetailOpen = true
                partyDetailTab = 0
            }
            drawOverlay(true)
        } else {
            let targetId = miniMap.visitedId(mapSelection)
            if (targetId.length == 0) return
            if (overlayCloseSelected) {
                closeOverlay()
            } else if (targetId != miniMap.current()) {
                closeOverlay()
                teleportTo(targetId)
            }
        }
        return
    }
    if (battleMenu == BattleMenu.Actions) {
        let c = pokemonUI.selectedOption(battleMenuUi)
        if (c == "Lutar") moveMenu()
        else if (c == "Bolsa") battleBagMenu()
        else battleText(["Nao da para fugir", "desta batalha."])
    } else if (battleMenu == BattleMenu.Bag) {
        let option = pokemonUI.selectedOption(battleMenuUi)
        if (option == "Voltar") {
            actionMenu()
        } else if (option == "Pocao") {
            if (pokemon.usePotion(bag, lead())) {
                battleLastText()
                drawBattle(true)
                pause(300)
                enemyTurn()
                if (mode == Mode.Battle) actionMenu()
            } else battleLastText()
        } else if (option == "Pokebola") {
            if (!wildBattle || story() == 3 || battleLabel == rivalName) {
                battleText(["Nao pode capturar", "o pokemon do rival."])
            } else {
                let captured = pokemon.throwPokeBall(bag, battleEnemy)
                battleLastText()
                if (captured) {
                    pause(500)
                    finishWildCapture()
                }
            }
        }
    } else useMove(pokemonUI.selectedIndex(battleMenuUi))
})

controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (mode == Mode.World) openParty()
    else if (mode == Mode.Inventory) {
        if (overlayView == OverlayView.Party && partyDetailOpen) {
            partyDetailOpen = false
            overlayCloseSelected = false
            drawOverlay(true)
        } else closeOverlay()
    }
    else if (mode == Mode.Battle && (battleMenu == BattleMenu.Moves || battleMenu == BattleMenu.Bag)) actionMenu()
})

controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
    if (mode == Mode.Title) openSkipMenu()
    else if (mode == Mode.World) {
        let actor = nearestActor()
        if (actor) interact(actor)
        else openPauseMenu()
    }
    else if (mode == Mode.Inventory) closeOverlay()
})

controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    if (mode == Mode.Title) {
        titleSelection = titleSelection <= 0 ? 2 : titleSelection - 1
        refreshTitleMenu()
    } else if (mode == Mode.Inventory) {
        if (overlayCloseSelected) {
        } else if (overlayView == OverlayView.Map) {
            if (mapSelection <= 0) overlayCloseSelected = true
            else mapSelection--
        } else if (overlayView == OverlayView.Party && partyDetailOpen) {
            overlayCloseSelected = true
        } else if (overlayView == OverlayView.Bag) {
            if (bagInventory.getSelectedIndex() < inventoryColumns()) overlayCloseSelected = true
            else bagInventory.moveSelection(2, 0, -1)
        } else if (!partyDetailOpen) {
            if (partyInventory.getSelectedIndex() < inventoryColumns()) overlayCloseSelected = true
            else partyInventory.moveSelection(2, 0, -1)
        }
        drawOverlay(true)
    } else if (mode == Mode.Battle) {
        pokemonUI.moveSelection(battleMenuUi, -1)
        refreshBattlePrompt()
    }
})

controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (mode == Mode.Title) {
        titleSelection = titleSelection >= 2 ? 0 : titleSelection + 1
        refreshTitleMenu()
    } else if (mode == Mode.Inventory) {
        if (overlayCloseSelected) overlayCloseSelected = false
        else if (overlayView == OverlayView.Map) {
            if (mapSelection < miniMap.visitedCount() - 1) mapSelection++
        }
        else if (overlayView == OverlayView.Party && partyDetailOpen) {
        }
        else if (overlayView == OverlayView.Bag) bagInventory.moveSelection(2, 0, 1)
        else if (!partyDetailOpen) partyInventory.moveSelection(2, 0, 1)
        drawOverlay(true)
    } else if (mode == Mode.Battle) {
        pokemonUI.moveSelection(battleMenuUi, 1)
        refreshBattlePrompt()
    }
})

controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (mode == Mode.Inventory) {
        if (overlayCloseSelected) {
        } else if (overlayView == OverlayView.Bag) bagInventory.moveSelection(2, -1, 0)
        else if (partyDetailOpen) partyDetailTab = partyDetailTab <= 0 ? 2 : partyDetailTab - 1
        else partyInventory.moveSelection(2, -1, 0)
        drawOverlay(true)
    }
})

controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (mode == Mode.Inventory) {
        if (overlayCloseSelected) {
        } else if (overlayView == OverlayView.Bag) bagInventory.moveSelection(2, 1, 0)
        else if (partyDetailOpen) partyDetailTab = partyDetailTab >= 2 ? 0 : partyDetailTab + 1
        else partyInventory.moveSelection(2, 1, 0)
        drawOverlay(true)
    }
})

tickScheduler.everyMedium(function () {
    if (mode == Mode.World) {
        if (encounterCooldown > 0) encounterCooldown--
        WorldEvents.update()
        tryRouteEncounter()
        drawHud()
    } else if (mode == Mode.Inventory) {
        drawHud()
        drawOverlay()
    } else if (mode == Mode.Battle) drawBattle()
})

WorldEvents.init(player)
miniMap.clear()
miniMap.addNode("town", "Pallet", 16, 34, "Cidade inicial")
miniMap.addNode("route1", "Route1", 42, 18, "Trilha ao norte")
miniMap.addNode("viridian", "Viridian", 70, 8, "Cidade seguinte")
miniMap.connect("town", "route1")
miniMap.connect("route1", "viridian")
scene.setBackgroundColor(7)
performanceHelper.setMaxSprites(160)
performanceHelper.enableCulling()
performanceHelper.enablePerformanceMode()
showTitle()
