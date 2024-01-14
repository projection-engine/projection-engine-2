import AbstractSystem from "@engine-core/AbstractSystem";

export default class CameraSystem extends AbstractSystem {
    execute(gl: WebGL2RenderingContext) {
        this.engine.getCamera().syncThreads()
        this.engine.getCamera().updateUBOs()
    }
}