import AbstractFormType from "./AbstractFormType";
import LocalizationEN from "@enums/LocalizationEN";

export default class RigidBodyForm extends AbstractFormType {
    constructor() {
        super();
        this.number(LocalizationEN.MASS, "mass", undefined, 0);
        this.group(LocalizationEN.INERTIA, t => [
            t.array(["X", "Y", "Z"], "inertia", .001)
        ]);
    }
}
