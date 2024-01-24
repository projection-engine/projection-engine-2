import {Inject, Injectable, LazyInject} from "@lib/Injection";
import IInjectable from "@lib/IInjectable";
import Entity from "@engine-core/instances/Entity";
import SettingsStore from "@lib/stores/SettingsStore";
import SelectionStore from "@lib/stores/SelectionStore";


@Injectable
export default class WorldOutlineService extends IInjectable {

    @LazyInject(SelectionStore)
    static selectionStore: SelectionStore

    setSelected(entity: Entity, ctrl: boolean) {
        if (ctrl) {
            WorldOutlineService.selectionStore.updateStore({array: [...selectionStore.getData().array, entity.getId()]})
        } else {
            WorldOutlineService.selectionStore.updateStore({array: [entity.getId()]})
        }
    }

    setLockedEntity(entity: Entity) {
        WorldOutlineService.selectionStore.updateStore({lockedEntity: entity.getId()})
    }
}