import CameraRepository from "./repositories/CameraRepository"
import ENVIRONMENT from "./static/ENVIRONMENT"
import GPUService from "./services/GPUService"
import Entity from "./instances/Entity"
import DynamicMap from "./lib/DynamicMap"
import ResourceEntityMapper from "./repositories/ResourceEntityMapper"
import {Injectable} from "@lib/Injection";
import IInjectable from "@lib/IInjectable";
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

@Injectable
export default class Engine extends IInjectable {
    // TODO - FIND A BETTER PLACE FOR THESE VARIABLES
    elapsed = 0
    currentTimeStamp = 0

    #development = false
    UILayouts = new Map()
    isDev = true
    #environment: number = ENVIRONMENT.DEV
    #isReady = false
    #singletons = new DynamicMap<string, AbstractEngineService>()

    #rootEntity = new Entity()
    #camera: CameraRepository
    #gpu: GPUService
    #canvas: HTMLCanvasElement
    #mainResolution: { w: number, h: number }


    async initialize(canvas: HTMLCanvasElement, mainResolution: {
        w: number,
        h: number
    }, readAsset: Function, devAmbient: boolean) {
        this.#development = devAmbient

        this.#canvas = canvas
        this.#mainResolution = mainResolution
        await this.createSingletons()

        ResourceEntityMapper.addEntity(this.#rootEntity)
        this.#isReady = true
        this.start()
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

    getSingleton(Singleton: typeof AbstractEngineService): AbstractEngineService{
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
        return this.#mainResolution;
    }

    getRootEntity(): Entity {
        return this.#rootEntity
    }

    getCamera(): CameraRepository {
        return this.#camera
    }

    getGPU(): GPUService {
        return this.#gpu
    }

    getContext(): WebGL2RenderingContext {
        return GPUService.context
    }

    get entities(): DynamicMap<string, Entity> {
        return ResourceEntityMapper.entities
    }

    get queryMap(): Map<string, Entity> {
        return ResourceEntityMapper.queryMap
    }

    get isReady() {
        return this.#isReady
    }

    get developmentMode() {
        return this.#development
    }

    get environment(): number {
        return this.#environment
    }

    set environment(data: number) {
        this.isDev = data === ENVIRONMENT.DEV
        this.#environment = data
        if (this.isDev)
            this.#camera.updateAspectRatio()
    }

}
