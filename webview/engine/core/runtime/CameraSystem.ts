import IEngineSystem from "@engine-core/IEngineSystem";

export default class CameraSystem extends IEngineSystem {
    execute(gl: WebGL2RenderingContext) {
        this.engine.getCamera().syncThreads()
        this.engine.getCamera().updateUBOs()
    }
}