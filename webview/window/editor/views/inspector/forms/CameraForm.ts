import AbstractFormType from "./AbstractFormType";

export default class CameraForm extends AbstractFormType {
    initialize() {
        super.initialize();
        this.group("PROJECTION", t => [
            t.number("FOV", "fov", 150, 10, .01),
            t.number("FAR", "zFar", undefined, 0, .01),
            t.number("NEAR", "zNear", undefined, 0, .01),
            t.number("ORTHO_SIZE", "size", undefined, 0, .01),
            t.boolean("ORTHO_PROJECTION", "ortho")
        ]);

        this.group("DEPTH_OF_FIELD", t => [
            t.boolean("ENABLED", "enabledDOF"),
            t.group("QUALITY", st => [
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
            t.number("FOCUS_DISTANCE", "focusDistanceDOF"),
            t.number("FOCAL_LENGTH", "focalLengthDOF", undefined, .001),
            t.number("APERTURE", "apertureDOF", 2, 0)
        ]);

        this.group("MOTION_BLUR", t => [
            t.boolean("PER_OBJECTS", "motionBlurEnabled"),
            t.boolean("WORLD", "cameraMotionBlur"),
            t.number("SCALE", "mbVelocityScale", undefined, .0001),
            t.number("SAMPLES", "mbSamples", undefined, 1, 1)
        ]);

        this.group("ASPECT_RATIO", t => [
            t.boolean("DYNAMIC", "dynamicAspectRatio"),
            t.number("VALUE", "aspectRatio", undefined, undefined, undefined, false,  comp => comp["dynamicAspectRatio"])
        ]);

        this.group("VIGNETTE", t => [
            t.boolean("ENABLED", "vignette"),
            t.number("STRENGTH", "vignetteStrength", undefined, 0, .0001),
        ]);

        this.group("DISTORTION", t => [
            t.boolean("ENABLED", "distortion"),
            t.number("STRENGTH", "distortionStrength", undefined, 0, .0001),
        ]);

        this.group("CHROMATIC_ABERRATION", t => [
            t.boolean("ENABLED", "chromaticAberration"),
            t.number("STRENGTH", "chromaticAberrationStrength", undefined, 0, .0001),
        ]);

        this.group("FILM_GRAIN", t => [
            t.boolean("ENABLED", "filmGrain"),
            t.number("STRENGTH", "filmGrainStrength", undefined, 0, .0001),
        ]);

        this.group("BLOOM", t => [
            t.boolean("ENABLED", "bloom"),
            t.number("THRESHOLD", "bloomThreshold", undefined, 0, .0001),
            t.number("SAMPLES", "bloomQuality", undefined, 0, 1),
            t.number("OFFSET", "bloomOffset", undefined, 0),
        ]);

        this.group("COLOR_CORRECTION", t => [
            t.number("GAMMA", "gamma", 10, .1, .001),
            t.number("EXPOSURE", "exposure", undefined, 0, .001),
        ]);
    }
}
