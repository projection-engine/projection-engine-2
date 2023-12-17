
export default class ImageProcessor {
	static #initialized = false
	static #worker
	static callbacks = []

	static initialize() {
		if (ImageProcessor.#initialized)
			return

		ImageProcessor.#initialized = true

		ImageProcessor.#worker = new Worker("./image-worker.js")
		ImageProcessor.#worker.onmessage = ({data: {data, id}}) => {
			const callback = ImageProcessor.callbacks.find(c => c.id === id)
			if (callback) {
				callback.callback(data)
				ImageProcessor.callbacks = ImageProcessor.callbacks.filter(c => c.id !== id)
			}
		}

	}

	static #doWork(type:string, data:any, callback:Function) {
		const id = crypto.randomUUID()
		ImageProcessor.callbacks.push({
			callback,
			id
		})

		ImageProcessor.#worker.postMessage({data, type, id})
	}

	static async request(type:string, data):Promise<any> {
		return new Promise(resolve => ImageProcessor.#doWork(type, data, (res) => resolve(res)))
	}
}