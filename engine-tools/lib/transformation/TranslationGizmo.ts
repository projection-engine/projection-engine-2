import mapGizmoMesh from "../../utils/map-gizmo-mesh"
import GizmoSystem from "../../runtime/GizmoSystem";
import Inheritance from "../Inheritance";
import gizmoTranslateEntity from "../../utils/gizmo-translate-entity";
import dispatchRendererEntities, {ENTITY_ACTIONS} from "../../../frontend/editor/stores/dispatch-renderer-entities";
import EngineTools from "../../EngineTools";
import StaticEditorMeshes from "../StaticEditorMeshes";

export default class TranslationGizmo extends Inheritance {
    static gridSize = 1
    static hasCloned = false
    static cache: [number,number,number] = [0, 0, 0]

    constructor() {
        super()
        this.xyz = StaticEditorMeshes.translationGizmo
        this.xGizmo = mapGizmoMesh("x", "TRANSLATION")
        this.yGizmo = mapGizmoMesh("y", "TRANSLATION")
        this.zGizmo = mapGizmoMesh("z", "TRANSLATION")
    }

    onMouseDown(event:MouseEvent) {
        super.onMouseDown(event);
        TranslationGizmo.hasCloned = false
        TranslationGizmo.cache = [0, 0, 0]
    }

    onMouseMove(event:MouseEvent) {
        super.onMouseMove()
        if(!TranslationGizmo.hasCloned && event.shiftKey){
            const clones = EngineTools.selected.map(m => m.clone())
            dispatchRendererEntities({
                type: ENTITY_ACTIONS.PUSH_BLOCK,
                payload: clones
            })
            GizmoSystem.linkEntityToGizmo(clones[0])
        }
        TranslationGizmo.hasCloned = event.shiftKey
        gizmoTranslateEntity(event)
    }


}