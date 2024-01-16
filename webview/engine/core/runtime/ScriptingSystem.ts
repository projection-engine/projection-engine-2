import IEngineSystem from "@engine-core/IEngineSystem";
import ProjectionEngine from "@lib/ProjectionEngine";
import ScriptsAPI from "@engine-core/lib/utils/ScriptsAPI";
import MetricsController from "@engine-core/lib/utils/MetricsController";
import METRICS_FLAGS from "@engine-core/static/METRICS_FLAGS";

export default class ScriptingSystem extends IEngineSystem{
    execute(gl: WebGL2RenderingContext) {
        if (ProjectionEngine.Engine.isDev)
            return
        const scripts = ScriptsAPI.mountedScripts
        const size = scripts.length
        if (size === 0)
            return
        for (let i = 0; i < size; i++) {
            try {
                const script = scripts[i]
                if (script.onUpdate)
                    script.onUpdate()
            } catch (err) {
                console.error(err)
            }
        }
        MetricsController.currentState = METRICS_FLAGS.SCRIPT
    }
}