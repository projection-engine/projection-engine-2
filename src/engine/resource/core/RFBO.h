#ifndef PROJECTION_RFBO_H
#define PROJECTION_RFBO_H

#include <glad/glad.h>
#include <vector>
#include "IResource.h"
#include "../dto/FBOTextureDTO.h"

namespace PEngine {

    class RFBO : public IResource {
    private:
        int width = 640;
        int height = 480;
        GLuint fbo;
        GLuint rbo;
        GLuint depthSampler;
        std::vector<GLuint> colors;
        std::vector<unsigned int> attachments;
        std::vector<FBOTextureDTO *> colorsMetadata;
    public:
        explicit RFBO() : IResource(ResourceType::FBO) {}

        ~RFBO() override;

        void startMapping(bool noClearing);

        void stopMapping();

        RFBO *depthTexture();

        RFBO *depthTest();

        RFBO *texture(FBOTextureDTO *obj);

        void use();

        void clear();
    };

}

#endif
