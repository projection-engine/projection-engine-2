#include "glad/glad.h"
#include "StaticShaderFactory.h"
#include "../../enum/StaticShader.h"
#include "core/Shader.h"

namespace PEngine {

    AbstractResource *CreateShader(const std::string &vertex, const std::string &fragment) {
        return (new Shader())->init(
                vertex,
                fragment,
                false);;
    }

    void GenerateStaticShaders(std::unordered_map<StaticResource, AbstractResource *> &rMap) {
        rMap[StaticResource::SHADER_SPRITE] = CreateShader(StaticShader::SPRITE_VERTEX, StaticShader::SPRITE_FRAG);
        rMap[StaticResource::SHADER_VBUFFER] = CreateShader(StaticShader::V_BUFFER_VERT, StaticShader::V_BUFFER_FRAG);
        rMap[StaticResource::SHADER_TO_SCREEN] = CreateShader(StaticShader::QUAD_VERTEX, StaticShader::TO_SCREEN);
        rMap[StaticResource::SHADER_BILINEAR_DOWNSCALE] = CreateShader(StaticShader::QUAD_VERTEX,
                                                                       StaticShader::BILINEAR_DOWNSCALE);
        rMap[StaticResource::SHADER_BILATERAL_BLUR] = CreateShader(StaticShader::QUAD_VERTEX,
                                                                   StaticShader::BILATERAL_BLUR);
        rMap[StaticResource::SHADER_BOKEH] = CreateShader(StaticShader::QUAD_VERTEX, StaticShader::BOKEH_FRAG);
        rMap[StaticResource::SHADER_IRRADIANCE] = CreateShader(StaticShader::CUBEMAP, StaticShader::IRRADIANCE_MAP);
        rMap[StaticResource::SHADER_PREFILTERING] = CreateShader(StaticShader::CUBEMAP, StaticShader::PREFILTERED_MAP);
        rMap[StaticResource::SHADER_SSGI] = CreateShader(StaticShader::QUAD_VERTEX, StaticShader::SSGI);
        rMap[StaticResource::SHADER_MOTION_BLUR] = CreateShader(StaticShader::QUAD_VERTEX,
                                                                StaticShader::MOTION_BLUR_FRAG);
        rMap[StaticResource::SHADER_SSAO] = CreateShader(StaticShader::QUAD_VERTEX, StaticShader::SSAO);
        rMap[StaticResource::SHADER_BOX_BLUR] = CreateShader(StaticShader::QUAD_VERTEX, StaticShader::BOX_BLUR_FRAG);
        rMap[StaticResource::SHADER_DIRECTIONAL_SHADOWS] = CreateShader(StaticShader::SHADOWS_VERTEX,
                                                                        StaticShader::DIRECTIONAL_SHADOWS);
        rMap[StaticResource::SHADER_POINT_SHADOWS] = CreateShader(StaticShader::SHADOWS_VERTEX,
                                                                  StaticShader::OMNIDIRECTIONAL_SHADOWS);
        rMap[StaticResource::SHADER_FXAA] = CreateShader(StaticShader::QUAD_VERTEX, StaticShader::FXAA_FRAG);
        rMap[StaticResource::SHADER_BRIGHTNESS_FILTER] = CreateShader(StaticShader::QUAD_VERTEX,
                                                                      StaticShader::BRIGHTNESS_FILTER_FRAG);
        rMap[StaticResource::SHADER_LENS_POST_PROCESSING] = CreateShader(StaticShader::QUAD_VERTEX,
                                                                         StaticShader::LENS_POST_PROCESSING_FRAG);
        rMap[StaticResource::SHADER_GAUSSIAN_BLUR] = CreateShader(StaticShader::QUAD_VERTEX,
                                                                  StaticShader::GAUSSIAN_FRAG);
        rMap[StaticResource::SHADER_TEND_UPSAMPLING] = CreateShader(StaticShader::QUAD_VERTEX,
                                                                    StaticShader::UPSAMPLING_TEND_FRAG);
        rMap[StaticResource::SHADER_ATMOSPHERE] = CreateShader(StaticShader::QUAD_VERTEX,
                                                               StaticShader::ATMOSPHERE_FRAG);
    }
}