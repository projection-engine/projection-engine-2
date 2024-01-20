import getGlslSizes from "../utils/get-glsl-sizes"
import GPUAPI from "@engine-core/services/GPUAPI";
import AbstractEngineResource from "@engine-core/AbstractEngineResource";

interface Item {
    offset: number,
    dataSize: number,
    chunkSize: number
}

interface Data {
    name: string
    type: string
    offset?: number
    dataSize?: number
    chunkSize?: number
    dataLength?: number
}

export default class UBO extends AbstractEngineResource<UBO>{
    items: Item[] = []
    keys: string[] = []
    buffer?: WebGLBuffer
    blockName?: string
    blockPoint?: number
    static #blockPointIncrement = 0


    initialize(blockName: string, dataArray: Data[]){
        const bufferSize = UBO.#calculate(dataArray)
        for (let i = 0; i < dataArray.length; i++) {
            this.items[dataArray[i].name] = {
                offset: dataArray[i].offset,
                dataSize: dataArray[i].dataSize,
                chunkSize: dataArray[i].chunkSize
            }
            this.keys[i] = dataArray[i].name
        }

        this.blockName = blockName
        this.blockPoint = UBO.#blockPointIncrement
        UBO.#blockPointIncrement += 1

        this.buffer = this.gl.createBuffer()
        this.gl.bindBuffer(this.gl.UNIFORM_BUFFER, this.buffer)
        this.gl.bufferData(this.gl.UNIFORM_BUFFER, bufferSize, this.gl.DYNAMIC_DRAW)
        this.gl.bindBuffer(this.gl.UNIFORM_BUFFER, null)
        this.gl.bindBufferBase(this.gl.UNIFORM_BUFFER, this.blockPoint, this.buffer)
        return this
    }

    bindWithShader(shaderProgram: WebGLProgram) {
        this.gl.useProgram(shaderProgram)
        const index = this.gl.getUniformBlockIndex(shaderProgram, this.blockName)
        this.gl.uniformBlockBinding(shaderProgram, index, this.blockPoint)
        this.gl.bindBuffer(this.gl.UNIFORM_BUFFER, null)

        const error = this.gl.getError();
        if (error !== this.gl.NO_ERROR) {
            throw new Error(`(Binding UBO to shader) WebGL error: ${GPUAPI.getWebGLErrorString(error)} ${index} ${this.blockName}`)
        }
    }

    bind() {
        this.gl.bindBuffer(this.gl.UNIFORM_BUFFER, this.buffer)
    }

    unbind() {
        this.gl.bindBuffer(this.gl.UNIFORM_BUFFER, null)
    }

    updateData(name: string, data: Float32Array | Uint8Array) {
        if(this.items[name] != null) {
            this.gl.bufferSubData(this.gl.UNIFORM_BUFFER, this.items[name].offset, data, 0, null)
        }
    }

    updateBuffer(data) {
        this.gl.bufferSubData(this.gl.UNIFORM_BUFFER, 0, data, 0, null)
    }

    static #calculate(dataArray: Data[]): number {
        let chunk = 16,
            tsize = 0,
            offset = 0,
            size

        for (let i = 0; i < dataArray.length; i++) {
            if (!dataArray[i].dataLength || dataArray[i].dataLength === 0)
                size = getGlslSizes(dataArray[i].type)
            else
                size = [dataArray[i].dataLength * 16 * 4, dataArray[i].dataLength * 16 * 4]

            tsize = chunk - size[0]

            if (tsize < 0 && chunk < 16) {
                offset += chunk
                if (i > 0) dataArray[i - 1].chunkSize += chunk
                chunk = 16
            } else if (tsize === 0) {
                if (dataArray[i].type === "vec3" && chunk === 16) chunk -= size[1]
                else chunk = 16
            } else if (tsize >= 0 || chunk !== 16) chunk -= size[1]


            dataArray[i].offset = offset
            dataArray[i].chunkSize = size[1]
            dataArray[i].dataSize = size[1]

            offset += size[1]
        }


        return offset
    }

}