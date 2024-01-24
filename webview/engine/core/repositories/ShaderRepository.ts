import Shader from "../instances/Shader"
import UberShaderService from "../services/UberShaderService"
import AbstractEngineService from "@engine-core/AbstractEngineService";
import SPRITE_FRAG from "../shaders/forward-rendering/SPRITE.frag"
import SPRITE_VERTEX from "../shaders/forward-rendering/SPRITE.vert"
import QUAD_VERTEX from "../shaders/post-processing/QUAD.vert"
import LENS_POST_PROCESSING_FRAG from "../shaders/post-processing/LENS_POST_PROCESSING.frag"
import SSAO from "../shaders/post-processing/SSAO.frag"
import BOX_BLUR_FRAG from "../shaders/post-processing/BOX-BLUR.frag"
import FXAA_FRAG from "../shaders/post-processing/FRAME_COMPOSITION.frag"
import BRIGHTNESS_FILTER_FRAG from "../shaders/post-processing/BRIGHTNESS_FILTER.frag"
import SSGI from "../shaders/post-processing/SSGI.frag"
import CUBEMAP from "../shaders/forward-rendering/CUBEMAP.vert"
import PREFILTERED_MAP from "../shaders/post-processing/PREFILTERED_MAP.frag"
import IRRADIANCE_MAP from "../shaders/post-processing/IRRADIANCE_MAP.frag"
import MOTION_BLUR_FRAG from "../shaders/post-processing/MOTION_BLUR.frag"
import GAUSSIAN_FRAG from "../shaders/post-processing/GAUSSIAN.frag"
import UPSAMPLING_TEND_FRAG from "../shaders/post-processing/UPSAMPLE_TENT.glsl"
import BOKEH_FRAG from "../shaders/post-processing/BOKEH.frag"
import BILATERAL_BLUR from "../shaders/post-processing/BILATERAL_BLUR.glsl"
import BILINEAR_DOWNSCALE from "../shaders/post-processing/BILINEAR_DOWNSCALE.glsl"
import TO_SCREEN from "../shaders/post-processing/TO_SCREEN.frag"
import V_BUFFER_VERT from "../shaders/forward-rendering/V_BUFFER.vert"
import V_BUFFER_FRAG from "../shaders/forward-rendering/V_BUFFER.frag"
import OMNIDIRECTIONAL_SHADOWS from "../shaders/forward-rendering/OMNIDIRECTIONAL_SHADOWS.frag"
import SHADOWS_VERTEX from "../shaders/forward-rendering/SHADOWS.vert"
import DIRECTIONAL_SHADOWS from "../shaders/forward-rendering/DIRECTIONAL_SHADOWS.frag"
import ATMOSPHERE_FRAG from "../shaders/forward-rendering/ATMOSPHERE.frag"


export default class ShaderRepository extends AbstractEngineService {

    static sprite?: Shader
    static spriteUniforms?: { [key: string]: WebGLUniformLocation }

    static visibility?: Shader
    static visibilityUniforms?: { [key: string]: WebGLUniformLocation }

    static toScreen?: Shader
    static toScreenUniforms?: { [key: string]: WebGLUniformLocation }

    static downscale?: Shader
    static downscaleUniforms?: { [key: string]: WebGLUniformLocation }

    static bilateralBlur?: Shader
    static bilateralBlurUniforms?: { [key: string]: WebGLUniformLocation }

    static bokeh?: Shader
    static bokehUniforms?: { [key: string]: WebGLUniformLocation }

    static irradiance?: Shader
    static irradianceUniforms?: { [key: string]: WebGLUniformLocation }

    static prefiltered?: Shader
    static prefilteredUniforms?: { [key: string]: WebGLUniformLocation }

    static ssgi?: Shader
    static ssgiUniforms?: { [key: string]: WebGLUniformLocation }

    static atmosphere?: Shader
    static atmosphereUniforms?: { [key: string]: WebGLUniformLocation }


    static mb?: Shader
    static mbUniforms?: { [key: string]: WebGLUniformLocation }

    static ssao?: Shader
    static ssaoUniforms?: { [key: string]: WebGLUniformLocation }

    static boxBlur?: Shader
    static boxBlurUniforms?: { [key: string]: WebGLUniformLocation }

    static directShadows?: Shader
    static directShadowsUniforms?: { [key: string]: WebGLUniformLocation }

    static omniDirectShadows?: Shader
    static omniDirectShadowsUniforms?: { [key: string]: WebGLUniformLocation }

    static composition?: Shader
    static compositionUniforms?: { [key: string]: WebGLUniformLocation }

    static bloom?: Shader
    static bloomUniforms?: { [key: string]: WebGLUniformLocation }

    static lens?: Shader
    static lensUniforms?: { [key: string]: WebGLUniformLocation }

    static gaussian?: Shader
    static gaussianUniforms?: { [key: string]: WebGLUniformLocation }

    static upSampling?: Shader
    static upSamplingUniforms?: { [key: string]: WebGLUniformLocation }


    async initialize() {

        ShaderRepository.sprite = new Shader(SPRITE_VERTEX, SPRITE_FRAG)
        ShaderRepository.visibility = new Shader(V_BUFFER_VERT, V_BUFFER_FRAG)
        ShaderRepository.toScreen = new Shader(QUAD_VERTEX, TO_SCREEN)
        ShaderRepository.downscale = new Shader(QUAD_VERTEX, BILINEAR_DOWNSCALE)
        ShaderRepository.bilateralBlur = new Shader(QUAD_VERTEX, BILATERAL_BLUR)
        ShaderRepository.bokeh = new Shader(QUAD_VERTEX, BOKEH_FRAG)
        ShaderRepository.irradiance = new Shader(CUBEMAP, IRRADIANCE_MAP)
        ShaderRepository.prefiltered = new Shader(CUBEMAP, PREFILTERED_MAP)
        ShaderRepository.ssgi = new Shader(QUAD_VERTEX, SSGI)
        ShaderRepository.mb = new Shader(QUAD_VERTEX, MOTION_BLUR_FRAG)
        ShaderRepository.ssao = new Shader(QUAD_VERTEX, SSAO)
        ShaderRepository.boxBlur = new Shader(QUAD_VERTEX, BOX_BLUR_FRAG)
        ShaderRepository.directShadows = new Shader(SHADOWS_VERTEX, DIRECTIONAL_SHADOWS)
        ShaderRepository.omniDirectShadows = new Shader(SHADOWS_VERTEX, OMNIDIRECTIONAL_SHADOWS)
        ShaderRepository.composition = new Shader(QUAD_VERTEX, FXAA_FRAG)
        ShaderRepository.bloom = new Shader(QUAD_VERTEX, BRIGHTNESS_FILTER_FRAG)
        ShaderRepository.lens = new Shader(QUAD_VERTEX, LENS_POST_PROCESSING_FRAG)
        ShaderRepository.gaussian = new Shader(QUAD_VERTEX, GAUSSIAN_FRAG)
        ShaderRepository.upSampling = new Shader(QUAD_VERTEX, UPSAMPLING_TEND_FRAG)
        ShaderRepository.atmosphere = new Shader(QUAD_VERTEX, ATMOSPHERE_FRAG)

        UberShaderService.compile()

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


    }

}