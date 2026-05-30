cmake_minimum_required(VERSION 3.10)
project(analytics-engine)

set(CMAKE_CXX_STANDARD 17)
set(CMAKE_CXX_STANDARD_REQUIRED ON)

# Find Packages (Assuming they are available in the system or environment)
# In a real scenario, we might use Vcpkg or Conan
find_package(Threads REQUIRED)

# Include directories
include_directories(include)
include_directories(src)

# Core Libraries
add_library(oee_core
    src/oee/oee_calculator.cpp
    src/oee/availability.cpp
    src/oee/performance.cpp
    src/oee/quality.cpp
)

add_library(spc_core
    src/spc/control_charts.cpp
    src/spc/capability.cpp
)

add_library(anomaly_core
    src/anomaly/detector.cpp
    src/anomaly/scorer.cpp
)

add_library(predictive_core
    src/predictive/maintenance.cpp
)

add_library(db_core
    src/db/timescale_writer.cpp
    src/db/postgres_writer.cpp
)

# Main Executable
add_executable(analytics-engine src/main.cpp)
target_link_libraries(analytics-engine 
    oee_core 
    spc_core 
    anomaly_core 
    predictive_core 
    db_core
    Threads::Threads
)

# Add tests if needed
# enable_testing()
# add_executable(oee_tests tests/oee_test.cpp)
# target_link_libraries(oee_tests oee_core)
