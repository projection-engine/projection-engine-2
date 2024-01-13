<script lang="ts">
    import {onMount} from "svelte"
    import  {InjectVar} from "@lib/Injection";
    import CanvasContextService from "@services/CanvasContextService";
    import RENDER_TARGET from "../../static/RENDER_TARGET";

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