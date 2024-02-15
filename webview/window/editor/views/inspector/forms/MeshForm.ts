import AbstractFormType from "./AbstractFormType";
import LocalizationEN from "@enums/LocalizationEN";

export default class MeshForm extends AbstractFormType {
    constructor() {
        super();

        this.group(LocalizationEN.RENDERING, t => [
            t.meshInstance(LocalizationEN.MESH, "meshID"),
            t.materialInstance(LocalizationEN.MATERIAL, "materialID"),
        ]);
        this.group(LocalizationEN.CONTRIBUTION, t => [
            t.boolean(LocalizationEN.CASTS_SHADOWS, "castsShadows"),
            t.boolean(LocalizationEN.CONTRIBUTE_TO_PROBES, "contributeToProbes"),
        ]);
    }
}
