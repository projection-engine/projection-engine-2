import RegistryAPI from "./RegistryAPI"
import FS from "../../../shared/lib/FS/FS"
import ElectronResources from "../../../shared/lib/ElectronResources"
import FileTypes from "../../../../contants/FileTypes";


function mapAsset(reg, type) {
	return reg.map(i => new Promise(resolve => {
		const split = i.path.split(FS.sep)
		resolve({
			type,
			registryID: i.id,
			name: split[split.length - 1].split(".")[0]
		})
	}))
}

export default class ContentBrowserAPI {

	static async rename(from, to) {
		const fromResolved = ElectronResources.path.resolve(from)
		const toResolved = ElectronResources.path.resolve(to)
		await RegistryAPI.readRegistry()
		try {
			const stat = await FS.stat(fromResolved)
			if (stat !== undefined && stat.isDirectory) {
				await FS.mkdir(toResolved)
				const res = await FS.readdir(fromResolved)
				if (!res) return
				for (let i = 0; i< res.length; i++) {
					const file = res[i]
					const oldPath = fromResolved + FS.sep + `${file}`
					const newPath = toResolved + FS.sep + `${file}`
					if ((await FS.stat(oldPath)).isDirectory)
						await FS.rename(oldPath, newPath)
					else {
						await FS.rename(oldPath, newPath)
						await RegistryAPI.updateRegistry(oldPath, newPath)
					}
				}
				await FS.rm(fromResolved, {recursive: true, force: true})
				return
			}

			if (stat !== undefined) {
				await FS.rename(fromResolved, toResolved)
				await RegistryAPI.updateRegistry(fromResolved, toResolved)
				return
			}

		} catch (error) {
			console.error(error)
		}
	}



	static async refresh() {
		const reg = await RegistryAPI.readRegistry()
		const textureReg = reg.filter(r => r.path && r.path.includes(FileTypes.TEXTURE)),
			meshesReg = reg.filter(r => r.path && r.path.includes(FileTypes.PRIMITIVE)),
			materialsReg = reg.filter(r => r.path && r.path.includes(FileTypes.MATERIAL)),
			componentsReg = reg.filter(r => r.path && r.path.includes(FileTypes.COMPONENT)),
			levelsReg = reg.filter(r => r.path && r.path.includes(FileTypes.LEVEL)),
			uiReg = reg.filter(r => r.path && r.path.includes(FileTypes.UI_LAYOUT)),
			collections = reg.filter(r => r.path && r.path.includes(FileTypes.COLLECTION)),
			promises = []

		promises.push(...mapAsset(textureReg, FileTypes.TEXTURE))
		promises.push(...mapAsset(meshesReg, FileTypes.PRIMITIVE))
		promises.push(...mapAsset(materialsReg, FileTypes.MATERIAL))
		promises.push(...mapAsset(componentsReg, FileTypes.COMPONENT))
		promises.push(...mapAsset(levelsReg, FileTypes.LEVEL))
		promises.push(...mapAsset(uiReg, FileTypes.UI_LAYOUT))
		promises.push(...mapAsset(collections, FileTypes.COLLECTION))

		const loadedPromises = await Promise.all(promises)
		const result = {
			textures: [],
			meshes: [],
			materials: [],
			components: [],
			terrains: [],
			levels: [],
			uiLayouts: [],
			materialInstances: [],
			terrainMaterials: [],
			collections: []
		}

		for (let i = 0; i < loadedPromises.length; i++) {
			const current = loadedPromises[i]
			switch (current.type) {
			case FileTypes.TEXTURE:
				result.textures.push(current)
				break
			case FileTypes.PRIMITIVE:
				result.meshes.push(current)
				break
			case FileTypes.MATERIAL:
				result.materials.push(current)
				break
			case FileTypes.COMPONENT:
				result.components.push(current)
				break
			case FileTypes.LEVEL:
				result.levels.push(current)
				break
			case FileTypes.UI_LAYOUT:
				result.uiLayouts.push(current)
				break
			case FileTypes.COLLECTION:
				result.collections.push(current)
				break
			default:
				break
			}
		}

		return result
	}


}