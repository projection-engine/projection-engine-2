import ShaderNode from "../../ShaderNode"
import DATA_TYPES from "../../../../../../../public/engine/static/DATA_TYPES"
import NODE_TYPES from "../../material-compiler/templates/NODE_TYPES"


export default class Saturate extends ShaderNode {
    a = 0
    constructor() {
        super([
            {label: "In", key: "a", accept: [DATA_TYPES.FLOAT], type: DATA_TYPES.FLOAT}
        ], [
            {label: "Result", key: "saturateRes", type: DATA_TYPES.FLOAT}
        ])
        this.name = "Saturate"
        this.size = 2
    }

    get type() {
        return NODE_TYPES.FUNCTION
    }

    getFunctionCall({a={name: this.a}}, index) {
        this.saturateRes = "saturateRes" + index
        if(a)
            return `float ${this.saturateRes} = clamp(${a.name}, 0., 1.);`
        return `float ${this.saturateRes} = 0.;`
    }

}