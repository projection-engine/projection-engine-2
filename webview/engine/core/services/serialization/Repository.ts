import Serializable from "./Serializable";

export default class Repository extends Serializable {
    instanced: Record<string, Serializable> = {}
}