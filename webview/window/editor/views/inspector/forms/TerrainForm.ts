import AbstractFormType from "./AbstractFormType";

export default class TerrainForm extends AbstractFormType {
    initialize() {
        super.initialize();
        this.terrainInstance("TERRAIN", "terrainID");
        this.materialInstance("MATERIAL", "materialID");
        this.boolean("HAS_COLLISION", "hasCollision");
    }
}
