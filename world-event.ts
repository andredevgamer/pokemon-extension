namespace WorldEvents {
    /**
     * =========================================================
     * WORLD EVENTS SYSTEM
     * Sistema modular para:
     * - quests
     * - flags de progresso
     * - trigger zones
     * - diálogos encadeados
     * - portas / interiores
     * - NPC progress
     * =========================================================
     */

    // ---------------------------------------------------------
    // ESTADO GLOBAL
    // ---------------------------------------------------------

    let questStages: { [key: string]: number } = {}
    let flags: { [key: string]: boolean } = {}

    // Player registrado no sistema
    let currentPlayer: Sprite = null

    // Evita dois diálogos/eventos pesados ao mesmo tempo
    let busy = false

    // Nome da área/mapa atual
    let currentMapId = ""

    // ---------------------------------------------------------
    // TIPOS
    // ---------------------------------------------------------

    interface TriggerZone {
        id: string
        mapId: string
        x: number
        y: number
        width: number
        height: number
        enabled: boolean
        once: boolean
        fired: boolean
        onEnter: () => void
        onLeave?: () => void
        inside: boolean
    }

    let triggers: TriggerZone[] = []

    // ---------------------------------------------------------
    // CONFIG / INICIALIZAÇÃO
    // ---------------------------------------------------------

    export function init(player: Sprite) {
        currentPlayer = player
    }

    export function setMap(mapId: string) {
        currentMapId = mapId
        resetMapTriggerPresence(mapId)
    }

    export function getMap(): string {
        return currentMapId
    }

    export function isBusy(): boolean {
        return busy
    }

    export function setBusy(value: boolean) {
        busy = value
    }

    // ---------------------------------------------------------
    // QUESTS
    // ---------------------------------------------------------

    export function setQuestStage(id: string, stage: number) {
        questStages[id] = stage
    }

    export function getQuestStage(id: string): number {
        if (questStages[id] == null) return 0
        return questStages[id]
    }

    export function advanceQuest(id: string) {
        setQuestStage(id, getQuestStage(id) + 1)
    }

    export function isQuestStage(id: string, stage: number): boolean {
        return getQuestStage(id) == stage
    }

    export function isQuestAtLeast(id: string, stage: number): boolean {
        return getQuestStage(id) >= stage
    }

    // ---------------------------------------------------------
    // FLAGS
    // ---------------------------------------------------------

    export function setFlag(id: string, value: boolean) {
        flags[id] = value
    }

    export function getFlag(id: string): boolean {
        return !!flags[id]
    }

    export function clearFlag(id: string) {
        flags[id] = false
    }

    // ---------------------------------------------------------
    // DIÁLOGOS
    // ---------------------------------------------------------

    export function runDialog(lines: string[], onEnd?: () => void) {
        if (busy) return

        busy = true
        for (let i = 0; i < lines.length; i++) {
            game.showLongText(lines[i], DialogLayout.Bottom)
        }
        busy = false

        if (onEnd) onEnd()
    }

    export function runDialogIf(flagId: string, lines: string[], onEnd?: () => void) {
        if (getFlag(flagId)) return

        runDialog(lines, function () {
            setFlag(flagId, true)
            if (onEnd) onEnd()
        })
    }

    // ---------------------------------------------------------
    // TRIGGERS
    // ---------------------------------------------------------

    export function addTrigger(
        id: string,
        mapId: string,
        x: number,
        y: number,
        width: number,
        height: number,
        onEnter: () => void,
        once: boolean = true,
        onLeave?: () => void
    ) {
        triggers.push({
            id: id,
            mapId: mapId,
            x: x,
            y: y,
            width: width,
            height: height,
            enabled: true,
            once: once,
            fired: false,
            onEnter: onEnter,
            onLeave: onLeave,
            inside: false
        })
    }

    export function enableTrigger(id: string) {
        for (let t of triggers) {
            if (t.id == id) {
                t.enabled = true
                return
            }
        }
    }

    export function disableTrigger(id: string) {
        for (let t of triggers) {
            if (t.id == id) {
                t.enabled = false
                return
            }
        }
    }

    export function resetTrigger(id: string) {
        for (let t of triggers) {
            if (t.id == id) {
                t.fired = false
                t.inside = false
                return
            }
        }
    }

    export function removeTrigger(id: string) {
        for (let i = triggers.length - 1; i >= 0; i--) {
            if (triggers[i].id == id) {
                triggers.removeAt(i)
            }
        }
    }

    export function clearMapTriggers(mapId: string) {
        for (let i = triggers.length - 1; i >= 0; i--) {
            if (triggers[i].mapId == mapId) {
                triggers.removeAt(i)
            }
        }
    }

    export function clearAllTriggers() {
        triggers = []
    }

    function resetMapTriggerPresence(mapId: string) {
        for (let t of triggers) {
            if (t.mapId == mapId) {
                t.inside = false
            }
        }
    }

    function pointInsideTrigger(px: number, py: number, t: TriggerZone): boolean {
        return px >= t.x &&
            px <= t.x + t.width &&
            py >= t.y &&
            py <= t.y + t.height
    }

    export function update() {
        if (!currentPlayer) return
        if (busy) return

        // Só verifica triggers do mapa atual
        for (let t of triggers) {
            if (!t.enabled) continue
            if (t.mapId != currentMapId) continue

            let insideNow = pointInsideTrigger(currentPlayer.x, currentPlayer.y, t)

            // Entrou na área
            if (insideNow && !t.inside) {
                t.inside = true

                if (!t.once || !t.fired) {
                    t.fired = true
                    t.onEnter()
                }
            }

            // Saiu da área
            if (!insideNow && t.inside) {
                t.inside = false
                if (t.onLeave) t.onLeave()
            }
        }
    }

    // ---------------------------------------------------------
    // PORTAS / TELEPORTE
    // ---------------------------------------------------------

    export function addDoor(
        id: string,
        mapId: string,
        x: number,
        y: number,
        width: number,
        height: number,
        targetMapId: string,
        targetTilemap: tiles.TileMapData,
        targetX: number,
        targetY: number
    ) {
        addTrigger(id, mapId, x, y, width, height, function () {
            if (busy) return

            busy = true
            scene.setBackgroundColor(15)
            tiles.setCurrentTilemap(targetTilemap)
            setMap(targetMapId)

            if (currentPlayer) {
                currentPlayer.setPosition(targetX, targetY)
            }

            pause(100)
            busy = false
        }, false)
    }

    export function teleportPlayer(targetX: number, targetY: number) {
        if (!currentPlayer) return
        currentPlayer.setPosition(targetX, targetY)
    }

    // ---------------------------------------------------------
    // NPCs / INTERAÇÕES
    // ---------------------------------------------------------

    export function talkByQuest(
        questId: string,
        dialogs: string[][],
        onStagesEnd?: (() => void)[]
    ) {
        let stage = getQuestStage(questId)

        if (stage < 0) stage = 0
        if (stage >= dialogs.length) stage = dialogs.length - 1
        if (stage < 0) return

        runDialog(dialogs[stage], function () {
            if (onStagesEnd && onStagesEnd[stage]) {
                onStagesEnd[stage]()
            }
        })
    }

    export function interactNpc(
        npcId: string,
        questId: string,
        stageDialogs: string[][],
        autoAdvanceStages: boolean = false
    ) {
        let stage = getQuestStage(questId)

        if (stage < 0) stage = 0
        if (stage >= stageDialogs.length) stage = stageDialogs.length - 1

        if (stage < 0) return

        runDialog(stageDialogs[stage], function () {
            if (autoAdvanceStages) {
                advanceQuest(questId)
            }
            setFlag("npc_talked_" + npcId, true)
        })
    }

    // ---------------------------------------------------------
    // HELPERS DE EVENTO
    // ---------------------------------------------------------

    export function runOnce(flagId: string, action: () => void) {
        if (getFlag(flagId)) return
        setFlag(flagId, true)
        action()
    }

    export function runIfQuestStage(questId: string, stage: number, action: () => void) {
        if (getQuestStage(questId) == stage) {
            action()
        }
    }

    export function runIfQuestAtLeast(questId: string, stage: number, action: () => void) {
        if (getQuestStage(questId) >= stage) {
            action()
        }
    }

    // ---------------------------------------------------------
    // DEBUG OPCIONAL
    // ---------------------------------------------------------

    export function debugState() {
        game.showLongText(
            "Mapa: " + currentMapId +
            "\nBusy: " + busy,
            DialogLayout.Bottom
        )
    }
}
