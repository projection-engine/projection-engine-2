<script>

    import {onDestroy, onMount} from "svelte"
    import VIEWPORT_TABS from "../../static/VIEWPORT_TABS.ts"
    import HotKeysController from "@lib/HotKeysController"
    import getViewportHotkeys from "../../templates/get-viewport-hotkeys"
    import View from "./components/View.svelte"
    import GPU from "@engine-core/GPU"
    import ViewportUtil from "../../util/ViewportUtil"
    import ViewsUtil from "../../util/ViewsUtil"
    import TabsStoreUtil from "../../util/TabsStoreUtil"
    import LocalizationEN from "@enums/LocalizationEN";
    import ProjectionEngine from "@lib/ProjectionEngine";

    const COMPONENT_ID = crypto.randomUUID()

    export let updateView
    export let viewTab
    export let ready
    export let currentViewIndex

    let currentTab = TabsStoreUtil.getCurrentTabByCurrentView("viewport")
    let ref

    const setViewportTab = (value, index = currentTab) => {
        const clone = [...viewTab]
        clone[index].type = value
        ViewportUtil.updateViewport(value)
        updateView(clone)
    }

    $: {
        viewTab.forEach(v => {
            v.name = LocalizationEN[v.type]
            v.icon = ViewsUtil.getViewIcon(v.type)
        })
        if (viewTab[currentTab].type !== VIEWPORT_TABS.EDITOR && GPU.context) {
            GPU.canvas.style.zIndex = "-1"
            GPU.canvas.style.position = "absolute"
        } else if (GPU.context) {
            GPU.canvas.style.zIndex = "1"
            GPU.canvas.style.position = "relative"
        }
    }

    onMount(() => {
        ProjectionEngine.TabsStore.addListener(COMPONENT_ID, () => {
            currentTab = TabsStoreUtil.getCurrentTabByCurrentView("viewport")
            focused = ref === TabsStoreUtil.getFocusedTab()
        })
        ProjectionEngine.EngineStore.addListener(COMPONENT_ID, data => {
            if (data.executingAnimation && viewTab[currentTab].type !== VIEWPORT_TABS.EDITOR)
                setViewportTab(VIEWPORT_TABS.EDITOR)
        }, ["executingAnimation"])
        HotKeysController.bindAction(ref, Object.values(getViewportHotkeys()), "public", LocalizationEN.VIEWPORT)
        ref.addEventListener("mousedown", () => TabsStoreUtil.setFocusedTab(ref))
    })

    onDestroy(() => {
        ProjectionEngine.TabsStore.removeListener(COMPONENT_ID)
        ProjectionEngine.EngineStore.removeListener(COMPONENT_ID)
        HotKeysController.unbindAction(ref)
    })

</script>

<div class="viewport" bind:this={ref}>
    <div class="wrapper">
        {#if ready}
            <View
                    {currentViewIndex}
                    instance={viewTab[currentTab]}
                    id={"VIEWPORT"}
                    index={currentTab}
                    groupIndex={0}
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
