import CameraAPI from "./lib/utils/CameraAPI"
import ENVIRONMENT from "./static/ENVIRONMENT"
import GPU from "./GPU"
import Entity from "./instances/Entity"
import DynamicMap from "./lib/DynamicMap"
import ResourceEntityMapper from "./lib/ResourceEntityMapper"
import {Injectable} from "@lib/Injection";
import IInjectable from "@lib/IInjectable";
import IEngineSystem from "@engine-core/IEngineSystem";
import StaticUBOs from "@engine-core/lib/StaticUBOs";
import StaticMeshes from "@engine-core/lib/StaticMeshes";
import StaticShaders from "@engine-core/lib/StaticShaders";
import StaticFBO from "@engine-core/lib/StaticFBO";
import CubeMapAPI from "@engine-core/lib/rendering/CubeMapAPI";
import LineAPI from "@engine-core/lib/rendering/LineAPI";
import IEngineSingleton from "@engine-core/IEngineSingleton";
import IEngineResource from "@engine-core/IEngineResource";
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
    #singletons = new DynamicMap<typeof IEngineSingleton, IEngineSingleton>()

    #rootEntity = new Entity()
    #camera: CameraAPI
    #gpu: GPU
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
        this.#gpu = (await this.addSingleton(GPU)) as GPU
        this.#camera = (await this.addSingleton(CameraAPI)) as CameraAPI;
        await this.addSingleton(StaticUBOs)
        await this.addSingleton(StaticMeshes)
        await this.addSingleton(StaticShaders)
        await this.addSingleton(StaticFBO)
        await this.addSingleton(CubeMapAPI)
        await this.addSingleton(LineAPI)
        await this.addSingleton(SystemService)
        GPU.generateBRDF()
    }

    async addSingleton(Singleton: typeof IEngineSingleton): Promise<IEngineSingleton> {
        const instance = new Singleton(this);
        this.#singletons.set(Singleton, instance)
        await instance.initialize()
        return instance
    }

    getSingleton(Singleton: typeof IEngineSingleton): IEngineSingleton{
        return this.#singletons.get(Singleton)
    }

    async addSystem(System: typeof IEngineSystem): Promise<IEngineSystem> {
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
    createResource<T extends IEngineResource<any>>(Resource: new (engine: Engine) => T): T {
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

    getCamera(): CameraAPI {
        return this.#camera
    }

    getGPU(): GPU {
        return this.#gpu
    }

    getContext(): WebGL2RenderingContext {
        return GPU.context
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
