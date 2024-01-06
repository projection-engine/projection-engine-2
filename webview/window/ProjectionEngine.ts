import ChangesTrackerStore from "./shared/stores/ChangesTrackerStore";
import ContentBrowserHierarchyStore from "./shared/stores/ContentBrowserHierarchyStore";
import ContentBrowserStore from "./shared/stores/ContentBrowserStore";
import EngineStore from "./shared/stores/EngineStore";
import EntitySelectionStore from "./shared/stores/EntitySelectionStore";
import SettingsStore from "./shared/stores/SettingsStore";
import TabsStore from "./shared/stores/TabsStore";
import ViewStateStore from "./shared/stores/ViewStateStore";
import VisualsStore from "./shared/stores/VisualsStore";
import WindowChangeStore from "./shared/stores/WindowChangeStore";
import ContextMenuService from "./services/ContextMenuService";
import DragDropService from "./services/DragDropService";
import EditorActionHistoryService from "./services/EditorActionHistoryService";
import EngineToolsService from "./services/EngineToolsService";
import EntityHierarchyService from "./services/EntityHierarchyService";
import EntityNamingService from "./services/EntityNamingService";
import EntityUpdateService from "./services/EntityUpdateService";
import ExecutionService from "./services/ExecutionService";
import LevelService from "./services/LevelService";
import ToasterService from "./services/ToasterService";
import ToolTipService from "./services/ToolTipService";
import ViewportActionService from "./services/ViewportActionService";
import Engine from "../engine/core/Engine";

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