import {mat4} from "gl-matrix"
import Mesh from "./Mesh"
import getProbeRotation from "../utils/get-probe-rotation"
import CubeMapAPI from "../services/CubeMapAPI"
import GPUService from "../services/GPUService"

const cacheMat4 = mat4.create()
export default class ShadowProbe {
    texture
    _resolution

    constructor(resolution) {
        this.resolution = resolution
    }

    set resolution(data) {
        this._resolution = data
        // this.texture = CubeMapAPI.initializeTexture(true, data, false)
    }

    get resolution() {
        return this._resolution
    }

    draw(callback, zFar = 25, zNear = 1) {
        if (!this.texture)
            this.texture = CubeMapAPI.initializeTexture(true, this._resolution, false)

        const resolution = this._resolution,
            texture = this.texture
        mat4.perspective(cacheMat4, Math.PI / 2, 1, zNear, zFar)

        Mesh.finishIfUsed()
        const rbo = CubeMapAPI.createRenderBuffer(resolution)
        GPUService.context.viewport(0, 0, resolution, resolution)
        for (let i = 0; i < 6; i++) {
            const rotations = getProbeRotation(i)
            GPUService.context.framebufferTexture2D(
                GPUService.context.FRAMEBUFFER,
                GPUService.context.DEPTH_ATTACHMENT,
                GPUService.context.TEXTURE_CUBE_MAP_POSITIVE_X + i,
                texture,
                0
            )
            GPUService.context.clear(GPUService.context.DEPTH_BUFFER_BIT)
            callback(rotations.yaw, rotations.pitch, cacheMat4, i)
        }

        GPUService.context.deleteRenderbuffer(rbo)
    }
}
