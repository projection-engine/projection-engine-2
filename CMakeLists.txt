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
)

set(FILE_PATHS
        src/engine/resource/dto/FBOTextureDTO.h

        src/engine/resource/static/direct_shadows.vs
        src/engine/resource/static/direct_shadows.fs

        src/engine/resource/core/RUBO.cpp
        src/engine/resource/core/RUBO.h
        src/engine/resource/dto/UBODataDTO.h
        src/engine/resource/UBOType.h
        src/core/Definitions.h

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

        src/core/event/IEventTarget.h
        src/engine/runtime/RuntimeSystem.cpp
        src/engine/runtime/RuntimeSystem.h
        src/engine/resource/ResourcesSystem.cpp
        src/engine/resource/ResourcesSystem.h
        src/engine/world/IEntity.cpp
        src/engine/world/IEntity.h

        src/ui/core/store/IStore.h
        src/ui/core/elements/EInlineBlock.cpp
        src/ui/core/elements/EInlineBlock.h
        src/ui/core/elements/ETreeNode.cpp
        src/ui/core/elements/ETreeNode.h
        src/ui/core/elements/AbstractSimpleElement.cpp
        src/ui/core/elements/AbstractSimpleElement.h
        src/core/event/TypedEventPayload.h
        src/core/structures/List.h
        src/core/structures/Map.cpp
        src/core/structures/Map.h
        src/ui/core/elements/IElement.h
        src/ui/core/elements/ESection.cpp
        src/ui/core/elements/ESection.h
        src/ui/core/elements/EText.cpp
        src/ui/core/elements/EText.h
        src/ui/core/document/Document.cpp
        src/ui/core/document/Document.h
        src/ui/core/IWindow.cpp
        src/ui/core/IWindow.h
        src/ui/core/views/IView.cpp
        src/ui/core/views/IView.h
        src/ui/core/elements/IElement.cpp
        src/core/debug/ILoggable.cpp
        src/core/debug/ILoggable.h
        src/core/debug/Timer.cpp
        src/core/debug/Timer.h
        src/engine/world/WorldSystem.cpp
        src/engine/world/WorldSystem.h
        src/engine/world/components/IComponent.h
        src/engine/Engine.cpp
        src/engine/Engine.h
        src/core/UUID.h
        src/core/UUID.cpp
        src/ui/editor/EditorWindow.cpp
        src/ui/editor/EditorWindow.h
        src/ui/editor/runner/Runner.cpp
        src/ui/editor/runner/Runner.h
        src/ui/core/document/ElementController.cpp
        src/ui/core/document/ElementController.h
        src/ui/core/document/ElementController.h
        src/ui/core/document/ViewController.cpp
        src/ui/core/document/ViewController.h
        src/ui/editor/views/imgui_demo.cpp
        src/ui/core/elements/ETree.cpp
        src/ui/core/elements/ETree.h
        src/ui/core/elements/EButton.cpp
        src/ui/core/elements/EButton.h
        src/ui/core/elements/EMenuItem.cpp
        src/ui/core/elements/EMenuItem.h
        src/ui/core/elements/EMenu.cpp
        src/ui/core/elements/EMenu.h
        src/ui/core/elements/EMenuBar.cpp
        src/ui/core/elements/EMenuBar.h
        src/ui/core/elements/AbstractTitledElement.cpp
        src/ui/core/elements/AbstractTitledElement.h
        src/core/StringUtils.cpp
        src/core/StringUtils.h
        src/ui/core/elements/DynamicElement.cpp
        src/ui/core/elements/DynamicElement.h
        src/ui/editor/views/MainView.cpp
        src/ui/editor/views/MainView.h
        src/ui/core/elements/EIcon.cpp
        src/ui/core/elements/EIcon.h
        src/core/event/EventController.cpp
        src/core/event/EventController.h
        src/core/event/IListener.cpp
        src/core/event/IListener.h
        src/core/event/ListenerWrapper.cpp
        src/core/event/ListenerWrapper.h
        src/core/event/IEventPayload.cpp
        src/core/event/IEventPayload.h
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
