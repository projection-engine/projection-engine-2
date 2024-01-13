<script lang="ts">

    import {onDestroy, onMount} from "svelte"
    import HotKeysController from "@lib/HotKeysController"
    import getViewportHotkeys from "../../templates/get-viewport-hotkeys"
    import View from "./View.svelte"
    import GPU from "@engine-core/GPU"
    import LocalizationEN from "@enums/LocalizationEN";
    import {ViewPlacement, ViewType} from "./ViewDefinitions";
    import ViewportUtil from "../../util/ViewportUtil";
    import {InjectVar} from "@lib/Injection";
    import SettingsStore from "@lib/stores/SettingsStore";

    export let view: ViewType
    export let ready: boolean

    const settings = InjectVar(SettingsStore)
    const unsubSettings = settings.subscribe(data => {
        const currentView = data.views[data.currentView]
        if (data.executingAnimation && currentView.getCenter() !== ViewType.EDITOR) {
            currentView.replaceViewType(0, ViewType.EDITOR, ViewPlacement.CENTER)
            settings.updateStore(data)
        }
    }, ["executingAnimation"])

    let ref: HTMLElement

    $: {
        ViewportUtil.updateViewport(view)
        if (view !== ViewType.EDITOR && GPU.context) {
            GPU.canvas.style.zIndex = "-1"
            GPU.canvas.style.position = "absolute"
        } else if (GPU.context) {
            GPU.canvas.style.zIndex = "1"
            GPU.canvas.style.position = "relative"
        }
    }

    onMount(() => {
        HotKeysController.bindAction(ref, Object.values(getViewportHotkeys()), "public", LocalizationEN.VIEWPORT)
    })

    onDestroy(() => {
        unsubSettings()
        HotKeysController.unbindAction(ref)
    })

</script>

<div class="viewport" bind:this={ref}>
    <div class="wrapper">
        {#if ready}
            <View
                    {view}
                    placement={ViewPlacement.CENTER}
                    index={0}
                    styles="position: absolute; top: 0; display: flex; align-items: center;"
            />
        {/if}
        <slot/>
    </div>
</div>

<style>
    .viewport {
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: relative;
        display: flex;
        flex-direction: column;
    }

    .wrapper {
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: relative;
    }
</style>
