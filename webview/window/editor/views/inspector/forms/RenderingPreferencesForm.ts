import AbstractFormType from "./AbstractFormType";
import LocalizationEN from "@enums/LocalizationEN";

export default class RenderingPreferencesForm extends AbstractFormType {
    label = LocalizationEN.RENDERING;

    constructor() {
        super();
        this.group(LocalizationEN.RESOLUTION, st => {
            st.number(LocalizationEN.WIDTH, "viewportWidth", undefined, 1, 1);
            st.number(LocalizationEN.HEIGHT, "viewportHeight", undefined, 1, 1);
        });
        this.group(LocalizationEN.ANTI_ALIASING, st => {
            st.boolean(LocalizationEN.FXAA, "FXAA");
            st.boolean(LocalizationEN.TAA, "TAA", _ => true);
        });

        this.group(LocalizationEN.PHYSICS, st => {
            st.number(LocalizationEN.PHYSICS_SIMULATION_STEP, "physicsSimulationStep", undefined, 1);
            st.number(LocalizationEN.PHYSICS_SUB_STEPS, "physicsSubSteps", undefined, 1, 1);
        });

        this.group(LocalizationEN.SSR, st => {
            st.number(LocalizationEN.STEPS, "SSRMaxSteps", undefined, 1, 1);
            st.number(LocalizationEN.STEP_SIZE, "SSRStepSize", undefined, .1);
            st.number(LocalizationEN.FALLOFF, "SSRFalloff", undefined, .0);
        });
        this.group(LocalizationEN.SSGI, st => {
            st.boolean(LocalizationEN.ENABLED, "SSGIEnabled");
            st.number(LocalizationEN.STRENGTH, "SSGIStrength", undefined, 0, .01);
            st.number(LocalizationEN.FILTERING_SAMPLES, "SSGIBlurSamples", undefined, 1, 1);
            st.number(LocalizationEN.FILTERING_INTENSITY, "SSGIBlurRadius", undefined, 1, 1);
            st.number(LocalizationEN.STEPS, "SSGIMaxSteps", undefined, 1, 1);
            st.number(LocalizationEN.STEP_SIZE, "SSGIStepSize", undefined, .1, 1);
        });

        this.group(LocalizationEN.SSS, st => {
            st.number(LocalizationEN.STEPS, "SSSMaxSteps", undefined, 1, 1);
            st.number(LocalizationEN.MAX_DISTANCE, "SSSMaxDistance", undefined, .00001);
            st.number(LocalizationEN.DEPTH_THICKNESS, "SSSDepthThickness", undefined, .00001);
            st.number(LocalizationEN.EDGE_FALLOFF, "SSSEdgeFalloff", undefined, 0);
            st.number(LocalizationEN.DEPTH_DELTA, "SSSDepthDelta");
        });

        this.group(LocalizationEN.DIRECTIONAL_SHADOWS, st => {
            st.number(LocalizationEN.MAX_LIGHTS, "shadowAtlasQuantity", undefined, 1, 1);
        });

        this.group(LocalizationEN.SSAO, st => {
            st.boolean(LocalizationEN.ENABLED, "SSAOEnabled");
            st.number(LocalizationEN.BLUR_SAMPLES, "SSAOBlurSamples", undefined, 1, 1);
            st.number(LocalizationEN.SAMPLES, "SSAOMaxSamples", 64, 1, 1);
            st.number(LocalizationEN.RADIUS, "SSAORadius", undefined, 1);
            st.number(LocalizationEN.POWER, "SSAOPower");
            st.number(LocalizationEN.BIAS, "SSAOBias");
            st.number(LocalizationEN.FALLOFF, "SSAOFalloffDistance");
        });
    }
}
