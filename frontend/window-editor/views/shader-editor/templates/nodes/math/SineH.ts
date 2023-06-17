import ShaderNode from "../../ShaderNode"
import DATA_TYPES from "../../../../../../../engine-core/static/DATA_TYPES"
import NODE_TYPES from "../../../libs/material-compiler/templates/NODE_TYPES"
import Signature from "../../Signature"


export default class SineH extends ShaderNode implements Signature{
	static signature = "SineH"
	getSignature():string{
		return SineH.signature
	}
	a = 0
	constructor() {
		super([
			{label: "A", key: "a", accept: [DATA_TYPES.FLOAT], type: DATA_TYPES.FLOAT}
		], [
			{label: "Result", key: "sineHRes", type: DATA_TYPES.FLOAT}
		])
		this.name = "SineH"
        
	}

	get type() {
		return NODE_TYPES.FUNCTION
	}

	getFunctionCall({a={name: this.a}}, index) {
		this.sineHRes = "sineHRes" + index
		if(a)
			return `float ${this.sineHRes} = sinh(${a.name});`
		return `float ${this.sineHRes} = 0.;`
	}
}