import Engine from "@engine-core/Engine";

/**
 * This class is managed by the Engine instance
 */
export default class IManageable {
    protected engine: Engine

    constructor(engine: Engine) {
        this.engine = engine
    }

    async initialize() {
    }

}