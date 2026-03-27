namespace SpriteKind {
    export const PokemonUI = SpriteKind.create()
}

namespace pokemonUI {
    export enum Theme {
        Light = 0,
        Dark = 1,
        Forest = 2,
        Ocean = 3
    }

    export enum UiLayout {
        MessageBox = 0,
        ChoiceMenu = 1,
        StatusCard = 2,
        BattleHud = 3
    }

    class UiState {
        sprite: Sprite
        layout: UiLayout
        theme: Theme
        x: number
        y: number
        w: number
        h: number
        title: string
        lines: string[]
        options: string[]
        selected: number
        name: string
        level: number
        hp: number
        hpMax: number
        exp: number
        expMax: number
        portrait: Image
        visible: boolean
    }

    let all: UiState[] = []

    function getState(ui: Sprite): UiState {
        for (let state of all) {
            if (state.sprite == ui) return state
        }
        return null
    }

    function clamp(v: number, min: number, max: number): number {
        if (v < min) return min
        if (v > max) return max
        return v
    }

    function bg(theme: Theme): number {
        if (theme == Theme.Dark) return 1
        if (theme == Theme.Forest) return 6
        if (theme == Theme.Ocean) return 12
        return 15
    }

    function panel(theme: Theme): number {
        if (theme == Theme.Dark) return 13
        return 1
    }

    function text(theme: Theme): number {
        if (theme == Theme.Dark) return 15
        return 1
    }

    function accent(theme: Theme): number {
        if (theme == Theme.Dark) return 10
        if (theme == Theme.Forest) return 7
        if (theme == Theme.Ocean) return 9
        return 8
    }

    function hpColor(hp: number, hpMax: number): number {
        let ratio = hpMax <= 0 ? 0 : hp / hpMax
        if (ratio > 0.5) return 7
        if (ratio > 0.2) return 10
        return 2
    }

    function drawGauge(target: Image, x: number, y: number, w: number, h: number, value: number, max: number, fill: number, border: number) {
        let safeMax = Math.max(1, max)
        let width = Math.idiv((w - 2) * clamp(value, 0, safeMax), safeMax)
        target.drawRect(x, y, w, h, border)
        target.fillRect(x + 1, y + 1, w - 2, h - 2, 13)
        if (width > 0) target.fillRect(x + 1, y + 1, width, h - 2, fill)
    }

    function redraw(state: UiState) {
        let img = image.create(state.w, state.h)
        let bgColor = bg(state.theme)
        let panelColor = panel(state.theme)
        let textColor = text(state.theme)
        let accentColor = accent(state.theme)

        img.fill(bgColor)
        img.drawRect(0, 0, state.w, state.h, panelColor)
        img.drawRect(1, 1, state.w - 2, state.h - 2, textColor)

        if (state.title.length > 0) {
            img.fillRect(3, 3, state.w - 6, 10, accentColor)
            img.print(state.title, 6, 5, textColor)
        }

        if (state.layout == UiLayout.MessageBox) {
            let startY = state.title.length > 0 ? 18 : 8
            for (let i = 0; i < state.lines.length; i++) {
                img.print(state.lines[i], 6, startY + i * 9, textColor)
            }
        } else if (state.layout == UiLayout.ChoiceMenu) {
            let textStartY = state.title.length > 0 ? 18 : 8
            for (let i = 0; i < state.lines.length; i++) {
                img.print(state.lines[i], 6, textStartY + i * 9, textColor)
            }
            let startY = state.title.length > 0 ? 16 : 8
            if (state.lines.length > 0) startY = 18 + state.lines.length * 8 + 2
            for (let i = 0; i < state.options.length; i++) {
                if (i == state.selected) {
                    img.fillRect(4, startY + i * 8 - 1, state.w - 8, 8, accentColor)
                    img.print(">", 6, startY + i * 8, textColor)
                }
                img.print(state.options[i], 14, startY + i * 8, textColor)
            }
        } else {
            if (state.portrait) img.drawTransparentImage(state.portrait, 6, 18)
            else img.drawRect(6, 18, 28, 28, accentColor)

            img.print(state.name, 40, 18, textColor)
            img.print("Lv " + state.level, 40, 28, textColor)
            img.print("HP", 40, 40, textColor)
            drawGauge(img, 56, 40, state.w - 62, 8, state.hp, state.hpMax, hpColor(state.hp, state.hpMax), textColor)
            img.print("" + state.hp + "/" + state.hpMax, 40, 50, textColor)
            img.print("EXP", 40, 60, textColor)
            drawGauge(img, 60, 60, state.w - 66, 6, state.exp, state.expMax, 9, textColor)
        }

        state.sprite.setImage(img)
        state.sprite.setPosition(state.x + state.w / 2, state.y + state.h / 2)
        state.sprite.setFlag(SpriteFlag.Invisible, !state.visible)
    }

    export function createUI(layout: UiLayout, x: number, y: number, w: number, h: number, theme: Theme): Sprite {
        let ui = sprites.create(image.create(w, h), SpriteKind.PokemonUI)
        ui.setFlag(SpriteFlag.RelativeToCamera, true)
        ui.setFlag(SpriteFlag.Ghost, true)
        ui.z = 120

        let state = new UiState()
        state.sprite = ui
        state.layout = layout
        state.theme = theme
        state.x = x
        state.y = y
        state.w = w
        state.h = h
        state.title = ""
        state.lines = []
        state.options = []
        state.selected = 0
        state.name = "MON"
        state.level = 1
        state.hp = 1
        state.hpMax = 1
        state.exp = 0
        state.expMax = 100
        state.visible = true
        state.portrait = null
        all.push(state)
        redraw(state)
        return ui
    }

