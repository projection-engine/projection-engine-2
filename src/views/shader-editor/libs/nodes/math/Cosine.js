import ShaderNode from "../../ShaderNode"
import DATA_TYPES from "../../../../../../public/engine/static/DATA_TYPES"
import NODE_TYPES from "../../material-compiler/templates/NODE_TYPES"


export default class Cosine extends ShaderNode {
    a = 0
    constructor() {
        super([
            {label: "A", key: "a", accept: [DATA_TYPES.FLOAT], type: DATA_TYPES.FLOAT}
        ], [
            {label: "Result", key: "cosRes", type: DATA_TYPES.FLOAT}
        ])
        this.name = "Cosine"
        this.size = 2
    }

    get type() {
        return NODE_TYPES.FUNCTION
    }

    getFunctionCall({a={name: this.a}}, index) {
        this.cosRes = "cosRes" + index

        if(a)
            return `float ${this.cosRes} = cos(${a.name});`
        else
            return `float ${this.cosRes} = 0.;`
    }
}