#ifndef PROJECTION_RUNTIMESTATE_H
#define PROJECTION_RUNTIMESTATE_H

#include <cstdint>
#include <vector>
#include "AbstractSerializable.h"

namespace PEngine {

    struct RuntimeState : public AbstractSerializable {
        int viewportWidth = 0;
        int viewportHeight = 0;
        long long int elapsed = 0;

        float cameraScreenSpaceMovementSpeed = .01;
        float cameraMovementSpeed = .01;
        float cameraTurnSpeed = .01;
        float cameraSmoothing = .01;
        bool FXAA = true;
//        bool TAA;
        float physicsSimulationStep = 16.666;
        float physicsSubSteps = 10;
        float SSRMaxSteps = 4;
        float SSRStepSize = 1;
        float SSRFalloff = 3;
        bool SSGIEnabled = true;
        float SSGIStrength = 1;
        float SSGIBlurSamples = 5;
        float SSGIBlurRadius = 5;
        float SSGIMaxSteps = 4;
        float SSGIStepSize = 1;
        float SSSMaxSteps = 24;
        float SSSMaxDistance = .05;
        float SSSDepthThickness = .05;
        float SSSEdgeFalloff = 12;
        float SSSDepthDelta = 0;
        float shadowAtlasQuantity = 4;
        bool SSAOEnabled = true;
        float SSAOBlurSamples = 2;
        float SSAOMaxSamples = 64;
        float SSAORadius = .25;
        float SSAOPower = 1;
        float SSAOBias = .1;
        float SSAOFalloffDistance = 1000;
        float iconScale = 1.;
        float maxDistanceIcon = 50;
        bool showGrid = true;
        bool showIcons = true;
        bool showLines = true;
        bool showOutline = true;
        glm::vec3 outlineColor{1, .5, 0};
        float outlineWidth = .75;
        float gridColor = .3;
        float gridOpacity = 1;
        float gridThreshold = 100;
        float gridScale = 1;
        float cameraGizmoSize = 25;
        float gizmoSensitivity = 1;

        std::uint32_t lockedEntity;
        std::vector<std::uint32_t> selected;

        nlohmann::json serialize() override {
            nlohmann::json json;
            json["viewportWidth"] = viewportWidth;
            json["viewportHeight"] = viewportHeight;
            json["cameraScreenSpaceMovementSpeed"] = cameraScreenSpaceMovementSpeed;
            json["cameraMovementSpeed"] = cameraMovementSpeed;
            json["cameraTurnSpeed"] = cameraTurnSpeed;
            json["cameraSmoothing"] = cameraSmoothing;
            json["FXAA"] = FXAA;
            json["physicsSimulationStep"] = physicsSimulationStep;
            json["physicsSubSteps"] = physicsSubSteps;
            json["SSRMaxSteps"] = SSRMaxSteps;
            json["SSRStepSize"] = SSRStepSize;
            json["SSRFalloff"] = SSRFalloff;
            json["SSGIEnabled"] = SSGIEnabled;
            json["SSGIStrength"] = SSGIStrength;
            json["SSGIBlurSamples"] = SSGIBlurSamples;
            json["SSGIBlurRadius"] = SSGIBlurRadius;
            json["SSGIMaxSteps"] = SSGIMaxSteps;
            json["SSGIStepSize"] = SSGIStepSize;
            json["SSSMaxSteps"] = SSSMaxSteps;
            json["SSSMaxDistance"] = SSSMaxDistance;
            json["SSSDepthThickness"] = SSSDepthThickness;
            json["SSSEdgeFalloff"] = SSSEdgeFalloff;
            json["SSSDepthDelta"] = SSSDepthDelta;
            json["shadowAtlasQuantity"] = shadowAtlasQuantity;
            json["SSAOEnabled"] = SSAOEnabled;
            json["SSAOBlurSamples"] = SSAOBlurSamples;
            json["SSAOMaxSamples"] = SSAOMaxSamples;
            json["SSAORadius"] = SSAORadius;
            json["SSAOPower"] = SSAOPower;
            json["SSAOBias"] = SSAOBias;
            json["SSAOFalloffDistance"] = SSAOFalloffDistance;
            json["iconScale"] = iconScale;
            json["maxDistanceIcon"] = maxDistanceIcon;
            json["showGrid"] = showGrid;
            json["showIcons"] = showIcons;
            json["showLines"] = showLines;
            json["showOutline"] = showOutline;
            json["outlineColor"] = Dump(outlineColor);
            json["outlineWidth"] = outlineWidth;
            json["gridColor"] = gridColor;
            json["gridOpacity"] = gridOpacity;
            json["gridThreshold"] = gridThreshold;
            json["gridScale"] = gridScale;
            json["cameraGizmoSize"] = cameraGizmoSize;
            json["gizmoSensitivity"] = gizmoSensitivity;
            return json;
        }

        void parse(nlohmann::json &data) override {
            viewportWidth = data["viewportWidth"];
            viewportHeight = data["viewportHeight"];
            cameraScreenSpaceMovementSpeed = data["cameraScreenSpaceMovementSpeed"];
            cameraMovementSpeed = data["cameraMovementSpeed"];
            cameraTurnSpeed = data["cameraTurnSpeed"];
            cameraSmoothing = data["cameraSmoothing"];
            FXAA = data["FXAA"];
            physicsSimulationStep = data["physicsSimulationStep"];
            physicsSubSteps = data["physicsSubSteps"];
            SSRMaxSteps = data["SSRMaxSteps"];
            SSRStepSize = data["SSRStepSize"];
            SSRFalloff = data["SSRFalloff"];
            SSGIEnabled = data["SSGIEnabled"];
            SSGIStrength = data["SSGIStrength"];
            SSGIBlurSamples = data["SSGIBlurSamples"];
            SSGIBlurRadius = data["SSGIBlurRadius"];
            SSGIMaxSteps = data["SSGIMaxSteps"];
            SSGIStepSize = data["SSGIStepSize"];
            SSSMaxSteps = data["SSSMaxSteps"];
            SSSMaxDistance = data["SSSMaxDistance"];
            SSSDepthThickness = data["SSSDepthThickness"];
            SSSEdgeFalloff = data["SSSEdgeFalloff"];
            SSSDepthDelta = data["SSSDepthDelta"];
            shadowAtlasQuantity = data["shadowAtlasQuantity"];
            SSAOEnabled = data["SSAOEnabled"];
            SSAOBlurSamples = data["SSAOBlurSamples"];
            SSAOMaxSamples = data["SSAOMaxSamples"];
            SSAORadius = data["SSAORadius"];
            SSAOPower = data["SSAOPower"];
            SSAOBias = data["SSAOBias"];
            SSAOFalloffDistance = data["SSAOFalloffDistance"];
            iconScale = data["iconScale"];
            maxDistanceIcon = data["maxDistanceIcon"];
            showGrid = data["showGrid"];
            showIcons = data["showIcons"];
            showLines = data["showLines"];
            showOutline = data["showOutline"];
            outlineWidth = data["outlineWidth"];
            gridColor = data["gridColor"];
            gridOpacity = data["gridOpacity"];
            ParseInto(data["outlineColor"], outlineColor);
            gridThreshold = data["gridThreshold"];
            gridScale = data["gridScale"];
            cameraGizmoSize = data["cameraGizmoSize"];
            gizmoSensitivity = data["gizmoSensitivity"];
        }
    };

}

#endif
