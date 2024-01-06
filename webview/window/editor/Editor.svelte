<script>
    import {onDestroy, onMount} from "svelte"
    import Viewport from "./components/view/CentralView.svelte"
    import Footer from "./components/footer/Footer.svelte"
    import EngineStore from "../shared/stores/EngineStore"
    import ViewsContainer from "./components/view/SideView.svelte"
    import SettingsStore from "../shared/stores/SettingsStore"
    import HotKeysController from "../shared/lib/HotKeysController"
    import ToastNotificationSystem from "../shared/components/alert/ToastNotificationSystem"
    import EditorUtil from "./util/EditorUtil"
    import MenuBar from "../shared/components/frame/MenuBar.svelte";
    import ProjectionEngine from "../../shared/ProjectionEngine";

    const COMPONENT_ID = crypto.randomUUID()
    let view
    let cameraGizmoSize
    let currentViewIndex = 0

    onMount(() => {
        ProjectionEngine.SettingsStore
            .addListener(COMPONENT_ID, data => {
                view = data.views?.[data.currentView]
                currentViewIndex = data.currentView
                cameraGizmoSize = data.cameraGizmoSize
            }, ["views", "currentView", "cameraGizmoSize"])
        ProjectionEngine.EngineStore.addListener(COMPONENT_ID, data => HotKeysController.blockActions = data.executingAnimation, ["executingAnimation"])

        ToastNotificationSystem.get()

    })

    onDestroy(() => {
        ProjectionEngine.EngineStore.removeListener(COMPONENT_ID)
        ProjectionEngine.SettingsStore.removeListener(COMPONENT_ID)
    })
</script>

<MenuBar/>
{#if view !== undefined}
    <div class="wrapper" style={`--cube-size: ${cameraGizmoSize}px;`}>
        <div class="middle">
            <ViewsContainer
                    id="left"
                    setTabs={(tabs) => EditorUtil.updateView("left", tabs)}
                    tabs={view.left}
                    leftOffset={"8px"}
                    {currentViewIndex}
                    orientation={"vertical"}
                    resizePosition={"left"}
            />
            <div class="content">
                <ViewsContainer
                        id="bottom"
                        setTabs={(tabs) => EditorUtil.updateView("top", tabs)}
                        tabs={view.top}
                        {currentViewIndex}
                        resizePosition={"bottom"}
                        orientation={"horizontal"}
                />
                <Viewport
                        {currentViewIndex}
                        viewTab={view.viewport}
                        updateView={(viewTab) => EditorUtil.updateView("viewport", viewTab)}
                />
                <ViewsContainer
                        {currentViewIndex}
                        id="bottom"
                        setTabs={(tabs) => EditorUtil.updateView("bottom", tabs)}
                        tabs={view.bottom}
                        resizePosition={"top"}
                        orientation={"horizontal"}
                />
            </div>
            <ViewsContainer
                    id="right"
                    {currentViewIndex}
                    setTabs={(tabs) => EditorUtil.updateView("right", tabs)}
                    tabs={view.right}
                    orientation={"vertical"}
                    leftOffset={"0%"}
                    resizePosition={"top"}
            />
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
