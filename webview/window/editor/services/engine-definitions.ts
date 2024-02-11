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
    MAKE_PARENT = "MAKE_PARENT"
}

interface EngineStateDTO {
}

interface SettingsDTO {
}

enum ComponentType {
    MOVEMENT,
    ATMOSPHERE,
    CAMERA,
    CULLING,
    COLLIDER,
    DECAL,
    LIGHT,
    LIGHT_PROBE,
    MESH,
    TERRAIN,
    SPRITE,
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
    entityID: number
}

export {EngineEvents, EngineStateDTO, SettingsDTO, ComponentType, RotationType, EntityDTO, ComponentDTO};