import TEXTURE_TEMPLATE from "../../../../engine/static/TEXTURE_TEMPLATE";
import readTypedFile from "../../../utils/read-typed-file";
import ProjectMap from "../../ProjectMap";
import FILE_TYPES from "shared-resources/FILE_TYPES";


const path = require("path"), fs = require("fs"), sharp = require("sharp")

export default async function buildImage(resourceRoot, image, fileID) {
    let base64
    if (image.uri.includes("data:image"))
        base64 = image.uri
    else
        base64 = `data:image/${image.uri.split(".").pop()};base64,` + await readTypedFile(resourceRoot + path.sep + image.uri, "base64")

    const pathToPreview = path.resolve(ProjectMap.pathToPreviews + path.sep + fileID + FILE_TYPES.PREVIEW)
    const bufferPreview = await sharp(Buffer.from(base64.split(";base64,").pop(), "base64")).resize(256, 256).png().toBuffer()
    await fs.promises.writeFile(pathToPreview, `data:image/png;base64,` + bufferPreview.toString("base64"))

    return {
        ...TEXTURE_TEMPLATE,
        base64
    }
}
