import FileTypes from "./FileTypes";

export default {
    [FileTypes.PRIMITIVE]: "Mesh",
    [FileTypes.UI_LAYOUT]: "UI layout",
    [FileTypes.COMPONENT]: "Component",
    [FileTypes.MATERIAL]: "Material",
    [FileTypes.TEXTURE]: "Texture",
    [FileTypes.COLLECTION]: "Scene",
    [FileTypes.JAVASCRIPT]: "Javascript package",
    [FileTypes.JSON]: "JSON object",

    FILE_BROWSER: "File browser",
    LOGGER_SILENT: "Writes log/error/warning to terminal (integrated) only",
    LOGGER_DETAILED: "Writes every log/error/warning to file and to terminal (integrated)",
    HOME: "Home",
    RAYLEIGH_HEIGHT: "Rayleigh height",
    MIE_HEIGHT: "Mie height",
    RAYLEIGH_BETA_VALUES: "Rayleigh beta values",
    MIE_BETA_VALUES: "Mie beta values",
    ATMOSPHERE: "Atmosphere",
    PLANET: "Planet",
    SCATTERING_FUNCTION: "Scattering function",
    MIE: "Mie",
    RAYLEIGH: "Rayleigh",
    COMBINED: "Combined",
    ADDED_COMPONENT: "Added component",
    FULLSCREEN: "Fullscreen",
    BASIC: "Basic",
    ENTITY_PROPERTIES: "Entity properties",
    CUSTOM_COMPONENTS: "Custom components",
    SHADING: "Shading: ",
    NAME_AND_KEY: "Name & key",
    NEW_MESSAGE: "New console message",
    FILTERING_SAMPLES: "Filtering samples",
    FILTERING_INTENSITY: "Filtering intensity",
    EDGE_FALLOFF: "Edge falloff",
    MAX_LIGHTS: "Max lights",
    SHOW_DETAILS:"Show details",
    COMPONENTS: "Components",
    LICENSE: "Projection Engine is licensed under the GNU General Public License, Version 3.\n Some files may have other compatible licenses.",
    RELEASE_NOTES: "Release notes",
    CREATE_COLLECTION: "Create new collection",
    RELEASES: "Releases",
    RADII: "Radii",
    ASSET_PROPERTIES: "Asset properties",
    NO_CUSTOM_COMPONENTS_FOUND: "No custom components were found",
    NEW_LIGHT: "New light",
    DECAL: "Decal",
    COULD_NOT_LINK_ENTITIES: "Could not link entities",
    EDITOR_CAMERA: "Editor camera",
    COLLECTION_NOT_FOUND: "Collection not found",
    NEW_ENTITY: "New entity",
    NEW_COLLECTION: "New collection",
    OPENING_ASSET: "Opening asset",
    PROJECT_NAME: "My project",
    SSAO: "SSAO (Ambient occlusion)",
    DECAL_RENDERER: "Decal renderer",
    MOVEMENT: "Movement",
    NO_VERSION_INSTALLED: "No editor installation found, please download one.",
    VERSION_WARNING: "Changing versions may break some resources.",
    PROJECT_RENAMED: "Project renamed",
    RENAME_ERROR: "Error renaming editor",
    LOADING: "Loading projects",
    YES: "Yes",
    NO: "No",
    UNSAVED_CHANGES: "Save changes before action ?",
    PROJECTION: "Projection",
    TITLE: "Projection Engine",
    MAX_MEMORY: "Memory allocation",
    GENERAL: "General",
    VSYNC: "Vsync",
    OPEN_PREFERENCES: "Open preferences",
    GRAPHICS_BACKEND: "Graphics backend",
    RAY_MARCHING: "Ray marching",
    LABEL_PROJECTS: "Projects",
    PROJECTS: "Your projects",
    SHOW_RECENT_ERRORS: "Show recent errors",
    ATMOSPHERE_RENDERER: "Atmosphere renderer",
    LIGHT_PROBE: "Light probe",
    ELAPSED_TIME: "Elapsed time",
    STOP_RECORDING: "Stop recording",
    SET_AS_DEFAULT: "Default",
    DEFAULT: "Default",
    ASCENDING: "Ascending",
    DESCENDING: "Descending",
    PROJECT_CREATED: "Project created",
    IS_DEFAULT_VERSION: "Default version",
    FILE_NOT_FOUND: "File not found",
    MINIMIZE: "Minimize",
    MAXIMIZE: "Maximize",
    TEXTURE_QUALITY: "Texture quality",
    COMPRESSION_RATIO: "Compression ratio",
    NO_RELEASES: "No releases found",
    SAVING_STATE: "Saving state",
    ERROR_LOGGING: "Error logging",
    ERROR_LOADING_PROJECT: "Error loading project",
    INSTALL: "Install",
    CULLING_DISTANCE: "Culling distance",
    DOWNLOADS: "Downloads",
    RESTORING_STATE: "Restoring state",
    NEW_NAME: "New name",
    EDIT_NODE: "Edit node",
    UPDATING_UI: "Updating UI",
    SHOW_IN_EXPLORER: "Show in explorer",
    ERROR_OPENING_FILE: "Error opening file",
    NEVER: "Never",
    AUTO_UPDATE: "Auto-update",
    PROJECT: "Project",
    FORCE_UPDATE: "Force update",
    TOGGLE_DOWNLOADS: "Toggle downloads",
    LAST_MODIFIED: "Last modified",
    RECENT: "Recent",
    OPEN: "Open",
    SMOOTHING_FALLOFF: "Smoothing falloff",
    OUTLINE_WIDTH: "Outline width",
    DOUBLE_CLICK_TO_RENAME: "Double click to rename.",
    NEW_PROJECT: "New project",
    FAVORITE: "Toggle favorite",
    DOWNLOAD_FINISHED: "Download finished",
    UPDATING_UNIFORMS: "Updating uniforms",
    NOT_COMPATIBLE: "This version is not compatible with your OS.",
    UNINSTALL: "Uninstall",
    CHANGE_BASE_DIR: "Change source directory",
    NO_VERSION: "No version linked.",
    NO_UPDATES: "You are up-to-date.",
    CHECK_UPDATE_HUB: "Check for updates",
    FETCHING_UPDATES: "Fetching updates.",
    ERROR_UPDATE: "Some error occurred during update.",
    INSTALLING_UPDATES: "Installing updates, your app may restart after some time.",
    SPHERE_AREA: "Sphere area-light",
    ADD_COMMENT: "Add comment",
    DISK_AREA: "Disk area-light",
    PLANE_AREA: "Plane area-light",
    DISTANCE_MULTIPLIER: "Distance multiplier",
    SCREEN_DOOR: "Screen-door effect",
    HIERARCHY_COLOR: "Hierarchy color",
    UPDATING_SKYLIGHT: "Updating skylight",
    ACTIVE_SKYLIGHT: "Active skylight",
    OUTLINE: "Outline",
    TYPE: "Type",
    SETTINGS: "Settings",
    SCREEN_GRABBING_SPEED: "Drag speed",
    VELOCITY_DEF: "Per-object velocity",
    JSON: "JSON",
    SHADING_VELOCITY: "Velocity",
    GRID: "Grid",
    JAVASCRIPT: "Javascript",
    CLOSE_ALL: "Close all",
    ALL_SCENE_LIGHTS: "All scene lights",
    NO_CONTRIBUTION: "No contribution",
    CREATING_ENTITY: "Creating entity",
    UPDATING_SETTINGS: "Updating settings",
    SPECULAR_LIGHT: "Specular light",
    RESET: "Reset",
    ORIGINAL: "Original",
    SHADER_EDITOR: "Shader editor",
    CAMERA_GIZMO: "Camera gizmo",
    UNDO: "Undo",
    SPOTLIGHT: "Spotlight",
    ENTITIES_CREATED: "Entities created",
    LINES: "Lines",
    APPLY: "Apply",
    SSS: "SSS (screen-space shadows)",
    EDITOR_POST_PROCESSING: "Editor post-processing",
    POST_PROCESSING: "Post processing",
    MAX_DISTANCE: "Max distance",
    DISTANCE_CULLING: "Distance culling",
    OCCLUSION_CULLING: "Occlusion culling",
    AREA_LIGHT: "Area light",
    OK: "Ok",
    CANCEL: "Cancel",
    YOU_MAY_LOSE_DATA: "You may lose unsaved work, are you sure ?",
    DISK: "Disk",
    DISABLED: "Disabled",
    TAA: "Temporal AA",
    TAB_COLOR: "Tab color",
    TOGGLE_CAMERA_MOVEMENT: "Toggle camera movement",
    DEPTH_THICKNESS: "Depth thickness",
    HAS_SSS: "Has screen-space shadows",
    INVALID_TYPE: "Invalid type",
    ITEM_ALREADY_EXISTS: "Item already exists.",
    VIEWPORT: "Viewport",
    LIGHT: "Light",
    CULLING: "Culling",
    ALL_LIGHTS: "All lights",
    IMPORT_SUCCESSFUL: "Import successful",
    CREATE_ENTITY: "Create entity",
    MAXIMUM_NUMBER_OF_LIGHTS: "Maximum number of lights",
    EXECUTING_SIMULATION: "Cannot save while executing simulation",
    MIN_RAY_STEP: "Minimum ray step",
    SOME_ERROR_OCCURRED: "Some error occurred",
    DEPTH_DELTA: "Depth min delta",
    TOGGLE_TRANSFORMATION_TYPE: "Toggle transformation type",
    HIDE_BUFFERS: "Hide buffers",
    LIGHT_COMPLEXITY: "Light complexity",
    SHORTCUT_ALREADY_LINKED: "Shortcut already linked to action",
    SHOW_BUFFERS: "Show buffers",
    LIGHT_QUANTITY: "Light quantity",
    UI_ALREADY_OPEN: "UI already open on other view",
    SIDE_BAR: "Viewport side-bar",
    DEBUG_SHADING: "Debug shading",
    NATURAL_SHADING: "Natural shading",
    LIGHT_ONLY: "Light only",
    SKYLIGHT_INDIRECT: "Skylight indirect",
    MOTION_BLUR: "Motion blur",
    OVERLAY: "Overlay",
    NEW_TAB: "New tab",
    CLEAR_CACHE: "Clear cache",
    GIZMOS: "Gizmos",
    INDIRECT_LIGHT: "Indirect light",
    PROJECT_SAVED: "Project saved",
    SHADING_DYNAMIC_AO: "SSAO",
    INTERNAL_ERROR: "Internal error",
    SPAWN_ON_ORIGIN: "Spawn on origin",
    SHORTCUTS: "Shortcuts",
    DEPTH_SAMPLER: "Depth sampler",
    AO_SRC: "Unfiltered SSAO",
    SSGI_NORMALS: "Stochastic normals",
    SKYLIGHT: "Skylight",
    BLUR_BLOOM: "Blur color filter",
    GI: "Global illumination",
    DIRECTIONAL_SHADOWS: "Directional shadows",
    ERROR_DURING_COMPILATION: "Error during compilation",
    NEW_FOLDER: "New folder",
    UNKNOWN: "Unknown buffer",
    CUTOFF_SMOOTHING: "Cutoff smoothing",
    OVERDRAW: "Overdraw",
    VIEWS: "Views",
    CUTOFF: "Cutoff",
    SHOW_OVERLAY: "Show overlay",
    NO_SKYLIGHT_COMPONENT_FOUND: "No Skylight component found on entity",
    RECORDING_SAMPLES: "Recording samples",
    EDITOR_COLOR_CORRECTION: "Editor color correction",
    FILE_ALREADY_OPEN: "File already open",
    GRID_VISIBILITY: "Show grid",
    ICON_VISIBILITY: "Show icons",
    RECOMPUTE_CAPTURE: "Recompute capture",
    MATERIALS: "Materials",
    MATERIALS_TO_DRAW: "Materials to draw",
    CULL_FACE: "Cull face",
    NO_MATERIAL_SELECTED: "No material selected",
    CAMERA_ANIMATION: "Camera smoothing",
    SAVING: "Saving project",
    NO_DEPTH_TEST: "No depth test",
    MOTION_BLUR_SCALE: "Motion blur scale",
    SAVE: "Save",
    SHADING_RANDOM: "Random color",
    SHADING_RANDOM_DEF: "Random color based on instance index",
    CENTER_POINT: "Center point",
    MATERIAL_VALUES: "Material values",
    OVERRIDE_PROPERTIES: "Override properties",
    DYNAMIC: "Dynamic",
    RELATIONS: "Relations",
    ASPECT_RATIO: "Aspect Ratio",
    VIGNETTE: "Vignette effect",
    BLUR_SAMPLES: "Blur samples",
    COPY_ID: "Copy ID",
    ACTIVITY_HISTORY: "Activity history",
    UNDOING_CHANGES: "Undoing changes",
    REDOING_CHANGES: "Redoing changes",
    TOGGLE_RECORD: "Toggle record",
    REDO: "Redo",
    VISIBILITY: "Visibility",
    CHANGED: "Changed",
    RESOLUTION_SCALE: "Resolution scale",
    CLICK_THE_RECORD_BUTTON_TO_RECORD: "Click the record button to start a new recording",
    REFRESH_SCRIPTS_AND_PROBES: "Reloads scripts and UI components and rebuild light probes",
    DONE: "Done",
    EULER: "Euler",
    TRANSFORMING_GROUP: "Transforming group",
    QUATERNION: "Quaternion",
    TAB: "New Tab",
    NO_CUSTOM_COMPONENTS_LINKED: "No custom components linked",
    COPIED: "Copied",
    FOCUS_ON_THIS_VIEW: "Focus on this view",
    FOCUS_ON_CAMERA: "Focus on camera",
    OPEN_CONSOLE: "Open console",
    NEW_CONSOLE_MESSAGE: "New console message",
    CLEAR: "Clear",
    TOGGLE_NOTIFICATIONS: "Toggle notifications",
    EMPTY: "Empty",
    NOTIFICATIONS: "Notifications",
    SHOW_PREFERENCES: "Show preferences",
    PLAY: "Play",
    REFRESH_STRUCTURE: "Refresh structure",
    PARENT: "Parent",

    UPDATING_STRUCTURE: "Updating structure",

    NATIVE_MESHES: "Some meshes are embedded with editor/engine",
    NATIVE_MATERIALS: "Some materials are embedded with editor/engine",
    NATIVE_TEXTURES: "Some textures are embedded with editor/engine",

    LOOP_FRAME_TIME: "Loop",
    EXECUTION_FRAME_RATE: "Frame-rate",
    EXECUTION_FRAME_TIME: "Frame-time",
    MEMORY: "Total memory",
    SIMULATION: "Simulation",
    SCRIPTS: "Scripts",

    TOGGLE_FRAMERATE: "Toggle detailed metrics",

    ACTIVE_SHORTCUTS: "Hotkeys: Active view",
    VERSION: "1.0.0",
    LOGGING_ENABLED: "Error logging",
    SHOW_ERROR_LOGS: "Show error logs",


    ERROR_LOADING: "Error loading data.",

    ENTITY: "Entity",
    TRANSLATION: "Translation",
    ROTATION: "Rotation",
    SUB_DIVISION: "Subdivision",
    BRIGHTNESS: "Brightness",
    ALT_FOR_FIXED: "Fixed scaling",
    CTRL_FOR_UNITARY: "Unitary",
    ALT_FOR_PIVOT: "Pivot point",
    FOCUS: "Focus on active entity",

    METRICS: "Metrics",
    STOP: "Stop",

    SENSITIVITY: "Sensitivity",
    IMPORT: "Import",
    SCALE: "Scale",
    FOLIAGE_DISPLACEMENT: "Foliage displacement",
    DENSITY: "Density",
    TOTAL_QUANTITY: "Quantity",


    FOLIAGE_TOOL: "Foliage tool",
    SCULPT_TOOL: "Sculpt tool",
    LOWER: "Lower",
    RAISE: "Raise",
    STROKE: "Brush stroke",
    WIDTH: "Width",
    STRENGTH: "Strength",

    SCULPT: "Sculpt",
    PAINT_LAYERS: "Paint Layers",
    PAINT_FOLIAGE: "Paint Foliage",
    TERRAIN_EDITOR: "Terrain editor",
    SHADING_UV: "Texture coordinates",
    UV_DEF: "UV mapping",
    SHADING_ID: "Entity ID",
    ID_DEF: "Numeric entity identification",
    HEIGHT_MAP_DEF: "Y axis values",
    SHADING_STOCHASTIC: "Stochastic normals",
    STOCHASTIC_DEF: "SSGISystem normals",
    SHADING_SSGI: "Global illumination",
    SHADING_SSR: "Reflections",
    SSGI_DEF: "Screen-space global illumination",
    SSGI_UNFILTERED_DEF: "Unfiltered global illumination",
    POSITION: "Position",
    POSITION_DEF: "Fragment position",

    SHADING_METALLIC: "Metallic",
    METALLIC_DEF: "Material metallic",

    SHADING_ROUGHNESS: "Roughness",
    ROUGHNESS_DEF: "Material roughness",

    SHADING_AMBIENT: "Ambient",
    AMBIENT_DEF: "Ambient color (Probes)",

    G_AO_DEF: "Material AO",
    G_BUFFER: "G-Buffer",
    SCENE: "Scene",
    RECONSTRUCTED_NORMALS: "Screen",
    DETAIL_DEF: "PBR shading",
    LIGHT_DEF: "Light details",
    UNLIT_DEF: "Material albedo",
    AO_DEF: "Scene AO",
    DEPTH_DEF: "Linear depth",
    NORMAL_DEF: "Mesh normals",

    PICKER: "Element picker",
    SELECT_ALL: "Select all",
    ADD_ELEMENT: "Add element",
    CAMERA_POSITION: "Camera position",
    SELECT: "Select",
    ALL: "All",
    NONE: "None",
    INVERT: "Invert",
    TRANSFORMATION_ORIENTATION: "Transformation orientation",
    LOCAL: "Local",
    GLOBAL: "Global",

    MOVEMENT_SPEED: "Movement speed",

    SPRITE: "Sprite",
    SPRITE_RENDERER: "New sprite renderer",
    MESH_RENDERER: "New mesh renderer",

    MESHES: "Meshes",
    DRAG_DROP: "Drop meshes or scenes",
    EDITOR: "Scene Editor",
    UI: "UI Editor",
    UI_RENDERER: "UI Renderer",
    EMPTY_ENTITY: "Empty Entity",
    LAYOUT: "Layout",
    ADD_DETAILS: "Add entity",
    ACTIVE_ENTITY: "Active Entity",
    ACTIVE: "Active",
    DELETE_VIEW: "Delete view",

    UTILS: "Utils",
    AMBIENT: "Ambient",
    TOP: "Top",
    LEFT: "Left",
    RIGHT: "Right",
    BOTTOM: "Bottom",
    FRONT: "Front",
    BACK: "Back",
    SWITCH_PROJECTION: "Switch between last Orthographic/Perspective",
    MOVE_IN_SCREEN_SPACE: "Move camera in screen-space",
    DOUBLE_CLICK: "- Double click to center",

    ICONS: "Icons",
    FPS: "Frames per second",
    SMOOTHING: "Smoothing",
    ICON_SIZE: "icon size",
    SHADING_LIGHT: "Light only",
    SHADING_UNLIT: "Albedo",
    SHADING_NORMAL: "Normals",
    SHADING_DEPTH: "Depth",
    SHADING_AO: "Ambient occlusion",
    SHADING_DETAIL: "Details",

    ZOOM: "Zoom",

    MOVEMENT_GRID: "Movement grid",
    TRANSLATION_GRID: "Translation",
    SCALE_GRID: "Scale",
    ROTATION_GRID: "Rotation (degrees)",
    SELECTION: "Selection",
    T_GIZMO: "Translation",
    R_GIZMO: "Rotation",
    S_GIZMO: "Scale",
    BACKGROUND: "Background",

    SHOW_SELECTED: "Show selected",
    REMOVE_FILTER: "Remove filter",
    DEACTIVATE: "Activate/Deactivate entity",
    SELECTED_CHILD: "Child entity is selected",
    FOCUS_LOCKED_ENTITY: "Focus on locked entity",
    TRANSFORM: "Transformation",

    PROBE: "Probe",

    COMPONENT_FILTER: "Filter by component",
    HIERARCHY_SOURCE: "Change hierarchy view",
    ENGINE: "Engine",
    FOLDER: "New Folder",
    OBJECT: "Object",
    SPAWNING: "Spawning",
    CLICK_TO_SHOW_OBJECT: "Click to show object",
    VIEW: "View",
    TOGGLE_CLEAR_ON_PLAY: "Clear on play",

    ERRORS: "Show errors",
    WARNINGS: "Show warnings",
    LOGS: "Show logs",

    ADD: "Add",
    COMPILE: "Compile",

    TOGGLE_GRID: "Toggle grid",
    INFORMATION: "Information",
    NEEDS_COMPILATION: "Please compile the shader.",
    QUALITY: "Quality",

    DEPTH_OF_FIELD: "Depth of Field",
    FOCUS_DISTANCE: "Focus distance",
    FOCAL_LENGTH: "Focal length",
    APERTURE: "Aperture",
    NO_ERRORS: "No errors were found.",
    NODE: "Node",
    STATUS: "Status",
    SOURCE: "Source code",
    COMPILING: "Compiling shaders",
    NOT_APPLIED: "Material doesn't seem to be applied to a mesh.",
    SAVED: "Saved",
    ERROR: "Some error occurred",

    METADATA: "Metadata",
    DISTANCE: "Distance",
    DISTANCE_SQUARED: "Dist. squared",
    SHADOW_VIEW_PLANES: "Shadow map view planes",
    BIAS: "Bias",
    PCF_SAMPLES: "Filtering samples",
    SAMPLER: "Sampler",
    SAMPLER_SCALE: "RGB multiplier",
    UV_SCALE: "UV scale",

    LOCKED: "Is locked",
    HAS_COLLISION: "Has collision",

    LAYERS_CONTROLLER: "Layer controller",
    REMOVE_LAYER: "Remove layer",
    LAYER: "Layer",
    LAYERS: "Layers",
    PARALLAX_OCCLUSION_MAPPING: "Parallax occlusion mapping",
    DISCARD_OFF_PIXELS: "Discard off pixels",
    ADD_LAYER: "Add layer",
    TERRAIN_COMPONENT: "Terrain component",

    BRUSH_SETTINGS: "Brush settings",
    OPACITY: "Opacity",

    EDIT_HEIGHT_MAP: "Edit height map",
    IMPORT_IMAGE: "Import image",
    DIMENSIONS: "Dimensions",
    HEIGHT_SCALE: "Height scale",
    DIMENSION_MULTIPLIER: "Size multiplier",

    DEPTH_THRESHOLD: "Depth threshold",
    BINARY_SEARCH: "Binary search iterations",
    POWER: "Power",

    USE_SAMPLER: "Use texture",
    SCALE_ALBEDO: "Albedo scale",
    FALLBACK_VALUE: "Fallback value",

    SHEEN_PARAMS: "Sheen params",
    ANISOTROPIC_PARAMS: "Anisotropic params",
    ANISOTROPY: "Anisotropy",
    CLEAR_COAT_PARAMS: "Clear coat params",
    CLEAR_COAT: "Clear coat",
    TINT: "Tint",
    SHEEN: "Sheen",

    NOISE_SCALE: "Noise scale",
    ALBEDO: "Albedo",
    NORMAL: "Normal",
    METALLIC: "Metallic",
    EMISSION: "Emission",
    ROUGHNESS: "Roughness",

    NO_UNIFORMS: "No dynamic inputs found",
    INERTIA: "Inertia",
    IMPORT_LAYOUT: "Import UI layout",
    CODE_PREVIEW: "Code preview",
    ANCHOR_ELEMENT_ID: "Anchor element",
    ELEMENT_ID: "Element ID",
    UI_COMPONENT: "UI component",
    UI_WRAPPER: "Content wrapper",
    WRAP_CONTENT: "Wrap content",
    WRAPPER_ID: "Wrapper ID",
    WRAPPER_STYLES: "Wrapper styles",
    VALUE: "Value",
    KEY: "Key",

    MASS: "Mass",
    COLLISION_TYPE: "Collision type",
    CENTER: "Center",
    HEIGHT: "Height",
    DIRECTION: "Direction",
    PHYSICS_COLLIDER: "Physics collider",
    RIGID_BODY: "Rigid body",

    SHOW_ON_CB: "Show on content browser",
    ALLOCATING_MESH: "Allocating mesh",
    REGENERATE_NORMALS_AND_TANGENTS: "Regenerate normal and tangents",
    RENDERING: "Rendering",
    CONTRIBUTION: "Contribution",
    CONTRIBUTE_TO_PROBES: "Contribute to probes",
    INDIRECT_LIGHTS: "Indirect lighting",
    DIFFUSE_PROBE_INFLUENCE: "Diffuse probe influence",
    SPECULAR_PROBE_INFLUENCE: "Specular probe influence",
    PIVOT_POINT: "Pivot point",

    PRIMITIVES: "Primitives",
    CONTENT_BROWSER: "Content browser",
    COLOR: "Color",
    MATERIAL_UPDATED: "Material updated",
    CREATION_DATE: "Creation date",
    CHILDREN: "Children",
    FILE_SIZE: "Size (MB)",
    FILE_EXTENSION: "Extension",
    ASSETS_PATH: "Path",
    MORE_INFO: "More info",

    LOADING_MATERIAL: "Loading material",
    ADD_DRAG_DROP: "Add component, mesh, texture or material",
    OPENGL_DOCS: "Learn more",
    TEXTURE_FILTERING: "Texture filtering function",
    TEXTURE_MIN_FILTER: "Minifying",
    TEXTURE_MAG_FILTER: "Magnification",

    NEAREST_MIPMAP_LINEAR: "Nearest mip-map linear",
    LINEAR_MIPMAP_NEAREST: "Linear mip-map nearest",
    LINEAR_MIPMAP_LINEAR: "Linear mip-map linear",
    NEAREST_MIPMAP_NEAREST: "Nearest mip-map nearest",

    NEAREST: "Nearest",
    LINEAR: "Linear",
    TEXTURE_WRAPPING: "Wrapping",
    wrapT: "Vertical",
    wrapS: "Horizontal",
    MIRRORED_REPEAT: "Mirrored repeat",
    REPEAT: "Repeat",
    CLAMP_TO_EDGE: "Clamp to edge",
    CLAMP_TO_BORDER: "Clamp to border",


    ALLOCATING_TEXTURE: "Allocating texture",
    UPDATING_ASSET: "Updating asset",
    FLIP_Y: "Y",
    FLIP_X: "X",
    FLIP_TEXTURE: "Flip texture",
    TEXTURE_FORMAT: "Texture format",
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
    RENDERING_MODE: "Rendering mode",
    ENABLED: "Enabled",
    ORTHO_SIZE: "Ortho. size",
    ORTHO_PROJECTION: "Orthographic projection",
    PROJECTION_SIZE: "Orthographic size",
    FOV: "Field Of View",
    VIEW_PLANES: "View planes",
    VIEW_CLIPPING: "View clipping",
    FAR: "Far",
    NEAR: "Near",
    MY_ENTITY: "My entity",
    NAME: "Name",
    STOP_SIMULATION: "Stop the simulation to change attributes.",

    SCALING_LOCAL: "Scaling (local)",
    RECOMPUTE_PROBES: "Probe re-computation needed",
    RESOLUTION: "Resolution",
    FXAA: "FXAA",
    PHYSICS: "Physics",
    ANTI_ALIASING: "Anti-aliasing",

    PHYSICS_SUB_STEPS: "Simulation sub-steps",
    PHYSICS_SIMULATION_STEP: "Simulation step interval",

    SSR: "SSR (Reflections)",
    AO: "Ambient occlusion",
    STEP_SIZE: "Step size",
    STEPS: "Steps",
    SSGI: "SSGISystem (Global illumination)",
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
    ADD_COMPONENT: "Add component",
    QUERY_KEY: "Query key",
    REMOVE_COMPONENT: "Remove component",
    CAMERA: "Camera",
    DIRECTIONAL_LIGHT: "Directional light",
    MESH: "Mesh",
    POINT_LIGHT: "Point Light",
    TRANSFORMATION: "Transformation",

    KEEP_SAME_SIZE: "Lock viewport size",
    INSTANCED_RENDERING: "Instanced rendering",
    QUAD_SIZE: "Viewport size",
    ALWAYS_FACE_CAMERA: "Always face camera",

    PRIMITIVE: "Primitive",
    UI_LAYOUT: "UI layouts",
    COMPONENT: "Component",


    TEXTURE: "Texture",
    COLLECTION: "Collection",

    SIZE: "Size",
    CREATION: "Creation date",


    ROW_VIEW: "Rows",
    CARD_VIEW: "Cards",


    DELETING_ITEMS: "Deleting items",

    FILE_TYPE: "File type",
    ITEM_NAME: "Name",
    ITEM_TYPE: "Type",
    REGISTRY_ID: "Registry",

    SUCCESSFUL_DELETE: "Items deleted",
    CREATE: "Create",
    OPENING_LEVEL: "Opening level",
    OPENING_FILE: "Opening file",


    SELECT_NONE: "Select none",
    SELECT_INVERT: "Invert selection",
    DELETE: "Delete",

    CUT: "Cut",
    PASTE: "Paste",
    RENAME: "Rename",
    OPEN_WITH_EXPLORER: "Open with explorer",
    FORWARD: "Forward",
    REFRESH: "Refresh",
    REFRESHING: "Refreshing content-browser",
    GO_TO_PARENT: "Go to parent",

    JAVASCRIPT_PACKAGE: "Javascript package",
    JSON_OBJECT: "JSON object",

    ASSETS: "Assets",
    FLAT_SHADED: "Flat shaded",
    OPTIONS: "Options",
    BACK_DIR: "Action: Go back",
    FORWARD_DIR: "Action: Go forward",
    PARENT_DIR: "Action: Go to parent",
    CREATE_FOLDER: "Create folder",
    FILTER_TYPE: "Filter by file type",
    PER_OBJECTS: "Per-object",
    WORLD: "World",

    ABOUT: "About",
    EXIT: "Exit",
    PROJECTION_ENGINE: "Projection Engine",
    FOOTER: "This program comes with absolutely no warranty.",
    MIT: "Under GPL Version 3 license.",
    COPYRIGHT: "Copyright (c) 2022 Projection Engine",

    CODE: "Code",
    MATERIAL: "Material",

    CUBE: "Cube (Embedded)",
    SPHERE: "Sphere (Embedded)",
    PLANE: "Plane (Embedded)",
    CYLINDER: "Cylinder (Embedded)",

    NOTHING: "Nothing found",
    DEFAULT_MATERIAL: "Default material (Embedded)",
    REMOVE_SCRIPT: "Remove script",
    SEARCH: "Search",

    HUE: "Hue",
    SATURATION: "Saturation",

    PREFERENCES: "Preferences",
    SPLIT_TOP: "Split top",
    SPLIT_BOTTOM: "Split bottom",
    SPLIT_RIGHT: "Split right",
    SPLIT_LEFT: "Split left",
    CLOSE_VIEW: "Close view",
    MISC: "Misc",
    DATA: "Data",
    CODE_EDITOR: "Code editor",
    CLOSE: "Close",
    HIERARCHY: "Hierarchy",
    INSPECTOR: "Inspector",
    CONSOLE: "Console",
    IMAGE: "Texture",
    TERRAIN: "terrain"
}
