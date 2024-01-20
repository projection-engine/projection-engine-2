import ENVIRONMENT from "../../static/ENVIRONMENT"
import {glMatrix, vec3, vec4} from "gl-matrix"
import ConversionAPI from "../math/ConversionAPI"
import MotionBlurSystem from "../../runtime/MotionBlurSystem"
import DepthPrePassSystem from "../../runtime/DepthPrePassSystem"
import GPU from "../../GPU"
import StaticUBOs from "../StaticUBOs"
import Entity from "../../instances/Entity"
import CameraComponent from "../../instances/components/CameraComponent"
import CameraResources from "../CameraResources"
import CameraSerialization from "../../static/CameraSerialization"
import CameraWorker from "../../workers/camera-worker";
import {CameraProjectionType} from "@engine-core/engine-d";


const TEMPLATE_CAMERA = new CameraComponent()
export default class CameraAPI extends CameraResources {
    #dynamicAspectRatio = false
    trackingEntity: Entity
    hasChangedProjection: boolean;
    hasChangedView: boolean;
    translationSmoothing: number;
    viewNeedsUpdate: boolean;
    projectionNeedsUpdate: boolean;
    private projectionType: CameraProjectionType;

    async initialize(): Promise<void> {
        this.projectionBuffer[4] = 10
        CameraWorker.initialize(this)
        this.addResizeObserver();
    }

    private addResizeObserver() {
        ConversionAPI.canvasBBox = GPU.canvas.getBoundingClientRect()
        const OBS = new ResizeObserver(() => {
            const bBox = GPU.canvas.getBoundingClientRect()
            ConversionAPI.canvasBBox = bBox
            this.aspectRatio = bBox.width / bBox.height
            this.updateProjection()
            this.updateAspectRatio()
        })
        OBS.observe(GPU.canvas.parentElement)
        OBS.observe(GPU.canvas)
    }

    updateAspectRatio() {
        const bBox = GPU.canvas.getBoundingClientRect()
        ConversionAPI.canvasBBox = bBox
        if (this.engine.environment === ENVIRONMENT.DEV || this.#dynamicAspectRatio) {
            this.aspectRatio = bBox.width / bBox.height
            this.updateProjection()
        }
    }



    serializeState(): CameraSerialization {

        return {
            translationSmoothing: this.translationSmoothing,
            metadata: {...this.dumpEffects()},
            rotation: [...this.rotationBuffer],
            translation: [...this.translationBuffer]
        }
    }

    get isOrthographic(): boolean {
        return this.projectionType === CameraProjectionType.ORTHOGRAPHIC
    }

    set isOrthographic(data) {
        this.projectionType = data ? CameraProjectionType.ORTHOGRAPHIC : CameraProjectionType.PERSPECTIVE
        this.projectionNeedsUpdate = true
    }


    updateProjection() {
        this.projectionNeedsUpdate = true
    }

    updateView() {
        this.viewNeedsUpdate = true
    }

    restoreState(state: CameraSerialization) {
        const {rotation, translation, translationSmoothing, metadata} = state
        // this.restoreMetadata(metadata)
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

        MotionBlurSystem.enabled = cameraObj.motionBlurEnabled === true || cameraObj.cameraMotionBlur === true

        MotionBlurSystem.velocityScale = cameraObj.mbVelocityScale
        MotionBlurSystem.maxSamples = cameraObj.mbSamples

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
        this.updateProjection()
    }
}

