string(REPLACE "src/" "../src/" FILES_LOCAL "${FILE_PATHS}")

set(SOURCES
        ${FILES_LOCAL}

        engine/WorldServiceTest.cpp
        engine/WorldServiceTest.h

        engine/SerializationTest.h
        engine/SerializationTest.cpp

        Tester.cpp
        Tester.h
        core/ListTest.cpp
        core/ListTest.h
        core/LoggerTest.cpp
        core/LoggerTest.h
        core/MapTest.cpp
        core/MapTest.h
        core/TimerTest.cpp
        core/TimerTest.h
        ui/event/EventControllerTest.cpp
        ui/event/EventControllerTest.h
        ui/event/Listener.cpp
        ui/event/Listener.h
        ui/store/IStoreTest.cpp
        ui/store/IStoreTest.h
        ui/store/SampleStore.h
        ui/store/SampleData.h
        core/FileSystemTest.cpp
        core/FileSystemTest.h
        core/StringUtilTest.cpp
        core/StringUtilTest.h
)

include_directories(../src/ui/editor)
include_directories(../src/util)

foreach (XML_FILE ${XML_FILES})
    file(COPY ${XML_FILE} DESTINATION "${CMAKE_BINARY_DIR}/test")
endforeach ()

add_executable(main_test main_test.cpp ${SOURCES})
target_link_libraries(main_test PRIVATE ${COMMON_LIBRARIES})



