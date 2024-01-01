#ifndef PROJECTION_IMGUICONTEXTUTIL_H
#define PROJECTION_IMGUICONTEXTUTIL_H

#include "GLFW/glfw3.h"

namespace PEngine {

    class ImGuiContextUtil {
    private:
        static bool isInitialized;
    public:
        static void initialize(GLFWwindow *window);

        static void destroy();
    };

}

#endif
