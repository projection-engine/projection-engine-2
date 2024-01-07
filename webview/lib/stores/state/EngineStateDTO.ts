import IStateDTO from "@lib/stores/state/IStateDTO";

export default class EngineStateDTO extends IStateDTO {
    meta = {}
    cameraInitialized = false
    executingAnimation = false
    scripts = []
    focusedCamera = undefined
}