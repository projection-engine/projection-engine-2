
export default class WindowInitializer {
	static initialize() {
		document.addEventListener("pointerlockerror", WindowInitializer.#onPointerLockError, false)
		window.onerror = WindowInitializer.#onError
	}

	static #onError(err, source, lineno) {
		console.log("ERROR CAUGHT: ", err, lineno, source)
		return false
	}

	static #onPointerLockError(ev) {
		ev.preventDefault()
		document.exitPointerLock()
	}
}