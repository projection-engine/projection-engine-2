import GPU from "../core/GPU"
import DEBUG_FRAG from "../shaders/uber-shader/UBER-MATERIAL-DEBUG.frag"
import BASIS_FRAG from "../shaders/uber-shader/UBER-MATERIAL-BASIS.frag"
import VERTEX_SHADER from "../shaders/uber-shader/UBER-MATERIAL.vert"
import Shader from "../instances/Shader"
import ProjectionEngine from "@lib/ProjectionEngine";
import ENVIRONMENT from "@engine-core/static/ENVIRONMENT";

export default class UberShaderService {

    static get MAX_LIGHTS() {
        return 310
    }

    static #uberSignature = {}
    static get uberSignature() {
        return UberShaderService.#uberSignature
    }

    static uber?: Shader
    static uberUniforms?: { [key: string]: WebGLUniformLocation }

    static compile(forceCleanShader?: boolean) {
        UberShaderService.uber = undefined
        const methodsToLoad = [
            `
            if(isDecalPass){ 
                if(useAlbedoDecal)
                    albedo = texture(sampler1, texCoords).rgb;
                else
                    albedo = vec3(1., 0., 0.);
                if(useMetallicDecal)
                    metallic = texture(sampler2, texCoords).r;
                if(useRoughnessDecal)
                    roughness = texture(sampler3, texCoords).r;
                if(useNormalDecal){
                    computeTBN();
                    N = normalize(TBN * ((texture(sampler4, texCoords).rgb * 2.0)- 1.0));
                }
                else
                    N = normalVec;
                if(useOcclusionDecal)
                    naturalAO = texture(sampler5, texCoords).r;
                
            }
            else
                switch (materialID) {
            `
        ], uniformsToLoad = []
        if (!forceCleanShader)
            GPU.materials.forEach(mat => {
                const declaration = [`case ${mat.bindID}: {`, mat.functionDeclaration, "break;", "}", ""]
                methodsToLoad.push(declaration.join("\n"))
                uniformsToLoad.push(mat.uniformsDeclaration)
            })
        methodsToLoad.push(`
            default:
                N = normalVec;
                break;
            }
        `)

        let fragment = ProjectionEngine.Engine.getEnvironment() === ENVIRONMENT.DEV ? DEBUG_FRAG : BASIS_FRAG
        fragment = fragment.replace("//--UNIFORMS--", uniformsToLoad.join("\n"))
        fragment = fragment.replace("//--MATERIAL_SELECTION--", methodsToLoad.join("\n"))

        const shader = new Shader(VERTEX_SHADER, fragment)
        if (shader.messages.hasError) {

            if (!UberShaderService.uber && !forceCleanShader)
                UberShaderService.compile(true)
            console.error("Invalid shader", shader.messages)

            return
        }
        if (UberShaderService.uber)
            GPU.context.deleteProgram(UberShaderService.uber.program)

        UberShaderService.uber = shader
        UberShaderService.uberUniforms = shader.uniformMap

    }
}