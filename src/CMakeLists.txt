include_directories(ui/windows/editor)

file(GLOB XML_FILES
        "ui/windows/editor/static/*.xml"
)
foreach (XML_FILE ${XML_FILES})
    file(COPY ${XML_FILE} DESTINATION "${CMAKE_BINARY_DIR}/src")
endforeach ()

string(REPLACE "src/" "" SRC_PATHS "${FILE_PATHS}")
add_executable(catalyst main.cpp
        ${SRC_PATHS}
        engine/resource/core/RUBO.cpp
        engine/resource/core/RUBO.h
        engine/resource/dto/UBODataDTO.h
        engine/resource/UBOType.h
        core/Definitions.h
)

target_link_libraries(catalyst PRIVATE
        ${COMMON_LIBRARIES}
)


