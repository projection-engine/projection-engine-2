import {mat4, vec3} from "gl-matrix"
import CUBE_MAP_VIEWS from "../static/CUBE_MAP_VIEWS"
import ShadowProbe from "../instances/ShadowProbe"
import LightComponent from "../instances/components/LightComponent"
import GPU from "../GPU"
import StaticShaders from "../lib/StaticShaders"
import MATERIAL_RENDERING_TYPES from "../static/MATERIAL_RENDERING_TYPES"
import MetricsController from "../lib/utils/MetricsController"
import METRICS_FLAGS from "../static/METRICS_FLAGS"
import loopMeshes from "./loop-meshes"
import Entity from "../instances/Entity"
import Mesh from "../instances/Mesh"
import IEngineSystem from "@engine-core/IEngineSystem";

const cacheVec3 = vec3.create()
const cacheViewMatrix = mat4.create()
let cacheProjection
let currentEntity
let lightsToUpdate: LightComponent[]
export default class PointShadowsSystem extends IEngineSystem {
    static changed = false
    static maxCubeMaps = 2
    static shadowMap?: ShadowProbe
    static sampler?: WebGLTexture
    static lightsToUpdate: LightComponent[] = []

  async  initialize() {
        PointShadowsSystem.shadowMap = new ShadowProbe(512)
        PointShadowsSystem.sampler = PointShadowsSystem.shadowMap.texture
        lightsToUpdate = PointShadowsSystem.lightsToUpdate
    }

    execute(gl: WebGL2RenderingContext) {

        if (!PointShadowsSystem.changed && lightsToUpdate.length === 0)
            return

        gl.cullFace(gl.BACK)
        gl.viewport(0, 0, 512, 512)
        for (let i = 0; i < PointShadowsSystem.maxCubeMaps; i++) {
            const current = lightsToUpdate[i]
            if (!current)
                continue
            currentEntity = current.entity
            PointShadowsSystem.shadowMap
                .draw((yaw, pitch, perspective, index) => {

                        vec3.add(cacheVec3, currentEntity._translation, <vec3>CUBE_MAP_VIEWS.target[index])
                        mat4.lookAt(cacheViewMatrix, currentEntity._translation, cacheVec3, <vec3>CUBE_MAP_VIEWS.up[index])
                        cacheProjection = perspective

                        loopMeshes((entity, mesh) => this.#loopCallback(entity, mesh))
                    },
                    current.zFar,
                    current.zNear
                )
        }
        PointShadowsSystem.changed = false
        lightsToUpdate.length = 0
        MetricsController.currentState = METRICS_FLAGS.OMNIDIRECTIONAL_SHADOWS
    }

    #loopCallback(entity: Entity, mesh: Mesh) {
        const meshComponent = entity.meshComponent
        if (!meshComponent.castsShadows || !entity.active || entity.materialRef?.renderingMode === MATERIAL_RENDERING_TYPES.SKY)
            return
        vec3.sub(cacheVec3, entity.absoluteTranslation, entity.absoluteTranslation)
        const distanceFromLight = vec3.length(cacheVec3)
        if (distanceFromLight > currentEntity.lightComponent.cutoff)
            return
        StaticShaders.omniDirectShadows.bindForUse({
            farPlane: currentEntity.lightComponent.zFar,
            viewMatrix: cacheViewMatrix,
            transformMatrix: entity.matrix,
            projectionMatrix: cacheProjection,
            lightPosition: entity.absoluteTranslation
        })
        mesh.draw()
    }
}