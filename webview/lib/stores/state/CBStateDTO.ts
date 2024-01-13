import IStateDTO from "@lib/stores/state/IStateDTO";

export default class CBStateDTO extends IStateDTO {
    selectedItems = []
    items = []
    textures = []
    meshes = []
    levels = []
    materials = []
    materialInstances = []
    simpleMaterials = []
    components = []
    uiLayouts = []
    terrains = []
    terrainMaterials = []
    toCut = []
    collections = []
}