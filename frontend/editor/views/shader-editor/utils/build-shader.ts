import materialCompiler from "../libs/material-compiler/material-compiler"
import GPU from "../../../../../engine-core/GPU";
import LOCALIZATION_EN from "../../../templates/LOCALIZATION_EN";
import GPUAPI from "../../../../../engine-core/lib/rendering/GPUAPI";
import ConsoleAPI from "../../../../../engine-core/lib/utils/ConsoleAPI";

export default async function buildShader(nodes, links, openFile) {
    const {
        functionDeclaration,
        uniformsDeclaration,
        settings,
        uniformsData
    } = await materialCompiler(nodes.filter(n => !n.isComment), links)

    if (functionDeclaration) {
        if (!GPU.materials.get(openFile.registryID)) {
            ConsoleAPI.warn(LOCALIZATION_EN.NOT_APPLIED)
            return
        }
        GPUAPI.asyncDestroyMaterial(openFile.registryID)
        await GPUAPI.allocateMaterial({
            functionDeclaration,
            uniformsDeclaration,
            uniformsData,
            settings
        }, openFile.registryID)
    } else
        ConsoleAPI.error(LOCALIZATION_EN.ERROR_DURING_COMPILATION)
}