import AbstractFormType from "./AbstractFormType";
import LocalizationEN from "@enums/LocalizationEN";

export default class SpriteForm extends AbstractFormType {
    label = LocalizationEN.SPRITE
    constructor() {
        super();
        this.group(LocalizationEN.TEXTURE, t => [
            t.imageTexture(LocalizationEN.IMAGE, "imageID"),
        ]);
        this.group(LocalizationEN.TRANSFORMATION, t => [
            t.boolean(LocalizationEN.ALWAYS_FACE_CAMERA, "alwaysFaceCamera"),
            t.boolean(LocalizationEN.KEEP_SAME_SIZE, "keepSameSize"),
        ]);
    }
}
