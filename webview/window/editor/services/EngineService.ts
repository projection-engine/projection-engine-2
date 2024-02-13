import {Inject, Injectable} from "@lib/Injection";
import IInjectable from "@lib/IInjectable";
import WebViewService from "@lib/webview/WebViewService";
import {ComponentDTO, ComponentType, EngineEvents, EngineStateDTO, EntityDTO} from "./engine-definitions";
import {HierarchyEntityDTO} from "../views/hierarchy/hierarchy-definitions";

@Injectable
export default class EngineService extends IInjectable {
    @Inject(WebViewService)
    static webViewService: WebViewService;

    static timeout: NodeJS.Timeout;

    static selectionCache: number[] = [];

    static listenToSelectionChanges(cb: GenericVoidFunctionWithP<number[]>): VoidFunction {
        EngineService.webViewService.beam(EngineEvents.GET_SELECTED_ENTITIES);
        return EngineService.webViewService.listen(
            EngineEvents.GET_SELECTED_ENTITIES,
            payload => cb(JSON.parse(payload.getPayload()))
        );
    }

    static listenToHierarchyChanges(cb: GenericVoidFunctionWithP<EntityDTO>): VoidFunction {
        EngineService.webViewService.beam(EngineEvents.GET_HIERARCHY);
        return EngineService.webViewService.listen(
            EngineEvents.GET_HIERARCHY,
            payload => cb(JSON.parse(payload.getPayload()))
        );
    }

    static listenToLockedEntityChanges(cb: GenericVoidFunctionWithP<number>): VoidFunction {
        EngineService.webViewService.beam(EngineEvents.GET_LOCKED_ENTITY);
        return EngineService.webViewService.listen(
            EngineEvents.GET_LOCKED_ENTITY,
            payload => cb(JSON.parse(payload.getPayload()).id)
        );
    }

    static listenToEngineState(cb: GenericVoidFunctionWithP<EngineStateDTO>): VoidFunction {
        EngineService.webViewService.beam(EngineEvents.GET_ENGINE_STATE);
        return EngineService.webViewService.listen(
            EngineEvents.GET_ENGINE_STATE,
            payload => cb(JSON.parse(payload.getPayload()))
        );
    }

    static toggleEntityVisibility(entityID: number) {
        EngineService.webViewService.beam(EngineEvents.TOGGLE_ACTIVE, JSON.stringify({id: entityID}));
    }

    static setLockedEntity(entityID: number) {
        EngineService.webViewService.beam(EngineEvents.LOCK_ENTITY, JSON.stringify({id: entityID}));
    }

    static updateSelection(entityID: number, ctrlKey: boolean) {
        if (!ctrlKey) {
            EngineService.selectionCache.length = 0;
        }
        EngineService.selectionCache.push(entityID);
        clearTimeout(EngineService.timeout);
        EngineService.timeout = setTimeout(() => {
            EngineService.webViewService.beam(EngineEvents.SELECT_ENTITIES, JSON.stringify(EngineService.selectionCache));
        }, 100);
    }

    static renameEntity(entityID: number, entityName: string) {
        EngineService.webViewService.beam(EngineEvents.RENAME_ENTITY, JSON.stringify({
            name: entityName,
            id: entityID
        }));
    }

    static addEntity() {
        EngineService.webViewService.beam(EngineEvents.CREATE_ENTITY);
    }

    static deleteEntity(id: number) {
        EngineService.webViewService.beam(EngineEvents.DELETE_ENTITY, JSON.stringify({id}));
    }

    static makeParent(parentId: number, id: number) {
        EngineService.webViewService.beam(EngineEvents.MAKE_PARENT, JSON.stringify({
            parentId,
            id
        }));
    }

    static addComponent(entityID: number, value: ComponentType) {
        EngineService.webViewService.beam(EngineEvents.ADD_COMPONENT, JSON.stringify({
            id: entityID,
            value
        }));
    }

    static async getEntityByID(id: number): Promise<EntityDTO> {
        const response = await EngineService.webViewService.wire(
            EngineEvents.GET_ENTITY,
            JSON.stringify({id})
        );
        return JSON.parse(response.getPayload());
    }

    static async getEntityComponents(id: number): Promise<ComponentDTO[]> {
        const response = await EngineService.webViewService.wire(
            EngineEvents.GET_ENTITY_COMPONENTS,
            JSON.stringify({id})
        );
        return JSON.parse(response.getPayload());
    }

    static postEngineStateChange(engineState: EngineStateDTO) {
        EngineService.webViewService.beam(EngineEvents.UPDATE_ENGINE_STATE, JSON.stringify(engineState));
    }

    static postEntityChange(selectedEntity: EntityDTO) {
        EngineService.webViewService.beam(EngineEvents.UPDATE_ENTITY, JSON.stringify(selectedEntity));
    }

    static postComponentChange(entityID: number, component: ComponentDTO) {
        EngineService.webViewService.beam(EngineEvents.UPDATE_COMPONENT, JSON.stringify({
            id: entityID,
            componentType: component.componentType,
            component
        }));
    }
}
