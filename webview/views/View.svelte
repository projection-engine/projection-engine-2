<script lang="ts">

    import {InjectVar} from "@lib/Injection";
    import WebViewService from "@lib/webview/WebViewService";
    import {onMount} from "svelte";
    import {ViewEvents} from "./definitions";
    import {ViewPlacement, ViewType} from "../window/editor/components/view/ViewDefinitions";
    import View from "../window/editor/components/view/View.svelte";
    import SideView from "../window/editor/components/view/SideView.svelte";

    const webView = InjectVar(WebViewService);
    let tabs = [ViewType.HIERARCHY];
    let res: ViewPlacement = undefined;
    onMount(() => {
        webView.wire(ViewEvents.GET_VIEW_METADATA).then(response => {
            res = response.getPayload() as ViewPlacement;
        });
    });
    $: console.trace(res);
</script>


<div class="wrapper" style={res === ViewPlacement.BOTTOM ? "flex-direction: column;" : undefined}>
    <div class="resize"></div>
    {#if res}
        <SideView placement={res} tabs={tabs}/>
    {/if}
    <div class="resize"></div>
</div>

<style>
    .resize {
        max-width: 0 !important;
        max-height: 0 !important;
    }

    .wrapper {
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        display: flex;
        position: relative;
    }
</style>
