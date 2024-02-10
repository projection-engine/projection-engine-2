import LocalizationEN from "@enums/LocalizationEN"
import Entity from "@engine-core/instances/Entity"
import EngineStateService from "@services/EngineStateService"
import EditorUtil from "./EditorUtil"
import HotKeysController from "@lib/HotKeysController";
import getViewportHotkeys from "../templates/get-viewport-hotkeys";
import SelectionStore from "@lib/stores/SelectionStore";
import ProjectionEngine from "@lib/ProjectionEngine";
import {EntityDTO, HierarchyToRenderElement} from "../views/hierarchy/hierarchy-definitions";

export default class HierarchyUtil {
    static testSearch(search: string, filteredComponent: number, node: EntityDTO) {
        return (!search || search && node.name.includes(search)) && (!filteredComponent || filteredComponent && node.components.includes(filteredComponent))
    }
}
