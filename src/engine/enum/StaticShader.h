#ifndef PROJECTION_STATICSHADER_H
#define PROJECTION_STATICSHADER_H

#include <string>

namespace PEngine {
    struct StaticShader {
        static std::string SPRITE_FRAG;
        static std::string SPRITE_VERTEX;
        static std::string QUAD_VERTEX;
        static std::string LENS_POST_PROCESSING_FRAG;
        static std::string SSAO;
        static std::string BOX_BLUR_FRAG;
        static std::string FXAA_FRAG;
        static std::string BRIGHTNESS_FILTER_FRAG;
        static std::string SSGI;
        static std::string CUBEMAP;
        static std::string PREFILTERED_MAP;
        static std::string IRRADIANCE_MAP;
        static std::string MOTION_BLUR_FRAG;
        static std::string GAUSSIAN_FRAG;
        static std::string UPSAMPLING_TEND_FRAG;
        static std::string BOKEH_FRAG;
        static std::string BILATERAL_BLUR;
        static std::string BILINEAR_DOWNSCALE;
        static std::string TO_SCREEN;
        static std::string V_BUFFER_VERT;
        static std::string V_BUFFER_FRAG;
        static std::string OMNIDIRECTIONAL_SHADOWS;
        static std::string SHADOWS_VERTEX;
        static std::string DIRECTIONAL_SHADOWS;
        static std::string ATMOSPHERE_FRAG;
        static std::string ICONS_SPRITE_VERT;
        static std::string ICONS_SPRITE_TO_DEPTH_VERT;
        static std::string ICONS_SPRITE_FRAG;
        static std::string ICONS_SPRITE_TO_DEPTH_FRAG;
        static std::string LINE_VERT;
        static std::string LINE_FRAG;
        static std::string GIZMO_TO_DEPTH_VERT;
        static std::string GIZMO_TO_DEPTH_FRAG;
        static std::string GIZMO_VERT;
        static std::string GIZMO_FRAG;
        static std::string WIREFRAME_VERT;
        static std::string WIREFRAME_FRAG;
        static std::string ROTATION_GIZMO_VERT;
        static std::string ROTATION_GIZMO_FRAG;
        static std::string GRID_VERT;
        static std::string GRID_FRAG;
        static std::string SILHOUETTE_VERT;
        static std::string SILHOUETTE_FRAG;
        static std::string MESH_MAP_VERT;
        static std::string MESH_MAP_FRAG;
    };
}
#endif
