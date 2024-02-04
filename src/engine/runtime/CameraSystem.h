#ifndef PROJECTION_CAMERASYSTEM_H
#define PROJECTION_CAMERASYSTEM_H

#include "AbstractSystem.h"
#include "glm/detail/type_mat2x2.hpp"

namespace PEngine {

    class CameraSystem : public AbstractSystem {

        void updateProjection();

        void updateMatrices(long long elapsed);

        void updateViewProjectionMatrix();

        void copyToUBOMatrix();

        static void CopyWithOffset(float target[], glm::mat4 matrix, int offset);

        void updateUBOs();

    public:
        void run() override;

        bool shouldExecute() override {
            return true;
        }
    };

}

#endif
