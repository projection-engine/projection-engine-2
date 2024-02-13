import AbstractFormType from "./AbstractFormType";

export default class MeshForm extends AbstractFormType {
    initialize() {
        super.initialize();

        this.group("RENDERING", t => [
            t.meshInstance("MESH", "meshID"),
            t.materialInstance("MATERIAL", "materialID"),
        ]);
        this.group("CONTRIBUTION", t => [
            t.boolean("CASTS_SHADOWS", "castsShadows"),
            t.boolean("CONTRIBUTE_TO_PROBES", "contributeToProbes"),
        ]);
    }
}
