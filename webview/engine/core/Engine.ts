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
import AbstractSystem from "@engine-core/AbstractSystem";
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
import IManageable from "@engine-core/IManageable";
import {ResizeObserver} from "svelte/src/runtime/internal/private";

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
        this.#camera = this.addManaged(CameraAPI);
        this.#development = devAmbient

        this.#canvas = canvas
        this.#mainResolution = mainResolution

        ResourceEntityMapper.addEntity(this.#rootEntity)
        this.createViewportObserver();
        GPU.skylightProbe = new LightProbe(128)
        this.createSingletons()
        await this.initializeAll()
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

    private createSingletons() {
        this.addManaged(StaticUBOs)
        this.addManaged(StaticMeshes)
        this.addManaged(StaticShaders)
        this.addManaged(StaticFBO)
        this.addManaged(CubeMapAPI)
        this.addManaged(LineAPI)

        this.addSystem(CameraSystem)
        this.addSystem(StartupSystem)
        this.addSystem(ScriptingSystem)
        this.addSystem(DirectionalShadowsSystem)
        this.addSystem(PointShadowsSystem)
        this.addSystem(DepthPrePassSystem)
        this.addSystem(AOSystem)
        this.addSystem(GeometrySystem)
        this.addSystem(SSGISystem)
        this.addSystem(DoFSystem)
        this.addSystem(MotionBlurSystem)
        this.addSystem(BloomSystem)
        this.addSystem(LensPostProcessing)
        this.addSystem(CompositionSystem)
        this.addSystem(TransformationSystem)
    }

    // TODO - MOVE THIS TO OTHER CLASS (
    #executionQueue: AbstractSystem[] = []
    #managed = new DynamicMap<typeof IManageable, IManageable>()

    addSystem(System: typeof AbstractSystem) {
        const instance = this.addManaged(System);
        if (instance instanceof AbstractSystem) {
            this.#executionQueue.push(instance)
        }
    }

    addManaged<T extends IManageable>(Manageable: new (engine: Engine) => IManageable): T {
        const instance = new Manageable(this);
        this.#managed.set(Manageable, instance)
        return instance as T
    }

    private async initializeAll() {
        for (const m of this.#managed.array) {
            await m.initialize()
        }
    }

    // TODO - MOVE THIS TO OTHER CLASS


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
        for (let i = 0; i < queueLength; i++) {
            const system = queue[i];
            if (system.shouldExecute()) {
                system.execute(context)
            }
        }
        this.#frameID = requestAnimationFrame(v => this.#loop(v))
    }

    // TODO - MOVE THIS TO OTHER CLASS (maybe EngineSchedulerService?)


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
        return this.#gpu.context
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
