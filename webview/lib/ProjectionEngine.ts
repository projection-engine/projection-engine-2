import IInjectable from "@lib/IInjectable";
import ToasterService from "@services/ToasterService";
import ViewportActionService from "@services/ViewportActionService";
import ContentBrowserStore from "./stores/ContentBrowserStore";
import DragDropService from "@services/DragDropService";
import EntityNamingService from "@services/EntityNamingService";
import EntityUpdateService from "@services/EntityUpdateService";
import LevelService from "@services/LevelService";
import ExecutionService from "@services/ExecutionService";
import EngineStore from "./stores/EngineStore";
import SettingsStore from "./stores/SettingsStore";
import TabsStore from "./stores/TabsStore";
import Engine from "@engine-core/Engine";
import EntityHierarchyService from "@services/EntityHierarchyService";
import ContextMenuService from "@services/ContextMenuService";
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

