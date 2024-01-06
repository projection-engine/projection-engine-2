import {quat, vec3} from "gl-matrix"
import ArrayBufferAPI from "./utils/ArrayBufferAPI"
import CameraEffects from "./CameraEffects"
import ProjectionEngine from "@lib/ProjectionEngine";
import Engine from "../Engine";


/**
 * @field notificationBuffers {float32array [viewNeedsUpdate, projectionNeedsUpdate, isOrthographic, hasChanged, translationSmoothing,  elapsed]}
 * @field transformationBuffer {float32array [translation.x, translation.y, translation.z, rotation.x, rotation.y, rotation.z, rotation.w]}
 * @field projectionBuffer {float32array [zFar, zNear, fov, aR, orthographicSize]}
 */
export default class CameraResources extends CameraEffects {
    position = ArrayBufferAPI.allocateVector(3)
    viewMatrix = ArrayBufferAPI.allocateMatrix(4, true)
    projectionMatrix = ArrayBufferAPI.allocateMatrix(4, true)
    invViewMatrix = ArrayBufferAPI.allocateMatrix(4, true)
    invProjectionMatrix = ArrayBufferAPI.allocateMatrix(4, true)
    viewProjectionMatrix = ArrayBufferAPI.allocateMatrix(4, true)
    previousViewProjectionMatrix = ArrayBufferAPI.allocateMatrix(4, true)
    staticViewMatrix = ArrayBufferAPI.allocateMatrix(4, true)
    skyboxProjectionMatrix = ArrayBufferAPI.allocateMatrix(4, true)
    invSkyboxProjectionMatrix = ArrayBufferAPI.allocateMatrix(4, true)
    viewUBOBuffer = ArrayBufferAPI.allocateVector(52)
    projectionUBOBuffer = ArrayBufferAPI.allocateVector(35)
    projectionBuffer = ArrayBufferAPI.allocateVector(5)
    translationBuffer = <vec3>ArrayBufferAPI.allocateVector(3)
    rotationBuffer = <quat>ArrayBufferAPI.allocateVector(4, 0, true)
    notificationBuffers = ProjectionEngine.Engine.CameraNotificationDecoder.generateBuffer()


    addTranslation(data: number[] | Float32Array) {
        const T = this.translationBuffer
        T[0] = T[0] + data[0] || 0
        T[1] = T[1] + data[1] || 0
        T[2] = T[2] + data[2] || 0
    }

    updateTranslation(data: number[] | Float32Array) {
        const T = this.translationBuffer
        T[0] = data[0] || 0
        T[1] = data[1] || 0
        T[2] = data[2] || 0
    }

    updateRotation(data: number[] | Float32Array) {
        const R = this.rotationBuffer

        R[0] = data[0] || 0
        R[1] = data[1] || 0
        R[2] = data[2] || 0
        R[3] = data[3] || 0
    }


    get zFar() {
        return this.projectionBuffer[0]
    }

    get zNear() {
        return this.projectionBuffer[1]
    }

    get fov() {
        return this.projectionBuffer[2]
    }

    get aspectRatio() {
        return this.projectionBuffer[3]
    }

    get orthographicProjectionSize() {
        return this.projectionBuffer[4]
    }

    set zFar(data) {
        this.projectionBuffer[0] = data
    }

    set zNear(data) {
        this.projectionBuffer[1] = data
    }

    set fov(data) {
        this.projectionBuffer[2] = data
    }

    set aspectRatio(data) {
        this.projectionBuffer[3] = data
    }

    set orthographicProjectionSize(data) {
        this.projectionBuffer[4] = data
    }

}

