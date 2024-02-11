import AbstractFormType from "./AbstractFormType";

export default class SpriteForm extends AbstractFormType {
    initialize() {
        super.initialize();
        this.group("TEXTURE", t => [
            t.imageTexture("IMAGE", "imageID"),
        ]);
        this.group("TRANSFORMATION", t => [
            t.boolean("ALWAYS_FACE_CAMERA", "alwaysFaceCamera"),
            t.boolean("KEEP_SAME_SIZE", "keepSameSize"),
        ]);
    }
}
