import Engine from "@engine-core/Engine";
import AbstractEngineResource from "@engine-core/AbstractEngineResource";
import World from "@engine-core/core/World";
import GPU from "@engine-core/core/GPU";
import Camera from "@engine-core/core/Camera";

export default class AbstractEngineService {
    protected engine: Engine
    protected camera: Camera;
    protected gpu: GPU;
    protected gl: WebGL2RenderingContext;
    protected world: World;

    constructor(engine: Engine) {
        this.engine = engine
        this.camera = this.engine.getCamera()
        this.gpu = this.engine.getGPU()
        this.gl = this.engine.getContext()
        this.world = this.engine.getWorld()

    }

    createResource<T extends AbstractEngineResource<any>>(Resource: new (engine: Engine) => T): T {
        return this.engine.createResource(Resource)
    }

    async initialize() {
    }
}