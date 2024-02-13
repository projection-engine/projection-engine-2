import AbstractFormType from "./AbstractFormType";

export default class RigidBodyForm extends AbstractFormType {
    initialize() {
        super.initialize();
        this.number("MASS", "mass", undefined, 0);
        this.group("INERTIA", t => [
            t.array(["X", "Y", "Z"], "inertia", .001)
        ]);
    }
}
