import AbstractEngineSystem from "@engine-core/AbstractEngineSystem";
import ProjectionEngine from "@lib/ProjectionEngine";

export default class ScriptingSystem extends AbstractEngineSystem {
    execute(gl: WebGL2RenderingContext) {
        if (ProjectionEngine.Engine.isDev)
            return
        const scripts = this.scripting.getScripts()
        const size = scripts.length
        if (size === 0)
            return
        for (let i = 0; i < size; i++) {
            try {
                scripts[i].execute()
            } catch (err) {
                console.error(err)
            }
        }
    }
}