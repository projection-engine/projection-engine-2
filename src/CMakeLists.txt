include_directories(ui/editor)

file(GLOB XML_FILES "ui/editor/static/*.xml")
file(GLOB WEB_VIEW "ui/webview/build/*")

foreach (XML_FILE ${XML_FILES})
    file(COPY ${XML_FILE} DESTINATION "${CMAKE_BINARY_DIR}/src")
endforeach ()

foreach (WEB_VIEW_FILE ${WEB_VIEW})
    file(COPY ${WEB_VIEW_FILE} DESTINATION "${CMAKE_BINARY_DIR}/src")
endforeach ()

string(REPLACE "src/" "" SRC_PATHS "${FILE_PATHS}")
add_executable(projection main.cpp ${SRC_PATHS}
        ui/core/webview/WebViewWindow.cpp
        ui/core/webview/WebViewWindow.h)

target_link_libraries(projection PRIVATE ${COMMON_LIBRARIES})


