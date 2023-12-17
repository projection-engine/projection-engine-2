include_directories(ui/editor)

file(GLOB XML_FILES "ui/editor/static/*.xml")
foreach (XML_FILE ${XML_FILES})
    file(COPY ${XML_FILE} DESTINATION "${CMAKE_BINARY_DIR}/src")
endforeach ()

string(REPLACE "src/" "" SRC_PATHS "${FILE_PATHS}")
add_executable(projection main.cpp ${SRC_PATHS})

target_link_libraries(projection PRIVATE ${COMMON_LIBRARIES})


