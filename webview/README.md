# Projection engine 2
This project is focused on rewriting the core structure of the original Projection Engine and introduce new technologies that allow for further 
advancements in rendering and developments using the engine.


## History behind the project
The Projection Engine first started as a small scale, broser-based graphics engine for me to create simple scenes and to practice my study in the graphics programming area. With time, the vision changed to a more complete engine, capable of being used to develop actual experiences with it. Even though it got pretty advanced in some aspects, the lack of a structured view/focus for the project and the limitations of the tech stack used kinda made it not reach the goal of being a full on game engine. 

## Vision for the future
This second iteration of the Projection Engine has the main goal of replacing the parts of the tech stack that were limiting for both engine and editor development. The main idea is to replace completely the Electron backend and the WebGL2 rendering backend with a completely native one, also, rewriting and re-thinking the core architecture of the engine and editor. 

### Problems to address
One of the biggest problems in the development until this point was the tight coupling between the engine part and the editor, this is still a problem and will be addressed incrementally. The final goal is to have the engine part completely separated from the UI, only being accessed or interacted with via a single façade, this applies for everything engine related, resources, entities, systems, etc.

### The main refactoring goals:

1. File system: The current file system is slow and unnecessarily complex
2. Shaders: Currently they are bundled together with the source code, ideally they should be fetched at runtime and allow for recompilation
3. UI and styles
 - The usage of WebComponents should be the main focus
 - Remove replication of CSS styles
 - More flexible and customizable at runtime styles, without the need for rebuilding the application
4. Usage of disabled features like SharedArrayBuffers
5. Data structure: Stores, static classes, local state, etc.
6. Multithreading
7. Engine: tight coupling between editor and engine
8. Render limitations: WebGL, the idea is to use initially OpenGL4 and in the future Direct3D12
9. Usage of libraries to handle things like GLTF support, Gizmos, Image processing and other things
   
And more.

