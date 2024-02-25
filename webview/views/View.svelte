<script lang="ts">

    import {InjectVar} from "@lib/Injection";
    import WebViewService from "@lib/webview/WebViewService";
    import {onDestroy, onMount} from "svelte";
    import {ViewEvents} from "./definitions";
    import {
        ViewOrientation,
        ViewPlacement,
        ViewPlacementMetadata,
        ViewType, ViewTypeMetadata
    } from "../window/editor/components/view/ViewDefinitions";
    import View from "../window/editor/components/view/View.svelte";
    import ResizableBar from "@lib/components/resizable/ResizableBar.svelte";
    import Icon from "@lib/components/icon/Icon.svelte";

    const webView = InjectVar(WebViewService);
    let tabs = [ViewType.HIERARCHY];
    let placement: ViewPlacement = undefined;
    let orientation: ViewOrientation;

    onMount(() => {
        webView.wire(ViewEvents.GET_VIEW_METADATA).then(response => {
            placement = response.getPayload() as ViewPlacement;
            orientation = ViewPlacementMetadata[placement].orientation;

        });
    });

    function onResize() {
    }

</script>


<div class="wrapper" style={placement === ViewPlacement.BOTTOM ? "flex-direction: column;" : undefined}>
    <div class="resize"></div>
    {#if placement}

        {#if placement !== ViewPlacement.LEFT}
            <ResizableBar type={placement === ViewPlacement.BOTTOM ? "height" : "width"} {onResize}/>
        {:else}
            <div class="view-types">
                {#each Object.entries(ViewTypeMetadata) as viewType}
                    <div draggable="true" class="draggable-view" title={viewType[1].label}>
                        <Icon>{viewType[1].icon}</Icon>
                    </div>
                {/each}
            </div>
        {/if}
        <div class="content"
             style={`flex-direction: ${orientation === ViewOrientation.HORIZONTAL ? "row" : "column"}; ${orientation}: 250px; ${"min-" + orientation}: 35px;`}>
            {#each tabs as view, groupIndex}
                <View {view} index={groupIndex} {placement}/>
                {#if groupIndex < tabs.length - 1 && tabs.length > 1}
                    <ResizableBar type={placement === ViewPlacement.BOTTOM ? "width": "height"}/>
                {/if}
            {/each}
        </div>
        {#if placement === ViewPlacement.LEFT}
            <ResizableBar type="width" {onResize}/>
        {/if}
    {/if}
    <div class="resize"></div>
</div>

<style>
    .draggable-view {
        width: 29px;
        height: 29px;
        background: var(--pj-background-tertiary);
        border-radius: 5px;

        cursor: grab;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .draggable-view:hover {
        background: var(--pj-background-secondary);
    }

    .draggable-view:active {
        cursor: grabbing;
    }

    .view-types {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        gap: 4px;
        padding: 3px;
        height: 100vh;
        max-width: 35px;
        min-width: 35px;
        border-right: 1px var(--pj-border-primary) solid;
    }

    .resize {
        max-width: 0 !important;
        max-height: 0 !important;
    }

    .content {
        position: relative;
        display: flex;
        flex-direction: column;
        gap: 0;
        width: 100%;
        height: 100%;
    }

    .wrapper {
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        display: flex;
        position: relative;
    }
</style>
