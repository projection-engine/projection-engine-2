#include "RFBO.h"
#include <glad/glad.h>
#include "../ResourcesSystem.h"

namespace PEngine {
    RFBO::~RFBO() {
        // TODO - DESTROY FRAMEBUFFER, TEXTURES AND RBO
    }

    void RFBO::stopMapping() {
        glBindFramebuffer(GL_FRAMEBUFFER, 0);
    }

    RFBO *RFBO::depthTexture() {
        ResourcesSystem::createTexture(
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

    RFBO *RFBO::depthTest() {
        glGenRenderbuffers(1, &rbo);
        glBindRenderbuffer(GL_RENDERBUFFER, rbo);
        glRenderbufferStorage(GL_RENDERBUFFER, GL_DEPTH_COMPONENT24, width, height);
        glFramebufferRenderbuffer(GL_FRAMEBUFFER, GL_DEPTH_ATTACHMENT, GL_RENDERBUFFER, rbo);
        return this;
    }

    RFBO *RFBO::texture(FBOTextureDTO *obj) {
        unsigned int newTexture;

        colorsMetadata.push_back(obj);
        glBindFramebuffer(GL_FRAMEBUFFER, fbo);
        glGenTextures(1, &newTexture);
        glBindTexture(GL_TEXTURE_2D, newTexture);
        glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MAG_FILTER,
                        obj->linear ? GL_LINEAR : GL_NEAREST);
        glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_MIN_FILTER,
                        obj->linear ? GL_LINEAR : GL_NEAREST);
        glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_S,
                        obj->repeat ? GL_REPEAT : GL_CLAMP_TO_EDGE);
        glTexParameteri(GL_TEXTURE_2D, GL_TEXTURE_WRAP_T,
                        obj->repeat ? GL_REPEAT : GL_CLAMP_TO_EDGE);

        glTexImage2D(
                GL_TEXTURE_2D,
                0,
                obj->precision,
                obj->w,
                obj->h,
                0,
                obj->format,
                type,
                nullptr);
        glFramebufferTexture2D(GL_FRAMEBUFFER, GL_COLOR_ATTACHMENT0 + obj->attachment, GL_TEXTURE_2D, newTexture, 0);

        colors.push_back(newTexture);
        attachments[obj->attachment] = GL_COLOR_ATTACHMENT0 + obj->attachment;

        for (unsigned int &attachment: attachments) {
            glDrawBuffers(1, &attachment);
        }
        glBindFramebuffer(GL_FRAMEBUFFER, 0);
        return this;
    }

    void RFBO::use() {
        glBindFramebuffer(GL_FRAMEBUFFER, fbo);
    }

    void RFBO::clear() {
        glBindFramebuffer(GL_FRAMEBUFFER, 0);
        glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);

    }

    void RFBO::startMapping(bool noClearing) {
        use();
        glViewport(0, 0, width, height);
        if (!noClearing)
            glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);
    }
}

