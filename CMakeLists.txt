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

        src/engine/AbstractSerializable.cpp
        src/engine/AbstractSerializable.h
        src/engine/SerializableRepository.cpp
        src/engine/SerializableRepository.h
        src/engine/enum/ComponentType.cpp

        src/engine/enum/EngineEvents.cpp
        src/engine/enum/EngineEvents.h
        src/engine/listeners/WorldHierarchyListener.cpp
        src/engine/listeners/WorldHierarchyListener.h
        src/engine/listeners/WorldChangeListener.cpp
        src/engine/listeners/WorldChangeListener.h

        src/engine/services/world/WorldRegistry.cpp
        src/engine/services/world/WorldRegistry.h

        src/engine/RuntimeState.h
        src/services/EngineService.cpp
        src/services/EngineService.h

        src/engine/services/world/components/MeshComponent.h
        src/engine/services/world/components/LightComponent.h
        src/engine/services/world/components/AtmosphereComponent.h
        src/engine/services/world/components/CameraComponent.h
        src/engine/services/world/components/CullingComponent.h
        src/engine/services/world/components/DecalComponent.h
        src/engine/services/world/components/LightProbeComponent.h
        src/engine/services/world/components/ColliderComponent.h
        src/engine/services/world/components/RigidBodyComponent.h
        src/engine/services/world/components/SpriteComponent.h
        src/engine/enum/AtmosphereRenderingType.h
        src/engine/enum/ColliderType.h
        src/engine/enum/MaterialRenderingType.h
        src/engine/enum/LightType.h
        src/engine/enum/RotationType.h

        src/engine/enum/StaticShader.h
        src/engine/enum/StaticShader.cpp
        src/engine/services/resource/StaticMeshFactory.cpp
        src/engine/services/resource/StaticMeshFactory.h
        src/engine/util/NoiseTextureDTO.h
        src/engine/enum/StaticUBO.cpp
        src/engine/enum/StaticUBO.h
        src/engine/services/resource/StaticFBOFactory.cpp
        src/engine/services/resource/StaticFBOFactory.h
        src/engine/services/resource/StaticShaderFactory.cpp
        src/engine/services/resource/StaticShaderFactory.h
        src/engine/services/resource/StaticUBOFactory.cpp
        src/engine/services/resource/StaticUBOFactory.h
        src/engine/services/resource/StaticTextureFactory.cpp
        src/engine/services/resource/StaticTextureFactory.h
        src/engine/util/PrimitiveUtil.cpp
        src/engine/util/PrimitiveUtil.h
        src/engine/util/MathUtil.cpp
        src/engine/util/MathUtil.h

        src/engine/util/GPUUtil.cpp
        src/engine/util/GPUUtil.h
        src/engine/util/ShaderUtil.cpp
        src/engine/util/ShaderUtil.h
        src/engine/services/world/ComponentFactory.cpp
        src/engine/services/world/ComponentFactory.h
        src/engine/enum/ComponentType.h
        src/engine/services/WorldLightsService.cpp
        src/engine/services/WorldLightsService.h
        src/engine/services/CameraService.cpp
        src/engine/services/CameraService.h
        src/engine/services/WorldPhysicsService.cpp
        src/engine/services/WorldPhysicsService.h
        src/engine/enum/CameraProjectionType.h
        src/engine/definitions.h
        src/engine/runtime/CameraSystem.cpp
        src/engine/runtime/CameraSystem.h
        src/engine/services/AbstractCoreService.h
        src/engine/services/AbstractCoreService.cpp

        src/ui/shared/AbstractWindow.cpp
        src/ui/shared/AbstractWindow.h
        src/ui/editor/Editor.cpp
        src/ui/editor/Editor.h
        src/ui/editor/basic/Runner.cpp
        src/ui/editor/basic/Runner.h

        src/ui/WindowRepository.cpp
        src/ui/WindowRepository.h

        src/ui/shared/webview/WebViewPayload.cpp
        src/ui/shared/webview/WebViewPayload.h

        src/ui/shared/webview/WebViewWindow.cpp
        src/ui/shared/webview/WebViewWindow.h

        src/services/ShaderService.cpp
        src/services/ShaderService.h

        src/services/AbstractService.h

        src/engine/services/resource/dto/FBOTextureDTO.h

        src/engine/services/resource/core/UniformBuffer.cpp
        src/engine/services/resource/core/UniformBuffer.h

        src/engine/services/resource/dto/UBODataDTO.h
        src/engine/enum/UBOType.h
        src/util/Definitions.h

        src/engine/services/AbstractIOService.h
        src/engine/services/AbstractFSService.h
        src/engine/services/AbstractIOService.cpp

        src/engine/services/resource/core/AbstractResource.h
        src/engine/enum/StaticResource.h
        src/engine/services/resource/core/FrameBuffer.cpp
        src/engine/services/resource/core/FrameBuffer.h
        src/engine/services/resource/core/Mesh.cpp
        src/engine/services/resource/core/Mesh.h
        src/engine/services/resource/core/Shader.cpp
        src/engine/services/resource/core/Shader.h
        src/engine/services/resource/core/VBO.cpp
        src/engine/services/resource/core/VBO.h
        src/engine/services/resource/core/Texture.cpp
        src/engine/services/resource/core/Texture.h
        src/engine/enum/ResourceType.h
        src/engine/services/resource/core/AbstractResource.cpp
        src/engine/runtime/AbstractSystem.cpp
        src/engine/runtime/AbstractSystem.h
        src/engine/runtime/CameraTrackerSystem.cpp
        src/engine/runtime/CameraTrackerSystem.h

        src/engine/services/world/AbstractComponent.cpp
        src/engine/services/world/components/MovementComponent.h

        src/util/event/IEventTarget.h
        src/engine/services/SystemService.cpp
        src/engine/services/SystemService.h
        src/engine/services/ResourceService.cpp
        src/engine/services/ResourceService.h
        src/engine/services/world/Entity.cpp
        src/engine/services/world/Entity.h
        src/services/FileSystemService.h
        src/services/FileSystemService.cpp
        src/util/event/TypedEventPayload.h
        src/util/structures/List.h
        src/util/structures/Map.cpp
        src/util/structures/Map.h

        src/ui/shared/store/IStore.h
        src/ui/editor/basic/IOController.cpp
        src/ui/editor/basic/IOController.h
        src/ui/editor/basic/FSController.cpp
        src/ui/editor/basic/FSController.h

        src/util/debug/ILoggable.cpp
        src/util/debug/ILoggable.h
        src/util/debug/Timer.cpp
        src/util/debug/Timer.h
        src/engine/services/WorldService.cpp
        src/engine/services/WorldService.h
        src/engine/services/world/AbstractComponent.h
        src/engine/Engine.cpp
        src/engine/Engine.h
        src/util/UUID.h
        src/ui/shared/runners/imgui_demo.cpp
        src/util/StringUtils.h
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
