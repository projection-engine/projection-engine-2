<script>
    import CameraGizmo from "./CameraGizmo.svelte"
    import Dropdown from "@lib/components/dropdown/Dropdown.svelte"
    import ToolTip from "@lib/components/tooltip/ToolTip.svelte"
    import Icon from "@lib/components/icon/Icon.svelte"
    import CameraTracker from "../../../../../engine/tools/utils/CameraTracker"
    import {onDestroy, onMount} from "svelte"
    import LocalizationEN from "@enums/LocalizationEN"
    import EmptyIcon from "@lib/components/icon/EmptyIcon.svelte"
    import EditorUtil from "../../../util/EditorUtil"
    import ProjectionEngine from "@lib/ProjectionEngine";
    import {InjectVar} from "@lib/Injection";
    import EngineStore from "@lib/stores/EngineStore";
    import SettingsStore from "@lib/stores/SettingsStore";

    const COMPONENT_ID = crypto.randomUUID()
    let cameras = []
    let focusedCamera
    let screenSpaceMovement = false
    let camera = {}
    const unsubEngine = InjectVar(EngineStore).subscribe(data => {
        focusedCamera = data.focusedCamera
    }, ["focusedCamera"])

    const unsubSettings = InjectVar(SettingsStore).subscribe(data => {
        CameraTracker.screenSpaceMovement = screenSpaceMovement = data.screenSpaceMovement
        camera = data.camera
    }, ["screenSpaceMovement", "camera"])

    onMount(() => {
        ProjectionEngine.EntityHierarchyService.registerListener(COMPONENT_ID, () => {
            cameras = ProjectionEngine.Engine.entities.array.filter(entity => entity.cameraComponent != null)
        })
    })

    onDestroy(() => {
        unsubEngine()
        unsubSettings()
        ProjectionEngine.EntityHierarchyService.removeListener(COMPONENT_ID)
    })

    const toggleProjection = () => {
        ProjectionEngine.SettingsStore.updateStore({camera: {...camera, ortho: !camera.ortho}})
    }
</script>

<div class="wrapper">
    <Dropdown
            disabled={cameras.length === 0}
            buttonStyles={"border-radius: 25px; height: 25px;" + (focusedCamera ? "background: var(--pj-accent-color);" : "background: var(--pj-background-tertiary);")}>
        <button data-sveltebuttondefault="-"
                disabled={cameras.length === 0}
                slot="button"
                style="background: transparent; box-shadow: none"
                class="button viewport"
                data-sveltehighlight={focusedCamera ? "-" : undefined}
        >
            <ToolTip content={LocalizationEN.FOCUS_ON_CAMERA}/>
            <Icon styles="font-size: 1rem">videocam</Icon>
        </button>
        {#each cameras as camera}
            <button data-sveltebuttondefault="-"
                    style="border: none"
                    class="button viewport"
                    on:click={_ => EditorUtil.focusOnCamera(camera)}
            >
                {#if focusedCamera === camera.id}
                    <Icon>check</Icon>
                {:else}
                    <EmptyIcon/>
                {/if}
                {camera.name}
            </button>
        {/each}
    </Dropdown>
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