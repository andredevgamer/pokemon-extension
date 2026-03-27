namespace miniMap {
    export class Node {
        id: string
        name: string
        description: string
        x: number
        y: number
    }

    let nodes: Node[] = []
    let links: string[][] = []
    let visited: string[] = []
    let currentId = ""

    function findNode(id: string): Node {
        for (let node of nodes) if (node.id == id) return node
        return null
    }

    function hasVisited(id: string): boolean {
        for (let value of visited) if (value == id) return true
        return false
    }

    export function clear() {
        nodes = []
        links = []
        visited = []
        currentId = ""
    }

    export function addNode(id: string, name: string, x: number, y: number, description: string) {
        let node = findNode(id)
        if (node) {
            node.name = name
            node.x = x
            node.y = y
            node.description = description
            return
        }
        let next = new Node()
        next.id = id
        next.name = name
        next.x = x
        next.y = y
        next.description = description
        nodes.push(next)
    }

    export function connect(a: string, b: string) {
        links.push([a, b])
    }

    export function visit(id: string) {
        if (!hasVisited(id)) visited.push(id)
        currentId = id
    }

    export function current(): string {
        return currentId
    }

    export function isVisited(id: string): boolean {
        return hasVisited(id)
    }

    export function visitedCount(): number {
        return visited.length
    }

    export function visitedId(index: number): string {
        if (index < 0 || index >= visited.length) return ""
        return visited[index]
    }

    export function nodeName(id: string): string {
        let node = findNode(id)
        return node ? node.name : id
    }

    export function nodeDescription(id: string): string {
        let node = findNode(id)
        return node ? node.description : ""
    }

    export function draw(target: Image, x: number, y: number, w: number, h: number) {
        target.fillRect(x, y, w, h, 15)
        target.drawRect(x, y, w, h, 13)
        for (let link of links) {
            let a = findNode(link[0])
            let b = findNode(link[1])
            if (!a || !b) continue
            target.drawLine(x + a.x, y + a.y, x + b.x, y + b.y, 13)
        }
        for (let node of nodes) {
            let color = hasVisited(node.id) ? 10 : 12
            if (node.id == currentId) color = 2
            target.fillRect(x + node.x - 2, y + node.y - 2, 5, 5, color)
            target.drawRect(x + node.x - 3, y + node.y - 3, 7, 7, 1)
            target.print(node.name, x + node.x + 6, y + node.y - 2, 1, image.font5)
        }
    }
}
