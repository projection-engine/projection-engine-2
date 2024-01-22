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

export default class Scripting extends AbstractEngineCoreService {
    static scriptInstances = new Map()
    static mountedScripts = []
    static mountedScriptsMap = new Map()

    static async updateAllScripts() {
        Scripting.mountedScripts = []
        Scripting.mountedScriptsMap.clear()
        const scriptsToUpdate = Array.from(Scripting.scriptInstances.keys())
        for (let i = 0; i < scriptsToUpdate.length; i++) {
            const current = scriptsToUpdate[i]
            const data = await FileSystemAPI.readAsset(current)
            Scripting.scriptInstances.set(current, data)
        }
        for (let i = 0; i < ProjectionEngine.Engine.getEntities().array.length; i++) {
            const current = ProjectionEngine.Engine.getEntities().array[i]
            for (let j = 0; j < current.scripts.length; j++)
                Scripting.#updateEntityScript(current.scripts[j].id, current, j)
        }
    }

    static async linkScript(entity, scriptID) {
        const scriptFound = Scripting.scriptInstances.get(scriptID)
        const found = entity.scripts.findIndex(s => s.id === scriptID)
        if (!scriptFound) {
            const data = await FileSystemAPI.readAsset(scriptID)
            if (data != null)
                Scripting.scriptInstances.set(scriptID, data)
            else if (found > -1) {
                entity.scripts.splice(found, 1)
                return
            }
        }
        Scripting.#updateEntityScript(scriptID, entity, found)
    }


    static #updateEntityScript(scriptID, entity, index) {
        const scriptData = Scripting.scriptInstances.get(scriptID)
        if (!scriptData)
            return
        try {
            const generator = new Function("GPU, GPUAPI, PhysicsWorld, GUIService, EntityAPI, InputEventsAPI, ConsoleAPI, Component, COMPONENTS, Camera, EntityQueryService, entity, FileSystemAPI", scriptData)
            try {
                const script = generator(GPU, GPUAPI, PhysicsWorld, GUIService, EntityAPI, InputEventsAPI, ConsoleAPI, Component, COMPONENTS, Camera, EntityQueryService, entity, FileSystemAPI)
                if (index > -1) {
                    const ref = entity.scripts[index]
                    Object.entries(ref).forEach(([key, value]) => {
                        if (typeof value !== "function" && key !== "_props" && key !== "_name")
                            script[key] = value
                    })
                    entity.scripts[index] = script
                } else
                    entity.scripts.push(script)
                script.id = scriptID

                if (!ProjectionEngine.Engine.isDev && script.onCreation)
                    script.onCreation()
                const oldIndex = Scripting.mountedScriptsMap.get(scriptID + entity.id)
                if (oldIndex !== undefined)
                    Scripting.mountedScripts[oldIndex] = script
                else {
                    Scripting.mountedScripts.push(script)
                    Scripting.mountedScriptsMap.set(scriptID + entity.id, Scripting.mountedScripts.length - 1)
                }
                return true
            } catch (runtimeError) {
                console.error(runtimeError)
            }
        } catch (syntaxError) {
            console.error(syntaxError)
        }
    }
}
