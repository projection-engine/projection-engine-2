import IEngineSystem from "@engine-core/IEngineSystem";
import CameraWorker from "@engine-core/workers/camera-worker";
import StaticUBOs from "@engine-core/lib/StaticUBOs";
import GPU from "@engine-core/GPU";
import {vec3, vec4} from "gl-matrix";

export default class CameraSystem extends IEngineSystem {
    execute(gl: WebGL2RenderingContext) {
        CameraWorker.execute()


        if (CameraWorker.camera.hasChangedProjection) {
            const UBO = StaticUBOs.cameraProjectionUBO

            UBO.bind()
            CameraWorker.camera.projectionUBOBuffer[32] = GPU.bufferResolution[0]
            CameraWorker.camera.projectionUBOBuffer[33] = GPU.bufferResolution[1]
            CameraWorker.camera.projectionUBOBuffer[34] = 2.0 / Math.log2(CameraWorker.camera.projectionBuffer[0] + 1)

            UBO.updateBuffer(CameraWorker.camera.projectionUBOBuffer)
            UBO.unbind()
        }

        if (CameraWorker.camera.hasChangedView) {
            const UBO = StaticUBOs.cameraViewUBO
            UBO.bind()
            UBO.updateBuffer(CameraWorker.camera.viewUBOBuffer)
            UBO.unbind()
        }
    }


}