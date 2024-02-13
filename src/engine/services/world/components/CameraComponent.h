
#ifndef PROJECTION_CAMERACOMPONENT_H
#define PROJECTION_CAMERACOMPONENT_H

#include "../AbstractComponent.h"

namespace PEngine {

    struct CameraComponent : public AbstractComponent {
        float fov = 45;

        bool dynamicAspectRatio = true;
        float aspectRatio = 1;
        float zFar = 100;
        float zNear = .1;

        bool distortion = false;
        float distortionStrength = 1;
        bool chromaticAberration = false;
        float chromaticAberrationStrength = 1;
        bool vignette = false;
        float vignetteStrength = .25;
        bool filmGrain = false;z
        float filmGrainStrength = 1;
        bool bloom = false;
        float mbVelocityScale = 1;
        float mbSamples = 50;

        float bloomThreshold = .75;
        float bloomQuality = 8;
        float bloomOffset = 0;
        float gamma = 2.2;
        float exposure = 1;
        bool motionBlurEnabled = true;
        bool cameraMotionBlur = false;
        bool orthographic = false;
        float size = 10;

        float apertureDOF = 1.2;
        float focalLengthDOF = 10;
        float focusDistanceDOF = 100;
        float samplesDOF = 100;
        bool enabledDOF = false;

        explicit CameraComponent() : AbstractComponent(ComponentType::CAMERA) {}

        nlohmann::json serialize() override {

        }
    };

}

#endif
