interface ComponentDTO{
    componentType: number
}

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

interface Property{
    label: string,
    type: PropertyType,
    objectKey?: string,
    settings?: MutableObject
}

interface PropertySettings {
    min?: number
    isAngle?: boolean
    max?: number
    increment?: number
    labels?: string[]
    options?: {label: string, value: any}[]
}

export {ComponentDTO, TabDTO, PropertyType, Property, PropertySettings}
