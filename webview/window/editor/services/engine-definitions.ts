enum EngineEvents {
    CREATE_ENTITY = "CREATE_ENTITY",
    DELETE_ENTITY = "DELETE_ENTITY",
    GET_HIERARCHY = "GET_HIERARCHY",
    SELECT_ENTITIES = "SELECT_ENTITIES",
    GET_SELECTED_ENTITIES = "GET_SELECTED_ENTITIES",
    LOCK_ENTITY = "LOCK_ENTITY",
    GET_LOCKED_ENTITY = "GET_LOCKED_ENTITY",
    TOGGLE_ACTIVE = "TOGGLE_ACTIVE",
    RENAME_ENTITY = "RENAME_ENTITY",
    MAKE_PARENT = "MAKE_PARENT",
    UPDATE_ENGINE_STATE = "UPDATE_ENGINE_STATE",
    UPDATE_ENTITY = "UPDATE_ENTITY",
    UPDATE_COMPONENT = "UPDATE_COMPONENT",
    GET_ENTITY_COMPONENTS = "GET_ENTITY_COMPONENTS",
    GET_ENTITY = "GET_ENTITY",
    ADD_COMPONENT = "ADD_COMPONENT",
    GET_ENGINE_STATE = "GET_ENGINE_STATE"
}

interface EngineStateDTO {
}

interface SettingsDTO {
}

enum ComponentType {
    MOVEMENT = "MOVEMENT",
    ATMOSPHERE = "ATMOSPHERE",
    CAMERA = "CAMERA",
    CULLING = "CULLING",
    COLLIDER = "COLLIDER",
    DECAL = "DECAL",
    LIGHT = "LIGHT",
    LIGHT_PROBE = "LIGHT_PROBE",
    MESH_MATERIAL = "MESH_MATERIAL",
    TERRAIN = "TERRAIN",
    SPRITE = "SPRITE",
    RIGID_BODY = "RIGID_BODY",
}

interface ComponentDTO {
    componentType: number;
}

enum RotationType {
    ROTATION_QUATERNION,
    ROTATION_EULER_XYZ,
    ROTATION_EULER_XZY,
    ROTATION_EULER_YXZ,
    ROTATION_EULER_YZX,
    ROTATION_EULER_ZXY,
    ROTATION_EULER_ZYX,
}

interface EntityDTO {
    name: string,
    entityID: number,
    active: boolean

    // ONLY PRESENT ON HIERARCHY CALLS
    children?: EntityDTO[]
    components?: number[]
}

enum AtmosphereRenderingType {
    MIE,
    RAYLEIGH,
    COMBINED
}

export {EngineEvents, EngineStateDTO, SettingsDTO, ComponentType, RotationType, EntityDTO, ComponentDTO, AtmosphereRenderingType};
