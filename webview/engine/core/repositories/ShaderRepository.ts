import Shader from "../instances/Shader"
import UberShaderService from "../services/UberShaderService"
import AbstractEngineService from "@engine-core/AbstractEngineService";


const SPRITE_FRAG  = "SPRITE.frag"
const SPRITE_VERTEX  = "SPRITE.vert"
const QUAD_VERTEX  = "QUAD.vert"
const LENS_POST_PROCESSING_FRAG  = "LENS_POST_PROCESSING.frag"
const SSAO  = "SSAO.frag"
const BOX_BLUR_FRAG  = "BOX-BLUR.frag"
const FXAA_FRAG  = "FRAME_COMPOSITION.frag"
const BRIGHTNESS_FILTER_FRAG  = "BRIGHTNESS_FILTER.frag"
const SSGI  = "SSGI.frag"
const CUBEMAP  = "CUBEMAP.vert"
const PREFILTERED_MAP  = "PREFILTERED_MAP.frag"
const IRRADIANCE_MAP  = "IRRADIANCE_MAP.frag"
const MOTION_BLUR_FRAG  = "MOTION_BLUR.frag"
const GAUSSIAN_FRAG  = "GAUSSIAN.frag"
const UPSAMPLING_TEND_FRAG  = "UPSAMPLE_TENT.glsl"
const BOKEH_FRAG  = "BOKEH.frag"
const BILATERAL_BLUR  = "BILATERAL_BLUR.glsl"
const BILINEAR_DOWNSCALE  = "BILINEAR_DOWNSCALE.glsl"
const TO_SCREEN  = "TO_SCREEN.frag"
const V_BUFFER_VERT  = "V_BUFFER.vert"
const V_BUFFER_FRAG  = "V_BUFFER.frag"
const OMNIDIRECTIONAL_SHADOWS  = "OMNIDIRECTIONAL_SHADOWS.frag"
const SHADOWS_VERTEX  = "SHADOWS.vert"
const DIRECTIONAL_SHADOWS  = "DIRECTIONAL_SHADOWS.frag"
const ATMOSPHERE_FRAG  = "ATMOSPHERE.frag"
const ICONS_SPRITE_VERT  = "ICONS_SPRITE.vert"
const ICONS_SPRITE_TO_DEPTH_VERT  = "ICONS_SPRITE_TO_DEPTH.vert"
const ICONS_SPRITE_FRAG  = "ICONS_SPRITE.frag"
const ICONS_SPRITE_TO_DEPTH_FRAG  = "ICONS_SPRITE_TO_DEPTH.frag"
const LINE_VERT  = "LINE.vert"
const LINE_FRAG  = "LINE.frag"
const GIZMO_TO_DEPTH_VERT  = "GIZMO_TO_DEPTH.vert"
const GIZMO_TO_DEPTH_FRAG  = "GIZMO_TO_DEPTH.frag"
const GIZMO_VERT  = "GIZMO.vert"
const GIZMO_FRAG  = "GIZMO.frag"
const WIREFRAME_VERT  = "WIREFRAME.vert"
const WIREFRAME_FRAG  = "WIREFRAME.frag"
const ROTATION_GIZMO_VERT  = "ROTATION_GIZMO.vert"
const ROTATION_GIZMO_FRAG  = "ROTATION_GIZMO.frag"
const GRID_VERT  = "GRID.vert"
const GRID_FRAG  = "GRID.frag"
const SILHOUETTE_VERT  = "SILHOUETTE.vert"
const SILHOUETTE_FRAG  = "SILHOUETTE.frag"
const MESH_MAP_VERT  = "MESH_MAP.vert"
const MESH_MAP_FRAG  = "MESH_MAP.frag"

import {ShaderUniforms} from "@engine-core/engine-d";


export default class ShaderRepository extends AbstractEngineService {

    static sprite?: Shader
    static spriteUniforms?: ShaderUniforms

    static visibility?: Shader
    static visibilityUniforms?: ShaderUniforms

    static toScreen?: Shader
    static toScreenUniforms?: ShaderUniforms

    static downscale?: Shader
    static downscaleUniforms?: ShaderUniforms

    static bilateralBlur?: Shader
    static bilateralBlurUniforms?: ShaderUniforms

    static bokeh?: Shader
    static bokehUniforms?: ShaderUniforms

    static irradiance?: Shader
    static irradianceUniforms?: ShaderUniforms

    static prefiltered?: Shader
    static prefilteredUniforms?: ShaderUniforms

