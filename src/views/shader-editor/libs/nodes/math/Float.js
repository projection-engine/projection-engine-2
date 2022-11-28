import ShaderNode from "../../ShaderNode"
import DATA_TYPES from "../../../../../../public/engine/static/DATA_TYPES"
import NODE_TYPES from "../../material-compiler/templates/NODE_TYPES"
import checkGlslFloat from "../../../utils/check-glsl-float"


export default class Float extends ShaderNode {
    v = 0
    uniform = false

    constructor() {
        super([
            {
                label: "Dynamic",
                key: "uniform",
                type: DATA_TYPES.CHECKBOX,
            },
            {label: "Value", key: "v", type: DATA_TYPES.FLOAT},
        ], [
            {label: "Value", key: "FLOAT_VAR", type: DATA_TYPES.FLOAT},
        ])

        this.name = "Float"
        this.size = 2
    }

    get type() {
        return NODE_TYPES.STATIC
    }

    async getInputInstance(index, uniforms, uniformValues) {
        if (this.uniform) {
            uniformValues.push({
                label: this.name,
                key: this.uniformName,
                type: DATA_TYPES.FLOAT,
                data: this.v
            })
            uniforms.push({
                label: this.name,
                key: this.uniformName,
                type: DATA_TYPES.FLOAT
            })

            return `uniform float ${this.uniformName};`
        }
        return `const float ${this.uniformName}  = ${checkGlslFloat(this.v)};`
    }

    getFunctionCall() {
        this.FLOAT_VAR = this.uniformName
        return ""
    }
}