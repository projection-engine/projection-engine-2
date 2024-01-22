import GPU from "../core/GPU"
import VertexBuffer from "../instances/VertexBuffer"
import Mesh from "../instances/Mesh"
import GPUAPI from "../services/GPUAPI"
import AbstractEngineService from "@engine-core/AbstractEngineService";
import {EmbeddedMeshes} from "@engine-core/engine-d";

export default class StaticMeshRepository extends AbstractEngineService {
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
            StaticMeshRepository.sphere = GPUAPI.allocateMesh(EmbeddedMeshes.SPHERE, SPHERE)
            StaticMeshRepository.cube = GPUAPI.allocateMesh(EmbeddedMeshes.CUBE, CUBE)
            StaticMeshRepository.cylinder = GPUAPI.allocateMesh(EmbeddedMeshes.CYLINDER, CYLINDER)
            StaticMeshRepository.plane = GPUAPI.allocateMesh(EmbeddedMeshes.PLANE, PLANE)
            StaticMeshRepository.quad = new Mesh({...QUAD, id: "QUAD"})
            StaticMeshRepository.cubeBuffer = new VertexBuffer(0, new Float32Array(CUBE_LINEAR), GPU.context.ARRAY_BUFFER, 3, GPU.context.FLOAT, false, undefined, 0)
        } catch (err) {
            console.error(err)
        }
    }

    static drawQuad() {
        const q = StaticMeshRepository.quad
        const last = GPU.activeMesh
        if (last && last !== q)
            last.finish()
        q.bindEssentialResources()
        GPU.context.drawElements(GPU.context.TRIANGLES, q.verticesQuantity, GPU.context.UNSIGNED_INT, 0)
        GPU.activeMesh = q
    }
}