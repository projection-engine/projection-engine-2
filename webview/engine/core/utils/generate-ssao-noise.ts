export default function generateSsaoNoise(width: number, height: number) {
    const KERNEL_SIZE = 64
    const kernels = new Float32Array(new ArrayBuffer(KERNEL_SIZE * 4 * 4))
    let offset = 0
    for (let i = 0; i < KERNEL_SIZE; i++) {
        const scale = i / KERNEL_SIZE
        const m = .1 + .9 * (scale ** 2)

        const v = new Float32Array(12)
        v[0] = (2.0 * Math.random() - 1.0)
        v[1] = (2.0 * Math.random() - 1.0)
        v[2] = Math.random()

        const x = v[0]
        const y = v[1]
        const z = v[2]
        let len = x * x + y * y + z * z
        if (len > 0)
            len = 1 / Math.sqrt(len)

        kernels[offset] = v[0] * len * m
        kernels[offset + 1] = v[1] * len * m
        kernels[offset + 2] = v[2] * len * m
        kernels[offset + 3] = 0
        offset += 4
    }

    const p = width * height
    const noiseTextureData = new Float32Array(p * 3)

    for (let i = 0; i < p; ++i) {
        const index = i * 2
        noiseTextureData[index] = Math.random() * 2.0 - 1.0
        noiseTextureData[index + 1] = Math.random() * 2.0 - 1.0
        noiseTextureData[index + 2] = 0
    }

    return {
        noise: noiseTextureData,
        kernels
    }
}