<script>
    import {onMount} from "svelte"
    import Engine from "../../../../engine/core/Engine";
    import VisualsStore from "../../../shared/stores/VisualsStore";
    import EditorFSUtil from "../../util/EditorFSUtil";
    import EngineTools from "../../../../engine/tools/EngineTools";
    import LevelService from "../../services/engine/LevelService";
    import UIAPI from "../../../../engine/core/lib/rendering/UIAPI";
    import EngineToolsService from "../../services/EngineToolsService";
    import GPU from "../../../../engine/core/GPU";
    import ProjectionEngine from "../../../../shared/ProjectionEngine";

    let canvasRef

    onMount(() => {
        Engine.initializeContext(
            canvasRef,
            {w: ProjectionEngine.VisualsStore.getData().resolutionX, h: ProjectionEngine.VisualsStore.getData().resolutionY},
            EditorFSUtil.readAsset,
            true
        ).then(async () => {
            console.trace("INITIALIZING CANVAS")
            await EngineTools.initialize().catch(console.error)
            UIAPI.buildUI(GPU.canvas.parentElement)
            UIAPI.hideUI()
            EngineToolsService.get()
        })
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