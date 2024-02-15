import AbstractFormType from "./AbstractFormType";
import LocalizationEN from "@enums/LocalizationEN";

export default class CameraPreferencesForm extends AbstractFormType {
    constructor() {
        super();
        this.group(LocalizationEN.CAMERA, t => {
            t.number(LocalizationEN.SCREEN_GRABBING_SPEED, "cameraScreenSpaceMovementSpeed", undefined, .01, .1);
            t.number(LocalizationEN.TRANSLATION, "cameraMovementSpeed", undefined, .01, .1);
            t.number(LocalizationEN.ROTATION, "cameraTurnSpeed", undefined, .01, .001);
            t.number(LocalizationEN.SMOOTHING, "cameraSmoothing", 10, 0, .001);
        })
    }
}
