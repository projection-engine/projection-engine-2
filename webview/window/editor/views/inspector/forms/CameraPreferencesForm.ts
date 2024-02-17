import AbstractFormType from "./AbstractFormType";
import LocalizationEN from "@enums/LocalizationEN";

export default class CameraPreferencesForm extends AbstractFormType {
    label = LocalizationEN.CAMERA;

    constructor() {
        super();
        this.number(LocalizationEN.SCREEN_GRABBING_SPEED, "cameraScreenSpaceMovementSpeed", undefined, .01, .1);
        this.number(LocalizationEN.TRANSLATION, "cameraMovementSpeed", undefined, .01, .1);
        this.number(LocalizationEN.ROTATION, "cameraTurnSpeed", undefined, .01, .001);
        this.number(LocalizationEN.SMOOTHING, "cameraSmoothing", 10, 0, .001);
    }
}
