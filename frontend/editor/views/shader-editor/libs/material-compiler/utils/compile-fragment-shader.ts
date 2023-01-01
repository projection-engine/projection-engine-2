import resolveRelationship from "./resolve-relationship";
import TextureSample from "../../../templates/nodes/TextureSample";
import type ShaderNode from "../../../templates/ShaderNode";
import type ShaderLink from "../../../templates/ShaderLink";

export default async function compileFragmentShader(startPoint:ShaderNode, nodes:ShaderNode[], links:ShaderLink[]) {
    const uniforms = [],
        uniformValues = [],
        uniformDeclarations = [],
        typesInstantiated = {},
        constants = []

    let textureOffset = 0
    for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i]
        if (typeof n.getInputInstance === "function" && !typesInstantiated[n.id]) {
            const res = await n.getInputInstance(i, uniforms, uniformValues, textureOffset)
            if(n instanceof TextureSample)
                textureOffset++
            if(res.includes("const "))
                constants.push(res)
            else
                uniformDeclarations.push(res)
            typesInstantiated[n.id] = true
        }
    }

    let body:string[] = []
    resolveRelationship(startPoint, [], links.filter(l => l.targetNode.id !== startPoint.id || l.targetNode.id === startPoint.id), nodes, body)
    return {
        functionDeclaration: constants.join("\n") + "\n" + body.join("\n"),
        uniformsDeclaration: uniformDeclarations.join("\n"),
        uniforms,
        uniformValues
    }

}