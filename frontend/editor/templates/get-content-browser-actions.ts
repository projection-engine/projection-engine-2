import selection from "../views/content-browser/utils/selection"
import SELECTION_TYPES from "../views/content-browser/static/SELECTION_TYPES"
import handleDelete from "../views/content-browser/utils/handle-delete"
import FilesStore from "../../shared/stores/FilesStore"
import SelectionStore from "../../shared/stores/SelectionStore"
import importFile from "../utils/import-file"

import getCreationOptions from "../views/content-browser/utils/get-creation-options"
import FSRegistryService from "../services/file-system/FSRegistryService"
import FileSystemService from "../../shared/lib/FileSystemService"
import ToastNotificationSystem from "../../shared/components/alert/ToastNotificationSystem"
import ElectronResources from "../../shared/lib/ElectronResources"
import LocalizationEN from "../../../shared/LocalizationEN"

export default function getContentBrowserActions(settings, navigationHistory, currentDirectory, setCurrentDirectory, setCurrentItem, materials) {

	const hotKeys = {
		BACK: {
			label: "Go back",
			require: settings.contentBrowserHotkeys.BACK,
			callback: () => navigationHistory.undo()
		},
		FORWARD: {
			label: "Go forward",
			require: settings.contentBrowserHotkeys.FORWARD,
			callback: () => navigationHistory.redo()
		},

		SELECT_ALL: {
			label: "Select all",
			require: settings.contentBrowserHotkeys.SELECT_ALL,
			callback: () => selection(SELECTION_TYPES.ALL, currentDirectory)
		},
		SELECT_NONE: {
			label: "Select none",
			require: settings.contentBrowserHotkeys.SELECT_NONE,
			callback: () => selection(SELECTION_TYPES.NONE, currentDirectory)
		},
		INVERT_SELECTION: {
			label: "Invert selection",

			require: settings.contentBrowserHotkeys.INVERT_SELECTION,
			callback: () => selection(SELECTION_TYPES.INVERT, currentDirectory)
		},
		REFRESH: {
			label: "Refresh",
			require: settings.contentBrowserHotkeys.REFRESH,
			callback: () => {
				ToastNotificationSystem.getInstance().success(LocalizationEN.REFRESHING)
				FilesStore.refreshFiles().catch()
			}
		},
		GO_TO_PARENT: {
			label: "Go to parent",
			require: settings.contentBrowserHotkeys.GO_TO_PARENT,
			callback: () => {
				if (currentDirectory.id !== FileSystemService.getInstance().sep) {
					const found = currentDirectory.id
					if (found) {
						const split = found.split(FileSystemService.getInstance().sep)
						split.pop()
						if (split.length === 1)
							setCurrentDirectory({id: FileSystemService.getInstance().sep})
						else
							setCurrentDirectory({id: split.join(FileSystemService.getInstance().sep)})
					}
				}
			}
		},
		RENAME: {
			label: "Rename",
			require: settings.contentBrowserHotkeys.RENAME,
			callback: () => {
				setCurrentItem(SelectionStore.contentBrowserSelected[0])
			},
		},
		DELETE: {
			label: LocalizationEN.DELETE,
			require: settings.contentBrowserHotkeys.DELETE,
			callback: () => {
				const s = [...SelectionStore.contentBrowserSelected]
				if (s.length > 0) {
					SelectionStore.contentBrowserSelected = []
					handleDelete(s, currentDirectory, setCurrentDirectory)
				}
			}
		},
		CUT: {
			label: LocalizationEN.CUT,
			require: settings.contentBrowserHotkeys.CUT,
			callback: () => FilesStore.updateStore({
				...FilesStore.data,
				toCut: [...SelectionStore.contentBrowserSelected]
			})
		},
		PASTE: {
			label: LocalizationEN.PASTE,
			require: settings.contentBrowserHotkeys.PASTE,
			callback: () => FilesStore.paste(currentDirectory.id)
		}
	}

	return {
		hotKeys: Object.values(hotKeys),
		contextMenu: [
			{
				label: LocalizationEN.COPY_ID,
				onClick: () => {
					const ID = FSRegistryService.getByPath(SelectionStore.contentBrowserSelected[0])
					if (ID) {
						ToastNotificationSystem.getInstance().success(LocalizationEN.COPIED)
						ElectronResources.clipboard.writeText(ID)
					}
				}
			},
			{divider: true},
			hotKeys.SELECT_ALL,
			hotKeys.SELECT_NONE,
			hotKeys.INVERT_SELECTION,
			{divider: true},
			hotKeys.BACK,
			hotKeys.FORWARD,
			{divider: true},
			{
				label: LocalizationEN.IMPORT,
				onClick: () => importFile(currentDirectory)
			},
			hotKeys.REFRESH,
			{divider: true},
			hotKeys.RENAME,
			hotKeys.CUT,
			hotKeys.PASTE,
			hotKeys.DELETE,
			{divider: true},
			{
				label: "Open current directory on explorer",
				icon: "open_in_new",
				onClick: () => ElectronResources.shell.showItemInFolder(FileSystemService.getInstance().resolvePath(FileSystemService.getInstance().ASSETS_PATH + FileSystemService.getInstance().sep + currentDirectory.id))

			},
			{divider: true},

			{
				label: "Create",
				icon: "add",
				children: getCreationOptions(currentDirectory)
			}
		]
	}
}