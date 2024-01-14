export default class ItemDTO {
    _name: string
    _path: string
    private _lastModified: string
    private _size: string

    constructor(name: string, path: string, lastModified?: string, size?: string) {
        this._name = name;
        this._path = path;
        this._lastModified = lastModified;
        this._size = size;
    }

    getName(): string {
        return this._name;
    }

    getPath(): string {
        return this._path;
    }

    getLastModified(): string {
        return this._lastModified
    }

    getSize(): string {
        return this._size
    }

    getSizeFormatted(): string {
        let s = parseFloat(this._size);
        if (isNaN(s)) {
            return ""
        }
        if (s < 1) {
            return (s * 1000).toFixed(2) + "kb"
        }
        return s.toFixed(2) + "mb"
    }

    setLastModified(value: string) {
        this._lastModified = value;
    }

    setSize(value: string) {
        this._size = value;
    }
}