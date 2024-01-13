<script lang="ts">
    import {onMount} from "svelte"
    import Engine from "@engine-core/Engine";
    import VisualsStore from "@lib/stores/VisualsStore";
    import EditorFSUtil from "../../util/EditorFSUtil";
    import EngineTools from "../../../../engine/tools/EngineTools";
    import UIAPI from "@engine-core/lib/rendering/UIAPI";
    import EngineToolsService from "@services/EngineToolsService";
    import GPU from "@engine-core/GPU";
    import  {InjectVar} from "@lib/Injection";
    import ViewportInteractionService from "../../views/scene-editor/lib/ViewportInteractionService";
    import CanvasContextService from "@services/CanvasContextService";
    import RENDER_TARGET from "../../static/RENDER_TARGET";

    let canvasRef: HTMLCanvasElement
    export let onReady: VoidFunction

    const canvasContextService = InjectVar(CanvasContextService)

    onMount(() => {
        canvasContextService.createCanvas().then(onReady)
    })

</script>


<div class="stretch">
    <canvas
            id={RENDER_TARGET}
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