import IStateDTO from "@lib/stores/state/IStateDTO";
import RepositoryService from "@engine-core/services/serialization/RepositoryService";

export default class SelectionStateDTO extends IStateDTO {
    lockedEntity: string
    array: string[] = []
}
RepositoryService.serializable(SelectionStateDTO)
