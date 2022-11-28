import TranslationGizmo from "../lib/transformation/TranslationGizmo"
import RotationGizmo from "../lib/transformation/RotationGizmo"
import ScalingGizmo from "../lib/transformation/ScalingGizmo"
import TRANSFORMATION_TYPE from "../../../static/TRANSFORMATION_TYPE"
import Movable from "../../../../public/engine/instances/Movable";
import TransformationAPI from "../../../../public/engine/lib/math/TransformationAPI";
import ScreenSpaceGizmo from "../lib/transformation/ScreenSpaceGizmo";
import GPU from "../../../../public/engine/GPU";
import STATIC_MESHES from "../../../../public/engine/static/resources/STATIC_MESHES";
import STATIC_SHADERS from "../../../../public/engine/static/resources/STATIC_SHADERS";
import AXIS from "../static/AXIS";
import LineAPI from "../../../../public/engine/lib/rendering/LineAPI";
import {mat4} from "gl-matrix";
import getPivotPointMatrix from "../utils/get-pivot-point-matrix";
import GizmoAPI from "../lib/GizmoAPI";

const X = new Float32Array([1, 0, 0]), Y = new Float32Array([0, 1, 0]), Z = new Float32Array([0, 0, 1])
const lineMatrix = mat4.create()
const EMPTY_COMPONENT = new Movable()
export default class GizmoSystem {
    static mainEntity
    static transformationMatrix
    static translation
    static onStart
    static onStop
    static targetRotation
    static targetGizmo
    static toBufferShader
    static gizmoShader
    static selectedEntities = []
    static clickedAxis
    static sensitivity = .001
    static hasStarted = false
    static _wasOnGizmo = false
    static get wasOnGizmo() {
        return GizmoSystem._wasOnGizmo
    }

    static set wasOnGizmo(data) {
        GizmoSystem._wasOnGizmo = data
        if (data)
            GizmoSystem.onStart?.()
        else
            GizmoSystem.onStop?.()
    }

    static rotationGizmoMesh
    static scaleGizmoMesh
    static translationGizmoMesh
    static dualAxisGizmoMesh
    static screenSpaceMesh
    static tooltip
    static translationGizmo
    static scaleGizmo
    static rotationGizmo
    static lineShader
    static transformationType = TRANSFORMATION_TYPE.GLOBAL

    static save
    static updateGizmoToolTip = () => null

    static initialize() {

        GizmoSystem.screenSpaceMesh = GPU.meshes.get(STATIC_MESHES.PRODUCTION.SPHERE)
        GizmoSystem.dualAxisGizmoMesh = GPU.meshes.get(STATIC_MESHES.EDITOR.DUAL_AXIS_GIZMO)
        GizmoSystem.translationGizmoMesh = GPU.meshes.get(STATIC_MESHES.EDITOR.TRANSLATION_GIZMO)

        GizmoSystem.rotationGizmoMesh = GPU.meshes.get(STATIC_MESHES.EDITOR.ROTATION_GIZMO)
        GizmoSystem.scaleGizmoMesh = GPU.meshes.get(STATIC_MESHES.EDITOR.SCALE_GIZMO)

        EMPTY_COMPONENT._scaling[0] = .2
        EMPTY_COMPONENT._scaling[1] = .2
        EMPTY_COMPONENT._scaling[2] = .2

        TransformationAPI.transformMovable(EMPTY_COMPONENT)

        GizmoSystem.lineShader = GPU.shaders.get(STATIC_SHADERS.DEVELOPMENT.LINE)
        GizmoSystem.toBufferShader = GPU.shaders.get(STATIC_SHADERS.DEVELOPMENT.TO_BUFFER)
        GizmoSystem.gizmoShader = GPU.shaders.get(STATIC_SHADERS.DEVELOPMENT.GIZMO)
        GizmoSystem.translationGizmo = new TranslationGizmo()
        GizmoSystem.scaleGizmo = new ScalingGizmo()
        GizmoSystem.rotationGizmo = new RotationGizmo()
        GizmoSystem.targetGizmo = GizmoSystem.translationGizmo
    }


    static execute() {
        const m = GizmoSystem.mainEntity
        if (m != null) {
            getPivotPointMatrix(m)
            const t = GizmoSystem.targetGizmo
            if (t) {
                t.drawGizmo()
                gpu.clear(gpu.DEPTH_BUFFER_BIT)
                if(t !== GizmoSystem.rotationGizmo)
                    ScreenSpaceGizmo.drawGizmo()
                mat4.identity(lineMatrix)
                GizmoAPI.applyTransformation(lineMatrix, [0, 0, 0, 1], [0, 0, 0], [1, 1, 1])
            }

            const axis = GizmoSystem.clickedAxis
            const shader = GizmoSystem.lineShader
            const uniforms = shader.uniformMap
            shader.bind()
            gpu.uniformMatrix4fv(uniforms.transformMatrix, false, lineMatrix)
            if (axis === AXIS.X || axis === AXIS.XZ || axis === AXIS.XY) {
                gpu.uniform3fv(uniforms.axis, X)
                LineAPI.draw(X)
            }

            if (axis === AXIS.Y || axis === AXIS.ZY || axis === AXIS.XY) {
                gpu.uniform3fv(uniforms.axis, Y)
                LineAPI.draw(Y)
            }

            if (axis === AXIS.Z || axis === AXIS.ZY || axis === AXIS.XZ) {
                gpu.uniform3fv(uniforms.axis, Z)
                LineAPI.draw(Z)
            }

        } else
            GizmoSystem.hasStarted = false
    }


}
