import FILE_TYPES from "shared-resources/FILE_TYPES";

export default function getItemIcon(metadata, childQuantity, type) {
    let icon
    if (type === 0)
        icon = childQuantity === 0 ? "folder_open" : "folder"
    else
        switch (metadata.type) {
            case FILE_TYPES.COMPONENT:
                icon = "code"
                break
            case FILE_TYPES.COLLECTION:
                icon = "inventory_2"
                break
            case FILE_TYPES.LEVEL:
                icon = "forest"
                break
            case FILE_TYPES.UI_LAYOUT:
                icon = "view_quilt"
                break
            case FILE_TYPES.TERRAIN:
                icon = "landscape"
                break
            default:
                icon = undefined
                break
        }


    return icon
}