import IStateDTO from "@lib/stores/state/IStateDTO";
import RepositoryService from "@engine-core/services/serialization/RepositoryService";
import {HierarchyToRenderElement} from "../../../window/editor/views/hierarchy/hierarchy-definitions";

export default class HierarchyDTO extends IStateDTO {
    hierarchy: HierarchyToRenderElement[] = []
}
RepositoryService.serializable(HierarchyDTO)