    static ssgi?: Shader
    static ssgiUniforms?: ShaderUniforms

    static atmosphere?: Shader
    static atmosphereUniforms?: ShaderUniforms

    static mb?: Shader
    static mbUniforms?: ShaderUniforms

    static ssao?: Shader
    static ssaoUniforms?: ShaderUniforms

    static boxBlur?: Shader
    static boxBlurUniforms?: ShaderUniforms

    static directShadows?: Shader
    static directShadowsUniforms?: ShaderUniforms

    static omniDirectShadows?: Shader
    static omniDirectShadowsUniforms?: ShaderUniforms

    static composition?: Shader
    static compositionUniforms?: ShaderUniforms

    static bloom?: Shader
    static bloomUniforms?: ShaderUniforms

    static lens?: Shader
    static lensUniforms?: ShaderUniforms

    static gaussian?: Shader
    static gaussianUniforms?: ShaderUniforms

    static upSampling?: Shader
    static upSamplingUniforms?: ShaderUniforms


    static icon?: Shader
    static iconUniforms?: ShaderUniforms

    static line?: Shader
    static lineUniforms?: ShaderUniforms

    static toDepthBuffer?: Shader
    static toDepthBufferUniforms?: ShaderUniforms

    static gizmo?: Shader
    static gizmoUniforms?: ShaderUniforms

    static wireframe?: Shader
    static wireframeUniforms?: ShaderUniforms

    static rotation?: Shader
    static rotationUniforms?: ShaderUniforms

    static grid?: Shader
    static gridUniforms?: ShaderUniforms

    static silhouette?: Shader
    static silhouetteUniforms?: ShaderUniforms

    static outline?: Shader
    static outlineUniforms?: ShaderUniforms

    static iconToDepth?: Shader
    static iconToDepthUniforms?: ShaderUniforms


    async initialize() {
        await this.buildShaders()
    }

