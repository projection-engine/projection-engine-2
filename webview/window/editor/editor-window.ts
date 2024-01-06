import Editor from "./Editor.svelte"
import WindowInitializer from "../shared/WindowInitializer"
import ProjectionEngine from "../ProjectionEngine";

ProjectionEngine.createContext()
WindowInitializer.initialize()

new Editor({
	target: document.body
})
