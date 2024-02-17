import AbstractFormType from "./AbstractFormType";
import LocalizationEN from "@enums/LocalizationEN";
import {RotationType} from "../../../services/engine-definitions";

export default class MovementForm extends AbstractFormType {
    label = LocalizationEN.MOVEMENT;

    constructor() {
        super();

        this.group(LocalizationEN.TRANSLATION, t => {
            t.array(["X", "Y", "Z"], "translation");
        });
        this.group(LocalizationEN.PIVOT_POINT, t => {
            t.array(["X", "Y", "Z"], "pivotPoint");
        });
        this.group(LocalizationEN.SCALE, t => {
            t.array(["X", "Y", "Z"], "scale");
        });
        this.group(LocalizationEN.ROTATION, t => {
            t.array(["X", "Y", "Z"], "rotationEuler", null, null, null, null, comp => comp["rotationType"] === RotationType.ROTATION_QUATERNION);
        });
        this.group(LocalizationEN.ROTATION_QUATERNION, t => {
            t.array(["X", "Y", "Z", "W"], "rotationQuaternion", null, null, null, null, comp => comp["rotationType"] !== RotationType.ROTATION_QUATERNION);
        });

        this.group(LocalizationEN.ROTATION_TYPE, t => {
            this.options("rotationType", [
                {
                    label: LocalizationEN.QUATERNION,
                    value: RotationType.ROTATION_QUATERNION
                },
                {
                    label: "XYZ " + LocalizationEN.EULER,
                    value: RotationType.ROTATION_EULER_XYZ
                },
                {
                    label: "XZY " + LocalizationEN.EULER,
                    value: RotationType.ROTATION_EULER_XZY
                },
                {
                    label: "YXZ " + LocalizationEN.EULER,
                    value: RotationType.ROTATION_EULER_YXZ
                },
                {
                    label: "YZX " + LocalizationEN.EULER,
                    value: RotationType.ROTATION_EULER_YZX
                },
                {
                    label: "ZXY " + LocalizationEN.EULER,
                    value: RotationType.ROTATION_EULER_ZXY
                },
                {
                    label: "ZYX " + LocalizationEN.EULER,
                    value: RotationType.ROTATION_EULER_ZYX
                },
            ]);
        });

        this.boolean(LocalizationEN.LOCKED_TRANSLATION, "lockedTranslation");
        this.boolean(LocalizationEN.LOCKED_SCALING, "lockedScaling");
        this.boolean(LocalizationEN.LOCKED_ROTATION, "lockedRotation");
    }
}
