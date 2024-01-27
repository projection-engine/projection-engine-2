import GPU from "./GPU"
import GPUAPI from "../services/GPUAPI"
import PhysicsWorld from "./PhysicsWorld"
import GUIService from "../services/GUIService"
import InputEventsAPI from "../services/InputEventsAPI"
import ConsoleAPI from "../services/ConsoleAPI"
import Component from "../instances/components/Component"
import COMPONENTS from "../static/Components"
import Camera from "./Camera"
import EntityQueryService from "../services/EntityQueryService"
import FileSystemAPI from "../services/FileSystemAPI"
import EntityAPI from "../services/EntityAPI"
import ProjectionEngine from "@lib/ProjectionEngine";
import AbstractEngineCoreService from "@engine-core/core/AbstractEngineCoreService";
import DynamicMap from "@engine-core/lib/DynamicMap";
import Entity from "@engine-core/instances/Entity";
import {CustomEngineScript} from "@engine-core/engine-d";
import Components from "../static/Components";
import RepositoryService from "@engine-core/services/serialization/RepositoryService";

/**
 * Custom systems defined by the user
 */
export default class Scripting extends AbstractEngineCoreService {
    _rawScripts = new DynamicMap<string>()
    #instances = new DynamicMap<CustomEngineScript>()

    initializeScripts() {
        this._rawScripts.keys().forEach((scriptID) => this.#initializeScript(scriptID))
    }

    setScript(scriptID: string, content: string) {
        this._rawScripts.set(scriptID, content)
        if (this.#instances.has(scriptID)) {
            this.#instances.delete(scriptID)
            this.#initializeScript(scriptID)
        }
    }

    #initializeScript(scriptID: string): boolean {
        const scriptData = this._rawScripts[scriptID]
        if (!scriptData || this.#instances.has(scriptID))
            return false
        try {
            const generator = new Function("", scriptData)
            try {
                const script = generator() as CustomEngineScript
                if (typeof script === "object" && typeof script.onCreate === "function" && typeof script.execute === "function") {

                    script.GPU = this.engine.getGPU()
                    script.GPUAPI = GPUAPI
                    script.PhysicsWorld = this.engine.getPhysicsWorld()
                    script.GUIService = GUIService
                    script.World = this.engine.getWorld()
                    script.InputEventsAPI = InputEventsAPI
                    script.ConsoleAPI = ConsoleAPI
                    script.Components = Components
                    script.Camera = this.engine.getCamera()
                    script.EntityQueryService = EntityQueryService

                    script.onCreate()

                    this.#instances.set(scriptID, script)
                    return true
                } else {
                    console.error("Script is missing onCreate and execute methods")
                }
            } catch (runtimeError) {
                console.error(runtimeError)
            }
        } catch (syntaxError) {
            console.error(syntaxError)
        }
        return false
    }

    getScripts(): CustomEngineScript[] {
        return this.#instances.array
    }
}

RepositoryService.serializable(Scripting)

