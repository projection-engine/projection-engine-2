import type Engine from "@engine-core/Engine";

export default class IEngineResource<T> {
    protected engine: Engine
    protected gl: WebGL2RenderingContext

    constructor(engine: Engine) {
        this.engine = engine
        this.gl = engine.getContext()
    }

    initialize(...params: any): T {
        return;
    }
}