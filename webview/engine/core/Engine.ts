import CameraAPI from "./lib/utils/CameraAPI"
import ENVIRONMENT from "./static/ENVIRONMENT"
import Renderer from "./Renderer"
import SSAO from "./runtime/SSAO"
import ConversionAPI from "./lib/math/ConversionAPI"
import Physics from "./runtime/Physics"
import FrameComposition from "./runtime/FrameComposition"
import GPU from "./GPU"
import OmnidirectionalShadows from "./runtime/OmnidirectionalShadows"
import PhysicsAPI from "./lib/rendering/PhysicsAPI"
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
import LightsAPI from "./lib/utils/LightsAPI"
import RotationGizmo from "../tools/gizmo/transformation/RotationGizmo";
import ScalingGizmo from "../tools/gizmo/transformation/ScalingGizmo";
import TranslationGizmo from "../tools/gizmo/transformation/TranslationGizmo";
import DualAxisGizmo from "../tools/gizmo/transformation/DualAxisGizmo";
import ScreenSpaceGizmo from "../tools/gizmo/transformation/ScreenSpaceGizmo";
import CameraNotificationDecoder from "./lib/CameraNotificationDecoder";
import {Injectable} from "@lib/Injection";
import ProjectionEngine from "@lib/ProjectionEngine";
import IInjectable from "@lib/IInjectable";


@Injectable
export default class Engine extends IInjectable {
    #development = false
    UILayouts = new Map()
    isDev = true
    #environment: number = ENVIRONMENT.DEV
    #isReady = false
    CameraAPI: CameraAPI
    #executionQueue = new DynamicMap<string, Function>()
    #frameID: number = undefined
    CameraNotificationDecoder: CameraNotificationDecoder
    #rootEntity = new Entity()

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
            this.CameraAPI.updateAspectRatio()
    }

    async initialize(canvas: HTMLElement, mainResolution: {
        w: number,
        h: number
    }, readAsset: Function, devAmbient: boolean) {
        this.CameraNotificationDecoder = new CameraNotificationDecoder();
        this.CameraAPI = new CameraAPI();
        this.#development = devAmbient

        ResourceEntityMapper.addEntity(this.#rootEntity)
        await this.initializeAsync(canvas as HTMLCanvasElement, mainResolution, readAsset)
        ConversionAPI.canvasBBox = GPU.canvas.getBoundingClientRect()
        const OBS = new ResizeObserver(() => {
            const bBox = GPU.canvas.getBoundingClientRect()
            ConversionAPI.canvasBBox = bBox
            this.CameraAPI.aspectRatio = bBox.width / bBox.height
            this.CameraAPI.updateProjection()
            this.CameraAPI.updateAspectRatio()
        })
        OBS.observe(GPU.canvas.parentElement)
        OBS.observe(GPU.canvas)
        this.#isReady = true
        GPU.skylightProbe = new LightProbe(128)
        this.addSystem("start", Renderer.loop)
        this.start()
    }

    private async initializeAsync(canvas: HTMLCanvasElement, mainResolution: {
        w: number;
        h: number
    }, readAsset: Function) {
        await GPU.initializeContext(canvas, mainResolution)
        FileSystemAPI.initialize(readAsset)
        FrameComposition.initialize()
        await SSAO.initialize()
        OmnidirectionalShadows.initialize()
        await PhysicsAPI.initialize()
        LightsAPI.initialize()
    }

    async startSimulation() {
        this.environment = ENVIRONMENT.EXECUTION
        UIAPI.buildUI(GPU.canvas.parentElement)
        const entities = this.entities.array
        for (let i = 0; i < entities.length; i++) {
            const current = entities[i]
            PhysicsAPI.registerRigidBody(current)
        }
        await ScriptsAPI.updateAllScripts()
    }

    start() {
        if (!this.isExecuting && this.#isReady) {
            Physics.start()
            ResourceManager.start()
            this.#frameID = requestAnimationFrame(Engine._loop)
        }
    }

    static _loop(c: number) {
        const queue = ProjectionEngine.Engine.#executionQueue.array
        const queueLength = queue.length
        Renderer.currentTimeStamp = c
        for (let i = 0; i < queueLength; i++) {
            queue[i]()
        }
        ProjectionEngine.Engine.#frameID = requestAnimationFrame(Engine._loop)
    }

    stop() {
        cancelAnimationFrame(this.#frameID)
        this.#frameID = undefined
        ResourceManager.stop()
        Physics.stop()
    }

    addSystem(id: string, callback: Function) {
        this.#executionQueue.set(id, callback)
    }

    removeSystem(id: string) {
        this.#executionQueue.delete(id)
    }

    getRootEntity(): Entity {
        return this.#rootEntity
    }
}
