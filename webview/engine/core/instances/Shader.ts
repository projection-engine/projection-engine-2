import GPU from "../core/GPU"
import UBORepository, {StaticUBONames} from "../repositories/UBORepository"
import {GLSLTypes} from "@engine-core/engine-d";

const regex = /uniform(\s+)(highp|mediump|lowp)?(\s*)((\w|_)+)((\s|\w|_)*);/gm
const regexMatch = /uniform(\s+)(highp|mediump|lowp)?(\s*)((\w|_)+)((\s|\w|_)*);$/m

interface Uniform {
    type: string,
    name: string,
    parent?: string,
    arraySize?: number,
    uLocations?: WebGLUniformLocation[],
    uLocation?: WebGLUniformLocation
}

export default class Shader {
    program?: WebGLProgram
    uniforms = []
    uniformMap: { [key: string]: WebGLUniformLocation } = {}
    length = 0
    messages = {
        error: undefined,
        messages: undefined,
        hasError: false
    }
    txt

    constructor(vertex: string, fragment: string) {
        const alert = []
        this.program = GPU.context.createProgram()

        const vertexBuilt = "#version 300 es\n" + vertex
        const fragmentBuilt = "#version 300 es\n" + fragment

        this.txt = fragmentBuilt
        const vertexShader = this.#compileShader(vertexBuilt, GPU.context.VERTEX_SHADER, m => alert.push(m))
        const fragmentShader = this.#compileShader(fragmentBuilt, GPU.context.FRAGMENT_SHADER, m => alert.push(m))

        GPU.context.attachShader(this.program, vertexShader)
        GPU.context.attachShader(this.program, fragmentShader)
        // if (!GPU.context.getProgramParameter(this.program, GPU.context.VALIDATE_STATUS)) {
        //     console.error("Program validation failed:", GPU.context.getProgramInfoLog(this.program));
        // }

        GPU.context.linkProgram(this.program)


        GPU.context.flush()
        this.#extractUniforms(vertexBuilt)
        this.#extractUniforms(fragmentBuilt)
        this.uniforms = this.uniforms.filter(u => u !== undefined && typeof u.uLocation === "object" || typeof u.uLocations === "object")

        for (let i = 0; i < this.uniforms.length; i++)
            this.uniformMap[this.uniforms[i].name] = this.uniforms[i].uLocation || this.uniforms[i].uLocations


        const error = GPU.context.getError();
        // if (error !== GPU.context.NO_ERROR) {
        //     throw new Error("(Creating shader) WebGL error: " + GPUAPI.getWebGLErrorString(error))
        // }
        this.messages = {
            error,
            messages: alert,
            hasError: alert.length > 0
        }
        this.length = this.uniforms.length

        const prefix = "uniform "
        if (fragmentBuilt.includes(prefix + StaticUBONames.CAMERA_VIEW) || vertexBuilt.includes(prefix + StaticUBONames.CAMERA_VIEW))
            UBORepository.cameraViewUBO.bindWithShader(this.program)

        if (fragmentBuilt.includes(prefix + StaticUBONames.CAMERA_PROJECTION) || vertexBuilt.includes(prefix + StaticUBONames.CAMERA_PROJECTION))
            UBORepository.cameraProjectionUBO.bindWithShader(this.program)

        if (fragmentBuilt.includes(prefix + StaticUBONames.FRAME_COMPOSITION) || vertexBuilt.includes(prefix + StaticUBONames.FRAME_COMPOSITION))
            UBORepository.frameCompositionUBO.bindWithShader(this.program)

        if (fragmentBuilt.includes(prefix + StaticUBONames.LENS_PP) || vertexBuilt.includes(prefix + StaticUBONames.LENS_PP))
            UBORepository.lensPostProcessingUBO.bindWithShader(this.program)

        if (fragmentBuilt.includes(prefix + StaticUBONames.SSAO) || vertexBuilt.includes(prefix + StaticUBONames.SSAO))
            UBORepository.ssaoUBO.bindWithShader(this.program)

        if (fragmentBuilt.includes(prefix + StaticUBONames.UBER) || vertexBuilt.includes(prefix + StaticUBONames.UBER))
            UBORepository.uberUBO.bindWithShader(this.program)

        if (fragmentBuilt.includes(prefix + StaticUBONames.LIGHTS) || vertexBuilt.includes(prefix + StaticUBONames.LIGHTS))
            UBORepository.lightsUBO.bindWithShader(this.program)
    }

    #compileShader(shaderCode, shaderType, pushMessage) {


        const shader = GPU.context.createShader(shaderType)
        GPU.context.shaderSource(shader, shaderCode)
        GPU.context.compileShader(shader)
        const compiled = GPU.context.getShaderParameter(shader, GPU.context.COMPILE_STATUS)

        if (!compiled) {
            const error = GPU.context.getShaderInfoLog(shader)
            console.error({error, shaderCode})
            pushMessage(error)
        }
        return shader
    }


    #extractUniforms(code: string) {
        const uniforms = code.match(regex)
        if (uniforms)
            uniforms.forEach(u => {
                const match: string[] | number = u.match(regexMatch)
                if (match === null)
                    return []
                const type = match[4]
                const name: string = match[6].replace(" ", "").trim()
                if (GLSLTypes[type] != null) {
                    this.uniforms.push({
                        type,
                        name,
                        uLocation: GPU.context.getUniformLocation(this.program, name)
                    })
                    return
                }
            })
    }

    bind() {
        if (GPU.activeShader !== this) {
            GPU.context.useProgram(this.program)
            GPU.activeShader = this
        }
    }

    bindForUse(data: MutableObject) {
        this.bind()
        let currentSamplerIndex = 0
        const increase = () => currentSamplerIndex++
        for (let v = 0; v < this.length; v++) {
            const current = this.uniforms[v]
            if (current.uLocations != null) {
                const dataAttr = current.parent !== undefined ? data[current.parent] : data[current.name]
                if (!dataAttr)
                    continue
                for (let i = 0; i < current.uLocations.length; i++) {
                    const u = current.uLocations[i]
                    const d = dataAttr[i]
                    if (current.parent)
                        Shader.bind(u, d[current.name], current.type, currentSamplerIndex, increase)
                    else
                        Shader.bind(u, d, current.type, currentSamplerIndex, increase)
                }
            } else {
                const dataAttribute = current.parent !== undefined ? data[current.parent][current.name] : data[current.name]
                Shader.bind(current.uLocation, dataAttribute, current.type, currentSamplerIndex, increase)
            }
        }

    }

    static bind(uLocation, data, type, currentSamplerIndex, increaseIndex) {

        switch (type) {
            case "float":
            case "int":
            case "vec2":
            case "vec3":
            case "vec4":
            case "ivec2":
            case "ivec3":
            case "bool":
                if (data == null)
                    return
                GPU.context[GLSLTypes[type]](uLocation, data)
                break
            case "mat3":
                if (data == null)
                    return
                GPU.context.uniformMatrix3fv(uLocation, false, data)
                break
            case "mat4":
                if (data == null)
                    return
                GPU.context.uniformMatrix4fv(uLocation, false, data)
                break
            case "samplerCube":
                GPU.context.activeTexture(GPU.context.TEXTURE0 + currentSamplerIndex)
                GPU.context.bindTexture(GPU.context.TEXTURE_CUBE_MAP, data)
                GPU.context.uniform1i(uLocation, currentSamplerIndex)
                increaseIndex()
                break
            case "sampler2D":
                GPU.bind2DTextureForDrawing(uLocation, currentSamplerIndex, data)
                increaseIndex()
                break
            default:
                break
        }

    }


}
