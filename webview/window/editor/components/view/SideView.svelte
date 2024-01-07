<script lang="ts">
    import ResizableBar from "@lib/components/resizable/ResizableBar.svelte"
    import {onDestroy, onMount} from "svelte"
    import ProjectionEngine from "@lib/ProjectionEngine";
    import View from "./View.svelte";
    import {ViewOrientation, ViewPlacement, ViewPlacementMetadata, ViewResizePosition} from "./ViewDefinitions";

    const COMPONENT_ID = crypto.randomUUID()

    export let tabs
    export let placement: ViewPlacement


    let resizePosition: ViewResizePosition
    let orientation: ViewOrientation

    $: {
        resizePosition = ViewPlacementMetadata[placement].resizePosition
        orientation = ViewPlacementMetadata[placement].orientation
    }

    let ref: HTMLElement
    let reducedOpacity = false
    $: orientationNameMin = orientation === ViewOrientation.HORIZONTAL ? "minHeight" : "minWidth"
    $: orientationName = orientation === ViewOrientation.HORIZONTAL ? "height" : "width"
    $: invOrientation = orientation === ViewOrientation.HORIZONTAL ? "width" : "height"

    function onResizeStart(isWindowResize) {
        let obj = {}
        if (!isWindowResize || tabs.length === 0) {
            obj[orientationNameMin] = "unset"
            obj[orientationNameMin.replace("min", "max")] = tabs.length === 0 ? "0px" : "unset"
        } else if (tabs.length > 0) {
            obj[orientationNameMin] = "250px"
            obj[orientationNameMin.replace("min", "max")] = "250px"
        }

        Object.assign(ref.style, obj)
    }

    $: {
        if (tabs.length === 0 && ref) {
            const obj = {}
            obj[orientationNameMin] = "unset"
            obj[orientationNameMin.replace("min", "max")] = "0"
            Object.assign(ref.style, obj)
        }
    }

    onMount(() => ProjectionEngine.EngineStore.addListener(COMPONENT_ID, data => reducedOpacity = data.executingAnimation, ["executingAnimation"]))
    onDestroy(() => ProjectionEngine.EngineStore.removeListener(COMPONENT_ID))
</script>


{#if resizePosition !== ViewResizePosition.BOTTOM && tabs.length > 0 && resizePosition !== ViewResizePosition.LEFT}
    <ResizableBar
            type={orientationName}
            onResizeStart={onResizeStart}
    />
{/if}
<div
        bind:this={ref}
        class="wrapper"
        data-svelteorientation={orientation}
        style={`
            flex-direction: ${orientation === ViewOrientation.HORIZONTAL ? "row" : "column"};
            opacity: ${reducedOpacity ? ".75" : "1"};
            ${orientation}: 250px;
            ${"min-" + orientation}: 35px;
        `}
>
    {#each tabs as view, groupIndex}
        <View {view} index={groupIndex} {placement}/>
        {#if groupIndex < tabs.length - 1 && tabs.length > 1}
            <ResizableBar type={invOrientation}/>
        {/if}
    {/each}
</div>
{#if resizePosition !== ViewResizePosition.TOP && (orientation === ViewOrientation.VERTICAL && tabs.length > 1 || orientation === ViewOrientation.HORIZONTAL && tabs.length > 0) || resizePosition === ViewResizePosition.LEFT && tabs.length > 0}
    <ResizableBar type={orientationName} onResizeStart={onResizeStart}/>
{/if}


<style>
    .wrapper {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 0;
    }
</style>
