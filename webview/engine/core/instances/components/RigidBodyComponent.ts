import Component from "./Component"
import COMPONENTS from "../../static/Components"
import RepositoryService from "@engine-core/services/serialization/RepositoryService";

export default class RigidBodyComponent extends Component {
	static get componentKey(): string {
		return COMPONENTS.RIGID_BODY
	}
	get componentKey(): string {
		return RigidBodyComponent.componentKey
	}


	mass = 1
	drag = 0
	inertia: [number, number, number] = [0, 0, 0]
	initialized =false

	#motionState?: btDefaultMotionState
	#body?: btRigidBody
	#transform?: btTransform
	#inertia?: btVector3


	get body(): btRigidBody | undefined {
		return this.#body
	}

	set body(data) {
		this.#body = data
	}

	get transform(): btTransform | undefined {
		return this.#transform
	}

	set transform(data) {
		this.#transform = data
	}

	get inertiaBody(): btVector3 | undefined {
		return this.#inertia
	}

	set inertiaBody(data: btVector3) {
		this.#inertia = data
	}

	get motionState(): btDefaultMotionState | undefined {
		return this.#motionState
	}

	set motionState(data) {
		this.#motionState = data
	}
}

RepositoryService.serializable(RigidBodyComponent)
