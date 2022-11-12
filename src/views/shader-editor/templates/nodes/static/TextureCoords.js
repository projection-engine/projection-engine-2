import Node from "../Node"
import DATA_TYPES from "../../../../../../public/engine/static/DATA_TYPES"
import NODE_TYPES from "../../../../../../public/engine/editor-environment/lib/material-compiler/templates/NODE_TYPES"


export default class TextureCoords extends Node {
    texture = {}

    constructor() {
        super([], [
            {label: "Coordinates", key: "texCoords", type: DATA_TYPES.VEC2}
        ])

        this.name = "TextureCoords"
        this.size = 2
    }

    get type() {
        return NODE_TYPES.STATIC
    }
    getFunctionCall() {
        this.texCoords = "texCoords"
        return ""
    }
}