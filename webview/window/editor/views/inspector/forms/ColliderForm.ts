import AbstractFormType from "./AbstractFormType";
import COLLISION_TYPES from "@engine-core/static/COLLISION_TYPES";

export default class ColliderForm extends AbstractFormType {
    initialize() {
        super.initialize();
        this.group("COLLISION_TYPE", t => [
            t.options(
                "collisionType",
                [
                    {
                        label: COLLISION_TYPES.BOX,
                        value: COLLISION_TYPES.BOX
                    },
                    {
                        label: COLLISION_TYPES.SPHERE,
                        value: COLLISION_TYPES.SPHERE,
                    },
                    {
                        label: COLLISION_TYPES.CAPSULE,
                        value: COLLISION_TYPES.CAPSULE,
                    }
                ]
            ),
        ]);

        this.group("CENTER", t => [
            t.array(["X", "Y", "Z"], "center", .001, undefined, undefined)
        ]);
        this.group("SIZE", t => [
            t.array(["X", "Y", "Z"], "size", .001, undefined, 0, false, (comp) => comp.collisionType !== COLLISION_TYPES.BOX)
        ]);
        this.group("SIZE", t => [
            t.number("RADIUS", "radius", undefined, .0001, .001, false, (comp) => comp.collisionType === COLLISION_TYPES.BOX),
            t.number("HEIGHT", "height", undefined, .0001, .001, false, (comp) => comp.collisionType !== COLLISION_TYPES.CAPSULE),
        ]);

        this.group("DIRECTION", t => [
            t.options(
                "direction",
                [
                    {
                        label: "X",
                        value: "X"
                    },
                    {
                        label: "Y",
                        value: "Y"
                    },
                    {
                        label: "Z",
                        value: "Z"
                    }
                ],
                (comp) => comp.collisionType !== COLLISION_TYPES.CAPSULE
            )
        ]);
    }
}
