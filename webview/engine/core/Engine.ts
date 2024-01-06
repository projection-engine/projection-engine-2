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
import ProjectionEngine, {Injectable} from "@lib/ProjectionEngine";
import ISystemComponent from "@lib/ISystemComponent";


@Injectable
export default class Engine extends ISystemComponent {
    #development = false
    #onLevelLoadListeners = new DynamicMap<string, Function>()
    UILayouts = new Map()
    isDev = true
    #environment: number = ENVIRONMENT.DEV
    #isReady = false
    CameraAPI: CameraAPI
    #loadedLevel: Entity
    #executionQueue = new DynamicMap<string, Function>()
    #frameID: number = undefined
    RotationGizmo: RotationGizmo
    ScalingGizmo: ScalingGizmo
    TranslationGizmo: TranslationGizmo
    DualAxisGizmo: DualAxisGizmo
    ScreenSpaceGizmo: ScreenSpaceGizmo
    CameraNotificationDecoder: CameraNotificationDecoder

    get isExecuting() {
        return this.#frameID !== undefined
    }

    removeLevelLoaderListener(id: string) {
        this.#onLevelLoadListeners.delete(id)
    }

    addLevelLoaderListener(id: string, callback: Function) {
        this.#onLevelLoadListeners.set(id, callback)
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

    get loadedLevel(): Entity {
        return this.#loadedLevel
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

    async initialize(canvas: HTMLCanvasElement, mainResolution: {
        w: number,
        h: number
    } | undefined, readAsset: Function, devAmbient: boolean, whenReady: VoidFunction) {
        this.CameraNotificationDecoder = new CameraNotificationDecoder();
        this.CameraAPI = new CameraAPI();
        this.RotationGizmo = new RotationGizmo();
        this.ScalingGizmo = new ScalingGizmo();
        this.TranslationGizmo = new TranslationGizmo();
        this.DualAxisGizmo = new DualAxisGizmo();
        this.ScreenSpaceGizmo = new ScreenSpaceGizmo();
        this.#development = devAmbient
        await this.initializeAsync(canvas, mainResolution, readAsset)
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
        whenReady()
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

    static _loop(c) {
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

    async loadLevel(levelID: string, cleanEngine?: boolean) {
        if (!levelID || this.#loadedLevel?.id === levelID && !cleanEngine)
            return []
        try {

            if (cleanEngine) {
                GPU.meshes.forEach(m => GPUAPI.destroyMesh(m))
                GPU.textures.forEach(m => GPUAPI.destroyTexture(m.id))
                GPU.materials.clear()
            }

            const asset = await FileSystemAPI.readAsset(levelID)
            const {entities, entity} = JSON.parse(asset)
            let levelEntity
            if (!entity)
                levelEntity = EntityAPI.getNewEntityInstance(levelID, true)
            else
                levelEntity = EntityAPI.parseEntityObject({...entity, isCollection: true})
            if (!levelEntity.name)
                levelEntity.name = "New level"
            levelEntity.parentID = undefined
            this.#replaceLevel(levelEntity)
            const allEntities = []
            for (let i = 0; i < entities.length; i++) {
                try {
                    const entity = EntityAPI.parseEntityObject(entities[i])

                    for (let i = 0; i < entity.scripts.length; i++) {
                        await ScriptsAPI.linkScript(entity, entity.scripts[i].id)
                    }
                    const imgID = entity.spriteComponent?.imageID
                    if (imgID) {
                        const textures = GPU.textures
                        if (!textures.get(imgID))
                            await FileSystemAPI.loadTexture(imgID)
                    }
                    const uiID = entity.uiComponent?.uiLayoutID
                    const file = FileSystemAPI.readAsset(uiID)
                    if (file)
                        this.UILayouts.set(uiID, file)
                    allEntities.push(entity)
                } catch (err) {
                    console.error(err)
                }
            }

            EntityAPI.addGroup(allEntities)
        } catch (err) {
            console.error(err)
        }
        this.#onLevelLoadListeners.array.forEach(callback => callback())
    }

    #replaceLevel(newLevel?: Entity) {
        const oldLevel = this.#loadedLevel
        this.#loadedLevel = newLevel
        if (oldLevel) {
            EntityAPI.removeEntity(oldLevel)
        }
        if (newLevel)
            EntityAPI.addEntity(newLevel)
    }

    addSystem(id: string, callback: Function) {
        this.#executionQueue.set(id, callback)
    }

    removeSystem(id: string) {
        this.#executionQueue.delete(id)
    }
}
