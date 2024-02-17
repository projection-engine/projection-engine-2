import AbstractFormType from "./AbstractFormType";
import COLLISION_TYPES from "@engine-core/static/COLLISION_TYPES";
import LocalizationEN from "@enums/LocalizationEN";

export default class ColliderForm extends AbstractFormType {
    label = LocalizationEN.PHYSICS_COLLIDER
    constructor() {
        super();
        this.group(LocalizationEN.COLLISION_TYPE, t => [
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

        this.group(LocalizationEN.CENTER, t => [
            t.array(["X", "Y", "Z"], "center", .001, undefined, undefined)
        ]);
        this.group(LocalizationEN.SIZE, t => [
            t.array(["X", "Y", "Z"], "size", .001, undefined, 0, false, (comp) => comp.collisionType !== COLLISION_TYPES.BOX)
        ]);
        this.group(LocalizationEN.SIZE, t => [
            t.number(LocalizationEN.RADIUS, "radius", undefined, .0001, .001, false, (comp) => comp.collisionType === COLLISION_TYPES.BOX),
            t.number(LocalizationEN.HEIGHT, "height", undefined, .0001, .001, false, (comp) => comp.collisionType !== COLLISION_TYPES.CAPSULE),
        ]);

        this.group(LocalizationEN.DIRECTION, t => [
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
