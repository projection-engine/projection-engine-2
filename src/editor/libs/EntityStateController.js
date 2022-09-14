import {Engine, Entity, ENVIRONMENT, UIAPI} from "../../../public/engine/production";


import componentConstructor from "./component-constructor";
import dispatchRendererEntities, {ENTITY_ACTIONS} from "../stores/templates/dispatch-renderer-entities";
import EngineStore from "../stores/EngineStore";

export default class EntityStateController {
    static #state = []
    static #isPlaying = false

    static async startPlayState() {
        if (EntityStateController.#isPlaying)
            return
        Engine.environment = ENVIRONMENT.EXECUTION
        alert.pushAlert("Saving state", "alert")

        EntityStateController.#state = Engine.entities.map(e => Entity.serializeComplexObject(e.serializable()))
        EntityStateController.#isPlaying = true


        const engine = EngineStore.engine
        const entities = [...Engine.entities, ...Array.from(UIAPI.entities.values())]

        try {
            for (let i = 0; i < entities.length; i++) {
                const current = entities[i]
                for (let s = 0; s < current.scripts.length; s++)
                    await componentConstructor(current, current.scripts[s]?.id, false)
            }
        } catch (err) {
            console.error(err)
            alert.pushAlert("Some error occurred", "error")
        }

        EngineStore.updateStore({...engine, executingAnimation: true})

    }

    static async stopPlayState() {
        if (!EntityStateController.#isPlaying)
            return
        Engine.environment = ENVIRONMENT.DEV

        alert.pushAlert("Restoring state", "alert")
        const mapped = []
        for (let i = 0; i < EntityStateController.#state.length; i++) {
            const entity = Entity.parseEntityObject(JSON.parse(EntityStateController.#state[i]))
            for (let i = 0; i < entity.scripts.length; i++)
                await componentConstructor(entity, entity.scripts[i].id, false)
            mapped.push(entity)
        }
        EntityStateController.#state = []
        dispatchRendererEntities({type: ENTITY_ACTIONS.DISPATCH_BLOCK, payload: mapped})
        const engine = EngineStore.engine
        EngineStore.updateStore({...engine, executingAnimation: false})

        EntityStateController.#isPlaying = false
    }

}