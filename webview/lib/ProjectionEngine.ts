import IInjectable from "@lib/IInjectable";
import ToasterService from "@services/ToasterService";
import ViewportActionService from "@services/ViewportActionService";
import ContentBrowserStore from "./stores/ContentBrowserStore";
import DragDropService from "@services/DragDropService";
import EntityNamingService from "@services/EntityNamingService";
import EntityUpdateService from "@services/EntityUpdateService";
import ProjectService from "@services/ProjectService";
import SettingsStore from "./stores/SettingsStore";
import Engine from "@engine-core/Engine";
import EntityHierarchyService from "@services/EntityHierarchyService";
import ContextMenuService from "@services/ContextMenuService";
import {Inject} from "@lib/Injection";

export default class ProjectionEngine extends IInjectable {

    @Inject(ContentBrowserStore)
    static ContentBrowserStore: ContentBrowserStore

    @Inject(SettingsStore)
    static SettingsStore: SettingsStore

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

    @Inject(ProjectService)
    static LevelService: ProjectService

    @Inject(ToasterService)
    static ToastNotificationSystem: ToasterService

    @Inject(ViewportActionService)
    static ViewportActionUtil: ViewportActionService

}

