import Serializable from "@engine-core/services/serialization/Serializable";
import Engine from "@engine-core/Engine";

export default class AbstractEngineCoreService extends Serializable {
    protected engine: Engine

    constructor(engine?: Engine) {
        super()
        this.engine = engine
    }
}