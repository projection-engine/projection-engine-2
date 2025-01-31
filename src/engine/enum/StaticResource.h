#ifndef PROJECTION_STATICRESOURCE_H
#define PROJECTION_STATICRESOURCE_H
namespace PEngine{
    enum StaticResource{
        SHADER_SPRITE,
        SHADER_VBUFFER,
        SHADER_TO_SCREEN,
        SHADER_BILINEAR_DOWNSCALE,
        SHADER_BILATERAL_BLUR,
        SHADER_BOKEH,
        SHADER_IRRADIANCE,
        SHADER_PREFILTERING,
        SHADER_SSGI,
        SHADER_MOTION_BLUR,
        SHADER_SSAO,
        SHADER_BOX_BLUR,
        SHADER_DIRECTIONAL_SHADOWS,
        SHADER_POINT_SHADOWS,
        SHADER_FXAA,
        SHADER_BRIGHTNESS_FILTER,
        SHADER_LENS_POST_PROCESSING,
        SHADER_GAUSSIAN_BLUR,
        SHADER_TEND_UPSAMPLING,
        SHADER_ATMOSPHERE,
        SHADER_ICON,
        SHADER_ICON_DEPTH,
        SHADER_LINE,
        SHADER_TO_DEPTH,
        SHADER_GIZMO,
        SHADER_WIREFRAME,
        SHADER_ROTATION_GIZMO,
        SHADER_GRID,
        SHADER_OUTLINE,
        SHADER_SILHOUETTE,

        FBO_DIRECTIONAL_SHADOWS,
        FBO_GIZMO,
        FBO_VISIBILITY,
        FBO_POST_PROCESSING_1,
        FBO_POST_PROCESSING_2,
        FBO_LENS,
        FBO_SSGI,
        FBO_SSGI_FALLBACK,
        FBO_SSAO,
        FBO_SSAO_BLURRED,
        FBO_DOWNSCALE_1,
        FBO_DOWNSCALE_2,
        FBO_DOWNSCALE_3,
        FBO_DOWNSCALE_4,
        FBO_DOWNSCALE_5,
        FBO_DOWNSCALE_6,
        FBO_DOWNSCALE_7,
        FBO_UPSCALE_1,
        FBO_UPSCALE_2,

        UBO_CAMERA_VIEW,
        UBO_FRAME_COMPOSITION,
        UBO_LENS_PP,
        UBO_SSAO,
        UBO_UBER,
        UBO_LIGHTS,
        UBO_CAMERA_PROJECTION,

        TEXTURE_NOISE,

        MESH_SPHERE,
        MESH_CUBE,
        MESH_CYLINDER,
        MESH_PLANE,
        MESH_QUAD
    };
}
#endif
