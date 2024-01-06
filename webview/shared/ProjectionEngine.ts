import ChangesTrackerStore from "../window/shared/stores/ChangesTrackerStore";
import ContentBrowserHierarchyStore from "../window/shared/stores/ContentBrowserHierarchyStore";
import ContentBrowserStore from "../window/shared/stores/ContentBrowserStore";
import EngineStore from "../window/shared/stores/EngineStore";
import EntitySelectionStore from "../window/shared/stores/EntitySelectionStore";
import SettingsStore from "../window/shared/stores/SettingsStore";
import TabsStore from "../window/shared/stores/TabsStore";
import ViewStateStore from "../window/shared/stores/ViewStateStore";
import VisualsStore from "../window/shared/stores/VisualsStore";
import WindowChangeStore from "../window/shared/stores/WindowChangeStore";

export default class ProjectionEngine {
    static ChangesTrackerStore: ChangesTrackerStore
    static ContentBrowserHierarchyStore: ContentBrowserHierarchyStore
    static ContentBrowserStore: ContentBrowserStore
    static EngineStore: EngineStore
    static EntitySelectionStore: EntitySelectionStore
    static SettingsStore: SettingsStore
    static TabsStore: TabsStore
    static ViewStateStore: ViewStateStore
    static VisualsStore: VisualsStore
    static WindowChangeStore: WindowChangeStore

    static createContext() {
        ProjectionEngine.ChangesTrackerStore = new ChangesTrackerStore()
        ProjectionEngine.ContentBrowserHierarchyStore = new ContentBrowserHierarchyStore()
        ProjectionEngine.ContentBrowserStore = new ContentBrowserStore()
        ProjectionEngine.EngineStore = new EngineStore()
        ProjectionEngine.EntitySelectionStore = new EntitySelectionStore()
        ProjectionEngine.SettingsStore = new SettingsStore()
        ProjectionEngine.TabsStore = new TabsStore()
        ProjectionEngine.ViewStateStore = new ViewStateStore()
        ProjectionEngine.VisualsStore = new VisualsStore()
        ProjectionEngine.WindowChangeStore = new WindowChangeStore()
    }


}