import Engine from "@engine-core/Engine";
import GPU from "@engine-core/GPU";
import IEngineSingleton from "@engine-core/IEngineSingleton";

export default class IEngineSystem extends IEngineSingleton {
    #next: IEngineSystem

    setNext(Next: typeof IEngineSystem): IEngineSystem{
        return this.#next = new Next(this.engine)
    }

    getNext(): IEngineSystem{
        return this.#next
    }

    shouldExecute(): boolean {
        return true;
    }

    execute(gl: WebGL2RenderingContext) {
    }
}