import AbstractFormType from "./AbstractFormType";
import LocalizationEN from "@enums/LocalizationEN";

export default class TerrainForm extends AbstractFormType {
    label = LocalizationEN.TERRAIN
    constructor() {
        super();
        this.terrainInstance(LocalizationEN.TERRAIN, "terrainID");
        this.materialInstance(LocalizationEN.MATERIAL, "materialID");
        this.boolean(LocalizationEN.HAS_COLLISION, "hasCollision");
    }
}
