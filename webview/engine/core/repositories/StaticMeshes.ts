import GPUService from "../services/GPUService"
import VertexBuffer from "../instances/VertexBuffer"

import Mesh from "../instances/Mesh"
import GPUAPI from "../services/GPUAPI"
import EmbeddedMeshes from "../static/EmbeddedMeshes"
import AbstractEngineService from "@engine-core/AbstractEngineService";

export default class StaticMeshes extends AbstractEngineService {
    static quad?: Mesh
    static sphere?: Mesh
    static cube?: Mesh
    static cylinder?: Mesh
    static plane?: Mesh
    static cubeBuffer?: VertexBuffer

    async initialize() {
        try {
            const res = await fetch("./STATIC_MESHES.json")
            const {QUAD, SPHERE, CUBE, CYLINDER, PLANE, CUBE_LINEAR} = await res.json()
            StaticMeshes.sphere = GPUAPI.allocateMesh(EmbeddedMeshes.SPHERE, SPHERE)
            StaticMeshes.cube = GPUAPI.allocateMesh(EmbeddedMeshes.CUBE, CUBE)
            StaticMeshes.cylinder = GPUAPI.allocateMesh(EmbeddedMeshes.CYLINDER, CYLINDER)
            StaticMeshes.plane = GPUAPI.allocateMesh(EmbeddedMeshes.PLANE, PLANE)
            StaticMeshes.quad = new Mesh({...QUAD, id: "QUAD"})
            StaticMeshes.cubeBuffer = new VertexBuffer(0, new Float32Array(CUBE_LINEAR), GPUService.context.ARRAY_BUFFER, 3, GPUService.context.FLOAT, false, undefined, 0)
        } catch (err) {
            console.error(err)
        }
    }

    static drawQuad() {
        const q = StaticMeshes.quad
        const last = GPUService.activeMesh
        if (last && last !== q)
            last.finish()
        q.bindEssentialResources()
        GPUService.context.drawElements(GPUService.context.TRIANGLES, q.verticesQuantity, GPUService.context.UNSIGNED_INT, 0)
        GPUService.activeMesh = q
    }
}