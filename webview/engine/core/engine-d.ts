import EntityQueryService from "@engine-core/services/EntityQueryService";
import Camera from "@engine-core/core/Camera";
import ConsoleAPI from "@engine-core/services/ConsoleAPI";
import InputEventsAPI from "@engine-core/services/InputEventsAPI";
import GUIService from "@engine-core/services/GUIService";
import PhysicsWorld from "@engine-core/core/PhysicsWorld";
import GPUAPI from "@engine-core/services/GPUAPI";
import GPU from "@engine-core/core/GPU";
import Components from "@engine-core/static/Components";
import World from "@engine-core/core/World";

enum CameraProjectionType {
    PERSPECTIVE,
    ORTHOGRAPHIC
}

interface SerializationPackage {
    root: string,
    dependencies: Record<string, SerializableClass>
}


interface CustomEngineScript {
    onCreate(): void

    execute(): void

    GPU: GPU
    GPUAPI: GPUAPI
    PhysicsWorld: PhysicsWorld
    GUIService: GUIService
    World: World
    InputEventsAPI: InputEventsAPI
    ConsoleAPI: ConsoleAPI
    Components: typeof Components
    Camera: Camera
    EntityQueryService: EntityQueryService
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

type ShaderUniforms = Record<string, WebGLUniformLocation>

interface ResourceLoader {
    requestShader(vertexName: string, fragName: string): Promise<{ vertex: string, fragment: string }>
    prepareShader(shader: string): Promise<string>
}

export {
    ResourceLoader,
    ShaderUniforms,
    CameraProjectionType,
    SerializableArray,
    SerializableClass,
    SerializableAcceptedTypes,
    SerializationPackage,
    EmbeddedMeshes,
    GLSLTypes,
    CustomEngineScript
}