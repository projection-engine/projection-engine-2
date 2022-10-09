import PROJECT_FOLDER_STRUCTURE from "shared-resources/PROJECT_FOLDER_STRUCTURE";

const fs = require("fs")
const pathRequire = require("path")

export default async function parseContentBrowserData(p, registryData, projectPath) {
    if (typeof p !== "string")
        return
    const assetsPath = projectPath + pathRequire.sep + PROJECT_FOLDER_STRUCTURE.ASSETS
    return new Promise(resolve => {
        fs.lstat(p, (e, stat) => {
            if (!e) {
                const split = p.split(pathRequire.sep)
                let parent = [...split]
                parent.pop()

                parent = parent.join(pathRequire.sep).replace(assetsPath, "")
                const currentPath = p.replace(assetsPath, "")

                if (stat.isDirectory())
                    resolve({
                        isFolder: true,
                        name: [...split].pop(),
                        creationDate: new Date(stat.birthtime).toDateString(),
                        id: currentPath,

                        parent: split[split.length - 2] === "assets" ? undefined : parent
                    })
                else {

                    const parsedPath = pathRequire.resolve(assetsPath + currentPath).replace(assetsPath + pathRequire.sep, "")

                    resolve({
                        isFolder: false,
                        name: [...split].pop().split(/\.([a-zA-Z0-9]+)$/)[0],
                        type: p.split(".").pop(),
                        fileType: "." + p.split(".").pop(),
                        creationDate: new Date(stat.birthtime).toDateString(),
                        id: currentPath,
                        size: stat.size,
                        registryID: registryData.find(reg => reg.path === parsedPath || reg.path === currentPath)?.id,
                        parent: split[split.length - 2] === "assets" ? undefined : parent
                    })
                }
            }
        })
    })
}