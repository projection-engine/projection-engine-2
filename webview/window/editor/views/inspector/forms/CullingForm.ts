import AbstractFormType from "./AbstractFormType";

export default class CullingForm extends AbstractFormType {
    initialize() {
        super.initialize();
        this.group("DISTANCE_CULLING", t => [
            t.boolean("ENABLED", "distanceCulling"),
            t.number("MAX_DISTANCE", "distance", undefined, 0, 1, undefined, undefined, comp => !comp.distanceCulling),
        ]);

        this.group("SCREEN_DOOR", t => [
            t.boolean("ENABLED", "screenDoorEffect"),
            t.number("DISTANCE_MULTIPLIER", "screenDoorEffectDistanceMultiplier", undefined, 0),
        ]);

        this.group("OCCLUSION_CULLING", t => [
            t.boolean("ENABLED", "occlusionCulling")
        ]);
    }
}
