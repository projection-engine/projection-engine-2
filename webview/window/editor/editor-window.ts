import Editor from "./Editor.svelte"
import WindowInitializer from "../shared/WindowInitializer"
import ProjectionEngine from "../../shared/ProjectionEngine";

ProjectionEngine.createContext()
WindowInitializer.initialize()

new Editor({
	target: document.body
})
