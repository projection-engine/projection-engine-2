import GPU from "../core/GPU"
import Shader from "../instances/Shader"
import ProjectionEngine from "@lib/ProjectionEngine";
import ENVIRONMENT from "@engine-core/static/ENVIRONMENT";
import AbstractEngineService from "@engine-core/AbstractEngineService";

export default class UberShaderService extends AbstractEngineService {
    static MAX_LIGHTS = 310
    static uberSignature = {}
    static uber?: Shader
    static uberUniforms?: { [key: string]: WebGLUniformLocation }

    async compile(forceCleanShader?: boolean) {
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

        let fragment: string
        if(ProjectionEngine.Engine.getEnvironment() === ENVIRONMENT.DEV){
            fragment = await this.engine.getResourceLoader().prepareShader("UBER-MATERIAL-DEBUG.frag")
        }else{
            fragment = await this.engine.getResourceLoader().prepareShader("UBER-MATERIAL-BASIS.frag")
        }
        fragment = fragment.replace("//--UNIFORMS--", uniformsToLoad.join("\n"))
        fragment = fragment.replace("//--MATERIAL_SELECTION--", methodsToLoad.join("\n"))

        const vertexShader = await this.engine.getResourceLoader().prepareShader("UBER-MATERIAL.vert");
        const shader = new Shader(vertexShader, fragment)
        if (shader.messages.hasError) {

            if (!UberShaderService.uber && !forceCleanShader)
                this.compile(true)
            console.error("Invalid shader", shader.messages)

            return
        }
        if (UberShaderService.uber)
            GPU.context.deleteProgram(UberShaderService.uber.program)

        UberShaderService.uber = shader
        UberShaderService.uberUniforms = shader.uniformMap

    }
}