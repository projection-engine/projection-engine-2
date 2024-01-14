import Engine from "@engine-core/Engine";
import GPU from "@engine-core/GPU";

export default class AbstractSystem {
    protected engine: Engine

    constructor(engine: Engine) {
        this.engine = engine
    }


    initialize() {
    }

    execute(gl: WebGL2RenderingContext) {
    }
}