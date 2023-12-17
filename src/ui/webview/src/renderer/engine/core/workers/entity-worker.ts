import WORKER_MESSAGES from "../static/WORKER_MESSAGES"
import TransformationPass from "../runtime/TransformationPass"

export default function entityWorker(event?: MutableObject) {
    if (event != null) {
        const {type, payload} = event
        switch (type) {
            case WORKER_MESSAGES.INITIALIZE:
                TransformationPass.initialize(payload)
                break
            case WORKER_MESSAGES.REGISTER_ENTITY:
                if (TransformationPass.targets.has(payload.id))
                    TransformationPass.targets.delete(payload.id)
                TransformationPass.targets.set(payload.id, payload)
                TransformationPass.updateThreadInfo()
                break
            case WORKER_MESSAGES.REMOVE_ENTITY:
                TransformationPass.targets.delete(payload)
                TransformationPass.updateThreadInfo()
                break
            case WORKER_MESSAGES.REMOVE_ENTITY_BLOCK:

                TransformationPass.targets.removeBlock(payload, data => data.id)
                TransformationPass.updateThreadInfo()
                break

            case WORKER_MESSAGES.ADD_BLOCK:

                TransformationPass.targets.addBlock(payload, data => data.id)
                TransformationPass.updateThreadInfo()
                break
        }
    } else
        TransformationPass.execute()
}