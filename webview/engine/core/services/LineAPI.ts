import VertexBuffer from "../instances/VertexBuffer"
import Mesh from "../instances/Mesh"
import GPUService from "./GPUService"
import AbstractEngineService from "@engine-core/AbstractEngineService";


export default class LineAPI extends AbstractEngineService{
    static vaoX
    static vboX
    static vaoY
    static vboY
    static vaoZ
    static vboZ
    static #initialized = false

    async initialize() {
        const X = [0, 0, 0, 1, 0, 0]
        const Y = [0, 0, 0, 0, 1, 0]
        const Z = [0, 0, 0, 0, 0, 1]
        if (LineAPI.#initialized) return
        LineAPI.#initialized = true

        LineAPI.vaoX = GPUService.context.createVertexArray()
        GPUService.context.bindVertexArray(LineAPI.vaoX)
        LineAPI.vboX = new VertexBuffer(
            0,
            new Float32Array(X),
            GPUService.context.ARRAY_BUFFER,
            3,
            GPUService.context.FLOAT
        )
        GPUService.context.bindVertexArray(null)

        LineAPI.vaoY = GPUService.context.createVertexArray()
        GPUService.context.bindVertexArray(LineAPI.vaoY)
        LineAPI.vboY = new VertexBuffer(
            0,
            new Float32Array(Y),
            GPUService.context.ARRAY_BUFFER,
            3,
            GPUService.context.FLOAT
        )
        GPUService.context.bindVertexArray(null)

        LineAPI.vaoZ = GPUService.context.createVertexArray()
        GPUService.context.bindVertexArray(LineAPI.vaoZ)
        LineAPI.vboZ = new VertexBuffer(
            0,
            new Float32Array(Z),
            GPUService.context.ARRAY_BUFFER,
            3,
            GPUService.context.FLOAT
        )

    }

    static drawX() {
        const vbo = LineAPI.vboX,
            vao = LineAPI.vaoX

        Mesh.finishIfUsed()

        GPUService.context.bindVertexArray(vao)
        vbo.enable()
        GPUService.context.drawArrays(GPUService.context.LINES, 0, 2)

        GPUService.context.bindVertexArray(null)
        vbo.disable()
    }

    static drawY() {
        const vbo = LineAPI.vboY,
            vao = LineAPI.vaoY


        Mesh.finishIfUsed()

        GPUService.context.bindVertexArray(vao)
        vbo.enable()
        GPUService.context.drawArrays(GPUService.context.LINES, 0, 2)


        GPUService.context.bindVertexArray(null)
        vbo.disable()
    }


    static drawZ() {
        const vbo = LineAPI.vboZ,
            vao = LineAPI.vaoZ

        Mesh.finishIfUsed()

        GPUService.context.bindVertexArray(vao)
        vbo.enable()
        GPUService.context.drawArrays(GPUService.context.LINES, 0, 2)

        GPUService.context.bindVertexArray(null)
        vbo.disable()
    }

}