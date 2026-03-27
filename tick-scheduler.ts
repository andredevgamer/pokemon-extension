namespace tickScheduler {
    let slowTick = 0
    let mediumTick = 0
    let fastTick = 0

    export function everyFast(handler: () => void) {
        game.onUpdateInterval(50, function () {
            fastTick++
            handler()
        })
    }

    export function everyMedium(handler: () => void) {
        game.onUpdateInterval(100, function () {
            mediumTick++
            handler()
        })
    }

    export function everySlow(handler: () => void) {
        game.onUpdateInterval(250, function () {
            slowTick++
            handler()
        })
    }

    export function fastCount(): number {
        return fastTick
    }

    export function mediumCount(): number {
        return mediumTick
    }

    export function slowCount(): number {
        return slowTick
    }
}
