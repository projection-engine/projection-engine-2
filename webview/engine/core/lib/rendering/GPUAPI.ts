import Texture from "../../instances/Texture"
import Material from "../../instances/Material"

import Framebuffer from "../../instances/Framebuffer"
import Mesh, {MeshProps} from "../../instances/Mesh"
import Shader from "../../instances/Shader"
import GPU from "../../GPU"
import MaterialAPI from "./MaterialAPI"
import VisibilityRenderer from "../../runtime/VisibilityRenderer"
import UberShader from "../UberShader"
import StaticMeshes from "../StaticMeshes"
import TextureParams from "../../static/TextureParams"
import MaterialInformation from "../../static/MaterialInformation"
import MeshResourceMapper from "../MeshResourceMapper"
import MaterialResourceMapper from "../MaterialResourceMapper"

export default class GPUAPI {
	static async allocateTexture(imageData: string | TextureParams, id: string) {
		try {
			if (GPU.textures.get(id) != null)
				return GPU.textures.get(id)
			const texture = new Texture(id)
			await texture.initialize(typeof imageData === "string" ? {img: imageData} : imageData)

			GPU.textures.set(id, texture)
			return texture
		} catch (err) {
			console.error(err)
			return null
		}
	}

	static destroyTexture(imageID) {
		const found = GPU.textures.get(imageID)
		if (!found)
			return
		if (found.texture instanceof WebGLTexture)
			GPU.context.deleteTexture(found.texture)
		GPU.textures.delete(imageID)
	}

	static destroyMaterial(id: string) {
		const mat = GPU.materials.get(id)
		if (!mat)
			return
		MaterialResourceMapper.deleteMaterial(id)
		delete UberShader.uberSignature[mat.signature]
		GPU.materials.delete(id)
	}

	static async allocateMaterial(materialInformation: MaterialInformation, id: string): Promise<Material | undefined> {
		if (GPU.materials.get(id) !== undefined)
			return GPU.materials.get(id)
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

		GPU.materials.set(id, material)

		UberShader.compile()
		VisibilityRenderer.needsUpdate = true
		return material
	}


	static createBuffer(type, data, renderingType = GPU.context.STATIC_DRAW) {
		if (!data && data.buffer instanceof ArrayBuffer && data.byteLength !== undefined || data.length === 0)
			return null
		const buffer = GPU.context.createBuffer()
		GPU.context.bindBuffer(type, buffer)
		GPU.context.bufferData(type, data, renderingType)
		return buffer
	}


	static cleanUpTextures() {
		const mat = Array.from(GPU.materials.values())
		const textures = Array.from(GPU.textures.keys())
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

	static copyTexture(target: Framebuffer, source: Framebuffer, type: number = GPU.context.DEPTH_BUFFER_BIT, blitType: number = GPU.context.NEAREST) {
		const context = GPU.context
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

	static allocateFramebuffer(id, width = GPU.internalResolution.w, height = GPU.internalResolution.h) {
		if (GPU.frameBuffers.get(id))
			return GPU.frameBuffers.get(id)
		const fbo = new Framebuffer(width, height)
		GPU.frameBuffers.set(id, fbo)
		return fbo
	}

	static destroyFramebuffer(id) {
		const fbo = GPU.frameBuffers.get(id)
		if (!fbo)
			return
		for (let i = 0; i < fbo.colors.length; i++) {
			GPU.context.deleteTexture(fbo.colors[i])
		}
		if (fbo.depthSampler instanceof WebGLTexture)
			GPU.context.deleteTexture(fbo.depthSampler)
		if (fbo.RBO)
			GPU.context.deleteRenderbuffer(fbo.RBO)
		GPU.context.deleteFramebuffer(fbo.FBO)
		GPU.frameBuffers.delete(id)
	}

	static allocateMesh(id: string, bufferData: MeshProps) {
		if (GPU.meshes.get(id) != null)
			GPUAPI.destroyMesh(GPU.meshes.get(id))
		const instance = new Mesh({...bufferData, id})
		GPU.meshes.set(id, instance)
		VisibilityRenderer.needsUpdate = true
		return instance
	}

	static destroyMesh(instance: string | Mesh) {
		const mesh = typeof instance === "string" ? GPU.meshes.get(instance) : instance
		if ([StaticMeshes.cube, StaticMeshes.plane, StaticMeshes.cylinder, StaticMeshes.sphere].includes(mesh))
			return

		MeshResourceMapper.deleteMesh(mesh.id)
		if (mesh instanceof Mesh) {
			GPU.context.deleteVertexArray(mesh.VAO)
			GPU.context.deleteBuffer(mesh.indexVBO)
			if (mesh.uvVBO)
				mesh.uvVBO.delete()
			if (mesh.normalVBO)
				mesh.normalVBO.delete()
			GPU.meshes.delete(mesh.id)
		}
		VisibilityRenderer.needsUpdate = true
	}

	static allocateShader(id, vertex, fragment) {
		const instance = new Shader(vertex, fragment)
		GPU.shaders.set(id, instance)
		return instance
	}

	static destroyShader(id: string) {
		const instance = GPU.shaders.get(id)
		if (!instance)
			return
		GPU.context.deleteProgram(instance.program)
		GPU.shaders.delete(id)
	}
}