import AbstractEngineSystem from "@engine-core/AbstractEngineSystem";
import AbstractEngineService from "@engine-core/AbstractEngineService";
import CameraSystem from "@engine-core/runtime/CameraSystem";
import StartupSystem from "@engine-core/runtime/StartupSystem";
import ScriptingSystem from "@engine-core/runtime/ScriptingSystem";
import DirectionalShadowsSystem from "@engine-core/runtime/DirectionalShadowsSystem";
import PointShadowsSystem from "@engine-core/runtime/PointShadowsSystem";
import DepthPrePassSystem from "@engine-core/runtime/DepthPrePassSystem";
import AOSystem from "@engine-core/runtime/AOSystem";
import GeometrySystem from "@engine-core/runtime/GeometrySystem";
import SSGISystem from "@engine-core/runtime/SSGISystem";
import DoFSystem from "@engine-core/runtime/DoFSystem";
import MotionBlurSystem from "@engine-core/runtime/MotionBlurSystem";
import BloomSystem from "@engine-core/runtime/BloomSystem";
import LensPostProcessing from "@engine-core/runtime/LensPostProcessing";
import CompositionSystem from "@engine-core/runtime/CompositionSystem";
import TransformationSystem from "@engine-core/runtime/TransformationSystem";
import ResourceManager from "@engine-core/runtime/ResourceManager";
import Physics from "@engine-core/runtime/Physics";
import ProjectionEngine from "@lib/ProjectionEngine";
import ENVIRONMENT from "@engine-core/static/ENVIRONMENT";
import GUIService from "@engine-core/services/GUIService";
import GPU from "@engine-core/core/GPU";
import PhysicsWorld from "@engine-core/core/PhysicsWorld";
import Scripting from "@engine-core/core/Scripting";

export default class SystemService extends AbstractEngineService {
    #rootSystem: AbstractEngineSystem
    #frameID: number = undefined

    async initialize(): Promise<void> {
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
    }

    async addSystem(System: typeof AbstractEngineSystem): Promise<AbstractEngineSystem> {
        const system = new System(this.engine);
        if (this.#rootSystem == null) {
            this.#rootSystem = system
        } else {
            let currentSystem: AbstractEngineSystem = this.#rootSystem
            while (currentSystem.getNext() != null) {
                currentSystem = currentSystem.getNext()
            }
            currentSystem.setNext(System)
        }
        await system.initialize();
        return system;
    }

    stop() {
        cancelAnimationFrame(this.#frameID)
        this.#frameID = undefined
        ResourceManager.stop()
        Physics.stop()
    }

    start() {
        if (!this.#frameID) {
            Physics.start()
            ResourceManager.start()
            this.#frameID = requestAnimationFrame(v => this.#loop(v))
        }
    }

    #loop(c: number) {
        ProjectionEngine.Engine.currentTimeStamp = c
        const context = this.engine.getContext();
        let currentSystem: AbstractEngineSystem = this.#rootSystem
        while (currentSystem != null) {
            if (currentSystem.shouldExecute()) {
                currentSystem.execute(context)
            }
            currentSystem = currentSystem.getNext()
        }
        this.#frameID = requestAnimationFrame(v => this.#loop(v))
    }

    async startSimulation() {
        this.engine.setEnvironment(ENVIRONMENT.EXECUTION)
        GUIService.buildUI(GPU.canvas.parentElement)
        const entities = this.engine.getEntities().array
        for (let i = 0; i < entities.length; i++) {
            const current = entities[i]
            PhysicsWorld.registerRigidBody(current)
        }
        await Scripting.updateAllScripts()
    }
}