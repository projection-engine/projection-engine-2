import Engine from "@engine-core/Engine";
import GPU from "@engine-core/GPU";
import IManageable from "@engine-core/IManageable";

export default class AbstractSystem extends IManageable {

    shouldExecute(): boolean {
        return true;
    }

    execute(gl: WebGL2RenderingContext) {
    }
}