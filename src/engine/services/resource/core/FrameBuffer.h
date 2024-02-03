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
        GLuint fbo;
        GLuint rbo = 0;
        GLuint depthSampler = 0;
        std::vector<GLuint> colors;
        std::vector<unsigned int> attachments;
    public:
        explicit FrameBuffer(int w, int h) : AbstractResource(ResourceType::FBO) {
            width = w;
            height = h;
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
    };

}

#endif
