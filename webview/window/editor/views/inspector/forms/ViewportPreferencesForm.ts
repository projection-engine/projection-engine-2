import AbstractFormType from "./AbstractFormType";
import LocalizationEN from "@enums/LocalizationEN";

export default class ViewportPreferencesForm extends AbstractFormType {
    constructor() {
        super();
        this.group(LocalizationEN.VIEWPORT, t => {
            t.group(LocalizationEN.ICONS, st => {
                st.number(LocalizationEN.SIZE, "iconScale", undefined, .01);
                st.number(LocalizationEN.CULLING_DISTANCE, "maxDistanceIcon", undefined, 1, 1);
            });

            t.group(LocalizationEN.OVERLAY, st => {
                st.boolean(LocalizationEN.GRID, "showGrid");
                st.boolean(LocalizationEN.ICONS, "showIcons");
                st.boolean(LocalizationEN.LINES, "showLines");
                st.boolean(LocalizationEN.OUTLINE, "showOutline");
                st.color(LocalizationEN.OUTLINE, "outlineColor");
                st.number(LocalizationEN.OUTLINE_WIDTH, "outlineWidth", undefined, .001);
            });

            t.group(LocalizationEN.GRID, st => {
                st.number(LocalizationEN.BRIGHTNESS, "gridColor", 1, 0);
                st.number(LocalizationEN.OPACITY, "gridOpacity", 1, 0);
                st.number(LocalizationEN.THRESHOLD, "gridThreshold", 1, .001, .01);
                st.number(LocalizationEN.SCALE, "gridScale", 1, .0001, .0001);
            });

            t.group(LocalizationEN.CAMERA_GIZMO, st => {
                st.number(LocalizationEN.SIZE, "cameraGizmoSize", undefined, 10, 1);
            });

            t.group(LocalizationEN.GIZMOS, st => {
                st.number(LocalizationEN.SENSITIVITY, "sensitivity", undefined, 1);
            });
        });
    }
}
