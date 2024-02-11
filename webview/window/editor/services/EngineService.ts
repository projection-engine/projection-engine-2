import {Inject, Injectable} from "@lib/Injection";
import IInjectable from "@lib/IInjectable";
import WebViewService from "@lib/webview/WebViewService";
import {EngineEvents} from "./engine-definitions";
import {EntityDTO} from "../views/hierarchy/hierarchy-definitions";

@Injectable
export default class EngineService extends IInjectable {
    @Inject(WebViewService)
    static webViewService: WebViewService

    static timeout: NodeJS.Timeout

    static selectionCache: number[] = []

    static listenToSelectionChanges(cb: GenericVoidFunctionWithP<number[]>): VoidFunction {
        return EngineService.webViewService.listen(
            EngineEvents.GET_SELECTED_ENTITIES,
            payload => cb(JSON.parse(payload.getPayload()))
        )
    }

    static listenToHierarchyChanges(cb: GenericVoidFunctionWithP<EntityDTO>): VoidFunction {
        return EngineService.webViewService.listen(
            EngineEvents.GET_HIERARCHY,
            payload => cb(JSON.parse(payload.getPayload()))
        )
    }

    static listenToLockedEntityChanges(cb: GenericVoidFunctionWithP<number>): VoidFunction {
        return EngineService.webViewService.listen(
            EngineEvents.GET_LOCKED_ENTITY,
            payload => cb(JSON.parse(payload.getPayload()).id)
        )
    }

    static toggleEntityVisibility(entityID: number) {
        EngineService.webViewService.beam(EngineEvents.TOGGLE_ACTIVE, JSON.stringify({id: entityID}))
    }

    static setLockedEntity(entityID: number) {
        EngineService.webViewService.beam(EngineEvents.LOCK_ENTITY, JSON.stringify({id: entityID}))
    }

    static updateSelection(entityID: number, ctrlKey: boolean) {
        if (!ctrlKey) {
            EngineService.selectionCache.length = 0
        }
        EngineService.selectionCache.push(entityID)
        clearTimeout(EngineService.timeout)
        EngineService.timeout = setTimeout(() => {
            EngineService.webViewService.beam(EngineEvents.SELECT_ENTITIES, JSON.stringify(EngineService.selectionCache))
        }, 100)
    }

    static renameEntity(entityID: number, entityName: string) {
        EngineService.webViewService.beam(EngineEvents.RENAME_ENTITY, JSON.stringify({name: entityName, id: entityID}))
    }

    static addEntity() {
        EngineService.webViewService.beam(EngineEvents.CREATE_ENTITY)
    }

    static deleteEntity(id: number) {
        EngineService.webViewService.beam(EngineEvents.DELETE_ENTITY, JSON.stringify({id}))
    }

    static makeParent(parentId: number, id: number) {
        EngineService.webViewService.beam(EngineEvents.MAKE_PARENT, JSON.stringify({parentId, id}))
    }
}
