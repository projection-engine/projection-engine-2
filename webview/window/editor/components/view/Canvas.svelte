<script lang="ts">
    import {onMount} from "svelte"
    import Engine from "@engine-core/Engine";
    import VisualsStore from "@lib/stores/VisualsStore";
    import EditorFSUtil from "../../util/EditorFSUtil";
    import EngineTools from "../../../../engine/tools/EngineTools";
    import LevelService from "../../../services/LevelService";
    import UIAPI from "@engine-core/lib/rendering/UIAPI";
    import EngineToolsService from "../../../services/EngineToolsService";
    import GPU from "@engine-core/GPU";
    import ProjectionEngine from "@lib/ProjectionEngine";
    import ViewportInteractionService from "../../views/scene-editor/lib/ViewportInteractionService";

    let canvasRef: HTMLCanvasElement
    export let onReady: VoidFunction

    onMount(() => {
        ProjectionEngine.Engine = new Engine()
        ProjectionEngine.Engine.initialize(
            canvasRef,
            {
                w: ProjectionEngine.VisualsStore.getData().resolutionX,
                h: ProjectionEngine.VisualsStore.getData().resolutionY
            },
            EditorFSUtil.readAsset,
            true,
            async () => {
                await EngineTools.initialize().catch(console.error)
                UIAPI.buildUI(GPU.canvas.parentElement)
                UIAPI.hideUI()
                EngineToolsService.initialize()
                ViewportInteractionService.initialize()
                onReady()
            }
        )
    })

</script>


<div class="stretch">
    <canvas
            class="stretch"
            data-svelteviewport="-"
            bind:this={canvasRef}
    ></canvas>
</div>

<style>

    .stretch {
        width: 100%;
        height: 100%;
        background: transparent;
        position: relative;
        overflow: hidden;
    }
</style>