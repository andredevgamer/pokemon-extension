namespace basicBehaviors {
    let blinkIds = 0
    let activeBlinks: { [key: string]: number } = {}

    export function isNear(a: Sprite, b: Sprite, distance: number): boolean {
        if (!a || !b) return false
        return Math.abs(a.x - b.x) + Math.abs(a.y - b.y) <= distance
    }

    export function createScreenSprite(img: Image, z = 110): Sprite {
        let s = sprites.create(img, SpriteKind.PokemonUI)
        s.setFlag(SpriteFlag.Ghost, true)
        s.setFlag(SpriteFlag.RelativeToCamera, true)
        s.setPosition(screen.width / 2, screen.height / 2)
        s.z = z
        performanceHelper.trackSprite(s)
        return s
    }

    export function lockPlayer(player: Sprite) {
        if (!player) return
        controller.moveSprite(player, 0, 0)
        player.vx = 0
        player.vy = 0
    }

    export function unlockPlayer(player: Sprite, speed = 70) {
        if (!player) return
        controller.moveSprite(player, speed, speed)
    }

    export function blink(sprite: Sprite, interval = 400) {
        if (!sprite) return
        blinkIds++
        let id = blinkIds
        activeBlinks["" + sprite.id] = id
        let visible = true
        game.onUpdateInterval(interval, function () {
            if (!sprite) return
            if (activeBlinks["" + sprite.id] != id) return
            visible = !visible
            sprite.setFlag(SpriteFlag.Invisible, !visible)
        })
    }

    export function stopBlink(sprite: Sprite) {
        if (!sprite) return
        activeBlinks["" + sprite.id] = 0
        sprite.setFlag(SpriteFlag.Invisible, false)
    }

    export function destroySprite(sprite: Sprite) {
        if (!sprite) return
        stopBlink(sprite)
        performanceHelper.untrackSprite(sprite)
        sprite.destroy()
    }

    export function destroyAll(list: Sprite[]) {
        if (!list) return
        for (let s of list) {
            if (!s) continue
            destroySprite(s)
        }
        while (list.length > 0) {
            list.removeAt(list.length - 1)
        }
    }
}
