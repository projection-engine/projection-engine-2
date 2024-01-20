import TEXTURE_WRAPPING from "../static/texture/TEXTURE_WRAPPING"
import TEXTURE_FILTERING from "../static/texture/TEXTURE_FILTERING"
import TEXTURE_FORMATS from "../static/texture/TEXTURE_FORMATS"
import GPUService from "../services/GPUService"
import TextureParams from "../static/TextureParams"
import imageToBitmap from "@engine-core/utils/image-to-bitmap";


export default class Texture {
    loaded = false
    texture?: WebGLTexture
    attributes: TextureParams = {}
    #image?: ImageBitmap | HTMLImageElement
    readonly #id: string
    get id() {
        return this.#id
    }

    constructor(id: string) {
        this.#id = id
    }

    async initialize(attributes: TextureParams) {
        this.loaded = false
        const img = attributes.img
        this.attributes = attributes
        if (typeof img === "string") {
            if (img.includes("data:image/")) {
                this.#image = await imageToBitmap(
                    img,
                    attributes.compressionRatio,
                    attributes.resolutionScale
                )
                this.attributes.height = this.#image.height
                this.attributes.width = this.#image.width
            } else {
                const i = new Image()
                i.src = img
                await i.decode()
                this.#image = i
                this.attributes.height = i.naturalHeight
                this.attributes.width = i.naturalWidth
            }
        } else {
            this.attributes.height = img.height
            this.attributes.width = img.width
            this.#image = img
        }

        const {
            wrapS = TEXTURE_WRAPPING.REPEAT,
            wrapT = TEXTURE_WRAPPING.REPEAT,
            minFilter = TEXTURE_FILTERING.MIN.LINEAR_MIPMAP_LINEAR,
            magFilter = TEXTURE_FILTERING.MAG.LINEAR,
            internalFormat = TEXTURE_FORMATS.SRGBA.internalFormat,
            format = TEXTURE_FORMATS.SRGBA.format,
            width,
            height,
            type = "UNSIGNED_BYTE"
        } = this.attributes
        this.texture = GPUService.context.createTexture()
        GPUService.context.bindTexture(GPUService.context.TEXTURE_2D, this.texture)
        GPUService.context.texImage2D(GPUService.context.TEXTURE_2D, 0, GPUService.context[internalFormat], width, height, 0, GPUService.context[format], GPUService.context[type], this.#image)
        GPUService.context.texParameteri(GPUService.context.TEXTURE_2D, GPUService.context.TEXTURE_MIN_FILTER, GPUService.context[minFilter])
        GPUService.context.texParameteri(GPUService.context.TEXTURE_2D, GPUService.context.TEXTURE_MAG_FILTER, GPUService.context[magFilter])
        GPUService.context.texParameteri(GPUService.context.TEXTURE_2D, GPUService.context.TEXTURE_WRAP_S, GPUService.context[wrapS])
        GPUService.context.texParameteri(GPUService.context.TEXTURE_2D, GPUService.context.TEXTURE_WRAP_T, GPUService.context[wrapT])
        if (minFilter === TEXTURE_FILTERING.MIN.LINEAR_MIPMAP_LINEAR) {
            const anisotropicEXT = GPUService.context.getExtension("EXT_texture_filter_anisotropic")
            const anisotropicAmountMin = 8
            const anisotropicAmount = Math.min(anisotropicAmountMin, GPUService.context.getParameter(anisotropicEXT.MAX_TEXTURE_MAX_ANISOTROPY_EXT))
            GPUService.context.texParameterf(GPUService.context.TEXTURE_2D, anisotropicEXT.TEXTURE_MAX_ANISOTROPY_EXT, anisotropicAmount)
            GPUService.context.generateMipmap(GPUService.context.TEXTURE_2D)
        }
        this.attributes = null
        GPUService.context.bindTexture(GPUService.context.TEXTURE_2D, null)
        if (this.#image instanceof ImageBitmap)
            this.#image.close()
        this.#image = null
        this.loaded = true
    }

    update(attributes: TextureParams) {
        if (this.loaded)
            GPUService.context.deleteTexture(this.texture)
        this.initialize(attributes).catch(console.error)

    }

    static createTexture(
        width: number,
        height: number,
        internalFormat: number,
        border: number,
        format: number,
        type: number,
        data: null | HTMLImageElement | ImageBitmap,
        minFilter: number,
        magFilter: number,
        wrapS: number,
        wrapT: number,
        yFlip: boolean,
        autoUnbind = true
    ): WebGLTexture {
        const texture = GPUService.context.createTexture()

        GPUService.context.bindTexture(GPUService.context.TEXTURE_2D, texture)
        GPUService.context.texImage2D(GPUService.context.TEXTURE_2D, 0, internalFormat, width, height, border, format, type, data)
        GPUService.context.texParameteri(GPUService.context.TEXTURE_2D, GPUService.context.TEXTURE_MAG_FILTER, magFilter)
        GPUService.context.texParameteri(GPUService.context.TEXTURE_2D, GPUService.context.TEXTURE_MIN_FILTER, minFilter)

        if (wrapS !== undefined)
            GPUService.context.texParameteri(GPUService.context.TEXTURE_2D, GPUService.context.TEXTURE_WRAP_S, wrapS)
        if (wrapT !== undefined)
            GPUService.context.texParameteri(GPUService.context.TEXTURE_2D, GPUService.context.TEXTURE_WRAP_T, wrapT)
        if (yFlip === true) GPUService.context.pixelStorei(GPUService.context.UNPACK_FLIP_Y_WEBGL, false)
        if (autoUnbind)
            GPUService.context.bindTexture(GPUService.context.TEXTURE_2D, null)

        return texture
    }

}
