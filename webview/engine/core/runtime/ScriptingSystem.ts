import AbstractEngineSystem from "@engine-core/AbstractEngineSystem";
import ProjectionEngine from "@lib/ProjectionEngine";
import Scripting from "@engine-core/core/Scripting";
import MetricsController from "@engine-core/services/MetricsController";
import METRICS_FLAGS from "@engine-core/static/METRICS_FLAGS";

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