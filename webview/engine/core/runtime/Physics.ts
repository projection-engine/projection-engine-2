import PhysicsWorld from "../core/PhysicsWorld"
import MetricsController from "../services/MetricsController"
import METRICS_FLAGS from "../static/METRICS_FLAGS"
import EngineState from "../EngineState"
import ProjectionEngine from "@lib/ProjectionEngine";

export default class Physics {
	static #interval = null

	static start() {
		clearInterval(Physics.#interval)
		Physics.#interval = setInterval(Physics.#execute, EngineState.physicsSimulationStep)
	}

	static stop() {
		clearInterval(Physics.#interval)
		Physics.#interval = null
	}

	static #execute() {
		if (ProjectionEngine.Engine.isDev || !PhysicsWorld.ammo)
			return

		const rigidBodies = PhysicsWorld.rigidBodies
		const length = rigidBodies.length
		const tempTransformation = PhysicsWorld.tempTransformation

		PhysicsWorld.world.stepSimulation(EngineState.physicsSimulationStep, EngineState.physicsSubSteps)

		for (let i = 0; i < length; i++) {
			const current = rigidBodies[i]
			const component = current.rigidBodyComponent
			if (!component?.motionState) {
				if (!component)
					PhysicsWorld.removeRigidBody(current)
				continue
			}
			component.motionState.getWorldTransform(tempTransformation)
			const position = tempTransformation.getOrigin()
			const quaternion = tempTransformation.getRotation()

			const t = current.translation
			const q = current.rotationQuaternionFinal

			t[0] = position.x()
			t[1] = position.y()
			t[2] = position.z()

			q[0] = quaternion.x()
			q[1] = quaternion.y()
			q[2] = quaternion.z()
			q[3] = quaternion.w()

			current.__changedBuffer[0] = 1
			MetricsController.currentState = METRICS_FLAGS.PHYSICS
		}
	}
}
