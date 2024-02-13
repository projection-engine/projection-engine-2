
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
        bool filmGrain = false;
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
            nlohmann::json json;
            json["fov"] = fov;
            json["dynamicAspectRatio"] = dynamicAspectRatio;
            json["aspectRatio"] = aspectRatio;
            json["zFar"] = zFar;
            json["zNear"] = zNear;
            json["distortion"] = distortion;
            json["distortionStrength"] = distortionStrength;
            json["chromaticAberration"] = chromaticAberration;
            json["chromaticAberrationStrength"] = chromaticAberrationStrength;
            json["vignette"] = vignette;
            json["vignetteStrength"] = vignetteStrength;
            json["filmGrain"] = filmGrain;
            json["filmGrainStrength"] = filmGrainStrength;
            json["bloom"] = bloom;
            json["mbVelocityScale"] = mbVelocityScale;
            json["mbSamples"] = mbSamples;
            json["bloomThreshold"] = bloomThreshold;
            json["bloomQuality"] = bloomQuality;
            json["bloomOffset"] = bloomOffset;
            json["gamma"] = gamma;
            json["exposure"] = exposure;
            json["motionBlurEnabled"] = motionBlurEnabled;
            json["cameraMotionBlur"] = cameraMotionBlur;
            json["orthographic"] = orthographic;
            json["size"] = size;
            json["apertureDOF"] = apertureDOF;
            json["focalLengthDOF"] = focalLengthDOF;
            json["focusDistanceDOF"] = focusDistanceDOF;
            json["samplesDOF"] = samplesDOF;
            json["enabledDOF"] = enabledDOF;
            return json;
        }

        void parse(nlohmann::json &data) override {
            fov = data["fov"];
            dynamicAspectRatio = data["dynamicAspectRatio"];
            aspectRatio = data["aspectRatio"];
            zFar = data["zFar"];
            zNear = data["zNear"];
            distortion = data["distortion"];
            distortionStrength = data["distortionStrength"];
            chromaticAberration = data["chromaticAberration"];
            chromaticAberrationStrength = data["chromaticAberrationStrength"];
            vignette = data["vignette"];
            vignetteStrength = data["vignetteStrength"];
            filmGrain = data["filmGrain"];
            filmGrainStrength = data["filmGrainStrength"];
            bloom = data["bloom"];
            mbVelocityScale = data["mbVelocityScale"];
            mbSamples = data["mbSamples"];
            bloomThreshold = data["bloomThreshold"];
            bloomQuality = data["bloomQuality"];
            bloomOffset = data["bloomOffset"];
            gamma = data["gamma"];
            exposure = data["exposure"];
            motionBlurEnabled = data["motionBlurEnabled"];
            cameraMotionBlur = data["cameraMotionBlur"];
            orthographic = data["orthographic"];
            size = data["size"];
            apertureDOF = data["apertureDOF"];
            focalLengthDOF = data["focalLengthDOF"];
            focusDistanceDOF = data["focusDistanceDOF"];
            samplesDOF = data["samplesDOF"];
            enabledDOF = data["enabledDOF"];
        }
    };

}

#endif
