import Component from "./Component"
import COMPONENTS from "../../static/Components"
import RepositoryService from "@engine-core/services/serialization/RepositoryService";

export default class CameraComponent extends Component {
	static get componentKey(): string {
		return COMPONENTS.CAMERA
	}
	get componentKey(): string {
		return CameraComponent.componentKey
	}

	fov = 45

	dynamicAspectRatio = true
	aspectRatio = 1
	zFar = 100
	zNear = .1

	distortion = false
	distortionStrength = 1
	chromaticAberration = false
	chromaticAberrationStrength = 1
	vignette = false
	vignetteStrength = .25
	filmGrain = false
	filmGrainStrength = 1
	bloom = false
	mbVelocityScale = 1
	mbSamples = 50

	bloomThreshold = .75
	bloomQuality = 8
	bloomOffset = 0
	gamma = 2.2
	exposure = 1
	motionBlurEnabled = true
	cameraMotionBlur = false
	ortho = false
	size = 10

	apertureDOF = 1.2
	focalLengthDOF = 10
	focusDistanceDOF = 100
	samplesDOF = 100
	enabledDOF = false
}

RepositoryService.serializable(CameraComponent)
