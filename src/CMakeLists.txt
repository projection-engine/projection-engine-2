include_directories(ui/editor)

file(GLOB SHADERS "engine/shaders/*")

foreach (SHADERS ${SHADERS})
    file(COPY ${SHADERS} DESTINATION "${CMAKE_BINARY_DIR}/src")
endforeach ()

string(REPLACE "src/" "" SRC_PATHS "${FILE_PATHS}")
add_executable(projection main.cpp ${SRC_PATHS}
        engine/AbstractSerializable.cpp
        engine/AbstractSerializable.h
        engine/SerializableRepository.cpp
        engine/SerializableRepository.h)

target_link_libraries(projection PRIVATE ${COMMON_LIBRARIES})


