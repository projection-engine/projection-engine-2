<script lang="ts">
    import {onDestroy, onMount} from "svelte"
    import Viewport from "./components/view/CentralView.svelte"
    import Footer from "./components/footer/Footer.svelte"
    import ViewsContainer from "./components/view/SideView.svelte"
    import HotKeysController from "@lib/HotKeysController"
    import EditorUtil from "./util/EditorUtil"
    import MenuBar from "@lib/components/frame/MenuBar.svelte";
    import {InjectVar} from "@lib/Injection";
    import Canvas from "./components/view/Canvas.svelte";
    import Engine from "@engine-core/Engine";
    import ToasterService from "../services/ToasterService";
    import SettingsStore from "@lib/stores/SettingsStore";
    import EngineStore from "@lib/stores/EngineStore";

    const COMPONENT_ID = crypto.randomUUID()
    let view
    let cameraGizmoSize
    let currentViewIndex = 0
    let ready = false

    const toasterService = InjectVar(ToasterService) as ToasterService
    const settingsStore = InjectVar(SettingsStore) as SettingsStore
    const engineStore = InjectVar(EngineStore) as EngineStore

    onMount(() => {
        toasterService.initialize()
        settingsStore
            .addListener(COMPONENT_ID, data => {
                view = data.views?.[data.currentView]
                currentViewIndex = data.currentView
                cameraGizmoSize = data.cameraGizmoSize
            }, ["views", "currentView", "cameraGizmoSize"])
        engineStore.addListener(COMPONENT_ID, data => HotKeysController.blockActions = data.executingAnimation, ["executingAnimation"])
    })

    onDestroy(() => {
        engineStore.removeListener(COMPONENT_ID)
        settingsStore.removeListener(COMPONENT_ID)
    })
</script>

<MenuBar/>
{#if view !== undefined}
    <div class="wrapper" style={`--cube-size: ${cameraGizmoSize}px;`}>
        <div class="middle">
            {#if ready}
                <ViewsContainer
                        id="left"
                        setTabs={(tabs) => EditorUtil.updateView("left", tabs)}
                        tabs={view.left}
                        leftOffset={"8px"}
                        {currentViewIndex}
                        orientation={"vertical"}
                        resizePosition={"left"}
                />
            {/if}
            <div class="content">
                {#if ready}

                    <ViewsContainer
                            id="bottom"
                            setTabs={(tabs) => EditorUtil.updateView("top", tabs)}
                            tabs={view.top}
                            {currentViewIndex}
                            resizePosition={"bottom"}
                            orientation={"horizontal"}
                    />
                {/if}
                <Viewport
                        {ready}
                        {currentViewIndex}
                        viewTab={view.viewport}
                        updateView={(viewTab) => EditorUtil.updateView("viewport", viewTab)}
                >
                    <Canvas onReady={() => ready = true}/>
                </Viewport>
                {#if ready}

                    <ViewsContainer
                            {currentViewIndex}
                            id="bottom"
                            setTabs={(tabs) => EditorUtil.updateView("bottom", tabs)}
                            tabs={view.bottom}
                            resizePosition={"top"}
                            orientation={"horizontal"}
                    />
                {/if}
            </div>
            {#if ready}

                <ViewsContainer
                        id="right"
                        {currentViewIndex}
                        setTabs={(tabs) => EditorUtil.updateView("right", tabs)}
                        tabs={view.right}
                        orientation={"vertical"}
                        leftOffset={"0%"}
                        resizePosition={"top"}
                />
            {/if}
        </div>
        <Footer/>
    </div>
{/if}


<style>
    .wrapper {
        background: var(--pj-background-secondary);
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        position: relative;
    }

    .content {
        width: 100%;
        height: 100%;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        user-select: none;
    }

    .middle {
        width: 100%;
        height: 100%;
        overflow: hidden;
        display: flex;

    }
</style>
