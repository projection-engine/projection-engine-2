cmake_minimum_required(VERSION 3.26)
project(projection)
set(CMAKE_CXX_STANDARD 23)

find_package(glad REQUIRED)
find_package(glfw3 REQUIRED)
find_package(glm REQUIRED)
find_package(imgui REQUIRED)
find_package(Catch2 REQUIRED)
find_package(pugixml CONFIG REQUIRED)
find_package(spdlog CONFIG REQUIRED)
find_package(EnTT CONFIG REQUIRED)
find_package(unofficial-webview2 CONFIG REQUIRED)
find_package(nlohmann_json CONFIG REQUIRED)
set(COMMON_LIBRARIES
        glad::glad
        glfw
        glm::glm
        imgui::imgui
        pugixml::shared pugixml::pugixml
        imm32
        spdlog::spdlog
        Catch2::Catch2WithMain
        EnTT::EnTT
        unofficial::webview2::webview2
        nlohmann_json::nlohmann_json
)

set(FILE_PATHS
        src/services/FileSystemService.cpp
        src/services/FileSystemService.h
        src/ui/shared/webview/WebViewPayload.cpp

        src/ui/shared/webview/WebViewPayload.h
        src/ui/projects/Projects.cpp
        src/ui/projects/Projects.h
        src/ui/WindowSystem.cpp
        src/ui/WindowSystem.h

        src/engine/resource/dto/FBOTextureDTO.h
        src/ui/shared/webview/WebViewWindow.cpp
        src/ui/shared/webview/WebViewWindow.h
        src/engine/resource/static/direct_shadows.vs
        src/engine/resource/static/direct_shadows.fs

        src/engine/resource/core/RUBO.cpp
        src/engine/resource/core/RUBO.h
        src/engine/resource/dto/UBODataDTO.h
        src/engine/resource/UBOType.h
        src/util/Definitions.h

        src/engine/external/IIOController.h
        src/engine/external/IFSController.h
        src/ui/editor/basic/IOController.cpp
        src/ui/editor/basic/IOController.h
        src/ui/editor/basic/FSController.cpp
        src/ui/editor/basic/FSController.h
        src/engine/external/IIOController.cpp

        src/engine/resource/core/IResource.h
        src/engine/resource/StaticResource.h
        src/engine/resource/core/RFBO.cpp
        src/engine/resource/core/RFBO.h
        src/engine/resource/core/RMesh.cpp
        src/engine/resource/core/RMesh.h
        src/engine/resource/core/RShader.cpp
        src/engine/resource/core/RShader.h
        src/engine/resource/core/VertexBufferObject.cpp
        src/engine/resource/core/VertexBufferObject.h
        src/engine/resource/core/RTexture.cpp
        src/engine/resource/core/RTexture.h
        src/engine/resource/ResourceType.h
        src/engine/resource/core/IResource.cpp
        src/engine/runtime/systems/ISystem.cpp
        src/engine/runtime/systems/ISystem.h
        src/engine/runtime/systems/InputSystem.cpp
        src/engine/runtime/systems/InputSystem.h

        src/engine/world/components/IComponent.cpp
        src/engine/world/Component.h
        src/engine/world/components/CTransform.cpp
        src/engine/world/components/CTransform.h

        src/util/event/IEventTarget.h
        src/engine/runtime/RuntimeSystem.cpp
        src/engine/runtime/RuntimeSystem.h
        src/engine/resource/ResourcesSystem.cpp
        src/engine/resource/ResourcesSystem.h
        src/engine/world/IEntity.cpp
        src/engine/world/IEntity.h
        src/util/FileSystemUtil.h
        src/ui/shared/store/IStore.h
        src/ui/shared/elements/EInlineBlock.cpp
        src/ui/shared/elements/EInlineBlock.h
        src/ui/shared/elements/ETreeNode.cpp
        src/ui/shared/elements/ETreeNode.h
        src/ui/shared/elements/AbstractSimpleElement.cpp
        src/ui/shared/elements/AbstractSimpleElement.h
        src/util/event/TypedEventPayload.h
        src/util/structures/List.h
        src/util/structures/Map.cpp
        src/util/structures/Map.h
        src/ui/shared/elements/IElement.h
        src/ui/shared/elements/ESection.cpp
        src/ui/shared/elements/ESection.h
        src/ui/shared/elements/EText.cpp
        src/ui/shared/elements/EText.h
        src/ui/shared/document/Document.cpp
        src/ui/shared/document/Document.h
        src/ui/shared/IWindow.cpp
        src/ui/shared/IWindow.h
        src/ui/shared/views/IView.cpp
        src/ui/shared/views/IView.h
        src/ui/shared/elements/IElement.cpp
        src/util/debug/ILoggable.cpp
        src/util/debug/ILoggable.h
        src/util/debug/Timer.cpp
        src/util/debug/Timer.h
        src/engine/world/WorldSystem.cpp
        src/engine/world/WorldSystem.h
        src/engine/world/components/IComponent.h
        src/engine/Engine.cpp
        src/engine/Engine.h
        src/util/UUID.h
        src/ui/editor/Editor.cpp
        src/ui/editor/Editor.h
        src/ui/editor/basic/Runner.cpp
        src/ui/editor/basic/Runner.h
        src/ui/shared/document/ElementController.cpp
        src/ui/shared/document/ElementController.h
        src/ui/shared/document/ElementController.h
        src/ui/shared/document/ViewController.cpp
        src/ui/shared/document/ViewController.h
        src/ui/shared/runners/imgui_demo.cpp
        src/ui/shared/elements/ETree.cpp
        src/ui/shared/elements/ETree.h
        src/ui/shared/elements/EButton.cpp
        src/ui/shared/elements/EButton.h
        src/ui/shared/elements/EMenuItem.cpp
        src/ui/shared/elements/EMenuItem.h
        src/ui/shared/elements/EMenu.cpp
        src/ui/shared/elements/EMenu.h
        src/ui/shared/elements/EMenuBar.cpp
        src/ui/shared/elements/EMenuBar.h
        src/ui/shared/elements/AbstractTitledElement.cpp
        src/ui/shared/elements/AbstractTitledElement.h
        src/util/StringUtils.h
        src/ui/shared/elements/DynamicElement.cpp
        src/ui/shared/elements/DynamicElement.h
        src/ui/shared/elements/EIcon.cpp
        src/ui/shared/elements/EIcon.h
        src/util/event/EventController.cpp
        src/util/event/EventController.h
        src/util/event/IListener.cpp
        src/util/event/IListener.h
        src/util/event/ListenerWrapper.cpp
        src/util/event/ListenerWrapper.h
        src/util/event/IEventPayload.cpp
        src/util/event/IEventPayload.h
)

set(CMAKE_TOOLCHAIN_FILE "C:/vcpkg/scripts/buildsystems/vcpkg.cmake")
set(VCPKG_JSON_PATH "${CMAKE_CURRENT_SOURCE_DIR}/vcpkg.json")

# Include vcpkg toolchain
if (EXISTS "${VCPKG_JSON_PATH}")
    set(VCPKG_TOOLCHAIN "${CMAKE_TOOLCHAIN_FILE}")
    if (EXISTS "${VCPKG_TOOLCHAIN}")
        message(STATUS "Using Vcpkg toolchain file: ${VCPKG_TOOLCHAIN}")
        include("${VCPKG_TOOLCHAIN}")
    else ()
        message(FATAL_ERROR "Vcpkg toolchain file not found. Please install Vcpkg and create a vcpkg.json file for your project.")
    endif ()
else ()
    message(FATAL_ERROR "Vcpkg JSON file not found. Please create a vcpkg.json file for your project.")
endif ()

add_subdirectory(test)
add_subdirectory(src)
