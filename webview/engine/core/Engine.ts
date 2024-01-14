import CameraAPI from "./lib/utils/CameraAPI"
import ENVIRONMENT from "./static/ENVIRONMENT"
import Renderer from "./Renderer"
import SSAO from "./runtime/SSAO"
import ConversionAPI from "./lib/math/ConversionAPI"
import Physics from "./runtime/Physics"
import CompositionSystem from "./runtime/CompositionSystem"
import GPU from "./GPU"
import PointShadowsSystem from "./runtime/PointShadowsSystem"
import PhysicsSystem from "./lib/rendering/PhysicsAPI"
import FileSystemAPI from "./lib/utils/FileSystemAPI"
import ScriptsAPI from "./lib/utils/ScriptsAPI"
import UIAPI from "./lib/rendering/UIAPI"
import LightProbe from "./instances/LightProbe"
import Entity from "./instances/Entity"
import DynamicMap from "./lib/DynamicMap"
import GPUAPI from "./lib/rendering/GPUAPI"
import EntityAPI from "./lib/utils/EntityAPI"
import ResourceEntityMapper from "./lib/ResourceEntityMapper"
import ResourceManager from "./runtime/ResourceManager"
import LightsService from "./lib/utils/LightsService"
import RotationGizmo from "../tools/gizmo/transformation/RotationGizmo";
import ScalingGizmo from "../tools/gizmo/transformation/ScalingGizmo";
import TranslationGizmo from "../tools/gizmo/transformation/TranslationGizmo";
import DualAxisGizmo from "../tools/gizmo/transformation/DualAxisGizmo";
import ScreenSpaceGizmo from "../tools/gizmo/transformation/ScreenSpaceGizmo";
import CameraNotificationDecoder from "./lib/CameraNotificationDecoder";
import {Injectable} from "@lib/Injection";
import ProjectionEngine from "@lib/ProjectionEngine";
import IInjectable from "@lib/IInjectable";
import AbstractSystem from "@engine-core/AbstractSystem";


@Injectable
export default class Engine extends IInjectable {
    #development = false
    UILayouts = new Map()
    isDev = true
    #environment: number = ENVIRONMENT.DEV
    #isReady = false
    #executionQueue = new DynamicMap<typeof AbstractSystem, AbstractSystem>()
    #frameID: number = undefined
    #rootEntity = new Entity()
    #camera: CameraAPI
    #gpu: GPU

    getCamera(): CameraAPI {
        return this.#camera
    }

    getGPU(): GPU {
        return this.#gpu
    }

    getContext(): WebGL2RenderingContext {
        return this.#gpu.context
    }

    get isExecuting() {
        return this.#frameID !== undefined
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

    async initialize(canvas: HTMLElement, mainResolution: {
        w: number,
        h: number
    }, readAsset: Function, devAmbient: boolean) {
        this.#camera = new CameraAPI();
        this.#development = devAmbient

        ResourceEntityMapper.addEntity(this.#rootEntity)
        await this.initializeAsync(canvas as HTMLCanvasElement, mainResolution, readAsset)
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
        this.#isReady = true
        GPU.skylightProbe = new LightProbe(128)
        this.addSystem("start", Renderer)
        this.start()
    }

    private async initializeAsync(canvas: HTMLCanvasElement, mainResolution: {
        w: number;
        h: number
    }, readAsset: Function) {
        await GPU.initializeContext(canvas, mainResolution)
        FileSystemAPI.initialize(readAsset)
        CompositionSystem.initialize()
        await SSAO.initialize()
        PointShadowsSystem.initialize()
        await PhysicsSystem.initialize()
        LightsService.initialize()
    }

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

    start() {
        if (!this.isExecuting && this.#isReady) {
            Physics.start()
            ResourceManager.start()
            this.#frameID = requestAnimationFrame(v => this.#loop(v))
        }
    }

    #loop(c: number) {
        const queue = ProjectionEngine.Engine.#executionQueue.array
        const queueLength = queue.length
        Renderer.currentTimeStamp = c
        const context = this.getContext();
        for (let i = 0; i < queueLength; i++) {
            queue[i].execute(context)
        }
        ProjectionEngine.Engine.#frameID = requestAnimationFrame(v => this.#loop(v))
    }

    stop() {
        cancelAnimationFrame(this.#frameID)
        this.#frameID = undefined
        ResourceManager.stop()
        Physics.stop()
    }

    addSystem(System: typeof AbstractSystem) {
        this.#executionQueue.set(System, new System(this))
    }

    removeSystem(System: typeof AbstractSystem) {
        this.#executionQueue.delete(System)
    }

    getRootEntity(): Entity {
        return this.#rootEntity
    }
}
