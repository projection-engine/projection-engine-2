include_directories(ui/editor)

file(GLOB WEB_VIEW "ui/webview/build/*")

foreach (WEB_VIEW_FILE ${WEB_VIEW})
    file(COPY ${WEB_VIEW_FILE} DESTINATION "${CMAKE_BINARY_DIR}/src")
endforeach ()

string(REPLACE "src/" "" SRC_PATHS "${FILE_PATHS}")
add_executable(projection main.cpp ${SRC_PATHS}
        services/FileSystemService.cpp
        services/FileSystemService.h
        ui/shared/webview/WebViewPayload.cpp)

target_link_libraries(projection PRIVATE ${COMMON_LIBRARIES})


