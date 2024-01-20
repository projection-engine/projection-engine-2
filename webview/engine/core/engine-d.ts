enum CameraProjectionType {
    PERSPECTIVE,

    ORTHOGRAPHIC
}

interface SerializableClass {
    className: string,
    value: string
}

type AcceptedTypes = string | number | boolean | { type: "object", value: SerializableArray } | {
    type: "serializable",
    value: SerializableClass
}
type SerializableAcceptedTypes = AcceptedTypes | AcceptedTypes[] | { [key: string]: AcceptedTypes }

interface SerializableValue {
    [key: string]: SerializableAcceptedTypes
}

interface SerializableArray {
    array: number[],
    type: "f32" | "ui8"
}

export {CameraProjectionType, SerializableArray, SerializableClass, SerializableValue, SerializableAcceptedTypes}