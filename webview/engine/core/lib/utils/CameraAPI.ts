import CameraEffects from "../../resource-libs/CameraEffects"
import Engine from "../../Engine"
import ENVIRONMENT from "../../static/ENVIRONMENT"
import {glMatrix, vec3, vec4} from "gl-matrix"
import ConversionAPI from "../math/ConversionAPI"
import MotionBlur from "../../runtime/MotionBlur"
import VisibilityRenderer from "../../runtime/VisibilityRenderer"

import GPU from "../../GPU"
import StaticUBOs from "../StaticUBOs"
import Entity from "../../instances/Entity"
import CameraComponent from "../../instances/components/CameraComponent"
import CameraResources from "../../resource-libs/CameraResources"
import CameraSerialization from "../../static/CameraSerialization"
import CameraNotificationDecoder from "../CameraNotificationDecoder"
import Renderer from "../../Renderer"
import cameraWorker from "../../workers/camera-worker";
import ProjectionEngine from "../../../../window/ProjectionEngine";


const TEMPLATE_CAMERA = new CameraComponent()
export default class CameraAPI extends CameraResources {
    #dynamicAspectRatio = false
    metadata = new CameraEffects()
    trackingEntity

    constructor() {
        super()
        this.projectionBuffer[4] = 10
        ProjectionEngine.Engine.CameraNotificationDecoder.initialize(this.notificationBuffers)
        cameraWorker([
            this.notificationBuffers,
            this.position,
            this.viewMatrix,
            this.projectionMatrix,
            this.invViewMatrix,
            this.invProjectionMatrix,
            this.staticViewMatrix,
            this.translationBuffer,
            this.rotationBuffer,
            this.skyboxProjectionMatrix,
            this.invSkyboxProjectionMatrix,
            this.projectionBuffer,
            this.viewProjectionMatrix,
            this.viewUBOBuffer,
            this.projectionUBOBuffer
        ])
    }

    syncThreads() {
        ProjectionEngine.Engine.CameraNotificationDecoder.elapsed = Renderer.elapsed
        cameraWorker()
    }

    updateUBOs() {
        const entity = this.trackingEntity
        if (entity && entity.__changedBuffer[1])
            this.update(entity.translation, entity.rotationQuaternionFinal)

        if (ProjectionEngine.Engine.CameraNotificationDecoder.hasChangedProjection === 1) {
            const UBO = StaticUBOs.cameraProjectionUBO

            UBO.bind()
            this.projectionUBOBuffer[32] = GPU.bufferResolution[0]
            this.projectionUBOBuffer[33] = GPU.bufferResolution[1]
            this.projectionUBOBuffer[34] = 2.0 / Math.log2(this.projectionBuffer[0] + 1)

            UBO.updateBuffer(this.projectionUBOBuffer)
            UBO.unbind()

            VisibilityRenderer.needsUpdate = true
        }

        if (ProjectionEngine.Engine.CameraNotificationDecoder.hasChangedView === 1) {
            const UBO = StaticUBOs.cameraViewUBO
            UBO.bind()
            UBO.updateBuffer(this.viewUBOBuffer)
            UBO.unbind()

            VisibilityRenderer.needsUpdate = true
        }
    }

    updateAspectRatio() {
        const bBox = GPU.canvas.getBoundingClientRect()
        ConversionAPI.canvasBBox = bBox
        if (ProjectionEngine.Engine.environment === ENVIRONMENT.DEV || this.#dynamicAspectRatio) {
            this.aspectRatio = bBox.width / bBox.height
            this.updateProjection()
        }
    }

    update(translation, rotation) {
        if (translation != null)
            vec3.copy(this.translationBuffer, translation)
        if (rotation != null)
            vec4.copy(this.rotationBuffer, rotation)
        ProjectionEngine.Engine.CameraNotificationDecoder.viewNeedsUpdate = 1
    }

    serializeState(): CameraSerialization {

        return {
            translationSmoothing: this.translationSmoothing,
            metadata: {...this.dumpEffects()},
            rotation: [...this.rotationBuffer],
            translation: [...this.translationBuffer]
        }
    }

