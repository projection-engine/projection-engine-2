import Texture from "../instances/Texture"
import Material from "../instances/Material"

import Framebuffer from "../instances/Framebuffer"
import Mesh, {MeshProps} from "../instances/Mesh"
import Shader from "../instances/Shader"
import GPUService from "./GPUService"
import MaterialAPI from "./MaterialAPI"
import DepthPrePassSystem from "../runtime/DepthPrePassSystem"
import UberShader from "../repositories/UberShader"
import StaticMeshes from "../repositories/StaticMeshes"
import TextureParams from "../static/TextureParams"
import MaterialInformation from "../static/MaterialInformation"
import MeshResourceMapper from "../repositories/MeshResourceMapper"
import MaterialResourceMapper from "../repositories/MaterialResourceMapper"

export default class GPUAPI {
	static async allocateTexture(imageData: string | TextureParams, id: string) {
		try {
			if (GPUService.textures.get(id) != null)
				return GPUService.textures.get(id)
			const texture = new Texture(id)
			await texture.initialize(typeof imageData === "string" ? {img: imageData} : imageData)

			GPUService.textures.set(id, texture)
			return texture
		} catch (err) {
			console.error(err)
			return null
		}
	}

	static destroyTexture(imageID) {
		const found = GPUService.textures.get(imageID)
		if (!found)
			return
		if (found.texture instanceof WebGLTexture)
			GPUService.context.deleteTexture(found.texture)
		GPUService.textures.delete(imageID)
	}

	static destroyMaterial(id: string) {
		const mat = GPUService.materials.get(id)
		if (!mat)
			return
		MaterialResourceMapper.deleteMaterial(id)
		delete UberShader.uberSignature[mat.signature]
		GPUService.materials.delete(id)
	}

	static async allocateMaterial(materialInformation: MaterialInformation, id: string): Promise<Material | undefined> {
		if (GPUService.materials.get(id) !== undefined)
			return GPUService.materials.get(id)
		const signature = materialInformation.executionSignature
		const material = new Material(id, signature)

		material.updateMaterialDeclaration(materialInformation.functionDeclaration, materialInformation.uniformsDeclaration)
		await material.updateUniformGroup(materialInformation.uniformValues)
		MaterialAPI.registerMaterial(material)
		const settings = materialInformation.settings

		UberShader.uberSignature[signature] = true

		material.renderingMode = settings.renderingMode
		material.doubleSided = settings.doubleSided
		material.ssrEnabled = settings.ssrEnabled

		GPUService.materials.set(id, material)

		UberShader.compile()
		DepthPrePassSystem.needsUpdate = true
		return material
	}


	static createBuffer(type, data, renderingType = GPUService.context.STATIC_DRAW) {
		if (!data && data.buffer instanceof ArrayBuffer && data.byteLength !== undefined || data.length === 0)
			return null
		const buffer = GPUService.context.createBuffer()
		GPUService.context.bindBuffer(type, buffer)
		GPUService.context.bufferData(type, data, renderingType)
		return buffer
	}


	static cleanUpTextures() {
		const mat = Array.from(GPUService.materials.values())
		const textures = Array.from(GPUService.textures.keys())
		const inUse = {}
		for (let i = 0; i < mat.length; i++) {
			textures.forEach(t => {
				if (!mat[i]?.texturesInUse)
					return
				if (mat[i].texturesInUse[t] != null)
					inUse[t] = true
			})
		}
		textures.forEach(t => {
			if (!inUse[t])
				GPUAPI.destroyTexture(t)
		})
	}

	static copyTexture(target: Framebuffer, source: Framebuffer, type: number = GPUService.context.DEPTH_BUFFER_BIT, blitType: number = GPUService.context.NEAREST) {
		const context = GPUService.context
		context.bindFramebuffer(context.READ_FRAMEBUFFER, source.FBO)
		context.bindFramebuffer(context.DRAW_FRAMEBUFFER, target.FBO)
		context.blitFramebuffer(
			0, 0,
			source.width, source.height,
			0, 0,
			target.width, target.height,
			type,
			blitType
		)
		context.bindFramebuffer(context.DRAW_FRAMEBUFFER, null)
	}

	static allocateFramebuffer(id, width = GPUService.internalResolution.w, height = GPUService.internalResolution.h) {
		if (GPUService.frameBuffers.get(id))
			return GPUService.frameBuffers.get(id)
		const fbo = new Framebuffer(width, height)
		GPUService.frameBuffers.set(id, fbo)
		return fbo
	}

	static destroyFramebuffer(id) {
		const fbo = GPUService.frameBuffers.get(id)
		if (!fbo)
			return
		for (let i = 0; i < fbo.colors.length; i++) {
			GPUService.context.deleteTexture(fbo.colors[i])
		}
		if (fbo.depthSampler instanceof WebGLTexture)
			GPUService.context.deleteTexture(fbo.depthSampler)
		if (fbo.RBO)
			GPUService.context.deleteRenderbuffer(fbo.RBO)
		GPUService.context.deleteFramebuffer(fbo.FBO)
		GPUService.frameBuffers.delete(id)
	}

	static allocateMesh(id: string, bufferData: MeshProps) {
		if (GPUService.meshes.get(id) != null)
			GPUAPI.destroyMesh(GPUService.meshes.get(id))
		const instance = new Mesh({...bufferData, id})
		GPUService.meshes.set(id, instance)
		DepthPrePassSystem.needsUpdate = true
		return instance
	}

	static destroyMesh(instance: string | Mesh) {
		const mesh = typeof instance === "string" ? GPUService.meshes.get(instance) : instance
		if ([StaticMeshes.cube, StaticMeshes.plane, StaticMeshes.cylinder, StaticMeshes.sphere].includes(mesh))
			return

		MeshResourceMapper.deleteMesh(mesh.id)
		if (mesh instanceof Mesh) {
			GPUService.context.deleteVertexArray(mesh.VAO)
			GPUService.context.deleteBuffer(mesh.indexVBO)
			if (mesh.uvVBO)
				mesh.uvVBO.delete()
			if (mesh.normalVBO)
				mesh.normalVBO.delete()
			GPUService.meshes.delete(mesh.id)
		}
		DepthPrePassSystem.needsUpdate = true
	}

	static allocateShader(id, vertex, fragment) {
		const instance = new Shader(vertex, fragment)
		GPUService.shaders.set(id, instance)
		return instance
	}

	static destroyShader(id: string) {
		const instance = GPUService.shaders.get(id)
		if (!instance)
			return
		GPUService.context.deleteProgram(instance.program)
		GPUService.shaders.delete(id)
	}

	static getWebGLErrorString(errorCode) {
		switch (errorCode) {
			case GPUService.context.NO_ERROR:
				return "No error";
			case GPUService.context.INVALID_ENUM:
				return "Invalid enum";
			case GPUService.context.INVALID_VALUE:
				return "Invalid value";
			case GPUService.context.INVALID_OPERATION:
				return "Invalid operation";
			case GPUService.context.INVALID_FRAMEBUFFER_OPERATION:
				return "Invalid framebuffer operation";
			case GPUService.context.OUT_OF_MEMORY:
				return "Out of memory";
			case GPUService.context.CONTEXT_LOST_WEBGL:
				return "Context lost";
			default:
				return "Unknown error code: " + errorCode;
		}
	}
}