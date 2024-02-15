import AbstractFormType from "./AbstractFormType";
import LocalizationEN from "@enums/LocalizationEN";

export default class CameraForm extends AbstractFormType {
    constructor() {
        super();
        this.group(LocalizationEN.PROJECTION, t => [
            t.number(LocalizationEN.FOV, "fov", 150, 10, .01),
            t.number(LocalizationEN.FAR, "zFar", undefined, 0, .01),
            t.number(LocalizationEN.NEAR, "zNear", undefined, 0, .01),
            t.number(LocalizationEN.ORTHO_SIZE, "size", undefined, 0, .01),
            t.boolean(LocalizationEN.ORTHO_PROJECTION, "ortho")
        ]);

        this.group(LocalizationEN.DEPTH_OF_FIELD, t => [
            t.boolean(LocalizationEN.ENABLED, "enabledDOF"),
            t.group(LocalizationEN.QUALITY, st => [
                st.options("samplesDOF", [{
                    label: "High",
                    value: 150
                }, {
                    label: "Medium",
                    value: 100
                }, {
                    label: "Low",
                    value: 50
                }]),
            ]),
            t.number(LocalizationEN.FOCUS_DISTANCE, "focusDistanceDOF"),
            t.number(LocalizationEN.FOCAL_LENGTH, "focalLengthDOF", undefined, .001),
            t.number(LocalizationEN.APERTURE, "apertureDOF", 2, 0)
        ]);

        this.group(LocalizationEN.MOTION_BLUR, t => [
            t.boolean(LocalizationEN.PER_OBJECTS, "motionBlurEnabled"),
            t.boolean(LocalizationEN.WORLD, "cameraMotionBlur"),
            t.number(LocalizationEN.SCALE, "mbVelocityScale", undefined, .0001),
            t.number(LocalizationEN.SAMPLES, "mbSamples", undefined, 1, 1)
        ]);

        this.group(LocalizationEN.ASPECT_RATIO, t => [
            t.boolean(LocalizationEN.DYNAMIC, "dynamicAspectRatio"),
            t.number(LocalizationEN.VALUE, "aspectRatio", undefined, undefined, undefined, false,  comp => comp["dynamicAspectRatio"])
        ]);

        this.group(LocalizationEN.VIGNETTE, t => [
            t.boolean(LocalizationEN.ENABLED, "vignette"),
            t.number(LocalizationEN.STRENGTH, "vignetteStrength", undefined, 0, .0001),
        ]);

        this.group(LocalizationEN.DISTORTION, t => [
            t.boolean(LocalizationEN.ENABLED, "distortion"),
            t.number(LocalizationEN.STRENGTH, "distortionStrength", undefined, 0, .0001),
        ]);

        this.group(LocalizationEN.CHROMATIC_ABERRATION, t => [
            t.boolean(LocalizationEN.ENABLED, "chromaticAberration"),
            t.number(LocalizationEN.STRENGTH, "chromaticAberrationStrength", undefined, 0, .0001),
        ]);

        this.group(LocalizationEN.FILM_GRAIN, t => [
            t.boolean(LocalizationEN.ENABLED, "filmGrain"),
            t.number(LocalizationEN.STRENGTH, "filmGrainStrength", undefined, 0, .0001),
        ]);

        this.group(LocalizationEN.BLOOM, t => [
            t.boolean(LocalizationEN.ENABLED, "bloom"),
            t.number(LocalizationEN.THRESHOLD, "bloomThreshold", undefined, 0, .0001),
            t.number(LocalizationEN.SAMPLES, "bloomQuality", undefined, 0, 1),
            t.number(LocalizationEN.OFFSET, "bloomOffset", undefined, 0),
        ]);

        this.group(LocalizationEN.COLOR_CORRECTION, t => [
            t.number(LocalizationEN.GAMMA, "gamma", 10, .1, .001),
            t.number(LocalizationEN.EXPOSURE, "exposure", undefined, 0, .001),
        ]);
    }
}
