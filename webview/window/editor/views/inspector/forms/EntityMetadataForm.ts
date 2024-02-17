import AbstractFormType from "./AbstractFormType";
import LocalizationEN from "@enums/LocalizationEN";

export default class EntityMetadataForm extends AbstractFormType {
    label = LocalizationEN.ENTITY_PROPERTIES;

    constructor() {
        super();
        this.string(LocalizationEN.NAME, "name");
        this.boolean(LocalizationEN.ACTIVE, "active");
        // this.options(LocalizationEN.PARENT, [])
    }
}
