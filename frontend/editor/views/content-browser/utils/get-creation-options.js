import FilesStore from "../../../stores/FilesStore";
import resolveFileName from "../../../templates/utils/resolve-file-name";
import FILE_TYPES from "shared-resources/FILE_TYPES";
import AssetAPI from "../../../lib/fs/AssetAPI";
import COMPONENT_TEMPLATE from "../../../../../public/engine/static/templates/COMPONENT_TEMPLATE";
import UI_TEMPLATE from "../../../../../public/engine/static/templates/UI_TEMPLATE";
import TERRAIN_TEMPLATE from "../../../../../public/engine/static/templates/TERRAIN_TEMPLATE";
import Localization from "../../../templates/LOCALIZATION_EN";
import NodeFS from "shared-resources/frontend/libs/NodeFS";


export default function getCreationOptions(currentDirectory, materials) {
    async function createFile(name, type, data) {
        let path = await resolveFileName(currentDirectory.id + NodeFS.sep + name, type)
        await AssetAPI.writeAsset(path, typeof data === "object" ? JSON.stringify(data) : data)
        await FilesStore.refreshFiles()
    }

    return [
        {
            label: Localization.FOLDER,
            onClick: () => FilesStore.createFolder(currentDirectory).catch()
        },
        {divider: true},
        {
            label: Localization.JSON_OBJECT,
            onClick: async () => createFile(Localization.JSON, ".json", "")
        },
        {
            label: Localization.JAVASCRIPT_PACKAGE,
            onClick: async () => createFile(Localization.JAVASCRIPT, ".js", "")
        },
        {divider: true},
        {
            label: Localization.LEVEL,
            onClick: async () => createFile(Localization.LEVEL, FILE_TYPES.LEVEL, {entities: []})
        },
        {divider: true},
        {
            label: Localization.MATERIAL,
            onClick: async () => createFile(Localization.MATERIAL, FILE_TYPES.MATERIAL, {})
        },

        {divider: true},
        {
            label: Localization.COMPONENT,

            onClick: async () => createFile(Localization.COMPONENT, FILE_TYPES.COMPONENT, COMPONENT_TEMPLATE)
        },
        {
            label: Localization.UI_LAYOUT,

            onClick: async () => createFile(Localization.UI_LAYOUT, FILE_TYPES.UI_LAYOUT, UI_TEMPLATE)
        },
        {divider: true},

        {
            label: Localization.TERRAIN,
            onClick: async () => createFile(Localization.TERRAIN, FILE_TYPES.TERRAIN, TERRAIN_TEMPLATE)
        },
    ]
}