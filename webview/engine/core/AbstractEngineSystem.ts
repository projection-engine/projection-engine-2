import AbstractEngineService from "@engine-core/AbstractEngineService";

export default class AbstractEngineSystem extends AbstractEngineService {
    #next: AbstractEngineSystem

    setNext(Next: typeof AbstractEngineSystem): AbstractEngineSystem{
        return this.#next = new Next(this.engine)
    }

    getNext(): AbstractEngineSystem{
        return this.#next
    }

    shouldExecute(): boolean {
        return true;
    }

    execute(gl: WebGL2RenderingContext) {
    }
}