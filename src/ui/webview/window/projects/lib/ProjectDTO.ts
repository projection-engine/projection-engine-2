export default class ProjectDTO {
    private readonly name: string;
    private readonly path: string;

    constructor(name: string, path: string) {
        this.name = name
        this.path = path
    }

    getName(): string {
        return this.name;
    }

    getPath(): string {
        return this.path;
    }

    static of(data: MutableObject) {
        return new ProjectDTO(data.name, data.path)
    }
}