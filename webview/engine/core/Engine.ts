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
import Scripting from "@engine-core/core/Scripting";
import PhysicsWorld from "@engine-core/core/PhysicsWorld";
import WorldLights from "@engine-core/core/WorldLights";
import {ResourceLoader} from "@engine-core/engine-d";
import Shader from "@engine-core/instances/Shader";
import UberShaderService from "@engine-core/services/UberShaderService";

export default class Engine extends Serializable {
    _physicsWorld: PhysicsWorld
    _world: World
    _camera: Camera
    _scripting: Scripting;
    _gpu: GPU
    _resourceLoader: ResourceLoader
    _worldLights: WorldLights

    // TODO - FIND A BETTER PLACE FOR THESE VARIABLES
    elapsed = 0

    currentTimeStamp = 0
    UILayouts = new Map()
    isDev = true
    environment: number = ENVIRONMENT.DEV

    #singletons = new DynamicMap<AbstractEngineService>()
    #canvas: HTMLCanvasElement
    mainResolution: { w: number, h: number }

    constructor() {
        super();

        this._world = new World(this)
        this._scripting = new Scripting(this)
        this._worldLights = new WorldLights(this)
        this._camera = new Camera(this)
        this._gpu = new GPU(this)
    }

    async initialize(
        canvas: HTMLCanvasElement,
        mainResolution: {
            w: number,
            h: number
        },
        resourceLoader: ResourceLoader) {
        this._resourceLoader = resourceLoader
        this.#canvas = canvas
        this.mainResolution = mainResolution
        this._gpu.initialize()
        await this.createSingletons()
        this.start()
    }

    getByComponent(component: Components): Entity[] {
        return this._world.getEntitiesByComponent(component)
    }

    private async createSingletons() {
        await this.addSingleton(UberShaderService)
        await this.addSingleton(UBORepository)
        await this.addSingleton(StaticMeshRepository)
        await this.addSingleton(ShaderRepository)
        await this.addSingleton(FramebufferRepository)
        await this.addSingleton(CubeMapAPI)
        await this.addSingleton(LineAPI)
        await this.addSingleton(SystemService)
        await this._gpu.generateBRDF()
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

    startSimulation() {
        (this.getSingleton(SystemService) as SystemService).startSimulation()
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
        return this._world.getRootEntity()
    }

    getGPU(): GPU {
        return this._gpu
    }

    getResourceLoader(): ResourceLoader {
        return this._resourceLoader
    }

    getWorld() {
        return this._world
    }

    getWorldLights() {
        return this._worldLights
    }

    getPhysicsWorld() {
        return this._physicsWorld
    }

    getCamera() {
        return this._camera
    }

    getContext(): WebGL2RenderingContext {
        return GPU.context
    }

    getEntities(): DynamicMap<Entity> {
        return this.getWorld()._entities
    }

    get<T>(Clazz: new (engine: Engine) => T): T {
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

    getScripting(): Scripting {
        return this._scripting;
    }

    async buildShaders(){
        await this.get(ShaderRepository).buildShaders()
    }
}
RepositoryService.injectable(Engine)