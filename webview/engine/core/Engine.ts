import Camera from "./core/Camera"
import ENVIRONMENT from "./static/ENVIRONMENT"
import GPU from "./core/GPU"
import Entity from "./instances/Entity"
import DynamicMap from "./lib/DynamicMap"
import World from "./core/World"
import AbstractEngineSystem from "@engine-core/AbstractEngineSystem";
import UBORepository from "@engine-core/repositories/UBORepository";
import StaticMeshRepository from "@engine-core/repositories/StaticMeshRepository";
import ShaderRepository from "@engine-core/repositories/ShaderRepository";
import FramebufferRepository from "@engine-core/repositories/FramebufferRepository";
import CubeMapAPI from "@engine-core/services/CubeMapAPI";
import LineAPI from "@engine-core/services/LineAPI";
import AbstractEngineService from "@engine-core/AbstractEngineService";
import AbstractEngineResource from "@engine-core/AbstractEngineResource";
import SystemService from "@engine-core/services/SystemService";
import Serializable from "@engine-core/services/serialization/Serializable";
import RepositoryService from "@engine-core/services/serialization/RepositoryService";
import Components from "@engine-core/static/Components";

export default class Engine extends Serializable {
    _world: World
    _camera: Camera
    _gpu: GPU

    // TODO - FIND A BETTER PLACE FOR THESE VARIABLES
    elapsed = 0
    currentTimeStamp = 0

    UILayouts = new Map()
    isDev = true
    environment: number = ENVIRONMENT.DEV
    #singletons = new DynamicMap<AbstractEngineService>()

    rootEntity = new Entity()
    #canvas: HTMLCanvasElement
    mainResolution: { w: number, h: number }

    async initialize(canvas: HTMLCanvasElement, mainResolution: {
        w: number,
        h: number
    }, readAsset: Function) {
        this._world = new World()
        this._camera = new Camera()
        this._gpu = new GPU()

        this.#canvas = canvas
        this.mainResolution = mainResolution
        await this.createSingletons()

        this.getWorld().addEntity(this.rootEntity)
        this.start()
    }

    getByComponent(component: Components): Entity[] {
        return this._world.getByComponent(component)
    }

    private async createSingletons() {
        await this.addSingleton(UBORepository)
        await this.addSingleton(StaticMeshRepository)
        await this.addSingleton(ShaderRepository)
        await this.addSingleton(FramebufferRepository)
        await this.addSingleton(CubeMapAPI)
        await this.addSingleton(LineAPI)
        await this.addSingleton(SystemService)
        GPU.generateBRDF()
    }

    async addSingleton(Singleton: typeof AbstractEngineService): Promise<AbstractEngineService> {
        const instance = new Singleton(this);
        this.#singletons.set(Singleton.name, instance)
        await instance.initialize()
        return instance
    }

    getSingleton(Singleton: typeof AbstractEngineService): AbstractEngineService {
        return this.#singletons.get(Singleton.name)
    }

    async addSystem(System: typeof AbstractEngineSystem): Promise<AbstractEngineSystem> {
        return await (this.getSingleton(SystemService) as SystemService).addSystem(System)
    }

    async startSimulation() {
        await (this.getSingleton(SystemService) as SystemService).startSimulation()
    }

    stop() {
        (this.getSingleton(SystemService) as SystemService).stop()
    }

    start() {
        (this.getSingleton(SystemService) as SystemService).start()
    }

    // TODO - MAKE THIS MORE STRUCTURED AND MOVE IT TO A SYSTEM
    createResource<T extends AbstractEngineResource<any>>(Resource: new (engine: Engine) => T): T {
        return new Resource(this)
    }

    getCanvas(): HTMLCanvasElement {
        return this.#canvas;
    }

    getMainResolution(): { w: number; h: number } {
        return this.mainResolution;
    }

    getRootEntity(): Entity {
        return this.rootEntity
    }

    getGPU(): GPU {
        return this._gpu
    }

    getWorld() {
        return this._world
    }

    getCamera() {
        return this._camera
    }

    getContext(): WebGL2RenderingContext {
        return GPU.context
    }

    getEntities(): DynamicMap<Entity> {
        return this.getWorld().entities
    }

    getQueryMap(): DynamicMap<Entity> {
        return this.getWorld().queryMap
    }

    get<T>(Clazz: new () => T): T {
        return this.#singletons.get(Clazz.name) as T
    }

    getEnvironment(): number {
        return this.environment
    }

    setEnvironment(data: number) {
        this.isDev = data === ENVIRONMENT.DEV
        this.environment = data
        if (this.isDev)
            this._camera.updateAspectRatio()
    }

}
RepositoryService.injectable(Engine)