    export function destroyUI(ui: Sprite) {
        for (let i = 0; i < all.length; i++) {
            if (all[i].sprite == ui) {
                all.removeAt(i)
                break
            }
        }
        if (ui) ui.destroy()
    }

    export function setTitle(ui: Sprite, title: string) {
        let state = getState(ui)
        if (!state) return
        if (state.title == title) return
        state.title = title
        redraw(state)
    }

    export function clearText(ui: Sprite) {
        let state = getState(ui)
        if (!state) return
        if (state.lines.length == 0) return
        state.lines = []
        redraw(state)
    }

    export function addLine(ui: Sprite, line: string) {
        let state = getState(ui)
        if (!state) return
        state.lines.push(line)
        redraw(state)
    }

    export function setLines(ui: Sprite, lines: string[]) {
        let state = getState(ui)
        if (!state) return
        state.lines = []
        for (let line of lines) state.lines.push(line)
        redraw(state)
    }

    export function clearOptions(ui: Sprite) {
        let state = getState(ui)
        if (!state) return
        if (state.options.length == 0 && state.selected == 0) return
        state.options = []
        state.selected = 0
        redraw(state)
    }

    export function addOption(ui: Sprite, option: string) {
        let state = getState(ui)
        if (!state) return
        state.options.push(option)
        redraw(state)
    }

    export function setOptions(ui: Sprite, options: string[]) {
        let state = getState(ui)
        if (!state) return
        state.options = []
        for (let option of options) state.options.push(option)
        state.selected = 0
        redraw(state)
    }

    export function moveSelection(ui: Sprite, delta: number) {
        let state = getState(ui)
        if (!state || state.options.length == 0) return
        state.selected += delta
        if (state.selected < 0) state.selected = state.options.length - 1
        if (state.selected >= state.options.length) state.selected = 0
        redraw(state)
    }

    export function selectedIndex(ui: Sprite): number {
        let state = getState(ui)
        if (!state) return 0
        return state.selected
    }

    export function selectedOption(ui: Sprite): string {
        let state = getState(ui)
        if (!state || state.selected < 0 || state.selected >= state.options.length) return ""
        return state.options[state.selected]
    }

    export function setName(ui: Sprite, name: string) {
        let state = getState(ui)
        if (!state) return
        if (state.name == name) return
        state.name = name
        redraw(state)
    }

    export function setLevel(ui: Sprite, level: number) {
        let state = getState(ui)
        if (!state) return
        if (state.level == level) return
        state.level = level
        redraw(state)
    }

    export function setPortrait(ui: Sprite, portrait: Image) {
        let state = getState(ui)
        if (!state) return
        if (state.portrait == portrait) return
        state.portrait = portrait
        redraw(state)
    }

    export function setHP(ui: Sprite, hp: number, hpMax: number) {
        let state = getState(ui)
        if (!state) return
        let nextMax = Math.max(1, hpMax)
        let nextHp = clamp(hp, 0, nextMax)
        if (state.hp == nextHp && state.hpMax == nextMax) return
        state.hpMax = nextMax
        state.hp = nextHp
        redraw(state)
    }

    export function setEXP(ui: Sprite, exp: number, expMax: number) {
        let state = getState(ui)
        if (!state) return
        let nextMax = Math.max(1, expMax)
        let nextExp = clamp(exp, 0, nextMax)
        if (state.exp == nextExp && state.expMax == nextMax) return
        state.expMax = nextMax
        state.exp = nextExp
        redraw(state)
    }

    export function setVisible(ui: Sprite, visible: boolean) {
        let state = getState(ui)
        if (!state) return
        if (state.visible == visible) return
        state.visible = visible
        redraw(state)
    }

    export function setTheme(ui: Sprite, theme: Theme) {
        let state = getState(ui)
        if (!state) return
        if (state.theme == theme) return
        state.theme = theme
        redraw(state)
    }

    export function setPosition(ui: Sprite, x: number, y: number) {
        let state = getState(ui)
        if (!state) return
        if (state.x == x && state.y == y) return
        state.x = x
        state.y = y
        redraw(state)
    }

    export function refresh(ui: Sprite) {
        let state = getState(ui)
        if (!state) return
        redraw(state)
    }

    export function createDialog(theme: Theme): Sprite {
        let ui = createUI(UiLayout.MessageBox, 4, 72, 90, 40, theme)
        setTitle(ui, "Mensagem")
        return ui
    }

    export function createMenu(theme: Theme): Sprite {
        let ui = createUI(UiLayout.ChoiceMenu, 92, 68, 64, 50, theme)
        setTitle(ui, "Menu")
        return ui
    }

    export function createStatusCard(theme: Theme): Sprite {
        let ui = createUI(UiLayout.StatusCard, 8, 8, 144, 72, theme)
        setTitle(ui, "Status")
        return ui
    }

    export function createBattleHud(theme: Theme): Sprite {
        let ui = createUI(UiLayout.BattleHud, 8, 8, 144, 72, theme)
        setTitle(ui, "Batalha")
        return ui
    }
}
