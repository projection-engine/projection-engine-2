import VIEWPORT_TABS from "../../../static/VIEWPORT_TABS.json";
import Engine from "../../../../../engine-core/Engine";
import CameraTracker from "../../../../../engine-tools/lib/CameraTracker";


export default function updateViewport(engine, currentView) {
    if (!engine.isReady || engine.focusedCamera)
        return
    if (currentView === VIEWPORT_TABS.EDITOR) {
        Engine.start()
        if (Engine.isDev)
            CameraTracker.startTracking()
        gpu.canvas.style.opacity = "1"
    } else {
        CameraTracker.stopTracking()
        Engine.stop()
        gpu.canvas.style.opacity = "0"
    }
}