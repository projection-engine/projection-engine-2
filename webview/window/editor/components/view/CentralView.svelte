<script>

    import EngineStore from "../../../shared/stores/EngineStore"
    import {onDestroy, onMount} from "svelte"
    import VIEWPORT_TABS from "../../static/VIEWPORT_TABS.ts"
    import HotKeysController from "../../../shared/lib/HotKeysController"
    import getViewportHotkeys from "../../templates/get-viewport-hotkeys"
    import Tabs from "../tabs/Tabs.svelte"
    import VIEWS from "./static/VIEWS"
    import View from "./components/View.svelte"
    import TabsStore from "../../../shared/stores/TabsStore"
    import GPU from "../../../../engine/core/GPU"
    import ViewportUtil from "../../util/ViewportUtil"
    import ViewsUtil from "../../util/ViewsUtil"
    import TabsStoreUtil from "../../util/TabsStoreUtil"
    import LocalizationEN from "../../../../shared/enums/LocalizationEN";
    import Canvas from "./Canvas.svelte";
    import ProjectionEngine from "../../../../shared/ProjectionEngine";

    const COMPONENT_ID = crypto.randomUUID()
    const VIEW_TEMPLATES = [...Object.values(VIEWS), ...Object.values(VIEWPORT_TABS)].map(value => ({
        name: LocalizationEN[value],
        id: value
    }))

    export let updateView
    export let viewTab
    export let currentViewIndex

    let currentTab = TabsStoreUtil.getCurrentTabByCurrentView("viewport")
    let executingAnimation = false
    let ref
    let focused = false


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
            executingAnimation = data.executingAnimation
        }, ["executingAnimation"])
        HotKeysController.bindAction(ref, Object.values(getViewportHotkeys()), "public", LocalizationEN.VIEWPORT)
        ref.addEventListener("mousedown", () => TabsStoreUtil.setFocusedTab(ref))
    })

    onDestroy(() => {
        ProjectionEngine.TabsStore.removeListener(COMPONENT_ID)
        ProjectionEngine.EngineStore.removeListener(COMPONENT_ID)
        HotKeysController.unbindAction(ref)
    })

    const addNewTab = item => {
        const clone = [...viewTab]
        clone.push({color: [255, 255, 255], type: item?.id || VIEWS.INSPECTOR})
        updateView(clone)
    }

    const removeMultipleTabs = () => {
        const current = viewTab[currentTab]
        TabsStoreUtil.updateByAttributes("viewport", undefined, 0)
        updateView([current])
    }
</script>

<div class="viewport" bind:this={ref}>
    <div style="height: 30px">
        <Tabs
                addNewTab={addNewTab}
                allowDeletion={false}
                currentTab={currentTab}
                disabled={executingAnimation}
                focused={focused}
                removeMultipleTabs={removeMultipleTabs}
                removeTab={i => ViewportUtil.removeTab(i, viewTab,  updateView, currentTab, v => TabsStoreUtil.updateByAttributes("viewport", undefined, v))}
                setCurrentView={v => TabsStoreUtil.updateByAttributes("viewport", undefined, v)}
                tabs={viewTab}
                templates={VIEW_TEMPLATES}
                updateView={setViewportTab}
        />
    </div>
    <div class="wrapper">
            <View
                    {currentViewIndex}
                    instance={viewTab[currentTab]}
                    id={"VIEWPORT"}
                    index={currentTab}
                    groupIndex={0}
                    styles="position: absolute; top: 0; display: flex; align-items: center;"
            />
        <Canvas/>
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
