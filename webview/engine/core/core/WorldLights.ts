import ArrayBufferAPI from "../services/ArrayBufferAPI"
import LIGHT_TYPES from "../static/LIGHT_TYPES"
import {glMatrix, mat4, vec3} from "gl-matrix"
import DirectionalShadowsSystem from "../runtime/DirectionalShadowsSystem"
import PointShadowsSystem from "../runtime/PointShadowsSystem"
import type Entity from "../instances/Entity"
import UberShaderService from "../services/UberShaderService"
import UBORepository from "../repositories/UBORepository"
import Components from "@engine-core/static/Components";
import ProjectionEngine from "@lib/ProjectionEngine";
import RepositoryService from "@engine-core/services/serialization/RepositoryService";
import AbstractEngineCoreService from "@engine-core/core/AbstractEngineCoreService";
import Engine from "@engine-core/Engine";


/**
 * @property primaryBuffer: indexes 0-3 are reserved for [type - color - color - color]
 */

export default class WorldLights extends AbstractEngineCoreService {
    primaryBuffer: Float32Array = <Float32Array>ArrayBufferAPI.allocateVector(UberShaderService.MAX_LIGHTS * 16, 0, false, false, false)
    secondaryBuffer: Float32Array = <Float32Array>ArrayBufferAPI.allocateVector(UberShaderService.MAX_LIGHTS * 16, 0, false, false, false)
    lightsQuantity = 0
    transformedNormalCache = vec3.create()
    lightViewProjection = mat4.create()
    lightTimeout: number = 0
    cache1Mat4 = mat4.create()
    cache2Mat4 = mat4.create()


    static packageLights(keepOld?: boolean, force?: boolean) {
        const self = WorldLights.get()

        if (force) {
            WorldLights.#package(keepOld)
            return
        }
        clearTimeout(self.lightTimeout)
        self.lightTimeout = setTimeout(() => WorldLights.#package(keepOld), 50)
    }

    static get(): WorldLights {
        return RepositoryService.inject(Engine).getWorldLights()
    }

    static #package(keepOld) {
        const self = WorldLights.get()
        const lights = ProjectionEngine.Engine.getByComponent(Components.LIGHT)
        const primaryBuffer = self.primaryBuffer
        const secondaryBuffer = self.secondaryBuffer
        let size = 0, offset = 0

        if (!keepOld)
            for (let i = 0; i < primaryBuffer.length; i++) {
                primaryBuffer[i] = 0
                secondaryBuffer[i] = 0
            }

        const toLoopSize = lights.length
        for (let i = 0; i < toLoopSize; i++) {
            const current = lights[i]
            if (offset + 16 > UberShaderService.MAX_LIGHTS * 16)
                break
            if (!current.active || !current.changesApplied && !current.needsLightUpdate && keepOld)
                continue
            WorldLights.#updateBuffer(current, primaryBuffer, secondaryBuffer, offset)

            offset += 16
            size++
        }

        const atmospheres = ProjectionEngine.Engine.getByComponent(Components.ATMOSPHERE)
        for (let i = 0; i < atmospheres.length; i++) {
            const current = atmospheres[i]
            if (offset + 16 > UberShaderService.MAX_LIGHTS * 16)
                break
            if (!current.active || !current.changesApplied && !current.needsLightUpdate && keepOld)
                continue
            WorldLights.#updateAtmosphereLight(current, primaryBuffer, offset)

            offset += 16
            size++
        }

        self.lightsQuantity = size
        if (self.lightsQuantity > 0 || !keepOld) {
            UBORepository.lightsUBO.bind()
            UBORepository.lightsUBO.updateData("lightPrimaryBuffer", self.primaryBuffer)
            UBORepository.lightsUBO.updateData("lightSecondaryBuffer", self.secondaryBuffer)
            UBORepository.lightsUBO.unbind()

            UBORepository.uberUBO.bind()
            const quantity = new Uint8Array(1)
            quantity[0] = Math.min(self.lightsQuantity, UberShaderService.MAX_LIGHTS)
            UBORepository.uberUBO.updateData("lightQuantity", quantity)
            UBORepository.uberUBO.unbind()
        }
    }

    static #updateAtmosphereLight(entity: Entity, primaryBuffer: Float32Array, offset: number) {
        const component = entity.atmosphereComponent
        const position = component.sunDirection
        primaryBuffer[offset + 1] = component.intensity / 10
        primaryBuffer[offset + 2] = component.intensity / 10
        primaryBuffer[offset + 3] = component.intensity / 10

        primaryBuffer[offset + 4] = position[0] * 6420e3 * component.atmosphereRadius
        primaryBuffer[offset + 5] = position[1] * 6420e3 * component.atmosphereRadius
        primaryBuffer[offset + 6] = position[2] * 6420e3 * component.atmosphereRadius

