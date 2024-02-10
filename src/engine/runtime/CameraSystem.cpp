#include "CameraSystem.h"
#include "../services/CameraService.h"
#include "../Engine.h"
#include "../services/ResourceService.h"
#include "../services/resource/core/UniformBuffer.h"
#include "../util/MathUtil.h"
#include <tgmath.h>
#include <glm/gtc/matrix_transform.hpp>
#include <glm/gtc/type_ptr.hpp>

namespace PEngine {
    void CameraSystem::run() {
        camera->hasChangedView = false;
        camera->hasChangedProjection = false;

        if (camera->viewNeedsUpdate) {
            updateMatrices(engine->elapsed);
        }

        if (camera->projectionNeedsUpdate || camera->projectionType == ORTHOGRAPHIC && camera->viewNeedsUpdate) {
            updateProjection();
            camera->hasChangedProjection = true;
            camera->hasChangedView = true;
            camera->projectionNeedsUpdate = false;
        }
        updateUBOs();
    }

    void CameraSystem::updateProjection() {
        if (camera->projectionType == ORTHOGRAPHIC) {
            camera->projectionMatrix = glm::ortho(
                    -camera->orthographicProjectionSize,
                    camera->orthographicProjectionSize,
                    -camera->orthographicProjectionSize / camera->aspectRatio,
                    camera->orthographicProjectionSize / camera->aspectRatio,
                    -camera->zFar,
                    camera->zFar
            );
        } else {
            camera->projectionMatrix = glm::perspective( camera->fov, camera->aspectRatio, camera->zNear, camera->zFar);
            camera->skyboxProjectionMatrix = glm::perspective(camera->fov, camera->aspectRatio, .1f, 1000.f);
            camera->invSkyboxProjectionMatrix =  glm::inverse(camera->skyboxProjectionMatrix);
        }

        camera->invProjectionMatrix = glm::inverse(camera->projectionMatrix);
        camera->viewProjectionMatrix = camera->projectionMatrix * camera->viewMatrix;
        copyToUBOMatrix();
    }

    void CameraSystem::updateMatrices(long long int elapsed) {
        float tSmoothing = camera->translationSmoothing;
        float incrementTranslation = tSmoothing == 0 ? 1.f : 1.f - pow(.001, elapsed * tSmoothing);

        float lengthTranslationPrev = glm::length(camera->currentTranslation);
        camera->currentTranslation = glm::mix(camera->currentTranslation, camera->translationBuffer, incrementTranslation);
        float lengthTranslationAfter = glm::length(camera->currentTranslation);

        float lengthRotationPrev = glm::length(camera->currentRotation);
        camera->currentRotation = camera->rotationBuffer;
        float lengthRotationAfter = glm::length(camera->currentRotation);

        float offsetRotation = abs(lengthRotationPrev - lengthRotationAfter);
        float offsetTranslation = abs(lengthTranslationPrev - lengthTranslationAfter);

        if (offsetRotation > 0 || offsetTranslation > 1e-6) {
            updateViewProjectionMatrix();
            camera->viewNeedsUpdate = true;
            camera->hasChangedView = true;
        } else {
            camera->viewNeedsUpdate = false;
            camera->hasChangedView = false;
        }
    }

    void CameraSystem::updateViewProjectionMatrix() {
        MathUtil::FromRotationTranslation(camera->invViewMatrix, camera->currentRotation, camera->currentTranslation);
        camera->viewMatrix = glm::inverse(camera->invViewMatrix);
        camera->position = camera->invViewMatrix[3];

        camera->viewProjectionMatrix = camera->projectionMatrix * camera->viewMatrix;
        copyToUBOMatrix();

        camera->staticViewMatrix = camera->viewMatrix;
        camera->staticViewMatrix[3][0] = camera->staticViewMatrix[3][1] = camera->staticViewMatrix[3][2] = 0;
    }

    void CameraSystem::copyToUBOMatrix() {
        auto V = camera->viewUBOBuffer;
        CopyWithOffset(V, camera->viewProjectionMatrix, 0);
        CopyWithOffset(V, camera->viewMatrix, 16);
        CopyWithOffset(V, camera->invViewMatrix, 32);
        V[48] = camera->position[0];
        V[49] = camera->position[1];
        V[50] = camera->position[2];
        auto P = camera->projectionUBOBuffer;
        CopyWithOffset(P, camera->projectionMatrix, 0);
        CopyWithOffset(P, camera->invProjectionMatrix, 16);
    }

    void CameraSystem::CopyWithOffset(float target[], glm::mat4 matrix, int offset) {
        for (int i = 0; i < 4; i++) {
            target[i + offset] = matrix[i][0];
            target[i + offset] = matrix[i][1];
            target[i + offset] = matrix[i][2];
            target[i + offset] = matrix[i][3];
        }
    }

    void CameraSystem::updateUBOs() {
        auto *cameraViewUBO = resources->getResource<UniformBuffer>(StaticResource::UBO_CAMERA_VIEW);
        auto *cameraProjectionUBO = resources->getResource<UniformBuffer>(StaticResource::UBO_CAMERA_PROJECTION);
        if (camera->hasChangedProjection) {
            cameraProjectionUBO->bind();
            camera->projectionUBOBuffer[32] = engine->getViewportWidth();
            camera->projectionUBOBuffer[33] = engine->getViewportHeight();
            camera->projectionUBOBuffer[34] = 2.F / log2(camera->zFar + 1);
            UniformBuffer::updateBuffer(camera->projectionUBOBuffer);
            cameraProjectionUBO->unbind();
        }

        if (camera->hasChangedView) {
            cameraViewUBO->bind();
            UniformBuffer::updateBuffer(camera->viewUBOBuffer);
            cameraViewUBO->unbind();
        }
    }
}