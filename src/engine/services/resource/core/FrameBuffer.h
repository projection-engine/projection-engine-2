#ifndef PROJECTION_FRAMEBUFFER_H
#define PROJECTION_FRAMEBUFFER_H

#include "glad/glad.h"
#include <vector>
#include "AbstractResource.h"
#include "../dto/FBOTextureDTO.h"

namespace PEngine {

    class FrameBuffer : public AbstractResource {
    private:
        int width = 640;
        int height = 480;
        GLuint fbo = 0;
        GLuint rbo = 0;
        GLuint depthSampler = 0;
        std::vector<GLuint> colors;
    public:
        explicit FrameBuffer() : AbstractResource(ResourceType::FBO) {
            glGenFramebuffers(1, &fbo);
        }

        ~FrameBuffer() override;

        void startMapping(bool noClearing);

        void stopMapping();

        FrameBuffer *depthTexture();

        FrameBuffer *depthTest();

        FrameBuffer *texture(FBOTextureDTO &obj);

        void use();

        void clear();

        FrameBuffer *setResolution(int w, int h);
    };

}

#endif
