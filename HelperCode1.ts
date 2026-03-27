//% weight=100 color=#0fbc11 icon="\uf085"
namespace performanceHelper {

    // =========================
    // CONFIG
    // =========================
    let maxSprites = 50
    let performanceMode = false
    let managedSprites: Sprite[] = []

    // =========================
    // OBJECT POOL (MULTI-TIPO)
    // =========================
    let pools: { [key: string]: Sprite[] } = {}

    //% block="obter sprite do tipo %type"
    export function getSprite(type: string): Sprite {
        if (!pools[type]) pools[type] = []

        if (pools[type].length > 0) {
            let s = pools[type].pop()
            s.setFlag(SpriteFlag.Invisible, false)
            trackSprite(s)
            return s
        }

        let sprite = sprites.create(img`
            . . . . .
            . 2 2 2 .
            . 2 . 2 .
            . 2 2 2 .
            . . . . .
        `)
        sprite.setFlag(SpriteFlag.Ghost, true)
        trackSprite(sprite)
        return sprite
    }

    //% block="liberar sprite %s do tipo %type"
    export function releaseSprite(s: Sprite, type: string) {
        if (!pools[type]) pools[type] = []

        s.setFlag(SpriteFlag.Invisible, true)
        s.setPosition(-100, -100)
        s.vx = 0
        s.vy = 0
        untrackSprite(s)

        pools[type].push(s)
    }

    //% block="registrar sprite %s para performance"
    export function trackSprite(s: Sprite) {
        if (!s) return
        for (let existing of managedSprites) {
            if (existing == s) return
        }
        managedSprites.push(s)
    }

    //% block="remover sprite %s do registro"
    export function untrackSprite(s: Sprite) {
        if (!s) return
        for (let i = managedSprites.length - 1; i >= 0; i--) {
            if (managedSprites[i] == s) managedSprites.removeAt(i)
        }
    }

    function compactManaged() {
        for (let i = managedSprites.length - 1; i >= 0; i--) {
            if (!managedSprites[i]) {
                managedSprites.removeAt(i)
            }
        }
    }

    // =========================
    // CULLING (fora da tela)
    // =========================
    //% block="ativar limpeza automática fora da tela"
    export function enableCulling() {
        game.onUpdateInterval(200, function () {
            compactManaged()
            let cameraLeft = scene.cameraProperty(CameraProperty.X) - scene.screenWidth() / 2 - 24
            let cameraRight = scene.cameraProperty(CameraProperty.X) + scene.screenWidth() / 2 + 24
            let cameraTop = scene.cameraProperty(CameraProperty.Y) - scene.screenHeight() / 2 - 24
            let cameraBottom = scene.cameraProperty(CameraProperty.Y) + scene.screenHeight() / 2 + 24

            for (let s of managedSprites) {
                // HUD e UI ficam em camadas altas e nao devem sumir.
                if (s.z >= 100) continue
                let visible = s.x >= cameraLeft && s.x <= cameraRight && s.y >= cameraTop && s.y <= cameraBottom
                s.setFlag(SpriteFlag.Invisible, !visible)
            }
        })
    }

    // =========================
    // LIMITADOR DE SPRITES
    // =========================
    //% block="definir limite de sprites %max"
    export function setMaxSprites(max: number) {
        maxSprites = max
    }

    function enforceLimit() {
        compactManaged()
        if (managedSprites.length > maxSprites) {
            for (let i = 0; i < managedSprites.length - maxSprites; i++) {
                let s = managedSprites[i]
                if (s && s.z < 100) {
                    untrackSprite(s)
                    s.destroy()
                }
            }
            compactManaged()
        }
    }

    // =========================
    // LOOP OTIMIZADO
    // =========================
    //% block="executar a cada %ms ms"
    export function optimizedLoop(ms: number, handler: () => void) {
        game.onUpdateInterval(ms, function () {
            handler()
            enforceLimit()
        })
    }

    // =========================
    // SISTEMA DE TAREFAS (ANTI-LAG)
    // =========================
    let taskQueue: (() => void)[] = []

    //% block="adicionar tarefa pesada"
    export function addTask(task: () => void) {
        taskQueue.push(task)
    }

    //% block="processar tarefas %perFrame por frame"
    export function processTasks(perFrame: number) {
        game.onUpdate(function () {
            for (let i = 0; i < perFrame; i++) {
                if (taskQueue.length > 0) {
                    let t = taskQueue.shift()
                    t()
                }
            }
        })
    }

    // =========================
    // MODO PERFORMANCE (AUTO)
    // =========================
    //% block="ativar modo performance"
    export function enablePerformanceMode() {
        performanceMode = true

        game.onUpdateInterval(500, function () {
            compactManaged()
            let count = managedSprites.length

            if (count > maxSprites * 0.8) {
                reduceLoad()
            }
        })
    }

    function reduceLoad() {
        compactManaged()
        for (let i = 0; i < Math.floor(managedSprites.length * 0.2); i++) {
            let s = managedSprites[i]
            if (s && s.z < 100) {
                untrackSprite(s)
                s.destroy()
            }
        }
        compactManaged()
    }

    // =========================
    // BATCH UPDATE (divide loops grandes)
    // =========================
    //% block="processar lista em batches de %size"
    export function batchProcess(list: any[], size: number, handler: (item: any) => void) {
        let index = 0

        game.onUpdate(function () {
            for (let i = 0; i < size; i++) {
                if (index < list.length) {
                    handler(list[index])
                    index++
                }
            }
        })
    }

    // =========================
    // DEBUG
    // =========================
    //% block="mostrar debug de performance"
    export function debug() {
        game.onUpdateInterval(1000, function () {
            compactManaged()
            let count = managedSprites.length
            game.splash("Sprites: " + count)
        })
    }

    // =========================
    // FPS SIMULADO
    // =========================
    let frameCount = 0

    //% block="mostrar FPS"
    export function showFPS() {
        game.onUpdate(function () {
            frameCount++
        })

        game.onUpdateInterval(1000, function () {
            game.splash("FPS: " + frameCount)
            frameCount = 0
        })
    }
}
