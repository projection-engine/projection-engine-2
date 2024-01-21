import Editor from "./Editor.svelte"
import RepositoryService from "@engine-core/services/serialization/RepositoryService";
import SelectionStateDTO from "@lib/stores/state/SelectionStateDTO";
import SettingsStateDTO from "@lib/stores/state/SettingsStateDTO";
import ViewTabDTO from "./components/view/ViewTabDTO";

RepositoryService.serializable(SettingsStateDTO)
RepositoryService.serializable(SelectionStateDTO)
RepositoryService.serializable(ViewTabDTO)

new Editor({
    target: document.body
})
