import Engine from "@engine-core/Engine";
import IEngineResource from "@engine-core/IEngineResource";

/**
 * This class is managed by the Engine instance
 */
export default class IEngineSingleton {
    protected engine: Engine

    constructor(engine: Engine) {
        this.engine = engine
    }

    createResource<T extends IEngineResource<any>>(Resource: new (engine: Engine) => T): T {
        return this.engine.createResource(Resource)
    }

    async initialize() {
    }

}