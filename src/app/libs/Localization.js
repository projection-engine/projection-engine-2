export default class Localization {
    static HOME = {
        HOME: {
            PROJECT_NAME: "My project",
            DELETE: "Deleting project",
            RENAME: "Project renamed",
            RENAME_ERROR: "Error renaming project",
            LOADING: "Loading projects",
            TITLE: "Projection Engine",
            PROJECTS: "Your projects",
            CREATE: "Create project",
            EMPTY: "No projects found",
            SEARCH: "Search",
            PROJECT_CREATED: "Project created"
        },

        CARD: {
            NEW_NAME: "New name",
            DELETE: "Delete",
            SHOW_IN_EXPLORER: "Show in explorer",
            NEVER: "Never",
            PROJECT: "Project",
            LAST_MODIFIED: "Last modified",
            CREATION: "Creation date",
            RECENT: "Recent"
        },

    }

    static SETTINGS = {
        MAIN: {
            BACKGROUND: "Background",
            PREFERENCES: "Preferences",
            APPLY: "Apply",
            POST_PROCESSING: "Post processing",
            RENDERING: "Rendering",
            VIEWPORT: "Viewport",
            ENABLED: "Enabled",
            COLOR: "Color",

            EDITOR: "Editor",
            SIDE_BAR: "Viewport side-bar",
            METRICS: "Viewport metrics",
            SHORTCUTS: "Shortcuts",
            GRID_VISIBILITY: "Show grid",
            ICON_VISIBILITY: "Show icons",
            CAMERA_ANIMATION: "Camera smoothing",
            ICON_SIZE: "Icons size"
        }
    }
    static PROJECT = {
        CONTROL: {
            LEVEL: "Level",
            BUILD_PROBES: "Build probes",
            BUILDING_PROBES: "Building probes",
            PLAY: "Play",
            STOP: "Stop",
            SAVE: "Save",
            DEFAULT_LEVEL: "Default",
        },
        INFO: {
            VERSION: "2.5.0-alpha",

        },
        ALERTS: {
            UNDO_SETTINGS: "Undoing settings modification.",
            REDO_SETTINGS: "Redoing settings modification.",
            UNDO_ENTITIES: "Undoing entity modification.",
            REDO_ENTITIES: "Redoing entity modification.",
        },
        VIEWPORT: {

            PLAY: "Game",
            EDITOR: "Scene Editor",
            UI: "UI Editor",
            EMPTY_ENTITY: "Empty Entity",
            LAYOUT: "Layout",
            ADD: "Add",
            ADD_DETAILS: "Add entity",
            CAMERA: "Camera",
            TITLE: "Viewport",
            ACTIVE_ENTITY: "Active Entity",
            DELETE_VIEW: "Delete view",
            NEW_TAB: "New Tab",
            POINT_LIGHT: "Point Light",
            DIRECTIONAL_LIGHT: "Directional Light",
            SPOT_LIGHT: "SpotLight",
            SPECULAR_PROBE: "Specular Probe",
            DIFFUSE_PROBE: "Diffuse Probe",
            UTILS: "Utils",
            AMBIENT: "Ambient",
            LIGHTS: "Lights",
            TOP: "Top",
            LEFT: "Left",
            RIGHT: "Right",
            BOTTOM: "Bottom",
            FRONT: "Front",
            BACK: "Back",
            SWITCH_PROJECTION: "Switch between last Ortho/Perspective",
            DRAG_X_ZOOM: "Drag X to zoom in/out",
            DRAG_X_DIR: "- Drag X to move forward/backwards",
            DRAG_Y_DIR: "- Drag Y to move up/down",
            DOUBLE_CLICK: "- Double click to center",
            VISIBLE: "Visible",
            GRID: "Grid",
            ICONS: "Icons",
            FPS: "Frames per second",
            CAM_ANIM: "Camera smoothing",
            ICON_SIZE: "icon size",
            SHADING_LIGHT: "Light only",
            SHADING_UNLIT: "Unlit",
            SHADING_NORMAL: "Normals",
            SHADING_DEPTH: "Scene Depth",
            SHADING_AO: "Ambient Occlusion",
            SHADING_DETAIL: "Details",
            SHADING_SWITCH: "Switching to details shading model",
            FAR: "Far plane",
            NEAR: "Near plane",
            FOV: "Field Of View",
            ZOOM: "Zoom",
            TRANSLATION_GRID: "Translation grid",
            SCALE_GRID: "Scale grid",
            ROTATION_GRID: "Rotation Grid",
            SELECTION: "Selection",
            CURSOR: "3D Cursor",
            T_GIZMO: "Translation gizmo",
            R_GIZMO: "Rotation gizmo",
            S_GIZMO: "Scale gizmo",
            BACKGROUND: "Background",

        },
        HIERARCHY: {
            TRANSFORM: "Transformation",
            DIRECTIONAL_LIGHT:"Directional Light",
            POINT_LIGHT: "Point Light",
            MESH: "Mesh",
            CAMERA: "Camera",
            PROBE: "Probe",

            COMPONENT_FILTER: "Filter by component",
            HIERARCHY_SOURCE: "Change hierarchy view",
            ENGINE: "Engine",
            UI: "UI",
            TITLE: "Hierarchy",
            NEW_FOLDER: "New Folder",
            SEARCH: "Search",

            KEY: "Key",
            VALUE: "Value"
        },
        CONSOLE: {
            VIEW: "View",
            TOGGLE_CLEAR_ON_PLAY: "Clear on play",
            TITLE: "Console",
            CLEAR: "Clear",
            ERRORS: "Show errors",
            WARNINGS: "Show warnings",
            LOGS: "Show logs"
        },
        SHADER_EDITOR: {
            ADD: "Add",
            COLOR: "Color",
            TITLE: "Shader Editor",
            SAVE: "Save",
            COMPILE: "Compile",
            SELECT: "Select",
            ALL: "All",
            NONE: "None",
            INVERT: "Invert",
            GRID: "Toggle movement grid",
            NAME: "Name",
            INFORMATION: "Information",
            NEEDS_COMPILATION: "Please compile the shader.",
            ERRORS: "Errors",
            NO_ERRORS: "No errors were found.",
            NODE: "Node",
            STATUS: "Status",
            SOURCE: "Source code",
            COMPILING: "Compiling shaders",
            NOT_APPLIED: "Material doesn't seem to be applied to a mesh.",
            SAVED: "Saved",
            ERROR: "Some error occurred"
        },
        INSPECTOR: {
            FROM_LAYOUT: "Load from UI Layout",
            FOCUSED_ON_ENGINE: "Priority on: Entity",
            FOCUSED_ON_UI: "Priority on: UI element",

            EDITING_ELEMENT: "Editing element",
            EDITING_ENTITY: "Editing entity",
            COULD_NOT_FIND: "Could not find component for item",
            MATERIAL_LOADED: "Material loaded successfully",
            ERROR_LOADING_FILE: "Error loading file.",
            SPECULAR_PROBE: "Specular probe",
            MULTIPLIER: "Multiplier",
            INTENSITY: "Intensity",
            INTENSITY_COLOR: "Intensity & color",
            DISTORTION: "Distortion",
            THRESHOLD: "Threshold",
            BLOOM: "Bloom",
            COLOR_CORRECTION: "Color correction",
            GAMMA: "Gamma",
            EXPOSURE: "Exposure",
            FILM_GRAIN: "Film grain",
            CHROMATIC_ABERRATION: "Chromatic aberration",

            ENABLED: "Enabled",
            RENDERING: "Rendering features",
            POST_PROCESSING: "Editor post-processing",
            TITLE: "Inspector",
            SCRIPTS: "Scripts",
            ORTHO_PROJECTION: "Orthographic projection",
            PROJECTION_SIZE: "Orthographic size",
            FOV: "Field Of View",
            VIEW_PLANES: "View Planes",
            FAR: "Far",
            NEAR: "Near",
            MY_ENTITY: "My entity",
            NAME: "Name",
            STOP_SIMULATION: "Stop the simulation to change attributes.",
            TRANSLATION: "Translation",
            ROTATION: "Rotation",
            SCALING: "Scaling",
            RECOMPUTE_PROBES: "Probe re-computation needed",
            RESOLUTION: "Resolution",
            AA: "FXAA Anti-aliasing",
            SSR: "Screen space reflections",
            AO: "Ambient occlusion",
            STRENGTH: "Strength",
            STEP_SIZE: "Step size",
            STEPS: "Steps",
            SSGI: "Global illumination",
            SHADOWS: "Shadows",
            LIGHTS: "Lights",
            SMOOTHING_SAMPLES: "Smoothing samples",
            SAMPLES: "Samples",
            RADIUS: "Radius",
            FALLOFF: "Falloff",
            AREA: "Area",
            BASE: "Base",
            ATTENUATION: "Attenuation",
            CASTS_SHADOWS: "Casts shadows",
            SIZE: "Size",
            ADD_COMPONENT: "Add component",
            QUERY_KEY: "Query key",
            REMOVE_COMPONENT: "Remove component",
            CAMERA: "Camera",
            DIRECTIONAL_LIGHT: "Directional light",
            MESH: "Mesh",
            POINT_LIGHT: "Point Light",
            PROBE: "Probe",
            TRANSFORMATION: "Transformation"
        },
        FILES: {
            NEW_UI_LAYOUT: "New UI Layout",
            NEW_STYLESHEET: "New Stylesheet",
            NEW_LEVEL: "New Level",
            SUCCESSFUL_DELETE: "Items deleted",
            CREATE: "Create",
            OPENING_LEVEL: "Opening level",
            OPENING_FILE: "Opening file",
            SEARCH: "Search",
            SELECT: "Select",
            TITLE: "Content Browser",
            EMPTY: "Empty folder",
            SELECT_ALL: "Select all",
            SELECT_NONE: "Select none",
            SELECT_INVERT: "Invert selection",
            BACK: "Back",
            DELETE: "Delete",

            CUT: "Cut",
            PASTE: "Paste",
            RENAME: "Rename",
            NEW_FOLDER: "New Folder",
            OPEN_WITH_EXPLORER: "Open with explorer",
            FORWARD: "Forward",
            REFRESH: "Refresh",
            REFRESHING: "Refreshing content-browser",
            GO_TO_PARENT: "Go to parent",

            NEW_COMPONENT: "New Component",
            NEW_MATERIAL: "New Material",
            NEW_MATERIAL_INSTANCE: "New Material Instance",

            ASSETS: "Assets",
            BOOKMARKS: "Bookmarks",
            IMPORT: "Import",
            SIDE_BAR: "Sidebar",
            OPTIONS: "Navigation options",
            VIEW: "View",
            BACK_DIR: "Action: Go back",
            FORWARD_DIR: "Action: Go forward",
            PARENT_DIR: "Action: Go to parent",
            CREATE_FOLDER: "Create folder",
            ADD_BOOKMARK: "Add folder to bookmarks",
            FILTER_TYPE: "Filter by file type"
        }
    }
    static COMPONENTS = {
        FRAME: {
            ABOUT: "About",
            EXIT: "Exit",
            TITLE: "Projection Engine",
            VERSION: Localization.PROJECT.INFO.VERSION,
            FOOTER: "This program comes with absolutely no warranty.",
            MIT: "MIT License",
            COPYRIGHT: "Copyright (c) 2022 Projection Engine"
        },

        SELECTOR: {
            EMPTY: "Empty",
            NOTHING: "Nothing found",
            DEFAULT_MATERIAL: "Default material",
            REMOVE_SCRIPT: "Remove script",
            SEARCH: "Search"
        },
        VIEWS: {
            UI: "UI Hierarchy",
            CLOSE: "Close",
            HIERARCHY: "Hierarchy",
            INSPECTOR: "Inspector",
            CONTENT_BROWSER: "Content Browser",
            SHADER_EDITOR: "Shader Editor",
            CONSOLE: "Console"
        }
    }

}