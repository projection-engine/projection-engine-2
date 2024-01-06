import ProjectionEngine from "../../ProjectionEngine";

export default class TabsStoreUtil {
	static updateByAttributes(direction:"left"|"right"|"top"|"bottom"|"viewport", group:number, value:number) {
		ProjectionEngine.ChangesTrackerStore.updateStore({changed: true})
		const settingsData = ProjectionEngine.SettingsStore.getData()
		const clone = {...ProjectionEngine.TabsStore.getData()}
		if (!clone[settingsData.currentView])
			clone[settingsData.currentView] = {}

		if (group !== undefined) {
			if (!clone[settingsData.currentView][direction])
				clone[settingsData.currentView][direction] = {}
			clone[settingsData.currentView][direction][group] = value
		} else
			clone[settingsData.currentView][direction] = value

		ProjectionEngine.TabsStore.updateStore(clone)
	}


	static getFocusedTab() {
		return ProjectionEngine.TabsStore.getData().focused
	}

	static setFocusedTab(data) {
		ProjectionEngine.TabsStore.updateStore({focused: data})
	}

	static getCurrentTabByCurrentView(direction:"left"|"right"|"top"|"bottom"|"viewport", group?: number): number {
		let value
		const settingsData =ProjectionEngine.SettingsStore.getData()
		const tabsData =ProjectionEngine.TabsStore.getData()
		if (group !== undefined)
			value = tabsData[settingsData.currentView]?.[direction]?.[group]
		else
			value = tabsData[settingsData.currentView]?.[direction]
		return value === undefined ? 0 : value
	}
}
