import AbstractEngineSystem from "@engine-core/AbstractEngineSystem";
import UBORepository from "@engine-core/repositories/UBORepository";
import GPU from "@engine-core/core/GPU";
import {mat4, quat, vec3} from "gl-matrix";

export default class CameraSystem extends AbstractEngineSystem {

    execute(gl: WebGL2RenderingContext) {
        const c = this.camera;
        c.hasChangedView = false
        c.hasChangedProjection = false

        if (c.viewNeedsUpdate) {
            this.updateMatrices(this.engine.elapsed);
        }

        if (c.projectionNeedsUpdate || c.isOrthographic() && c.viewNeedsUpdate) {
            this.updateProjection()
            c.hasChangedProjection = true
            c.hasChangedView = true
            c.projectionNeedsUpdate = false
        }
        this.updateUBOs();
    }

    updateProjection() {
        const c = this.camera;
        const aR = c.aspectRatio
        const zFar = c.zFar
        const orthographicProjectionSize = c.orthographicProjectionSize

        if (c.isOrthographic()) {
            mat4.ortho(
                c.projectionMatrix,
                -orthographicProjectionSize,
                orthographicProjectionSize,
                -orthographicProjectionSize / aR,
                orthographicProjectionSize / aR,
                -zFar,
                zFar
            )
        } else {
            mat4.perspective(c.projectionMatrix, c.fov, aR, c.zNear, zFar)
            mat4.perspective(c.skyboxProjectionMatrix, c.fov, aR, .1, 1000)
            mat4.invert(c.invSkyboxProjectionMatrix, c.skyboxProjectionMatrix)
        }

        mat4.invert(c.invProjectionMatrix, c.projectionMatrix)
        mat4.multiply(c.viewProjectionMatrix, c.projectionMatrix, c.viewMatrix)
        this.copyToUBOMatrix()
    }

    updateMatrices(elapsed: number) {
        const c = this.camera;
        const tSmoothing = c.translationSmoothing
        const incrementTranslation = tSmoothing === 0 ? 1 : 1 - Math.pow(.001, elapsed * tSmoothing)

        const lengthTranslationPrev = vec3.length(c.currentTranslation)
        vec3.lerp(c.currentTranslation, c.currentTranslation, c.translationBuffer, incrementTranslation)
        const lengthTranslationAfter = vec3.length(c.currentTranslation)

        const lengthRotationPrev = quat.length(c.currentRotation)
        quat.copy(c.currentRotation, c.rotationBuffer)
        const lengthRotationAfter = quat.length(c.currentRotation)

        const offsetRotation = Math.abs(lengthRotationPrev - lengthRotationAfter)
        const offsetTranslation = Math.abs(lengthTranslationPrev - lengthTranslationAfter)

        if (offsetRotation > 0 || offsetTranslation > 1e-6) {
            this.updateViewProjectionMatrix()
            c.viewNeedsUpdate = true
            c.hasChangedView = true
        } else {
            c.viewNeedsUpdate = false
            c.hasChangedView = false
        }
    }

    updateViewProjectionMatrix() {
        const c = this.camera;
        mat4.fromRotationTranslation(c.invViewMatrix, c.currentRotation, c.currentTranslation)
        mat4.invert(c.viewMatrix, c.invViewMatrix)
        const m = c.invViewMatrix
        c.position[0] = m[12]
        c.position[1] = m[13]
        c.position[2] = m[14]

        mat4.multiply(c.viewProjectionMatrix, c.projectionMatrix, c.viewMatrix)
        this.copyToUBOMatrix()

        const staticViewMatrix = mat4.copy(c.staticViewMatrix, c.viewMatrix)
        staticViewMatrix[12] = staticViewMatrix[13] = staticViewMatrix[14] = 0
    }

    copyToUBOMatrix() {
        const c = this.camera;
        const V = c.viewUBOBuffer as Float32Array
        CameraSystem.copyWithOffset(V, c.viewProjectionMatrix, 0)
        CameraSystem.copyWithOffset(V, c.viewMatrix, 16)
        CameraSystem.copyWithOffset(V, c.invViewMatrix, 32)
        CameraSystem.copyWithOffset(V, c.position as Float32Array, 48)
        const P = c.projectionUBOBuffer as Float32Array
        CameraSystem.copyWithOffset(P, c.projectionMatrix, 0)
        CameraSystem.copyWithOffset(P, c.invProjectionMatrix, 16)
    }

    static copyWithOffset(target: Float32Array, matrix: Float32Array, offset: number) {
        const len = matrix.length
        for (let i = 0; i < len; i++)
            target[i + offset] = matrix[i]
    }

    private updateUBOs() {
        const c = this.camera;
        if (c.hasChangedProjection) {
            const UBO = UBORepository.cameraProjectionUBO
            UBO.bind()
            c.projectionUBOBuffer[32] = GPU.bufferResolution[0]
            c.projectionUBOBuffer[33] = GPU.bufferResolution[1]
            c.projectionUBOBuffer[34] = 2.0 / Math.log2(c.zFar + 1)

            UBO.updateBuffer(c.projectionUBOBuffer)
            UBO.unbind()
        }

        if (c.hasChangedView) {
            const UBO = UBORepository.cameraViewUBO
            UBO.bind()
            UBO.updateBuffer(c.viewUBOBuffer)
            UBO.unbind()
        }
    }
}