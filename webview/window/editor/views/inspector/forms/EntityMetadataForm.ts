import AbstractFormType from "./AbstractFormType";
import LocalizationEN from "@enums/LocalizationEN";

export default class EntityMetadataForm extends AbstractFormType {
    initialize() {
        super.initialize();
        this.string(LocalizationEN.NAME, "name")
        this.string(LocalizationEN.ACTIVE, "active")
        // this.options(LocalizationEN.PARENT, [])
    }
}
