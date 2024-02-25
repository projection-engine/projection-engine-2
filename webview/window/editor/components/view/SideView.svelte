<script lang="ts">
    import ResizableBar from "@lib/components/resizable/ResizableBar.svelte";
    import {onDestroy} from "svelte";
    import View from "./View.svelte";
    import {
        ViewOrientation,
        ViewPlacement,
        ViewPlacementMetadata,
        ViewResizePosition,
        ViewType
    } from "./ViewDefinitions";
    import {InjectVar} from "@lib/Injection";
    import SettingsStore from "@lib/stores/SettingsStore";

    export let tabs: ViewType[];
    export let placement: ViewPlacement;
    let reducedOpacity = false;

    const unsubSettings = InjectVar(SettingsStore).subscribe(data => {
        reducedOpacity = data.executingAnimation;
    }, ["executingAnimation"]);

    let orientation: ViewOrientation;

    $: {
        orientation = ViewPlacementMetadata[placement].orientation;
    }

    let ref: HTMLElement;

    onDestroy(unsubSettings);

    function onResize(){
        ref.
    }
</script>


{#if placement !== ViewPlacement.LEFT}
    <ResizableBar {onResize}/>
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
            <ResizableBar type={placement === ViewPlacement.BOTTOM ? "width": "height"}/>
        {/if}
    {/each}
</div>
{#if placement === ViewPlacement.LEFT}
    <ResizableBar {onResize}/>
{/if}


<style>
    .wrapper {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 0;
        width: 100%;
        height: 100%;
    }
</style>
