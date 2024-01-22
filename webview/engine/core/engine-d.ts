enum CameraProjectionType {
    PERSPECTIVE,
    ORTHOGRAPHIC
}

interface SerializationPackage {
    root: string,
    dependencies: Record<string, SerializableClass>
}

interface SerializableClass {
    className: string,
    value: string,
    id: string
}

type AcceptedTypes = string | number | boolean | { type: "object", value: SerializableArray } | {
    type: "serializable",
    value: SerializableClass
}
type SerializableAcceptedTypes = AcceptedTypes | AcceptedTypes[] | { [key: string]: AcceptedTypes }


interface SerializableArray {
    array: number[],
    type: "f32" | "ui8"
}

enum EmbeddedMeshes {
    CUBE = "CUBE",
    SPHERE = "SPHERE",
    PLANE = "PLANE",
    CYLINDER = "CYLINDER"
}

enum GLSLTypes {
    vec2 = "uniform2fv",
    vec3 = "uniform3fv",
    vec4 = "uniform4fv",
    mat3 = "uniformMatrix3fv",
    mat4 = "uniformMatrix4fv",
    float = "uniform1f",
    int = "uniform1i",
    sampler2D = "sampler2D",
    samplerCube = "cubemap",
    ivec2 = "uniform2iv",
    ivec3 = "uniform3iv",
    bool = "uniform1i"
}

export {
    CameraProjectionType,
    SerializableArray,
    SerializableClass,
    SerializableAcceptedTypes,
    SerializationPackage,
    EmbeddedMeshes,
    GLSLTypes
}