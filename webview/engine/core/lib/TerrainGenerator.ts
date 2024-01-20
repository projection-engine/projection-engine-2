import getImageData from "@engine-core/utils/get-image-data";
import PrimitiveProcessor from "@engine-core/lib/PrimitiveProcessor";

export default class TerrainGenerator {
    static sampleTexture(x, y, buffer, heightScale, canvasSize) {
        const r = buffer[y * (canvasSize * 4) + x * 4]
        const height = (r / 255)
        return height * heightScale
    }

    static async buildTerrain(base64, scale, dimension) {
        // @ts-ignore
        const {imageToLoad, imageData, canvas} = getImageData(base64)
        const vertexCount = imageToLoad.width
        const count = vertexCount ** 2

        let vertices = new Float32Array(count * 3),
            uvs = new Float32Array(count * 2),
            indices = new Float32Array(6 * (vertexCount - 1) * vertexCount),
            vertexPointer = 0

        const OFFSET = dimension / 2

        for (let i = 0; i < vertexCount; i++) {
            for (let j = 0; j < vertexCount; j++) {
                vertices[vertexPointer * 3] = (j / (vertexCount - 1)) * dimension - OFFSET
                vertices[vertexPointer * 3 + 1] = TerrainGenerator.sampleTexture(j, i, imageData, scale, canvas.width)
                vertices[vertexPointer * 3 + 2] = (i / (vertexCount - 1)) * dimension - OFFSET

                uvs[vertexPointer * 2] = j / (vertexCount - 1)
                uvs[vertexPointer * 2 + 1] = i / (vertexCount - 1)
                vertexPointer++
            }
        }


        let pointer = 0
        for (let gz = 0; gz < vertexCount - 1; gz++) {
            for (let gx = 0; gx < vertexCount - 1; gx++) {
                const topLeft = (gz * vertexCount) + gx,
                    topRight = topLeft + 1,
                    bottomLeft = ((gz + 1) * vertexCount) + gx,
                    bottomRight = bottomLeft + 1


                indices[pointer++] = topLeft
                indices[pointer++] = bottomLeft
                indices[pointer++] = topRight
                indices[pointer++] = topRight
                indices[pointer++] = bottomLeft
                indices[pointer++] = bottomRight
            }
        }
        const normal = PrimitiveProcessor.computeNormals(indices, vertices)
        const tangents = PrimitiveProcessor.computeTangents(indices, vertices, uvs, normal)

        const builtNormals = Float32Array.from(normal)
        const builtTangents = Float32Array.from(tangents)

        return {
            vertices,
            uvs,
            normals: builtNormals,
            indices,
            tangents: builtTangents
        }
    }
}