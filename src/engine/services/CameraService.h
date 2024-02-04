#ifndef PROJECTION_CAMERASERVICE_H
#define PROJECTION_CAMERASERVICE_H

#include "AbstractCoreService.h"
#include "../enum/CameraProjectionType.h"
#include "glm/vec3.hpp"
#include "glm/vec4.hpp"
#include "glm/detail/type_mat4x4.hpp"
#include "../definitions.h"


namespace PEngine {

    struct CameraService : public AbstractCoreService {
        CameraProjectionType projectionType = CameraProjectionType::PERSPECTIVE;
        glm::vec3 currentTranslation;
        glm::vec4 currentRotation;
        glm::vec3 position;
        glm::mat4 viewMatrix;
        glm::mat4 projectionMatrix;
        glm::mat4 invViewMatrix;
        glm::mat4 invProjectionMatrix;
        glm::mat4 viewProjectionMatrix;
        glm::mat4 previousViewProjectionMatrix;
        glm::mat4 staticViewMatrix;
        glm::mat4 skyboxProjectionMatrix;
        glm::mat4 invSkyboxProjectionMatrix;
        glm::vec3 translationBuffer;
        glm::vec4 rotationBuffer;

        bool dynamicAspectRatio = false;
        bool hasChangedProjection = false;
        bool hasChangedView;
        float translationSmoothing;
        bool viewNeedsUpdate;
        bool projectionNeedsUpdate;
        float viewUBOBuffer[52];
        float projectionUBOBuffer[35];
        float aspectRatio = 1;
        float zNear = .1;
        float zFar = 100;
        float fov = M_PI / 2;
        float orthographicProjectionSize;
        bool cameraMotionBlur = false;
        bool bloom = false;
        bool filmGrain = false;
        bool vignetteEnabled = false;
        bool chromaticAberration = false;
        bool distortion = false;
        bool DOF = false;
        float size = 50;
        float focusDistanceDOF = 10;
        float apertureDOF = 1.2;
        int focalLengthDOF = 5;
        int samplesDOF = 100;
        float filmGrainStrength = 1.;
        float vignetteStrength = .25;
        float bloomThreshold = .75;
        int bloomQuality = 8;
        float bloomOffset = 0;
        float gamma = 2.2;
        float exposure = 1.;
        float chromaticAberrationStrength = 1;
        float distortionStrength = 1;
    };

}

#endif
