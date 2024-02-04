#include "glad/glad.h"
#include "StaticShaderFactory.h"
#include "../../enum/StaticShader.h"
#include "core/Shader.h"
#include "../ResourceService.h"

namespace PEngine {
    void GenerateStaticShaders(ResourceService *service) {
        service->createResource<Shader>(StaticResource::SHADER_SPRITE)
                ->init(StaticShader::SPRITE_VERTEX, StaticShader::SPRITE_FRAG, false);
        service->createResource<Shader>(StaticResource::SHADER_VBUFFER)
                ->init(StaticShader::V_BUFFER_VERT, StaticShader::V_BUFFER_FRAG, false);
        service->createResource<Shader>(StaticResource::SHADER_TO_SCREEN)
                ->init(StaticShader::QUAD_VERTEX, StaticShader::TO_SCREEN, false);
        service->createResource<Shader>(StaticResource::SHADER_BILINEAR_DOWNSCALE)
                ->init(StaticShader::QUAD_VERTEX, StaticShader::BILINEAR_DOWNSCALE, false);
        service->createResource<Shader>(StaticResource::SHADER_BILATERAL_BLUR)
                ->init(StaticShader::QUAD_VERTEX, StaticShader::BILATERAL_BLUR, false);
        service->createResource<Shader>(StaticResource::SHADER_BOKEH)
                ->init(StaticShader::QUAD_VERTEX, StaticShader::BOKEH_FRAG, false);
        service->createResource<Shader>(StaticResource::SHADER_IRRADIANCE)
                ->init(StaticShader::CUBEMAP, StaticShader::IRRADIANCE_MAP, false);
        service->createResource<Shader>(StaticResource::SHADER_PREFILTERING)
                ->init(StaticShader::CUBEMAP, StaticShader::PREFILTERED_MAP, false);
        service->createResource<Shader>(StaticResource::SHADER_SSGI)
                ->init(StaticShader::QUAD_VERTEX, StaticShader::SSGI, false);
        service->createResource<Shader>(StaticResource::SHADER_MOTION_BLUR)
                ->init(StaticShader::QUAD_VERTEX, StaticShader::MOTION_BLUR_FRAG, false);
        service->createResource<Shader>(StaticResource::SHADER_SSAO)
                ->init(StaticShader::QUAD_VERTEX, StaticShader::SSAO, false);
        service->createResource<Shader>(StaticResource::SHADER_BOX_BLUR)
                ->init(StaticShader::QUAD_VERTEX, StaticShader::BOX_BLUR_FRAG, false);
        service->createResource<Shader>(StaticResource::SHADER_DIRECTIONAL_SHADOWS)
                ->init(StaticShader::SHADOWS_VERTEX, StaticShader::DIRECTIONAL_SHADOWS, false);
        service->createResource<Shader>(StaticResource::SHADER_POINT_SHADOWS)
                ->init(StaticShader::SHADOWS_VERTEX, StaticShader::OMNIDIRECTIONAL_SHADOWS, false);
        service->createResource<Shader>(StaticResource::SHADER_FXAA)
                ->init(StaticShader::QUAD_VERTEX, StaticShader::FXAA_FRAG, false);
        service->createResource<Shader>(StaticResource::SHADER_BRIGHTNESS_FILTER)
                ->init(StaticShader::QUAD_VERTEX, StaticShader::BRIGHTNESS_FILTER_FRAG, false);
        service->createResource<Shader>(StaticResource::SHADER_LENS_POST_PROCESSING)
                ->init(StaticShader::QUAD_VERTEX, StaticShader::LENS_POST_PROCESSING_FRAG, false);
        service->createResource<Shader>(StaticResource::SHADER_GAUSSIAN_BLUR)
                ->init(StaticShader::QUAD_VERTEX, StaticShader::GAUSSIAN_FRAG, false);
        service->createResource<Shader>(StaticResource::SHADER_TEND_UPSAMPLING)
                ->init(StaticShader::QUAD_VERTEX, StaticShader::UPSAMPLING_TEND_FRAG, false);
        service->createResource<Shader>(StaticResource::SHADER_ATMOSPHERE)
                ->init(StaticShader::QUAD_VERTEX, StaticShader::ATMOSPHERE_FRAG, false);

        service->createResource<Shader>(StaticResource::SHADER_ICON)
                ->init(StaticShader::ICONS_SPRITE_VERT, StaticShader::ICONS_SPRITE_FRAG, false);
        service->createResource<Shader>(StaticResource::SHADER_ICON_DEPTH)
                ->init(StaticShader::ICONS_SPRITE_TO_DEPTH_VERT, StaticShader::ICONS_SPRITE_TO_DEPTH_FRAG, false);
        service->createResource<Shader>(StaticResource::SHADER_LINE)
                ->init(StaticShader::LINE_VERT, StaticShader::LINE_FRAG, false);
        service->createResource<Shader>(StaticResource::SHADER_TO_DEPTH)
                ->init(StaticShader::GIZMO_TO_DEPTH_VERT, StaticShader::GIZMO_TO_DEPTH_FRAG, false);
        service->createResource<Shader>(StaticResource::SHADER_GIZMO)
                ->init(StaticShader::GIZMO_VERT, StaticShader::GIZMO_FRAG, false);
        service->createResource<Shader>(StaticResource::SHADER_WIREFRAME)
                ->init(StaticShader::WIREFRAME_VERT, StaticShader::WIREFRAME_FRAG, false);
        service->createResource<Shader>(StaticResource::SHADER_ROTATION_GIZMO)
                ->init(StaticShader::ROTATION_GIZMO_VERT, StaticShader::ROTATION_GIZMO_FRAG, false);
        service->createResource<Shader>(StaticResource::SHADER_GRID)
                ->init(StaticShader::GRID_VERT, StaticShader::GRID_FRAG, false);
        service->createResource<Shader>(StaticResource::SHADER_OUTLINE)
                ->init(StaticShader::SILHOUETTE_VERT, StaticShader::SILHOUETTE_FRAG, false);
        service->createResource<Shader>(StaticResource::SHADER_SILHOUETTE)
                ->init(StaticShader::MESH_MAP_VERT, StaticShader::MESH_MAP_FRAG, false);
    }
}