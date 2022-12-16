import AA_METHODS from "../../../engine-core/static/AA_METHODS";

export default {
    gamma: 2.2,
    exposure: 1,

    mbVelocityScale: 1,
    AAMethod: AA_METHODS.DISABLED,
    FXAASpanMax: 8,
    FXAAReduceMin: 1 / 128,
    FXAAReduceMul: 1 / 8,

    physicsSubSteps: 10,
    physicsSimulationStep: 0.01666666,

    preferencesVisibility: false,
    shadowAtlasQuantity: 4,
    shadowMapResolution: 4096,
    mbSamples: 50,

    SSGI: {
        blurSamples: 5,
        enabled: true,
        maxSteps: 8,
        gamma: 2.2,
        exposure: 1,
        strength: .26,
        stepSize: .7
    },
    SSR: {
        enabled: true,
        maxSteps: 8,
        binarySearchSteps: 5,
        stepSize: .7,
        falloff: 3,
    },
    SSS: {
        depthDelta: -4,
      edgeFalloff: 12,
      maxSteps: 24,
      depthThickness: .05,
      maxDistance: .05,
    },
    SSAO: {

        blurSamples: 1,
        maxSamples: 64,
        bias: .1,
        enabled: false,
        power: 1,
        radius: .25,
        falloffDistance: 100
    },
    INITIALIZED: false
}