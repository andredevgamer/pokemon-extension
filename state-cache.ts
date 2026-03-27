namespace stateCache {
    let numbers: { [key: string]: number } = {}
    let texts: { [key: string]: string } = {}

    export function setNumber(key: string, value: number): boolean {
        if (numbers[key] == value) return false
        numbers[key] = value
        return true
    }

    export function setText(key: string, value: string): boolean {
        if (texts[key] == value) return false
        texts[key] = value
        return true
    }

    export function getNumber(key: string): number {
        return numbers[key]
    }

    export function getText(key: string): string {
        return texts[key]
    }

    export function clearKey(key: string) {
        numbers[key] = null
        texts[key] = null
    }
}
