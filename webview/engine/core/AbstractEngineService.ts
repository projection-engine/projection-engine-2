import Engine from "@engine-core/Engine";
import AbstractEngineResource from "@engine-core/AbstractEngineResource";

/**
 * This class is managed by the Engine instance
 */
export default class AbstractEngineService {
    protected engine: Engine

    constructor(engine: Engine) {
        this.engine = engine
    }

    createResource<T extends AbstractEngineResource<any>>(Resource: new (engine: Engine) => T): T {
        return this.engine.createResource(Resource)
    }

    async initialize() {
    }

    getEngine(): Engine {
        return this.engine
    }

}