import STATIC_TEXTURES from "../../../public/engine/static/resources/STATIC_TEXTURES";
import circle from "../../static/icons/circle.png";
import STATIC_SHADERS from "../../../public/engine/static/resources/STATIC_SHADERS";
import * as gizmoShaderCode from "./shaders/GIZMO.glsl";
import STATIC_MESHES from "../../../public/engine/static/resources/STATIC_MESHES";
import PLANE from "./static/DUAL_AXIS_GIZMO.json";
import ROTATION_GIZMO from "./static/ROTATION_GIZMO.json";
import SCALE_GIZMO from "./static/SCALE_GIZMO.json";
import TRANSLATION_GIZMO from "./static/TRANSLATION_GIZMO.json";
import Engine from "../../../public/engine/Engine";
import ENVIRONMENT from "../../../public/engine/static/ENVIRONMENT";
import GridSystem from "./runtime/GridSystem";
import IconsSystem from "./runtime/IconsSystem";
import SelectedSystem from "./runtime/SelectedSystem";
import GizmoSystem from "./runtime/GizmoSystem";
import CollisionVisualizationSystem from "./runtime/CollisionVisualizationSystem";
import UIAPI from "../../../public/engine/lib/rendering/UIAPI";
import GPUAPI from "../../../public/engine/lib/rendering/GPUAPI";
import WIREFRAMEGlsl from "./shaders/WIREFRAME.glsl";
import RotationGizmo from "./lib/transformation/RotationGizmo";
import * as SELECTED from "./shaders/SELECTED.glsl"
import * as GRID from "./shaders/GRID.glsl";

import CUBEMAP_VERT from "../../../public/engine/shaders/forward-rendering/CUBEMAP.vert"
import CUBEMAP_FRAG from "./shaders/CUBEMAP.frag"
import ICONS from "./static/ICONS.base64"
import ICONS_SPRITE_FRAG from "./shaders/ICONS_SPRITE.frag"
import ICONS_SPRITE_VERT from "./shaders/ICONS_SPRITE.vert"

export default async function initializer() {

    UIAPI.useIframe = true

    GPUAPI.allocateTexture(circle, STATIC_TEXTURES.ROTATION_GIZMO).catch()

    GPUAPI.allocateShader(STATIC_SHADERS.DEVELOPMENT.ICONS, ICONS_SPRITE_VERT, ICONS_SPRITE_FRAG)
    GPUAPI.allocateShader(STATIC_SHADERS.DEVELOPMENT.CUBEMAP, CUBEMAP_VERT, CUBEMAP_FRAG)
    GPUAPI.allocateShader(STATIC_SHADERS.DEVELOPMENT.LINE, gizmoShaderCode.lineVertex, gizmoShaderCode.lineFragment)
    GPUAPI.allocateShader(STATIC_SHADERS.DEVELOPMENT.TO_BUFFER, gizmoShaderCode.sameSizeVertex, gizmoShaderCode.pickFragment)
    GPUAPI.allocateShader(STATIC_SHADERS.DEVELOPMENT.UNSHADED, gizmoShaderCode.cameraVertex, gizmoShaderCode.cameraFragment)
    GPUAPI.allocateShader(STATIC_SHADERS.DEVELOPMENT.GIZMO, gizmoShaderCode.vertex, gizmoShaderCode.fragment)

    CollisionVisualizationSystem.shader = GPUAPI.allocateShader(STATIC_SHADERS.DEVELOPMENT.WIREFRAME, WIREFRAMEGlsl.vertex, WIREFRAMEGlsl.fragment)
    RotationGizmo.shader = GPUAPI.allocateShader(STATIC_SHADERS.DEVELOPMENT.ROTATION_GIZMO, gizmoShaderCode.vertexRot, gizmoShaderCode.fragmentRot)
    GridSystem.shader = GPUAPI.allocateShader(STATIC_SHADERS.DEVELOPMENT.GRID, GRID.vertex, GRID.fragment)
    GPUAPI.allocateShader(STATIC_SHADERS.DEVELOPMENT.SILHOUETTE_OUTLINE, SELECTED.vertexSilhouette, SELECTED.fragmentSilhouette)
    SelectedSystem.shader = GPUAPI.allocateShader(STATIC_SHADERS.DEVELOPMENT.SILHOUETTE, SELECTED.vertex, SELECTED.fragment)

    GPUAPI.allocateMesh(STATIC_MESHES.EDITOR.DUAL_AXIS_GIZMO, PLANE)
    GPUAPI.allocateMesh(STATIC_MESHES.EDITOR.ROTATION_GIZMO, ROTATION_GIZMO)
    GPUAPI.allocateMesh(STATIC_MESHES.EDITOR.SCALE_GIZMO, SCALE_GIZMO)
    GPUAPI.allocateMesh(STATIC_MESHES.EDITOR.TRANSLATION_GIZMO, TRANSLATION_GIZMO)

    Engine.environment = ENVIRONMENT.DEV

    CollisionVisualizationSystem.initialize()
    GridSystem.initialize()
    IconsSystem.initialize()
    SelectedSystem.initialize()
    GizmoSystem.initialize()


    GPUAPI.allocateTexture(ICONS, STATIC_TEXTURES.ICONS).then(texture => {
        IconsSystem.iconsTexture = texture.texture
    })


}