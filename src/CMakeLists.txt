include_directories(ui/editor)

file(GLOB WEB_VIEW "ui/webview/build/*")

foreach (WEB_VIEW_FILE ${WEB_VIEW})
    file(COPY ${WEB_VIEW_FILE} DESTINATION "${CMAKE_BINARY_DIR}/src")
endforeach ()

string(REPLACE "src/" "" SRC_PATHS "${FILE_PATHS}")
string(REPLACE "src/" "" SRC_MAIN_PATHS "${MAIN_PATHS}")
add_executable(projection main.cpp ${SRC_PATHS} ${SRC_MAIN_PATHS}
        ui/projects/ProjectsService.cpp
        ui/projects/ProjectsService.h)

target_link_libraries(projection PRIVATE ${COMMON_LIBRARIES})


