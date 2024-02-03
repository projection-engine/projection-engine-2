<script lang="ts">
    import {onDestroy, onMount} from "svelte"
    import Viewport from "./components/view/CentralView.svelte"
    import ViewsContainer from "./components/view/SideView.svelte"
    import HotKeysController from "@lib/HotKeysController"
    import MenuBar from "@lib/components/frame/MenuBar.svelte";
    import {InjectVar} from "@lib/Injection";
    import Canvas from "./components/view/Canvas.svelte";
    import ToasterService from "@services/ToasterService";
    import SettingsStore from "@lib/stores/SettingsStore";
    import {ViewPlacement} from "./components/view/ViewDefinitions";
    import ViewTabDTO from "./components/view/ViewTabDTO";

    let view: ViewTabDTO
    let cameraGizmoSize: number
    let ready = false

    const toasterService = InjectVar(ToasterService)
    const settingsStore = InjectVar(SettingsStore)
    const unsubSettings = settingsStore.subscribe(
        data => {
            view = data.views[data.currentView]
            cameraGizmoSize = data.cameraGizmoSize
            HotKeysController.blockActions = data.executingAnimation
        },
        ["views", "currentView", "cameraGizmoSize", "executingAnimation"]
    );

    onMount(() => toasterService.initialize())
    onDestroy(unsubSettings)
</script>

<MenuBar/>
{#if view !== undefined}
    <div class="wrapper" style={`--cube-size: ${cameraGizmoSize}px;`}>
        <div class="middle">
            {#if ready}
                <ViewsContainer placement={ViewPlacement.LEFT} tabs={view.getLeft()}/>
            {/if}
            <div class="content">
                <Viewport {ready} view={view.getCenter()}>
                    <Canvas onReady={() => ready = true}/>
                </Viewport>
                {#if ready}
                    <ViewsContainer placement={ViewPlacement.BOTTOM} tabs={view.getBottom()}/>
                {/if}
            </div>
            {#if ready}

                <ViewsContainer placement={ViewPlacement.RIGHT} tabs={view.getRight()}/>
            {/if}
        </div>
    </div>
{/if}


<style>
    .wrapper {
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
