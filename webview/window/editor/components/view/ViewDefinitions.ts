import ViewTabDTO from "./ViewTabDTO";
import LocalizationEN from "@enums/LocalizationEN";

enum ViewType {
    EDITOR = "EDITOR",
    UI = "UI",
    HIERARCHY = "HIERARCHY",
    INSPECTOR = "INSPECTOR",
    FILES = "CONTENT_BROWSER",
    SHADER_EDITOR = "SHADER_EDITOR",
    CONSOLE = "CONSOLE",
    METRICS = "METRICS"
}

const ViewTypeMetadata = Object.seal({
    [ViewType.EDITOR]: {
        icon: "public",
        label: LocalizationEN.EDITOR
    },
    [ViewType.UI]: {
        icon: "widgets",
        label: LocalizationEN.UI
    },
    [ViewType.HIERARCHY]: {
        icon: "account_tree",
        label: LocalizationEN.HIERARCHY

    },
    [ViewType.INSPECTOR]: {
        icon: "category",
        label: LocalizationEN.INSPECTOR
    },
    [ViewType.FILES]: {
        icon: "folder",
        label: LocalizationEN.FILE_BROWSER
    },
    [ViewType.SHADER_EDITOR]: {
        icon: "texture",
        label: LocalizationEN.SHADER_EDITOR
    },
    [ViewType.CONSOLE]: {
        icon: "terminal",
        label: LocalizationEN.CONSOLE
    },
    [ViewType.METRICS]: {
        icon: "bar_chart",
        label: LocalizationEN.METRICS
    }
})

enum ViewPlacement {
    CENTER,
    LEFT,
    RIGHT,
    BOTTOM
}

enum ViewOrientation {
    VERTICAL,
    HORIZONTAL
}

enum ViewResizePosition {
    TOP,
    LEFT,
    BOTTOM,
    RIGHT
}

const ViewPlacementMetadata = Object.seal({
    [ViewPlacement.BOTTOM]: {
        orientation: ViewOrientation.HORIZONTAL,
        resizePosition: ViewResizePosition.TOP
    },
    [ViewPlacement.LEFT]: {
        orientation: ViewOrientation.VERTICAL,
        resizePosition: ViewResizePosition.RIGHT
    },
    [ViewPlacement.RIGHT]: {
        orientation: ViewOrientation.VERTICAL,
        resizePosition: ViewResizePosition.TOP
    }
})
const ViewContextPath = "ViewContextPath"

export {ViewType, ViewPlacement, ViewPlacementMetadata, ViewOrientation, ViewResizePosition, ViewTypeMetadata, ViewContextPath}