        primaryBuffer[offset + 8] = 0
        primaryBuffer[offset + 9] = 0
        primaryBuffer[offset + 10] = -1
        primaryBuffer[offset + 12] = 0
        primaryBuffer[offset + 13] = 0
        primaryBuffer[offset + 14] = 0
    }

    static #updateBuffer(entity: Entity, primaryBuffer: Float32Array, secondaryBuffer: Float32Array, offset: number) {
        const self = WorldLights.get()

        const component = entity.lightComponent
        const color = component.fixedColor
        const position = entity.absoluteTranslation
        const attenuation = component.attenuation

        primaryBuffer[offset] = component.type
        primaryBuffer[offset + 1] = color[0]
        primaryBuffer[offset + 2] = color[1]
        primaryBuffer[offset + 3] = color[2]

        primaryBuffer[offset + 4] = position[0]
        primaryBuffer[offset + 5] = position[1]
        primaryBuffer[offset + 6] = position[2]

        switch (component.type) {
            case LIGHT_TYPES.DIRECTIONAL: {

                primaryBuffer[offset + 8] = component.atlasFace[0]
                primaryBuffer[offset + 9] = component.atlasFace[1]
                primaryBuffer[offset + 10] = (component.shadowMap ? 1 : -1) * component.shadowSamples
                primaryBuffer[offset + 12] = component.shadowBias
                primaryBuffer[offset + 13] = component.shadowAttenuationMinDistance
                primaryBuffer[offset + 14] = component.hasSSS ? 1 : 0

                if (component.shadowMap) {
                    mat4.lookAt(component.__lightView, component.entity.absoluteTranslation, [0, 0, 0], [0, 1, 0])
                    mat4.ortho(component.__lightProjection, -component.size, component.size, -component.size, component.size, component.zNear, component.zFar)
                    mat4.multiply(self.lightViewProjection, component.__lightProjection, component.__lightView)

                    for (let i = 0; i < 16; i++)
                        secondaryBuffer[offset + i] = self.lightViewProjection[i]

                    DirectionalShadowsSystem.lightsToUpdate.push(component)
                }
                break
            }
            case LIGHT_TYPES.POINT: {
                primaryBuffer[7 + offset] = component.shadowSamples
                primaryBuffer[8 + offset] = attenuation[0]
                primaryBuffer[9 + offset] = attenuation[1]
                primaryBuffer[10 + offset] = component.cutoff
                primaryBuffer[11 + offset] = component.zNear
                primaryBuffer[12 + offset] = component.zFar
                primaryBuffer[13 + offset] = (component.shadowMap ? -1 : 1) * (component.hasSSS ? 2 : 1)
                primaryBuffer[14 + offset] = component.shadowAttenuationMinDistance
                primaryBuffer[15 + offset] = component.cutoff * component.smoothing

                secondaryBuffer[0] = component.shadowBias
                if (component.shadowMap)
                    PointShadowsSystem.lightsToUpdate.push(component)
                break
            }
            case LIGHT_TYPES.SPOT: {
                mat4.lookAt(self.cache1Mat4, position, position, [0, 1, 0])
                mat4.fromQuat(self.cache2Mat4, entity.rotationQuaternionFinal)
                mat4.multiply(self.cache1Mat4, self.cache1Mat4, self.cache2Mat4)


                primaryBuffer[8 + offset] = self.cache1Mat4[8]
                primaryBuffer[9 + offset] = self.cache1Mat4[9]
                primaryBuffer[10 + offset] = self.cache1Mat4[10]

                primaryBuffer[11 + offset] = component.cutoff

                primaryBuffer[12 + offset] = attenuation[0]
                primaryBuffer[13 + offset] = attenuation[1]

                primaryBuffer[14 + offset] = Math.cos(glMatrix.toRadian(component.radius))
                primaryBuffer[15 + offset] = component.hasSSS ? 1 : 0

                break
            }
            case LIGHT_TYPES.SPHERE: {
                primaryBuffer[8 + offset] = component.areaRadius
                primaryBuffer[9 + offset] = 0
                primaryBuffer[10 + offset] = 0

                primaryBuffer[11 + offset] = component.cutoff

                primaryBuffer[12 + offset] = attenuation[0]
                primaryBuffer[13 + offset] = attenuation[1]

                primaryBuffer[14 + offset] = 0
                primaryBuffer[15 + offset] = component.hasSSS ? 1 : 0
                break
            }
            case LIGHT_TYPES.DISK: {
                primaryBuffer[8 + offset] = component.areaRadius
                primaryBuffer[9 + offset] = attenuation[0]
                primaryBuffer[10 + offset] = attenuation[1]
                /**
                 * Light normal
                 */
                vec3.transformMat4(self.transformedNormalCache, [0, 1, 0], entity.matrix)
                primaryBuffer[11 + offset] = self.transformedNormalCache[0]
                primaryBuffer[12 + offset] = self.transformedNormalCache[1]
                primaryBuffer[13 + offset] = self.transformedNormalCache[2]

                primaryBuffer[14 + offset] = component.cutoff
                primaryBuffer[15 + offset] = component.hasSSS ? 1 : 0

                break
            }
        }
    }
}

RepositoryService.serializable(WorldLights)