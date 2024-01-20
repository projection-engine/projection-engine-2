<script lang="ts">
    import {onDestroy, onMount} from "svelte"
    import RENDER_TARGET from "../../static/RENDER_TARGET"
    import SelectBox from "@lib/components/select-box/SelectBox.svelte"
    import GIZMOS from "@enums/Gizmos"
    import GizmoSystem from "../../../../engine/tools/gizmo/GizmoSystem"
    import dragDrop from "@lib/components/drag-drop/drag-drop"
    import CameraSettings from "./components/CameraSettings.svelte"
    import SceneOptions from "./components/SceneOptions.svelte"
    import ViewHeader from "../../components/view/ViewHeader.svelte"
    import EntityInformation from "./components/EntityInformation.svelte"
    import GizmoSettings from "./components/GizmoSettings.svelte"
    import SHADING_MODELS from "@engine-core/static/ShadingModel"
    import Icon from "@lib/components/icon/Icon.svelte"
    import GPUService from "@engine-core/services/GPUService"
    import LocalizationEN from "@enums/LocalizationEN"
    import SceneEditorUtil from "../../util/SceneEditorUtil"
    import ProjectionEngine from "@lib/ProjectionEngine";
    import ViewportInteractionService from "./lib/ViewportInteractionService";
    import {InjectVar} from "@lib/Injection";
    import SettingsStore from "@lib/stores/SettingsStore";

    const draggable = dragDrop(false)

    let isOnGizmo = false
    let isSelectBoxDisabled
    let executingAnimation = false
    let shadingModel
    let focusedCamera

    const unsubSettings = InjectVar(SettingsStore).subscribe(data => {
        isSelectBoxDisabled = data.gizmo !== GIZMOS.NONE
        shadingModel = data.shadingModel
        executingAnimation = data.executingAnimation
        focusedCamera = data.focusedCamera ? ProjectionEngine.Engine.entities.get(data.focusedCamera) : null
    }, ["gizmo", "shadingModel", "focusedCamera", "executingAnimation"])

    onMount(() => {
        GizmoSystem.onStart = () => isOnGizmo = true
        GizmoSystem.onStop = () => isOnGizmo = false
        SceneEditorUtil.onSceneEditorMount(draggable)
    })

    onDestroy(() => {
        unsubSettings()
        GizmoSystem.onStop = GizmoSystem.onStart = undefined
        ProjectionEngine.ContextMenuService.destroy(RENDER_TARGET)
        draggable.onDestroy()
        ViewportInteractionService.onDestroy()
    })
</script>

{#if !executingAnimation}
    <ViewHeader>
        <EntityInformation {isOnGizmo}/>
        <SceneOptions {isOnGizmo}/>
    </ViewHeader>
    <SelectBox
            targetElement={GPUService.canvas}
            targetElementID={RENDER_TARGET}
            disabled={isSelectBoxDisabled}
            setSelected={SceneEditorUtil.getUnderSelectionBox}
            getSelected={() => []}
            nodes={[]}
    />
    <div class="top-bar">
        <GizmoSettings/>
        <CameraSettings/>
    </div>
    {#if focusedCamera != null}
        <div class="focused-camera" data-svelteinline="-">
            <Icon styles="font-size: .85rem">videocam</Icon>
            {focusedCamera.name}
        </div>
    {/if}
    {#if shadingModel === SHADING_MODELS.LIGHT_QUANTITY}
        <div class="complexity-gradient">
            <small>{LocalizationEN.NO_CONTRIBUTION}</small>
            <small>{LocalizationEN.ALL_SCENE_LIGHTS}</small>
        </div>
    {:else if shadingModel === SHADING_MODELS.LIGHT_COMPLEXITY}
        <div class="complexity-gradient">
            <small>{LocalizationEN.NO_CONTRIBUTION}</small>
            <small>{LocalizationEN.MAXIMUM_NUMBER_OF_LIGHTS}</small>
        </div>
    {/if}
{/if}

<style>
    .complexity-gradient {
        position: absolute;
        z-index: 10;
        bottom: 6px;
        left: 50%;
        transform: translateX(-50%);
        width: 75%;
        padding: 6px;

        display: flex;
        align-items: center;
        justify-content: space-between;

        background: linear-gradient(0.25turn, blue, red);
        height: 40px;
        border-radius: 5px;
        box-shadow: rgb(0 0 0 / 20%) 2px 4px 10px 2px;
    }

    .focused-camera {
        position: absolute;
        bottom: 4px;
        left: 4px;
        border-radius: 25px;
        height: 25px;
        background: var(--pj-accent-color);
        color: white;
        gap: 6px;
        padding: 8px;
        font-size: .7rem;
        z-index: 999;
        box-shadow: var(--pj-boxshadow);
    }

    .top-bar {
        position: absolute;
        padding: 2px;

        z-index: 10;
        top: 28px;
        width: 100%;
        left: 0;

        display: flex;
        justify-content: space-between;
        align-items: flex-start;

    }
</style>
