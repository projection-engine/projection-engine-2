import IStateDTO from "@lib/stores/state/IStateDTO";
import RepositoryService from "@engine-core/services/serialization/RepositoryService";
import World from "@engine-core/core/World";
import WorldOutlineStore from "@lib/stores/WorldOutlineStore";
import HierarchyToRenderElement from "../../../window/editor/views/hierarchy/template/ToRenderElement";

export default class WorldOutlineDTO extends IStateDTO {
    hierarchy: HierarchyToRenderElement[] = []
    openPath: Record<string, boolean> = {}
}
RepositoryService.serializable(WorldOutlineDTO)
