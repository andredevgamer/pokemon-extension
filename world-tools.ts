namespace worldTools {
    export function createDecor(img: Image, x: number, y: number, z = 2): Sprite {
        let s = sprites.create(img, SpriteKind.Decor)
        s.setFlag(SpriteFlag.Ghost, true)
        s.setPosition(x, y)
        s.z = z
        performanceHelper.trackSprite(s)
        return s
    }

    export function createNpc(img: Image, x: number, y: number, z = 5): Sprite {
        let s = sprites.create(img, SpriteKind.Npc)
        s.setFlag(SpriteFlag.Ghost, true)
        s.setPosition(x, y)
        s.z = z
        performanceHelper.trackSprite(s)
        return s
    }

    export function createUi(img: Image, x: number, y: number, z = 100): Sprite {
        let s = sprites.create(img, SpriteKind.PokemonUI)
        s.setFlag(SpriteFlag.Ghost, true)
        s.setFlag(SpriteFlag.RelativeToCamera, true)
        s.setPosition(x, y)
        s.z = z
        performanceHelper.trackSprite(s)
        return s
    }

    export function distance(a: Sprite, b: Sprite): number {
        if (!a || !b) return 99999
        return Math.abs(a.x - b.x) + Math.abs(a.y - b.y)
    }

    export function nearest(origin: Sprite, list: Sprite[], maxDistance: number): Sprite {
        let best: Sprite = null
        let bestDistance = maxDistance
        for (let s of list) {
            let d = distance(origin, s)
            if (d <= bestDistance) {
                best = s
                bestDistance = d
            }
        }
        return best
    }
}
