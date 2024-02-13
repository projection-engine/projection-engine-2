

interface TabDTO {
    icon?: string,
    label?: string
    divider?: boolean
}

enum PropertyType {
    NUMBER,
    GROUP,
    ARRAY,
    STRING,
    OPTIONS,
    COLOR,
    BOOLEAN,
    IMAGE,
    MESH,
    MATERIAL,
    TERRAIN,
    QUAT_EULER,
}

interface PropertySettings {
    min?: number
    isAngle?: boolean
    max?: number
    increment?: number
    labels?: string[]
    options?: {label: string, value: any}[]
}

export { TabDTO, PropertyType,  PropertySettings}
