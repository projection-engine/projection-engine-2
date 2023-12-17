# Projection engine 2

## Setup
1. Install [vcpkg](https://vcpkg.io/en/getting-started) with elevation
   >  git clone https://github.com/Microsoft/vcpkg.git "C:\vcpkg"
   >  cd "C:\vcpkg"
   > .\bootstrap-vcpkg.bat
   > vcpkg integrate install
2. Setup toolchain CLion 
   1. File -> Settings -> Build, Execution, Deployment -> Toolchains
   2. Create a new toolchain using 
      1. Build type: `Debug`
      2. Toolchain: `Visual Studio`
      3. Generator: `NMake Makefiles`
      4. CMake options: `-DCMAKE_TOOLCHAIN_FILE=C:\vcpkg\scripts\buildsystems\vcpkg.cmake`
3. Go to `CMakeLists.txt` and click the debug button on the side of the first line
4. Select the `projection` configuration that will appear in the `Configurations` dropdown on the top bar
   1. Or go to the main.cpp file and click the execute button there

## Resources
[quick-cmake-tutorial](https://www.jetbrains.com/help/clion/2018.2/quick-cmake-tutorial.html#d156825e282)

[Tutorial: Install a dependency from a manifest file](https://learn.microsoft.com/en-us/vcpkg/consume/manifest-mode?tabs=cmake%2Cbuild-cmake)

[Get started with vcpkg](https://vcpkg.io/en/getting-started)