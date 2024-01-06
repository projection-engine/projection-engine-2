import DragDropService from "../window/services/DragDropService";
import EntityNamingService from "../window/services/EntityNamingService";
import EntityUpdateService from "../window/services/EntityUpdateService";
import LevelService from "../window/services/LevelService";
import ExecutionService from "../window/services/ExecutionService";
import ChangesTrackerStore from "./stores/ChangesTrackerStore";
import ContentBrowserHierarchyStore from "./stores/ContentBrowserHierarchyStore";
import ContentBrowserStore from "./stores/ContentBrowserStore";
import EngineStore from "./stores/EngineStore";
import EntitySelectionStore from "./stores/EntitySelectionStore";
import SettingsStore from "./stores/SettingsStore";
import TabsStore from "./stores/TabsStore";
import ViewStateStore from "./stores/ViewStateStore";
import VisualsStore from "./stores/VisualsStore";
import WindowChangeStore from "./stores/WindowChangeStore";
import Engine from "@engine-core/Engine";
import ToolTipService from "../window/services/ToolTipService";
import ViewportActionService from "../window/services/ViewportActionService";
import ToasterService from "../window/services/ToasterService";
import EditorActionHistoryService from "../window/services/EditorActionHistoryService";
import EntityHierarchyService from "../window/services/EntityHierarchyService";
import ContextMenuService from "../window/services/ContextMenuService";

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
    static Engine: Engine


    static ContextMenuService: ContextMenuService
    static DragDropService: DragDropService
    static EditorActionHistory: EditorActionHistoryService
    static EntityHierarchyService: EntityHierarchyService
    static EntityNamingService: EntityNamingService
    static EntityUpdateService: EntityUpdateService
    static ExecutionService: ExecutionService
    static LevelService: LevelService
    static ToastNotificationSystem: ToasterService
    static ToolTipService: ToolTipService
    static ViewportActionUtil: ViewportActionService


    static createContext() {
        ProjectionEngine.#createStores()
        ProjectionEngine.#createServices()
    }

    static #createServices() {
        ProjectionEngine.ContextMenuService = new ContextMenuService();
        ProjectionEngine.DragDropService = new DragDropService();
        ProjectionEngine.EditorActionHistory = new EditorActionHistoryService();
        ProjectionEngine.EntityHierarchyService = new EntityHierarchyService();
        ProjectionEngine.EntityNamingService = new EntityNamingService();
        ProjectionEngine.EntityUpdateService = new EntityUpdateService();
        ProjectionEngine.ExecutionService = new ExecutionService();
        ProjectionEngine.LevelService = new LevelService();
        ProjectionEngine.ToastNotificationSystem = new ToasterService();
        ProjectionEngine.ToolTipService = new ToolTipService();
        ProjectionEngine.ViewportActionUtil = new ViewportActionService();
    }

    static #createStores() {
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