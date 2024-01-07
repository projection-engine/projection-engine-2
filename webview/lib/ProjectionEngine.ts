import IInjectable from "@lib/IInjectable";
import ToasterService from "../window/services/ToasterService";
import ViewportActionService from "../window/services/ViewportActionService";
import ContentBrowserStore from "./stores/ContentBrowserStore";
import DragDropService from "../window/services/DragDropService";
import EntityNamingService from "../window/services/EntityNamingService";
import EntityUpdateService from "../window/services/EntityUpdateService";
import LevelService from "../window/services/LevelService";
import ExecutionService from "../window/services/ExecutionService";
import EngineStore from "./stores/EngineStore";
import SettingsStore from "./stores/SettingsStore";
import TabsStore from "./stores/TabsStore";
import Engine from "@engine-core/Engine";
import EntityHierarchyService from "../window/services/EntityHierarchyService";
import ContextMenuService from "../window/services/ContextMenuService";
import EntitySelectionStore from "./stores/EntitySelectionStore";
import {Inject} from "@lib/Injection";

export default class ProjectionEngine extends IInjectable {

    @Inject(ContentBrowserStore)
    static ContentBrowserStore: ContentBrowserStore

    @Inject(SettingsStore)
    static SettingsStore: SettingsStore

    @Inject(TabsStore)
    static TabsStore: TabsStore

    @Inject(Engine)
    static Engine: Engine

    @Inject(ContextMenuService)
    static ContextMenuService: ContextMenuService

    @Inject(DragDropService)
    static DragDropService: DragDropService

    @Inject(EntityHierarchyService)
    static EntityHierarchyService: EntityHierarchyService

    @Inject(EntityNamingService)
    static EntityNamingService: EntityNamingService

    @Inject(EntityUpdateService)
    static EntityUpdateService: EntityUpdateService

    @Inject(ExecutionService)
    static ExecutionService: ExecutionService

    @Inject(LevelService)
    static LevelService: LevelService

    @Inject(ToasterService)
    static ToastNotificationSystem: ToasterService

    @Inject(ViewportActionService)
    static ViewportActionUtil: ViewportActionService

    @Inject(EngineStore)
    static EngineStore: EngineStore

    @Inject(EntitySelectionStore)
    static EntitySelectionStore: EntitySelectionStore

}

