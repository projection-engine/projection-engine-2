import GPU from "@engine-core/core/GPU"
import COLLISION_TYPES from "../../core/static/COLLISION_TYPES"
import {mat4, vec3} from "gl-matrix"
import StaticMeshRepository from "@engine-core/repositories/StaticMeshRepository"
import FramebufferRepository from "@engine-core/repositories/FramebufferRepository"
import StaticEditorMeshes from "../utils/StaticEditorMeshes"
import CameraIconRenderer from "../icons/CameraIconRenderer"
import EngineToolsState from "../EngineToolsState"
import ProjectionEngine from "@lib/ProjectionEngine";
import Components from "@engine-core/static/Components";
import ShaderRepository from "@engine-core/repositories/ShaderRepository";

const EMPTY_MATRIX = mat4.create()
const translationCache = vec3.create()
export default class WireframeRenderer {
	static execute() {
		if(!EngineToolsState.showOutline)
			return
		const entities = ProjectionEngine.Engine.getEntities().array
		const size = entities.length
		const uniforms = ShaderRepository.wireframeUniforms
		const context = GPU.context

		ShaderRepository.wireframe.bind()
		GPU.bind2DTextureForDrawing(uniforms.depth, 0,FramebufferRepository.sceneDepthVelocity)

		const cameras = ProjectionEngine.Engine.getByComponent(Components.CAMERA)
		const camerasSize = cameras.length
		for (let i = 0; i < camerasSize; i++)
			CameraIconRenderer.execute(cameras[i])


		for (let i = 0; i < size; i++) {
			const entity = entities[i]
			if (!entity.active || entity.distanceFromCamera > EngineToolsState.maxDistanceIcon)
				continue

			const collision = entity.physicsColliderComponent
			const decal = entity.decalComponent

			if (!decal && !collision)
				continue


			if (collision) {
				if (entity.changesApplied || !entity.__collisionTransformationMatrix) {
					entity.collisionUpdated = true
					const m = entity.__collisionTransformationMatrix || mat4.clone(EMPTY_MATRIX)
					vec3.add(translationCache, <vec3>collision.center, entity.absoluteTranslation)
					let scale
					const rotation = entity._rotationQuaternion
					if (collision.collisionType === COLLISION_TYPES.BOX)
						scale = collision.size
					else {
						const r = collision.radius
						scale = [r, r, r]
					}
					mat4.fromRotationTranslationScale(m, rotation, translationCache, scale)
					entity.__collisionTransformationMatrix = m
				}

				context.uniformMatrix4fv(uniforms.transformMatrix, false, entity.__collisionTransformationMatrix)
				switch (collision.collisionType) {
				case COLLISION_TYPES.SPHERE:
					StaticMeshRepository.sphere.draw()
					break
				case COLLISION_TYPES.BOX:
					StaticEditorMeshes.clipSpaceCamera.drawLines()
					break
				}
			} else if (decal) {

				context.uniformMatrix4fv(uniforms.transformMatrix, false, entity.matrix)
				context.uniform1i(uniforms.isSelected, entity.__isSelected ? 1 : 0)
				StaticEditorMeshes.clipSpaceCamera.drawLines()

			}
		}
	}
}
