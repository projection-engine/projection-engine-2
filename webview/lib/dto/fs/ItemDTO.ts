export default class ItemDTO {
    _name: string
    _path: string

    constructor(name: string, path: string) {
        this._name = name;
        this._path = path;
    }

    getName(): string {
        return this._name;
    }

    getPath(): string {
        return this._path;
    }
}