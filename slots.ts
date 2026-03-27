namespace AdvancedSlots {

    export class Item {
        id: string
        icon: Image
        maxStack: number
        type: string

        constructor(id: string, icon: Image, maxStack = 1, type = "generic") {
            this.id = id
            this.icon = icon
            this.maxStack = maxStack
            this.type = type
        }
    }

    export class Slot {
        item: Item
        amount: number

        constructor(item: Item = null, amount = 0) {
            this.item = item
            this.amount = amount
        }

        isEmpty(): boolean {
            return this.item == null
        }

        clear() {
            this.item = null
            this.amount = 0
        }
    }

    export class Inventory {
        private slots: Slot[]
        private size: number
        private selected: number
        private onChangeCallback: () => void

        constructor(size: number) {
            this.size = size
            this.slots = []
            this.selected = 0

            for (let i = 0; i < size; i++) {
                this.slots.push(new Slot())
            }
        }

        add(item: Item, amount = 1): boolean {
            for (let slot of this.slots) {
                if (!slot.isEmpty() && slot.item.id == item.id && slot.amount < slot.item.maxStack) {
                    let space = slot.item.maxStack - slot.amount
                    let addAmount = Math.min(space, amount)
                    slot.amount += addAmount
                    amount -= addAmount
                    if (amount <= 0) {
                        this.changed()
                        return true
                    }
                }
            }

            for (let slot of this.slots) {
                if (slot.isEmpty()) {
                    let addAmount = Math.min(item.maxStack, amount)
                    slot.item = item
                    slot.amount = addAmount
                    amount -= addAmount
                    if (amount <= 0) {
                        this.changed()
                        return true
                    }
                }
            }

            this.changed()
            return false
        }

        remove(itemId: string, amount = 1): boolean {
            for (let slot of this.slots) {
                if (!slot.isEmpty() && slot.item.id == itemId) {
                    let removeAmount = Math.min(slot.amount, amount)
                    slot.amount -= removeAmount
                    amount -= removeAmount

                    if (slot.amount <= 0) {
                        slot.clear()
                    }

                    if (amount <= 0) {
                        this.changed()
                        return true
                    }
                }
            }

            this.changed()
            return false
        }

        has(itemId: string): boolean {
            return this.count(itemId) > 0
        }

        count(itemId: string): number {
            let total = 0
            for (let slot of this.slots) {
                if (!slot.isEmpty() && slot.item.id == itemId) {
                    total += slot.amount
                }
            }
            return total
        }

        swap(a: number, b: number) {
            if (a < 0 || a >= this.size) return
            if (b < 0 || b >= this.size) return
            let temp = this.slots[a]
            this.slots[a] = this.slots[b]
            this.slots[b] = temp
            this.changed()
        }

        select(index: number) {
            if (index >= 0 && index < this.size) {
                this.selected = index
                this.changed()
            }
        }

        next() {
            this.selected = (this.selected + 1) % this.size
            this.changed()
        }

        previous() {
            this.selected--
            if (this.selected < 0) this.selected = this.size - 1
            this.changed()
        }

        moveSelection(columns: number, dx: number, dy: number) {
            columns = Math.max(1, columns)
            let rows = Math.idiv(this.size + columns - 1, columns)
            let col = this.selected % columns
            let row = Math.idiv(this.selected, columns)

            col = Math.max(0, Math.min(columns - 1, col + dx))
            row = Math.max(0, Math.min(rows - 1, row + dy))

            let next = row * columns + col
            if (next >= this.size) next = this.size - 1
            this.selected = next
            this.changed()
        }

        getSelected(): Slot {
            return this.slots[this.selected]
        }

        getSelectedIndex(): number {
            return this.selected
        }

        get(index: number): Slot {
            if (index < 0 || index >= this.size) return null
            return this.slots[index]
        }

        getSize(): number {
            return this.size
        }

        set(index: number, item: Item, amount = 1) {
            if (index < 0 || index >= this.size) return
            this.slots[index].item = item
            this.slots[index].amount = amount
            this.changed()
        }

        clear() {
            for (let slot of this.slots) {
                slot.clear()
            }
            this.changed()
        }

        onChange(cb: () => void) {
            this.onChangeCallback = cb
        }

        private changed() {
            if (this.onChangeCallback) this.onChangeCallback()
        }

        draw(x: number, y: number, spacing = 18) {
            this.drawOn(screen, x, y, spacing)
        }

        drawOn(target: Image, x: number, y: number, spacing = 18) {
            for (let i = 0; i < this.size; i++) {
                let px = x + i * spacing
                let py = y
                let slot = this.slots[i]
                let selected = i == this.selected

                target.fillRect(px, py, 16, 16, selected ? 10 : 1)
                target.fillRect(px + 1, py + 1, 14, 14, selected ? 4 : 15)
                target.drawRect(px, py, 16, 16, selected ? 7 : 13)

                if (!slot.isEmpty()) {
                    target.drawTransparentImage(slot.item.icon, px + 4, py + 4)
                    if (slot.amount > 1) {
                        target.print(slot.amount.toString(), px + 1, py + 9, 3, image.font5)
                    }
                }
            }
        }

        drawGrid(x: number, y: number, columns: number, cellWidth = 34, cellHeight = 24) {
            this.drawGridOn(screen, x, y, columns, cellWidth, cellHeight)
        }

        drawGridOn(target: Image, x: number, y: number, columns: number, cellWidth = 34, cellHeight = 24) {
            columns = Math.max(1, columns)

            for (let i = 0; i < this.size; i++) {
                let col = i % columns
                let row = Math.idiv(i, columns)
                let px = x + col * cellWidth
                let py = y + row * cellHeight
                let slot = this.slots[i]
                let selected = i == this.selected

                let outer = selected ? 10 : 13
                let inner = selected ? 15 : 1
                let panel = selected ? 4 : 15
                let badge = selected ? 7 : 3

                target.fillRect(px, py, cellWidth - 2, cellHeight - 2, inner)
                target.drawRect(px, py, cellWidth - 2, cellHeight - 2, outer)
                target.drawRect(px + 1, py + 1, cellWidth - 4, cellHeight - 4, selected ? 7 : 8)
                target.fillRect(px + 2, py + 2, cellWidth - 6, 4, panel)
                target.fillRect(px + 2, py + 7, cellWidth - 6, cellHeight - 11, selected ? 15 : 12)

                if (selected) {
                    target.fillRect(px + 3, py + cellHeight - 7, cellWidth - 8, 3, 10)
                }

                if (!slot.isEmpty()) {
                    target.fillRect(px + 4, py + 8, 12, 12, 1)
                    target.drawRect(px + 4, py + 8, 12, 12, selected ? 10 : 13)
                    target.drawTransparentImage(slot.item.icon, px + 6, py + 10)
                    target.print(slot.item.id, px + 19, py + 9, 1, image.font5)
                    if (slot.amount > 1) {
                        target.fillRect(px + cellWidth - 16, py + cellHeight - 11, 12, 8, badge)
                        target.drawRect(px + cellWidth - 16, py + cellHeight - 11, 12, 8, 1)
                        target.print(slot.amount.toString(), px + cellWidth - 14, py + cellHeight - 9, 1, image.font5)
                    }
                } else {
                    target.drawLine(px + 8, py + 10, px + cellWidth - 12, py + cellHeight - 8, 13)
                    target.drawLine(px + cellWidth - 12, py + 10, px + 8, py + cellHeight - 8, 13)
                }
            }
        }
    }

    //% block="criar item id %id tipo %type stack %max"
    export function createItem(id: string, icon: Image, max = 1, type = "generic"): Item {
        return new Item(id, icon, max, type)
    }

    //% block="criar inventário com %size slots"
    export function createInventory(size: number): Inventory {
        return new Inventory(size)
    }
}
