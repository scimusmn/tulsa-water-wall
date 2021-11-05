cmake_minimum_required(VERSION 3.2)
project(minunit_project_template)

set(CMAKE_C_FLAGS "-Wall -Wextra -Werror -Wfatal-errors -Wpedantic")
set(CMAKE_C_FLAGS "-g")

set(SRC_ROOT ${CMAKE_SOURCE_DIR}/src)
include_directories(${SRC_ROOT})


# your normal build script should go in here

# [your build script]


# additional `test` target
# you should add your test files to the TEST_SOURCES variable

set(TEST_SOURCES
  ${SRC_ROOT}/test/test_main.c

  ${SRC_ROOT}/test/mock_queue.c
  ${SRC_ROOT}/test/mock_queue.test.c
  )

add_executable(test EXCLUDE_FROM_ALL ${TEST_SOURCES})
set_target_properties(test PROPERTIES
  C_STANDARD 99
  CMAKE_C_FLAGS "-Wall -Wextra -Werror -Wfatal-errors -Wpedantic")


# remember to link any needed libraries for `test` here!
# target_link_libraries(test)
