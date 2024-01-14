import ItemDTO from "@lib/dto/fs/ItemDTO";

export default class FileDTO extends ItemDTO{
    _type: string

    constructor(name: string, path: string, type: string) {
        super(name, path)
        this._type = type;
    }

    getType(): string {
        return this._type;
    }
}