    get hasChangedView() {
        return ProjectionEngine.Engine.CameraNotificationDecoder.hasChangedView === 1
    }

    get isOrthographic(): boolean {
        return ProjectionEngine.Engine.CameraNotificationDecoder.projectionType === ProjectionEngine.Engine.CameraNotificationDecoder.ORTHOGRAPHIC
    }

    set isOrthographic(data) {
        ProjectionEngine.Engine.CameraNotificationDecoder.projectionType = data ? ProjectionEngine.Engine.CameraNotificationDecoder.ORTHOGRAPHIC : ProjectionEngine.Engine.CameraNotificationDecoder.PERSPECTIVE
        ProjectionEngine.Engine.CameraNotificationDecoder.projectionNeedsUpdate = 1
    }

    set translationSmoothing(data) {
        ProjectionEngine.Engine.CameraNotificationDecoder.translationSmoothing = data
    }

    get translationSmoothing() {
        return ProjectionEngine.Engine.CameraNotificationDecoder.translationSmoothing
    }


    updateProjection() {
        ProjectionEngine.Engine.CameraNotificationDecoder.projectionNeedsUpdate = 1
    }

    updateView() {
        ProjectionEngine.Engine.CameraNotificationDecoder.viewNeedsUpdate = 1
    }

    restoreState(state: CameraSerialization) {
        const {rotation, translation, translationSmoothing, metadata} = state
        this.restoreMetadata(metadata)
        this.updateTranslation(translation)
        this.updateRotation(rotation)
        this.translationSmoothing = translationSmoothing

        this.updateView()
    }

    updateViewTarget(data: Entity | Object) {
        if (!data)
            this.trackingEntity = undefined

        let cameraObj
        if (data instanceof Entity) {
            this.trackingEntity = data
            cameraObj = data.cameraComponent
        } else
            cameraObj = data

        if (!data)
            return

        cameraObj = {...TEMPLATE_CAMERA, ...cameraObj}

        MotionBlur.enabled = cameraObj.motionBlurEnabled === true || cameraObj.cameraMotionBlur === true

        MotionBlur.velocityScale = cameraObj.mbVelocityScale
        MotionBlur.maxSamples = cameraObj.mbSamples

        this.zFar = cameraObj.zFar
        this.zNear = cameraObj.zNear
        this.fov = cameraObj.fov < Math.PI * 2 ? cameraObj.fov : glMatrix.toRadian(cameraObj.fov)
        this.#dynamicAspectRatio = cameraObj.dynamicAspectRatio
        this.isOrthographic = cameraObj.ortho
        this.cameraMotionBlur = cameraObj.cameraMotionBlur
        this.vignetteEnabled = cameraObj.vignette
        this.vignetteStrength = cameraObj.vignetteStrength
        this.distortion = cameraObj.distortion
        this.distortionStrength = cameraObj.distortionStrength
        this.chromaticAberration = cameraObj.chromaticAberration
        this.chromaticAberrationStrength = cameraObj.chromaticAberrationStrength
        this.filmGrain = cameraObj.filmGrain
        this.filmGrainStrength = cameraObj.filmGrainStrength
        this.bloom = cameraObj.bloom
        this.bloomThreshold = cameraObj.bloomThreshold
        this.gamma = cameraObj.gamma
        this.exposure = cameraObj.exposure
        this.apertureDOF = cameraObj.apertureDOF
        this.focalLengthDOF = cameraObj.focalLengthDOF
        this.focusDistanceDOF = cameraObj.focusDistanceDOF
        this.samplesDOF = cameraObj.samplesDOF
        this.DOF = cameraObj.enabledDOF

        if (!cameraObj.dynamicAspectRatio && cameraObj.aspectRatio)
            this.aspectRatio = cameraObj.aspectRatio
        else
            this.updateAspectRatio()

        if (data instanceof Entity)
            this.update(data.translation, data.rotationQuaternionFinal)
        this.updateProjection()
    }
}

