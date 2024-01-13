<script lang="ts">
    import ResizableBar from "@lib/components/resizable/ResizableBar.svelte"
    import {onDestroy, onMount} from "svelte"
    import ProjectionEngine from "@lib/ProjectionEngine";
    import View from "./View.svelte";
    import {ViewOrientation, ViewPlacement, ViewPlacementMetadata, ViewResizePosition} from "./ViewDefinitions";
    import {InjectVar} from "@lib/Injection";
    import SettingsStore from "@lib/stores/SettingsStore";
    import EngineStore from "@lib/stores/EngineStore";

    export let tabs
    export let placement: ViewPlacement
    let reducedOpacity = false

    const unsubEngine = InjectVar(EngineStore).subscribe(data => {
        reducedOpacity = data.executingAnimation
    }, ["executingAnimation"])

    let resizePosition: ViewResizePosition
    let orientation: ViewOrientation

    $: {
        resizePosition = ViewPlacementMetadata[placement].resizePosition
        orientation = ViewPlacementMetadata[placement].orientation
    }

    let ref: HTMLElement
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


    onDestroy(unsubEngine)
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
