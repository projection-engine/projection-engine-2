#include "FrameBuffer.h"
#include "glad/glad.h"
#include "../../ResourceService.h"
#include "../../../util/GPUUtil.h"

namespace PEngine {
    FrameBuffer::~FrameBuffer() {
        // TODO - DESTROY FRAMEBUFFER, TEXTURES AND RBO
    }

    void FrameBuffer::stopMapping() {
        glBindFramebuffer(GL_FRAMEBUFFER, 0);
    }

    FrameBuffer *FrameBuffer::depthTexture() {
        GPUUtil::createTexture(
                &depthSampler,
                width,
                height,
                GL_DEPTH_COMPONENT24,
                0,
                GL_DEPTH_COMPONENT,
                GL_UNSIGNED_INT,
                GL_NEAREST,
                GL_NEAREST,
                GL_CLAMP_TO_EDGE,
                GL_CLAMP_TO_EDGE,
                nullptr
        );

        glFramebufferTexture2D(
                GL_FRAMEBUFFER,
                GL_DEPTH_ATTACHMENT,
                GL_TEXTURE_2D,
                depthSampler,
                0
        );

        return this;
    }

    FrameBuffer *FrameBuffer::depthTest() {
        glGenRenderbuffers(1, &rbo);
        glBindRenderbuffer(GL_RENDERBUFFER, rbo);
        glRenderbufferStorage(GL_RENDERBUFFER, GL_DEPTH_COMPONENT24, width, height);
        glFramebufferRenderbuffer(GL_FRAMEBUFFER, GL_DEPTH_ATTACHMENT, GL_RENDERBUFFER, rbo);
        return this;
    }

    FrameBuffer *FrameBuffer::texture(FBOTextureDTO &obj) {
        unsigned int newTexture;

        glBindFramebuffer(GL_FRAMEBUFFER, fbo);
        glGenTextures(1, &newTexture);
        glBindTexture(GL_TEXTURE_2D, newTexture);
        glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER,
                        obj.linear ? GL_LINEAR : GL_NEAREST);
        glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER,
                        obj.linear ? GL_LINEAR : GL_NEAREST);
        glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_S,
                        obj.repeat ? GL_REPEAT : GL_CLAMP_TO_EDGE);
        glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_T,
                        obj.repeat ? GL_REPEAT : GL_CLAMP_TO_EDGE);
        int widthT = obj.w;
        int heightT = obj.h;
        if (widthT < 0) widthT = width;
        if (heightT < 0) heightT = height;

        glTexImage2D(
                GL_TEXTURE_2D,
                0,
                obj.precision,
                widthT,
                heightT,
                0,
                obj.format,
                obj.type,
                nullptr);
        GLuint attachment = GL_COLOR_ATTACHMENT0 + obj.attachment;
        glFramebufferTexture2D(GL_FRAMEBUFFER, attachment, GL_TEXTURE_2D, newTexture, 0);
        colors.push_back(newTexture);
        glDrawBuffers(1, &attachment);
        glBindFramebuffer(GL_FRAMEBUFFER, 0);
        return this;
    }

    void FrameBuffer::use() {
        glBindFramebuffer(GL_FRAMEBUFFER, fbo);
    }

    void FrameBuffer::clear() {
        glBindFramebuffer(GL_FRAMEBUFFER, 0);
        glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);

    }

    void FrameBuffer::startMapping(bool noClearing) {
        use();
        glViewport(0, 0, width, height);
        if (!noClearing)
            glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
    }

    FrameBuffer *FrameBuffer::setResolution(int w, int h) {
        FrameBuffer::width = w;
        FrameBuffer::height = h;
        return this;
    }
}

