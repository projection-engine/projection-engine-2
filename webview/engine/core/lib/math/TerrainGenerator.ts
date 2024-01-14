export default class TerrainGenerator {
    static generate(base64, scale, dimensions) {
        return new Promise(resolve => {
            // TODO - REIMPLEMENT WITH CALL TO C++
            // TerrainGenerator.#worker.postMessage({base64, scale, dimensions})
            // TerrainGenerator.#worker.onmessage = ({data}) => resolve(data)
        })
    }
}