    async buildShaders() {
        ShaderRepository.sprite = await this.gpu.getShaderInstance(SPRITE_VERTEX, SPRITE_FRAG)
        ShaderRepository.visibility = await this.gpu.getShaderInstance(V_BUFFER_VERT, V_BUFFER_FRAG)
        ShaderRepository.toScreen = await this.gpu.getShaderInstance(QUAD_VERTEX, TO_SCREEN)
        ShaderRepository.downscale = await this.gpu.getShaderInstance(QUAD_VERTEX, BILINEAR_DOWNSCALE)
        ShaderRepository.bilateralBlur = await this.gpu.getShaderInstance(QUAD_VERTEX, BILATERAL_BLUR)
        ShaderRepository.bokeh = await this.gpu.getShaderInstance(QUAD_VERTEX, BOKEH_FRAG)
        ShaderRepository.irradiance = await this.gpu.getShaderInstance(CUBEMAP, IRRADIANCE_MAP)
        ShaderRepository.prefiltered = await this.gpu.getShaderInstance(CUBEMAP, PREFILTERED_MAP)
        ShaderRepository.ssgi = await this.gpu.getShaderInstance(QUAD_VERTEX, SSGI)
        ShaderRepository.mb = await this.gpu.getShaderInstance(QUAD_VERTEX, MOTION_BLUR_FRAG)
        ShaderRepository.ssao = await this.gpu.getShaderInstance(QUAD_VERTEX, SSAO)
        ShaderRepository.boxBlur = await this.gpu.getShaderInstance(QUAD_VERTEX, BOX_BLUR_FRAG)
        ShaderRepository.directShadows = await this.gpu.getShaderInstance(SHADOWS_VERTEX, DIRECTIONAL_SHADOWS)
        ShaderRepository.omniDirectShadows = await this.gpu.getShaderInstance(SHADOWS_VERTEX, OMNIDIRECTIONAL_SHADOWS)
        ShaderRepository.composition = await this.gpu.getShaderInstance(QUAD_VERTEX, FXAA_FRAG)
        ShaderRepository.bloom = await this.gpu.getShaderInstance(QUAD_VERTEX, BRIGHTNESS_FILTER_FRAG)
        ShaderRepository.lens = await this.gpu.getShaderInstance(QUAD_VERTEX, LENS_POST_PROCESSING_FRAG)
        ShaderRepository.gaussian = await this.gpu.getShaderInstance(QUAD_VERTEX, GAUSSIAN_FRAG)
        ShaderRepository.upSampling = await this.gpu.getShaderInstance(QUAD_VERTEX, UPSAMPLING_TEND_FRAG)
        ShaderRepository.atmosphere = await this.gpu.getShaderInstance(QUAD_VERTEX, ATMOSPHERE_FRAG)

        await this.engine.get(UberShaderService).compile()

        ShaderRepository.atmosphereUniforms = ShaderRepository.atmosphere.uniformMap
        ShaderRepository.spriteUniforms = ShaderRepository.sprite.uniformMap
        ShaderRepository.visibilityUniforms = ShaderRepository.visibility.uniformMap
        ShaderRepository.toScreenUniforms = ShaderRepository.toScreen.uniformMap
        ShaderRepository.downscaleUniforms = ShaderRepository.downscale.uniformMap
        ShaderRepository.bilateralBlurUniforms = ShaderRepository.bilateralBlur.uniformMap
        ShaderRepository.bokehUniforms = ShaderRepository.bokeh.uniformMap
        ShaderRepository.irradianceUniforms = ShaderRepository.irradiance.uniformMap
        ShaderRepository.prefilteredUniforms = ShaderRepository.prefiltered.uniformMap
        ShaderRepository.ssgiUniforms = ShaderRepository.ssgi.uniformMap
        ShaderRepository.mbUniforms = ShaderRepository.mb.uniformMap
        ShaderRepository.ssaoUniforms = ShaderRepository.ssao.uniformMap
        ShaderRepository.boxBlurUniforms = ShaderRepository.boxBlur.uniformMap
        ShaderRepository.directShadowsUniforms = ShaderRepository.directShadows.uniformMap
        ShaderRepository.omniDirectShadowsUniforms = ShaderRepository.omniDirectShadows.uniformMap
        ShaderRepository.compositionUniforms = ShaderRepository.composition.uniformMap
        ShaderRepository.bloomUniforms = ShaderRepository.bloom.uniformMap
        ShaderRepository.lensUniforms = ShaderRepository.lens.uniformMap
        ShaderRepository.gaussianUniforms = ShaderRepository.gaussian.uniformMap
        ShaderRepository.upSamplingUniforms = ShaderRepository.upSampling.uniformMap
        
        ShaderRepository.icon = await this.gpu.getShaderInstance(ICONS_SPRITE_VERT, ICONS_SPRITE_FRAG)
        ShaderRepository.iconToDepth = await this.gpu.getShaderInstance(ICONS_SPRITE_TO_DEPTH_VERT, ICONS_SPRITE_TO_DEPTH_FRAG)
        ShaderRepository.line = await this.gpu.getShaderInstance(LINE_VERT, LINE_FRAG)
        ShaderRepository.toDepthBuffer = await this.gpu.getShaderInstance(GIZMO_TO_DEPTH_VERT, GIZMO_TO_DEPTH_FRAG)
        ShaderRepository.gizmo = await this.gpu.getShaderInstance(GIZMO_VERT, GIZMO_FRAG)
        ShaderRepository.wireframe = await this.gpu.getShaderInstance(WIREFRAME_VERT, WIREFRAME_FRAG)
        ShaderRepository.rotation = await this.gpu.getShaderInstance(ROTATION_GIZMO_VERT, ROTATION_GIZMO_FRAG)
        ShaderRepository.grid = await this.gpu.getShaderInstance(GRID_VERT, GRID_FRAG)
        ShaderRepository.outline = await this.gpu.getShaderInstance(SILHOUETTE_VERT, SILHOUETTE_FRAG)
        ShaderRepository.silhouette = await this.gpu.getShaderInstance(MESH_MAP_VERT, MESH_MAP_FRAG)

        ShaderRepository.iconToDepthUniforms = ShaderRepository.iconToDepth.uniformMap
        ShaderRepository.iconUniforms = ShaderRepository.icon.uniformMap
        ShaderRepository.lineUniforms = ShaderRepository.line.uniformMap
        ShaderRepository.toDepthBufferUniforms = ShaderRepository.toDepthBuffer.uniformMap
        ShaderRepository.gizmoUniforms = ShaderRepository.gizmo.uniformMap
        ShaderRepository.wireframeUniforms = ShaderRepository.wireframe.uniformMap
        ShaderRepository.rotationUniforms = ShaderRepository.rotation.uniformMap
        ShaderRepository.gridUniforms = ShaderRepository.grid.uniformMap
        ShaderRepository.outlineUniforms = ShaderRepository.outline.uniformMap
        ShaderRepository.silhouetteUniforms = ShaderRepository.silhouette.uniformMap

    }

}