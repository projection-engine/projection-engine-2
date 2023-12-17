#pragma once
#ifndef PROJECTION_IWINDOW_H
#define PROJECTION_IWINDOW_H

#include <imgui_impl_glfw.h>
#include "imgui.h"
#include "../../core/debug/ILoggable.h"
#include "document/Document.h"
#include "../../core/Definitions.h"

namespace PEngine {
    class IRunner;

    class IWindow : public ILoggable {
    protected:
        GLFWwindow *window = nullptr;
        Document document;
        IRunner *runner = nullptr;

        bool ready = false;
        bool vsyncEnabled = false;

        static void onError(int error, const char *description) {
            fprintf(stderr, "GLFW Error %d: %s\n", error, description);
        }

        void createWindowIO();

    public:
        explicit IWindow();

        virtual void onInitialize();

        bool isVsyncEnabled() const;

        void setVsyncEnabled(bool vsyncEnabled);

        void start();

        Document &getDocument();

    };
}
#endif //PROJECTION_IWINDOW_H
