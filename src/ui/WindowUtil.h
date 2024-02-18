#ifndef PROJECTION_WINDOWUTIL_H
#define PROJECTION_WINDOWUTIL_H

#include "GLFW/glfw3.h"

namespace PEngine {

    struct WindowUtil {
        static GLFWwindow *createWindow(float scaleX, float scaleY);

        static void getDesktopResolution(int &horizontal, int &vertical);

        static void configureImgui(GLFWwindow *window);
    private:
        static void onError(int error, const char *description);

    };

}

#endif
