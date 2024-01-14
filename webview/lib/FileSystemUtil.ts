import ElectronResources from "./ElectronResources"
import Folders from "@enums/Folders"
import IPCRoutes from "@enums/IPCRoutes"
import EditorFSUtil from "../window/editor/util/EditorFSUtil";
import EditorUtil from "../window/editor/util/EditorUtil";


export default class FileSystemUtil {
    static path?: string
    static TEMP?: string
    static PREVIEW_PATH?: string
    static rootDir = "ROOT"//ElectronResources.os.homedir()
    static ASSETS_PATH?: string
    static sep = "/"//ElectronResources.path.sep


    static async writeFile(pathName: string, data: any, absolute: boolean) {
        try {
            await FileSystemUtil.write(FileSystemUtil.resolvePath(!absolute ? FileSystemUtil.path + pathName : pathName), typeof data === "object" ? JSON.stringify(data) : data)
        } catch (err) {
            console.error(err)
        }
    }

    static readFile(pathName: string, type?: string): Promise<any> {
        return new Promise(resolve => {
            const listenID = crypto.randomUUID()
            // ElectronResources.ipcRenderer.once(IPCRoutes.READ_FILE + listenID, (ev, data) => resolve(data))
            // ElectronResources.ipcRenderer.send(IPCRoutes.READ_FILE, {pathName, type, listenID})
        })
    }


    static async delete(pathName: string) {

    }

    static resolvePath(path: string): string {
        // if (!path)
            return path
        // return ElectronResources.path.resolve(path)
    }

    static async read(path: string, options?: MutableObject | string): Promise<any> {
        return EditorUtil.getCall(IPCRoutes.FS_READ, {path, options}, false)
    }

    static async write(path: string, data: any) {
        return EditorUtil.getCall(IPCRoutes.FS_WRITE, {path, data}, false)
    }

    static async rm(path: string, options?: MutableObject | string) {
        return EditorUtil.getCall(IPCRoutes.FS_RM, {path, options}, false)
    }

    static async mkdir(path: string) {
        return EditorUtil.getCall(IPCRoutes.FS_MKDIR, {path}, false)
    }

    static async stat(path: string, options?: MutableObject | string): Promise<MutableObject> {
        return EditorUtil.getCall(IPCRoutes.FS_STAT, {path, options}, false)
    }

    static exists(path: string): boolean {
        // return ElectronResources.fs.existsSync(ElectronResources.path.resolve(path))
        return false;
    }

    static async readdir(path: string, options?: MutableObject | string): Promise<MutableObject[]> {
        return EditorUtil.getCall<MutableObject[]>(IPCRoutes.FS_READDIR, {path, options}, false)
    }

    static async rename(oldPath: string, newPath: string) {
        return EditorUtil.getCall(IPCRoutes.FS_RENAME, {oldPath, newPath}, false)
    }
}


