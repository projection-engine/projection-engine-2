import IStateDTO from "@lib/stores/state/IStateDTO";

export default class SelectionStateDTO extends IStateDTO {
    lockedEntity: string
    array: string[] = []
}