#ifndef PROJECTION_FBO_H
#define PROJECTION_FBO_H

#include "glad/glad.h"
#include <vector>
#include "AbstractResource.h"
#include "../dto/FBOTextureDTO.h"

namespace PEngine {

    class FBO : public AbstractResource {
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
        explicit FBO() : AbstractResource(ResourceType::FBO) {}

        ~FBO() override;

        void startMapping(bool noClearing);

        void stopMapping();

        FBO *depthTexture();

        FBO *depthTest();

        FBO *texture(FBOTextureDTO *obj);

        void use();

        void clear();
    };

}

#endif
