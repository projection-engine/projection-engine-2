import {mat4, quat, vec3} from "gl-matrix"
import copyWithOffset from "../utils/copy-with-offset"
import CameraAPI from "@engine-core/lib/utils/CameraAPI";
import StaticUBOs from "@engine-core/lib/StaticUBOs";
import GPU from "@engine-core/GPU";
import DepthPrePassSystem from "@engine-core/runtime/DepthPrePassSystem";


export default class CameraWorker {
    static needsUpdate = false
    static currentTranslation = vec3.create()
    static currentRotation = quat.create()
    static camera: CameraAPI;

    static initialize(camera: CameraAPI) {

        CameraWorker.camera = camera
        vec3.copy(CameraWorker.currentTranslation, CameraWorker.camera.translationBuffer)
        quat.copy(CameraWorker.currentRotation, CameraWorker.camera.rotationBuffer)

        mat4.multiply(CameraWorker.camera.viewProjectionMatrix, CameraWorker.camera.projectionMatrix, CameraWorker.camera.viewMatrix)
    }

    static updateProjection() {
        const isOrthographic = CameraWorker.camera.isOrthographic
        const buffer = CameraWorker.camera.projectionBuffer


        const aR = buffer[3]
        const fov = buffer[2]
        const zFar = buffer[0]
        const zNear = buffer[1]
        const orthographicProjectionSize = buffer[4]
        if (isOrthographic)
            mat4.ortho(CameraWorker.camera.projectionMatrix, -orthographicProjectionSize, orthographicProjectionSize, -orthographicProjectionSize / aR, orthographicProjectionSize / aR, -zFar, zFar)
        else {
            mat4.perspective(CameraWorker.camera.projectionMatrix, fov, aR, zNear, zFar)
            mat4.perspective(CameraWorker.camera.skyboxProjectionMatrix, fov, aR, .1, 1000)
            mat4.invert(CameraWorker.camera.invSkyboxProjectionMatrix, CameraWorker.camera.skyboxProjectionMatrix)
        }

        mat4.invert(CameraWorker.camera.invProjectionMatrix, CameraWorker.camera.projectionMatrix)
        mat4.multiply(CameraWorker.camera.viewProjectionMatrix, CameraWorker.camera.projectionMatrix, CameraWorker.camera.viewMatrix)
        CameraWorker.updateUBO()
    }

    static updateStaticViewMatrix() {
        const matrix = mat4.copy(CameraWorker.camera.staticViewMatrix, CameraWorker.camera.viewMatrix)
        matrix[12] = matrix[13] = matrix[14] = 0
        return matrix
    }


    static updateView() {
        mat4.fromRotationTranslation(CameraWorker.camera.invViewMatrix, CameraWorker.currentRotation, CameraWorker.currentTranslation)
        mat4.invert(CameraWorker.camera.viewMatrix, CameraWorker.camera.invViewMatrix)
        const m = CameraWorker.camera.invViewMatrix
        CameraWorker.camera.position[0] = m[12]
        CameraWorker.camera.position[1] = m[13]
        CameraWorker.camera.position[2] = m[14]

        mat4.multiply(CameraWorker.camera.viewProjectionMatrix, CameraWorker.camera.projectionMatrix, CameraWorker.camera.viewMatrix)
        CameraWorker.updateUBO()
        CameraWorker.updateStaticViewMatrix()
    }

    static updateUBO() {
        const V = CameraWorker.camera.viewUBOBuffer
        copyWithOffset(V, CameraWorker.camera.viewProjectionMatrix, 0)
        copyWithOffset(V, CameraWorker.camera.viewMatrix, 16)
        copyWithOffset(V, CameraWorker.camera.invViewMatrix, 32)
        copyWithOffset(V, CameraWorker.camera.position, 48)

        const P = CameraWorker.camera.projectionUBOBuffer
        copyWithOffset(P, CameraWorker.camera.projectionMatrix, 0)
        copyWithOffset(P, CameraWorker.camera.invProjectionMatrix, 16)
    }

    static execute() {
        CameraWorker.needsUpdate = CameraWorker.needsUpdate || CameraWorker.camera.viewNeedsUpdate
        const elapsed = CameraWorker.camera.getEngine().elapsed
        CameraWorker.camera.hasChangedView = false
        CameraWorker.camera.hasChangedProjection = false

        if (CameraWorker.needsUpdate) {
            const tSmoothing = CameraWorker.camera.translationSmoothing
            const incrementTranslation = tSmoothing === 0 ? 1 : 1 - Math.pow(.001, elapsed * tSmoothing)

            const lengthTranslationPrev = vec3.length(CameraWorker.currentTranslation)
            vec3.lerp(CameraWorker.currentTranslation, CameraWorker.currentTranslation, CameraWorker.camera.translationBuffer, incrementTranslation)
            const lengthTranslationAfter = vec3.length(CameraWorker.currentTranslation)
            const lengthRotationPrev = quat.length(CameraWorker.currentRotation)
            quat.copy(CameraWorker.currentRotation, CameraWorker.camera.rotationBuffer)
            const lengthRotationAfter = quat.length(CameraWorker.currentRotation)

            const offsetRotation = Math.abs(lengthRotationPrev - lengthRotationAfter)
            const offsetTranslation = Math.abs(lengthTranslationPrev - lengthTranslationAfter)
            if (offsetRotation > 0 || offsetTranslation > 1e-6) {
                CameraWorker.updateView()
                CameraWorker.camera.viewNeedsUpdate = false
                CameraWorker.camera.hasChangedView = true
            } else {
                CameraWorker.needsUpdate = false
                CameraWorker.camera.viewNeedsUpdate = false
                CameraWorker.camera.hasChangedView = false
            }
        }

        const cameraIsOrthographic = CameraWorker.camera.isOrthographic
        if (CameraWorker.camera.projectionNeedsUpdate || cameraIsOrthographic && CameraWorker.camera.viewNeedsUpdate) {
            CameraWorker.updateProjection()
            CameraWorker.camera.hasChangedProjection = true
            CameraWorker.camera.hasChangedView = true
            CameraWorker.camera.projectionNeedsUpdate = false
        }
    }
}

