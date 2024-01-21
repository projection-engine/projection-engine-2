import CameraRepository from "./repositories/CameraRepository"
import ENVIRONMENT from "./static/ENVIRONMENT"
import GPUService from "./services/GPUService"
import Entity from "./instances/Entity"
import DynamicMap from "./lib/DynamicMap"
import World from "./repositories/World"
import AbstractEngineSystem from "@engine-core/AbstractEngineSystem";
import StaticUBOs from "@engine-core/repositories/StaticUBOs";
import StaticMeshes from "@engine-core/repositories/StaticMeshes";
import StaticShaders from "@engine-core/repositories/StaticShaders";
import StaticFBO from "@engine-core/repositories/StaticFBO";
import CubeMapAPI from "@engine-core/services/CubeMapAPI";
import LineAPI from "@engine-core/services/LineAPI";
import AbstractEngineService from "@engine-core/AbstractEngineService";
import AbstractEngineResource from "@engine-core/AbstractEngineResource";
import SystemService from "@engine-core/services/SystemService";
import Serializable from "@engine-core/services/serialization/Serializable";
import RepositoryService from "@engine-core/services/serialization/RepositoryService";
import Components from "@engine-core/static/Components";

export default class Engine extends Serializable {
    // TODO - FIND A BETTER PLACE FOR THESE VARIABLES
    elapsed = 0
    currentTimeStamp = 0
    world: World

    UILayouts = new Map()
    isDev = true
    environment: number = ENVIRONMENT.DEV
    #singletons = new DynamicMap<AbstractEngineService>()

    rootEntity = new Entity()
    #camera: CameraRepository
    #gpu: GPUService
    #canvas: HTMLCanvasElement
    mainResolution: { w: number, h: number }

    async initialize(canvas: HTMLCanvasElement, mainResolution: {
        w: number,
        h: number
    }, readAsset: Function) {
        this.world = new World()

        this.#canvas = canvas
        this.mainResolution = mainResolution
        await this.createSingletons()

        this.getWorld().addEntity(this.rootEntity)
        this.start()
    }

    getByComponent(component: Components): Entity[] {
        return this.world.getByComponent(component)
    }

    private async createSingletons() {
        this.#gpu = (await this.addSingleton(GPUService)) as GPUService
        this.#camera = (await this.addSingleton(CameraRepository)) as CameraRepository;
        await this.addSingleton(StaticUBOs)
        await this.addSingleton(StaticMeshes)
        await this.addSingleton(StaticShaders)
        await this.addSingleton(StaticFBO)
        await this.addSingleton(CubeMapAPI)
        await this.addSingleton(LineAPI)
        await this.addSingleton(SystemService)
        GPUService.generateBRDF()
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

    getCamera(): CameraRepository {
        return this.#camera
    }

    getGPU(): GPUService {
        return this.#gpu
    }

    getWorld(){
        return this.world
    }

    getContext(): WebGL2RenderingContext {
        return GPUService.context
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
            this.#camera.updateAspectRatio()
    }

}
RepositoryService.injectable(Engine)