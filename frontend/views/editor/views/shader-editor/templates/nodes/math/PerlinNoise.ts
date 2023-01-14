import ShaderNode from "../../ShaderNode"
import DATA_TYPES from "../../../../../../../../engine-core/static/DATA_TYPES"
import NODE_TYPES from "../../../libs/material-compiler/templates/NODE_TYPES"
import checkGlslFloat from "../../../utils/check-glsl-float"


export default class PerlinNoise extends ShaderNode {
    amplitude = 1
    frequency = 4
    unitValue = 1920
    persistence = 5
    samples = 25
    constructor() {
        super([
            {
                label: "Seed",
                key: "vec",
                accept: [DATA_TYPES.VEC2, DATA_TYPES.FLOAT],
                type: DATA_TYPES.FLOAT
            },
            {
                label: "Amplitude",
                key: "amplitude",
                type: DATA_TYPES.FLOAT
            },
            {
                label: "unitValue",
                key: "unitValue",
                type: DATA_TYPES.FLOAT
            },
            {
                label: "Frequency",
                key: "frequency",
                type: DATA_TYPES.FLOAT
            },
            {
                label: "Persistence",
                key: "persistence",
                type: DATA_TYPES.FLOAT
            }, {
                label: "Samples",
                max: 50,
                min: 0,
                key: "samples",
                type: DATA_TYPES.INT
            }
        ], [
            {label: "Noise", key: "res", type: DATA_TYPES.FLOAT}
        ])
        this.name = "PerlinNoise"
        
    }

    get type() {
        return NODE_TYPES.FUNCTION
    }



     

    getFunctionCall({vec}, index) {
        let response = []
        if (!this.res && vec) {
            this.res = `res${index}`
            response.push(`float ${this.res} = pNoise(${vec.type === DATA_TYPES.FLOAT ? `vec2(${vec.name}, ${vec.name})` : vec.name}, ${this.samples}, ${checkGlslFloat(this.persistence)}, ${checkGlslFloat(this.frequency)}, ${checkGlslFloat(this.amplitude)}, ${checkGlslFloat(this.unitValue)});`)
        }

        return response.join("\n")
    }

}