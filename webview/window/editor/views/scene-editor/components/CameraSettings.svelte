<script>
    import CameraGizmo from "./CameraGizmo.svelte"
    import ToolTip from "@lib/components/tooltip/ToolTip.svelte"
    import Icon from "@lib/components/icon/Icon.svelte"
    import CameraTracker from "../../../../../engine/tools/utils/CameraTracker"
    import {onDestroy, onMount} from "svelte"
    import LocalizationEN from "@enums/LocalizationEN"
    import ProjectionEngine from "@lib/ProjectionEngine";
    import {InjectVar} from "@lib/Injection";
    import SettingsStore from "@lib/stores/SettingsStore";

    let focusedCamera
    let screenSpaceMovement = false
    let camera = {}

    const unsubSettings = InjectVar(SettingsStore).subscribe(data => {
        CameraTracker.screenSpaceMovement = screenSpaceMovement = data.screenSpaceMovement
        camera = data.camera
        focusedCamera = data.focusedCamera
    }, ["screenSpaceMovement", "camera", "focusedCamera"])


    onDestroy(() => {
        unsubSettings()
    })

    const toggleProjection = () => {
        ProjectionEngine.SettingsStore.updateStore({camera: {...camera, ortho: !camera.ortho}})
    }
</script>

<div class="wrapper">
    <button data-sveltebuttondefault="-" disabled={focusedCamera} class="button viewport"
            on:click={toggleProjection}>
        <ToolTip content={LocalizationEN.SWITCH_PROJECTION}/>
        {#if !camera.ortho}
            <div style="width: 20px; height: 20px; perspective: 40px; transform-style: preserve-3d">
                <Icon styles="transform: rotateX(45deg)">grid_on</Icon>
            </div>
        {:else}
            <Icon styles="font-size: 1rem">grid_on</Icon>
        {/if}
    </button>

    <button data-sveltebuttondefault="-" disabled={focusedCamera} class="button viewport"
            style="max-width: 25px; justify-content: center"
            on:click={() => ProjectionEngine.ViewportActionUtil.focus()}>
        <ToolTip content={LocalizationEN.FOCUS}/>
        <Icon styles="font-size: 1rem">my_location</Icon>
    </button>

    <button data-sveltebuttondefault="-" disabled={focusedCamera} class="button viewport"
            style="max-width: 25px; justify-content: center"
            on:click={() => ProjectionEngine.SettingsStore.updateStore({screenSpaceMovement: !screenSpaceMovement})}>
        <ToolTip content={LocalizationEN.TOGGLE_CAMERA_MOVEMENT}/>
        {#if screenSpaceMovement}
            <Icon styles="font-size: 1rem">lock_outline</Icon>
        {:else}
            <Icon styles="font-size: 1rem">lock_open</Icon>
        {/if}
    </button>

    <CameraGizmo/>
</div>

<style>


    .wrapper {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        align-items: flex-start;
        gap: 4px;
    }

</style>
