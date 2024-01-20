import ConversionAPI from "./ConversionAPI"
import GPUService from "./GPUService"
import StaticFBO from "../repositories/StaticFBO"

export default class PickingAPI {
    static readBlock(start, end) {
        const w = Math.round(Math.abs(start.x - end.x))
        const h = Math.round(Math.abs(start.y - end.y))
        GPUService.context.bindFramebuffer(GPUService.context.FRAMEBUFFER, StaticFBO.visibility.FBO)
        GPUService.context.readBuffer(GPUService.context.COLOR_ATTACHMENT1)
        const dd = new Uint8Array(w * h * 4)
        GPUService.context.readPixels(
            end.x > start.x ? start.x : end.x,
            end.y > start.y ? start.y : end.y,
            w,
            h,
            GPUService.context.RGBA,
            GPUService.context.UNSIGNED_BYTE,
            dd
        )
        GPUService.context.bindFramebuffer(GPUService.context.FRAMEBUFFER, null)

        return dd
    }

    static getPickerId(i: number) {
        return [
            ((i >> 0) & 0xFF) / 0xFF,
            ((i >> 8) & 0xFF) / 0xFF,
            ((i >> 16) & 0xFF) / 0xFF
        ]
    }

    static readPixels(framebuffer, attachment = 0, coords: { x: number, y: number }) {
        GPUService.context.bindFramebuffer(GPUService.context.FRAMEBUFFER, framebuffer)
        GPUService.context.readBuffer(GPUService.context.COLOR_ATTACHMENT0 + attachment)
        const dd = new Uint8Array(4)
        GPUService.context.readPixels(
            coords.x,
            coords.y,
            1,
            1,
            GPUService.context.RGBA,
            GPUService.context.UNSIGNED_BYTE,
            dd
        )
        GPUService.context.bindFramebuffer(GPUService.context.FRAMEBUFFER, null)

        return dd
    }


    static readEntityID(x: number, y: number, attachment:number, framebuffer: WebGLFramebuffer): number {
        const w = GPUService.canvas.width, h = GPUService.canvas.height
        const coords = ConversionAPI.toQuadCoordinates(x, y, w, h)
        const picked = PickingAPI.readPixels(framebuffer, attachment, coords)

        return Math.round(picked[0] + picked[1] + picked[2])
    }


}
