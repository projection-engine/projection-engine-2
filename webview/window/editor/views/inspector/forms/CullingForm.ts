import AbstractFormType from "./AbstractFormType";
import LocalizationEN from "@enums/LocalizationEN";

export default class CullingForm extends AbstractFormType {
    constructor() {
        super();
        this.group(LocalizationEN.DISTANCE_CULLING , t => [
            t.boolean(LocalizationEN.ENABLED, "distanceCulling"),
            t.number(LocalizationEN.MAX_DISTANCE, "distance", undefined, 0, 1, undefined, comp => !comp.distanceCulling),
        ]);

        this.group(LocalizationEN.SCREEN_DOOR, t => [
            t.boolean(LocalizationEN.ENABLED, "screenDoorEffect"),
            t.number(LocalizationEN.DISTANCE_MULTIPLIER, "screenDoorEffectDistanceMultiplier", undefined, 0),
        ]);

        this.group(LocalizationEN.OCCLUSION_CULLING, t => [
            t.boolean(LocalizationEN.ENABLED, "occlusionCulling")
        ]);
    }
}
