import AbstractStore from "./AbstractStore"
import ProjectionEngine from "../../ProjectionEngine";

export default class ViewStateStore extends AbstractStore {
    constructor() {
        super({})
    }

     updateViewState(viewMetadata: string, newState: MutableObject) {
        const previousData = this.getData()[viewMetadata] ?? {}
        ProjectionEngine.ViewStateStore.updateStore({[viewMetadata]: {...previousData, ...newState}})
    }

     removeState(viewMetadata: string) {
        delete this.getData()[viewMetadata]
    }

     onViewMount(viewMetadata: string, onIfExists: GenericVoidFunctionWithP<MutableObject>|undefined) {
        const previousData = this.getData()[viewMetadata]
         this.updateStore({[viewMetadata]: previousData})
        if (previousData && onIfExists)
            onIfExists(previousData)
    }

     onViewDestroy(viewMetadata: string, latestState: MutableObject | undefined) {
        const previousData = this.getData()[viewMetadata] ?? {}
         this.updateStore({
            [viewMetadata]: {...previousData, ...latestState}
        })
    }
}
