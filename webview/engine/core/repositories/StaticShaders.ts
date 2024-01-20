import SHADERS from "../static/SHADERS"
import Shader from "../instances/Shader"
import UberShader from "./UberShader"
import AbstractEngineService from "@engine-core/AbstractEngineService";

export default class StaticShaders extends AbstractEngineService {

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

		StaticShaders.sprite = new Shader(SHADERS.SPRITE_VERTEX, SHADERS.SPRITE_FRAG)
		StaticShaders.visibility = new Shader(SHADERS.V_BUFFER_VERT, SHADERS.V_BUFFER_FRAG)
		StaticShaders.toScreen = new Shader(SHADERS.QUAD_VERTEX, SHADERS.TO_SCREEN)
		StaticShaders.downscale = new Shader(SHADERS.QUAD_VERTEX, SHADERS.BILINEAR_DOWNSCALE)
		StaticShaders.bilateralBlur = new Shader(SHADERS.QUAD_VERTEX, SHADERS.BILATERAL_BLUR)
		StaticShaders.bokeh = new Shader(SHADERS.QUAD_VERTEX, SHADERS.BOKEH_FRAG)
		StaticShaders.irradiance = new Shader(SHADERS.CUBEMAP, SHADERS.IRRADIANCE_MAP)
		StaticShaders.prefiltered = new Shader(SHADERS.CUBEMAP, SHADERS.PREFILTERED_MAP)
		StaticShaders.ssgi = new Shader(SHADERS.QUAD_VERTEX, SHADERS.SSGI)
		StaticShaders.mb = new Shader(SHADERS.QUAD_VERTEX, SHADERS.MOTION_BLUR_FRAG)
		StaticShaders.ssao = new Shader(SHADERS.QUAD_VERTEX, SHADERS.SSAO)
		StaticShaders.boxBlur = new Shader(SHADERS.QUAD_VERTEX, SHADERS.BOX_BLUR_FRAG)
		StaticShaders.directShadows = new Shader(SHADERS.SHADOWS_VERTEX, SHADERS.DIRECTIONAL_SHADOWS)
		StaticShaders.omniDirectShadows = new Shader(SHADERS.SHADOWS_VERTEX, SHADERS.OMNIDIRECTIONAL_SHADOWS)
		StaticShaders.composition = new Shader(SHADERS.QUAD_VERTEX, SHADERS.FXAA_FRAG)
		StaticShaders.bloom = new Shader(SHADERS.QUAD_VERTEX, SHADERS.BRIGHTNESS_FILTER_FRAG)
		StaticShaders.lens = new Shader(SHADERS.QUAD_VERTEX, SHADERS.LENS_POST_PROCESSING_FRAG)
		StaticShaders.gaussian = new Shader(SHADERS.QUAD_VERTEX, SHADERS.GAUSSIAN_FRAG)
		StaticShaders.upSampling = new Shader(SHADERS.QUAD_VERTEX, SHADERS.UPSAMPLING_TEND_FRAG)
		StaticShaders.atmosphere = new Shader(SHADERS.QUAD_VERTEX, SHADERS.ATMOSPHERE_FRAG)

		UberShader.compile()
        
		StaticShaders.atmosphereUniforms = StaticShaders.atmosphere.uniformMap
		StaticShaders.spriteUniforms = StaticShaders.sprite.uniformMap
		StaticShaders.visibilityUniforms = StaticShaders.visibility.uniformMap
		StaticShaders.toScreenUniforms = StaticShaders.toScreen.uniformMap
		StaticShaders.downscaleUniforms = StaticShaders.downscale.uniformMap
		StaticShaders.bilateralBlurUniforms = StaticShaders.bilateralBlur.uniformMap
		StaticShaders.bokehUniforms = StaticShaders.bokeh.uniformMap
		StaticShaders.irradianceUniforms = StaticShaders.irradiance.uniformMap
		StaticShaders.prefilteredUniforms = StaticShaders.prefiltered.uniformMap
		StaticShaders.ssgiUniforms = StaticShaders.ssgi.uniformMap
		StaticShaders.mbUniforms = StaticShaders.mb.uniformMap
		StaticShaders.ssaoUniforms = StaticShaders.ssao.uniformMap
		StaticShaders.boxBlurUniforms = StaticShaders.boxBlur.uniformMap
		StaticShaders.directShadowsUniforms = StaticShaders.directShadows.uniformMap
		StaticShaders.omniDirectShadowsUniforms = StaticShaders.omniDirectShadows.uniformMap
		StaticShaders.compositionUniforms = StaticShaders.composition.uniformMap
		StaticShaders.bloomUniforms = StaticShaders.bloom.uniformMap
		StaticShaders.lensUniforms = StaticShaders.lens.uniformMap
		StaticShaders.gaussianUniforms = StaticShaders.gaussian.uniformMap
		StaticShaders.upSamplingUniforms = StaticShaders.upSampling.uniformMap


	}

}