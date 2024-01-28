import Ammo from "../lib/Ammo.js"
import COLLISION_TYPES from "../static/COLLISION_TYPES"
import Entity from "../instances/Entity"
import AbstractEngineCoreService from "@engine-core/core/AbstractEngineCoreService";
import RepositoryService from "@engine-core/services/serialization/RepositoryService";

const COLLISION = "COLLISION",
	DISPATCHER = "DISPATCHER",
	BROAD_PHASE = "BROAD_PHASE",
	SOLVER = "SOLVER",
	GRAVITY = "GRAVITY"


export default class PhysicsWorld extends AbstractEngineCoreService{
	static #gravity: [number, number, number] = [0, 0, 0]
	static ammo?: AmmoJS
	static worldSettings = new Map()
	static world?: btDiscreteDynamicsWorld
	static rigidBodies: Entity [] = []
	static rigidBodiesMap = new Map()
	static tempTransformation?: btTransform

	static async initialize() {
		const ammo = <AmmoJS>await Ammo()
		const wS = PhysicsWorld.worldSettings
		PhysicsWorld.ammo = ammo
		wS.set(COLLISION, new ammo.btDefaultCollisionConfiguration())
		wS.set(DISPATCHER, new ammo.btCollisionDispatcher(wS.get(COLLISION)))
		wS.set(BROAD_PHASE, new ammo.btDbvtBroadphase())
		wS.set(SOLVER, new ammo.btSequentialImpulseConstraintSolver())
		PhysicsWorld.world = <btDiscreteDynamicsWorld>new ammo.btDiscreteDynamicsWorld(
			wS.get(DISPATCHER),
			wS.get(BROAD_PHASE),
			wS.get(SOLVER),
			wS.get(COLLISION)
		)
		PhysicsWorld.gravity = [0, -9.8, 0]
		PhysicsWorld.tempTransformation = <btTransform>new ammo.btTransform()
	}

	static initializeCollider(entity) {
		const ammo = PhysicsWorld.ammo
		const pColliderComponent = entity.physicsColliderComponent

		switch (pColliderComponent.collisionType) {
		case COLLISION_TYPES.BOX: {
			const boxSize = <btVector3>new ammo.btVector3(pColliderComponent.size[0], pColliderComponent.size[1], pColliderComponent.size[2])
			pColliderComponent.shape = <btBoxShape>new ammo.btBoxShape(boxSize)
			pColliderComponent.shape.setMargin(0.05)
			break
		}
		case COLLISION_TYPES.SPHERE:
			pColliderComponent.shape = <btSphereShape>new ammo.btSphereShape(pColliderComponent.radius)
			pColliderComponent.shape.setMargin(0.05)
			break
		case COLLISION_TYPES.CAPSULE:
			// TODO
			break
		default:
			break
		}
		pColliderComponent.initialized = true
	}

	static get gravity(): [number, number, number] {
		return PhysicsWorld.#gravity
	}

	static set gravity(data) {
		PhysicsWorld.#gravity = data
		const ammo = PhysicsWorld.ammo
		PhysicsWorld.world.setGravity(<btVector3>new ammo.btVector3(data[0], data[1], data[2]))
		PhysicsWorld.worldSettings.set(GRAVITY, data)
	}

	static registerRigidBody(entity: Entity) {
		const ammo = PhysicsWorld.ammo
		const rigidBodyComponent = entity.rigidBodyComponent
		const pColliderComponent = entity.physicsColliderComponent

		if (!ammo || !rigidBodyComponent || rigidBodyComponent.motionState || !pColliderComponent) {
			if (PhysicsWorld.rigidBodiesMap.get(entity.id))
				PhysicsWorld.removeRigidBody(entity)
			return
		}

		const t = entity.absoluteTranslation
		const q = entity.rotationQuaternionFinal

		rigidBodyComponent.transform = <btTransform>new ammo.btTransform()
		rigidBodyComponent.transform.setIdentity()
		rigidBodyComponent.transform.setOrigin(<btVector3>new ammo.btVector3(t[0], t[1], t[2]))
		rigidBodyComponent.transform.setRotation(<btQuaternion>new ammo.btQuaternion(q[0], q[1], q[2], q[3]))
		rigidBodyComponent.motionState = <btDefaultMotionState>new ammo.btDefaultMotionState(rigidBodyComponent.transform)

		if (!pColliderComponent.initialized)
			PhysicsWorld.initializeCollider(entity)

		const shape = pColliderComponent.shape
		rigidBodyComponent.inertiaBody = <btVector3>new ammo.btVector3(...rigidBodyComponent.inertia)
		if (rigidBodyComponent.mass > 0)
			shape.calculateLocalInertia(rigidBodyComponent.mass, rigidBodyComponent.inertiaBody)

		const info = <btRigidBodyConstructionInfo>new ammo.btRigidBodyConstructionInfo(
			rigidBodyComponent.mass,
			rigidBodyComponent.motionState,
			shape,
			rigidBodyComponent.inertiaBody
		)
		rigidBodyComponent.body = <btRigidBody>new ammo.btRigidBody(info)
		PhysicsWorld.world.addRigidBody(rigidBodyComponent.body)
		rigidBodyComponent.initialized = true
		PhysicsWorld.rigidBodies.push(entity)
		PhysicsWorld.rigidBodiesMap.set(entity.id, entity)
	}

	static removeRigidBody(entity: Entity) {
		const ammo = PhysicsWorld.ammo
		const rigidBodyComponent = entity.rigidBodyComponent
		if (!ammo || !rigidBodyComponent?.motionState)
			return
		rigidBodyComponent.initialized = false
		PhysicsWorld.world.removeRigidBody(rigidBodyComponent.body)
		PhysicsWorld.rigidBodiesMap.delete(entity.id)
		PhysicsWorld.rigidBodies = PhysicsWorld.rigidBodies.filter(r => r !== entity)
	}

	static initializeTerrainCollision(entity, heightMap, heightScale, dimensions) {
		// const pColliderComponent = entity.components.get(COMPONENTS.PHYSICS_COLLIDER)
		//
		// const {imageData, imageToLoad, canvas} = getImageData(heightMap)
		// const vertexCount = imageToLoad.width
		//
		// const ammo = PhysicsWorld.ammo
		// const terrainData = ammo._malloc(4 * vertexCount ** 2);
		// let p = 0;
		// let p2 = 0;
		// for (let j = 0; j < vertexCount; j++) {
		//     for (let i = 0; i < vertexCount; i++) {
		//         ammo.HEAPF32[terrainData + p2 >> 2] = imageData[i * (canvas.width * 4) + j * 4] * heightScale / 255;
		//         p++;
		//         p2 += 4;
		//     }
		// }
		// const size = imageToLoad.width * dimensions
		// const shape = new ammo.btHeightfieldTerrainShape(
		//     size,
		//     size,
		//     terrainData,
		//     heightScale,
		//     0, // MIN HEIGHT
		//     heightScale, // MAX HEIGHT
		//     1, // UP AXIS
		//     "PHY_FLOAT", // HDT
		//     false // FLIP EDGES
		// );
		//
		// const scaleX = size / ( imageToLoad.width - 1 );
		// const scaleZ = size / ( imageToLoad.width - 1 );
		// shape.setLocalScaling( new ammo.btVector3( scaleX, 1, scaleZ ) );
		// shape.setMargin( 0.05 );
		//
		// pColliderComponent.shape = shape
		// PhysicsWorld.initializeCollider(entity)
	}
}

RepositoryService.serializable(PhysicsWorld)
