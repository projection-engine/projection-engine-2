import Editor from "./Editor.svelte"
import WindowInitializer from "@lib/WindowInitializer"
import ProjectionEngine from "@lib/ProjectionEngine";

ProjectionEngine.createContext()
WindowInitializer.initialize()

new Editor({
	target: document.body
})
