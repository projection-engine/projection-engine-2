include_directories(ui/editor)

file(GLOB SHADERS "engine/shaders/*")

foreach (SHADERS ${SHADERS})
    file(COPY ${SHADERS} DESTINATION "${CMAKE_BINARY_DIR}/src")
endforeach ()

string(REPLACE "src/" "" SRC_PATHS "${FILE_PATHS}")
add_executable(projection main.cpp ${SRC_PATHS}
        engine/enum/StaticShader.h
        engine/enum/StaticShader.cpp
        engine/services/resource/StaticMeshFactory.cpp
        engine/services/resource/StaticMeshFactory.h
        engine/util/NoiseTextureDTO.h
        engine/enum/StaticUBO.cpp
        engine/enum/StaticUBO.h
        engine/services/resource/StaticFBOFactory.cpp
        engine/services/resource/StaticFBOFactory.h
        engine/services/resource/StaticShaderFactory.cpp
        engine/services/resource/StaticShaderFactory.h
        engine/services/resource/StaticUBOFactory.cpp
        engine/services/resource/StaticUBOFactory.h
        engine/services/resource/StaticTextureFactory.cpp
        engine/services/resource/StaticTextureFactory.h
)

target_link_libraries(projection PRIVATE ${COMMON_LIBRARIES})


