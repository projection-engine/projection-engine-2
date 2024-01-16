import CameraAPI from "./lib/utils/CameraAPI"
import ENVIRONMENT from "./static/ENVIRONMENT"
import AOSystem from "./runtime/AOSystem"
import ConversionAPI from "./lib/math/ConversionAPI"
import Physics from "./runtime/Physics"
import CompositionSystem from "./runtime/CompositionSystem"
import GPU from "./GPU"
import PointShadowsSystem from "./runtime/PointShadowsSystem"
import PhysicsSystem from "./lib/rendering/PhysicsAPI"
import ScriptsAPI from "./lib/utils/ScriptsAPI"
import UIAPI from "./lib/rendering/UIAPI"
import LightProbe from "./instances/LightProbe"
import Entity from "./instances/Entity"
import DynamicMap from "./lib/DynamicMap"
import ResourceEntityMapper from "./lib/ResourceEntityMapper"
import ResourceManager from "./runtime/ResourceManager"
import {Injectable} from "@lib/Injection";
import ProjectionEngine from "@lib/ProjectionEngine";
import IInjectable from "@lib/IInjectable";
import IEngineSystem from "@engine-core/IEngineSystem";
import CameraSystem from "@engine-core/runtime/CameraSystem";
import StartupSystem from "@engine-core/runtime/StartupSystem";
import ScriptingSystem from "@engine-core/runtime/ScriptingSystem";
import DirectionalShadowsSystem from "@engine-core/runtime/DirectionalShadowsSystem";
import DepthPrePassSystem from "@engine-core/runtime/DepthPrePassSystem";
import GeometrySystem from "@engine-core/runtime/GeometrySystem";
import SSGISystem from "@engine-core/runtime/SSGISystem";
import DoFSystem from "@engine-core/runtime/DoFSystem";
import MotionBlurSystem from "@engine-core/runtime/MotionBlurSystem";
import BloomSystem from "@engine-core/runtime/BloomSystem";
import LensPostProcessing from "@engine-core/runtime/LensPostProcessing";
import TransformationSystem from "@engine-core/runtime/TransformationSystem";
import StaticUBOs from "@engine-core/lib/StaticUBOs";
import StaticMeshes from "@engine-core/lib/StaticMeshes";
import StaticShaders from "@engine-core/lib/StaticShaders";
import StaticFBO from "@engine-core/lib/StaticFBO";
import CubeMapAPI from "@engine-core/lib/rendering/CubeMapAPI";
import LineAPI from "@engine-core/lib/rendering/LineAPI";
import IEngineSingleton from "@engine-core/IEngineSingleton";
import IEngineResource from "@engine-core/IEngineResource";

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
        this.createViewportObserver();
        this.#isReady = true
        this.start()
    }

    private createViewportObserver() {
        ConversionAPI.canvasBBox = GPU.canvas.getBoundingClientRect()
        const OBS = new ResizeObserver(() => {
            const bBox = GPU.canvas.getBoundingClientRect()
            ConversionAPI.canvasBBox = bBox
            this.#camera.aspectRatio = bBox.width / bBox.height
            this.#camera.updateProjection()
            this.#camera.updateAspectRatio()
        })
        OBS.observe(GPU.canvas.parentElement)
        OBS.observe(GPU.canvas)
    }

    private async createSingletons() {
        this.#camera = (await this.addManaged(CameraAPI)) as CameraAPI;
        this.#gpu = (await this.addManaged(GPU)) as GPU
        await this.addManaged(StaticUBOs)
        await this.addManaged(StaticMeshes)
        await this.addManaged(StaticShaders)
        await this.addManaged(StaticFBO)
        await this.addManaged(CubeMapAPI)
        await this.addManaged(LineAPI)

        await this.addSystem(CameraSystem)
        await this.addSystem(StartupSystem)
        await this.addSystem(ScriptingSystem)
        await this.addSystem(DirectionalShadowsSystem)
        await this.addSystem(PointShadowsSystem)
        await this.addSystem(DepthPrePassSystem)
        await this.addSystem(AOSystem)
        await this.addSystem(GeometrySystem)
        await this.addSystem(SSGISystem)
        await this.addSystem(DoFSystem)
        await this.addSystem(MotionBlurSystem)
        await this.addSystem(BloomSystem)
        await this.addSystem(LensPostProcessing)
        await this.addSystem(CompositionSystem)
        await this.addSystem(TransformationSystem);

        GPU.generateBRDF()
    }

    // TODO - MOVE THIS TO OTHER CLASS (EngineSystemService)
    #rootSystem: IEngineSystem
    #executionQueue: IEngineSystem[] = []
    #managed = new DynamicMap<typeof IEngineSingleton, IEngineSingleton>()

    async addSystem(System: typeof IEngineSystem): Promise<IEngineSystem> {
        const system = new System(this);
        if (this.#rootSystem == null) {
            this.#rootSystem = system
        } else {
            let currentSystem: IEngineSystem = this.#rootSystem
            while (currentSystem.getNext() != null) {
                currentSystem = currentSystem.getNext()
            }
            currentSystem.setNext(System)
        }
        await system.initialize();
        return system;
    }

    // TODO - MOVE THIS TO OTHER CLASS (EngineSystemService)

    // TODO - MOVE THIS TO OTHER CLASS (EngineSingletonService)
    async addManaged(Manageable: typeof IEngineSingleton): Promise<IEngineSingleton> {
        const instance = new Manageable(this);
        this.#managed.set(Manageable, instance)
        await instance.initialize()
        return instance
    }

    // TODO - MOVE THIS TO OTHER CLASS (EngineSingletonService)


    // TODO - MOVE THIS TO OTHER CLASS (maybe EngineSchedulerService?)
    #frameID: number = undefined

    async startSimulation() {
        this.environment = ENVIRONMENT.EXECUTION
        UIAPI.buildUI(GPU.canvas.parentElement)
        const entities = this.entities.array
        for (let i = 0; i < entities.length; i++) {
            const current = entities[i]
            PhysicsSystem.registerRigidBody(current)
        }
        await ScriptsAPI.updateAllScripts()
    }

    stop() {
        cancelAnimationFrame(this.#frameID)
        this.#frameID = undefined
        ResourceManager.stop()
        Physics.stop()
    }

    start() {
        if (!this.#frameID && this.#isReady) {
            Physics.start()
            ResourceManager.start()
            this.#frameID = requestAnimationFrame(v => this.#loop(v))
        }
    }

    #loop(c: number) {
        const queue = this.#executionQueue
        const queueLength = queue.length
        ProjectionEngine.Engine.currentTimeStamp = c
        const context = this.getContext();
        let currentSystem: IEngineSystem = this.#rootSystem
        while (currentSystem != null) {
            if (currentSystem.shouldExecute()) {
                currentSystem.execute(context)
            }
            currentSystem = currentSystem.getNext()
        }
        this.#frameID = requestAnimationFrame(v => this.#loop(v))
    }

    // TODO - MOVE THIS TO OTHER CLASS (maybe EngineSchedulerService?)


    // TODO - MOVE THIS
    createResource<T extends IEngineResource<any>>(Resource: new (engine: Engine) => T): T {
        return new Resource(this)
    }

    // TODO - MOVE THIS

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
