<script lang="ts">
    import GizmoTransformationType from "@enums/GizmoTransformationType"
    import Gizmos from "@enums/Gizmos"
    import ROTATION_GRID from "../static/ROTATION_GRID"
    import SCALE_GRID from "../static/SCALE_GRID"
    import TRANSLATION_GRID from "../static/TRANSLATION_GRID"
    import ToolTip from "@lib/components/tooltip/ToolTip.svelte"
    import Icon from "@lib/components/icon/Icon.svelte"
    import Dropdown from "@lib/components/dropdown/Dropdown.svelte"
    import LocalizationEN from "@enums/LocalizationEN"
    import EmptyIcon from "@lib/components/icon/EmptyIcon.svelte"
    import {onDestroy} from "svelte"
    import SceneEditorUtil from "../../../util/SceneEditorUtil"
    import ProjectionEngine from "@lib/ProjectionEngine";
    import {InjectVar} from "@lib/Injection";
    import SettingsStore from "@lib/stores/SettingsStore";

    const BUTTON_DROPDOWN = "border-radius: 25px; height: 25px; background: var(--pj-background-tertiary);"
    const BUTTON_DROPDOWN_INT = "background: transparent; box-shadow: none; width: 50px; justify-content: center; gap: 6px"

    let transformationType
    let gizmoGrid = {}
    let gizmo

    const settings = InjectVar(SettingsStore)
    const unsubSettings = settings.subscribe(data => {
        transformationType = data.transformationType
        gizmoGrid = data.gizmoGrid
        gizmo = data.gizmo
    }, ["transformationType", "gizmoGrid", "gizmo"])

    onDestroy(unsubSettings)
</script>

<div class="wrapper">
    <button data-sveltebuttondefault="-"
            on:click={() => settings.updateStore({transformationType: transformationType === GizmoTransformationType.RELATIVE ? GizmoTransformationType.GLOBAL : GizmoTransformationType.RELATIVE})}
            class="button viewport"
    >
        {#if transformationType === GizmoTransformationType.RELATIVE}
            <Icon styles="font-size: .9rem">place</Icon>
            {LocalizationEN.LOCAL}
        {:else}
            <Icon styles="font-size: .9rem">language</Icon>
            {LocalizationEN.GLOBAL}
        {/if}
        <ToolTip content={LocalizationEN.TOGGLE_TRANSFORMATION_TYPE}/>
    </button>

    <Dropdown hideArrow={true} buttonStyles={BUTTON_DROPDOWN}>
        <button data-sveltebuttondefault="-"
                slot="button"
                style={BUTTON_DROPDOWN_INT}
                class="button viewport"
        >
            <ToolTip content={LocalizationEN.TRANSLATION_GRID}/>
            {gizmoGrid.translationGizmo}
            <Icon styles="font-size: 1rem; color: var(--pj-color-quaternary)">open_with</Icon>
        </button>

        {#each TRANSLATION_GRID as value}
            <button data-sveltebuttondefault="-" data-svelteinline="-"
                    on:click={() => SceneEditorUtil.updateGizmoGrid("translationGizmo", value)}>
                {#if gizmoGrid.translationGizmo === value}
                    <Icon>check</Icon>
                {:else}
                    <EmptyIcon/>
                {/if}
                {value}
            </button>
        {/each}
    </Dropdown>
    <Dropdown hideArrow={true} buttonStyles={BUTTON_DROPDOWN}>
        <button data-sveltebuttondefault="-"
                slot="button"
                style={BUTTON_DROPDOWN_INT}
                class="button viewport"
        >
            <ToolTip content={LocalizationEN.SCALE_GRID}/>
            {gizmoGrid.scaleGizmo}
            <Icon styles="font-size: 1rem; color: var(--pj-color-quaternary)">open_in_full</Icon>
        </button>

        {#each SCALE_GRID as value}
            <button data-sveltebuttondefault="-" data-svelteinline="-"
                    on:click={() => SceneEditorUtil.updateGizmoGrid("scaleGizmo", value)}>
                {#if gizmoGrid.scaleGizmo === value}
                    <Icon>check</Icon>
                {:else}
                    <EmptyIcon/>
                {/if}
                {value}
            </button>
        {/each}
    </Dropdown>
    <Dropdown hideArrow={true} buttonStyles={BUTTON_DROPDOWN }>
        <button data-sveltebuttondefault="-"
                slot="button"
                style={BUTTON_DROPDOWN_INT}
                class="button viewport"
        >
            <ToolTip content={LocalizationEN.ROTATION_GRID}/>
            {gizmoGrid.rotationGizmo}
            <Icon styles="font-size: 1rem; color: var(--pj-color-quaternary)">360</Icon>
        </button>

        {#each ROTATION_GRID as value}
            <button data-sveltebuttondefault="-" data-svelteinline="-"
                    on:click={() =>SceneEditorUtil.updateGizmoGrid("rotationGizmo", value)}>
                {#if gizmoGrid.rotationGizmo === value}
                    <Icon>check</Icon>
                {:else}
                    <EmptyIcon/>
                {/if}
                {value}
            </button>
        {/each}
    </Dropdown>


    <button data-sveltebuttondefault="-"
            class="button viewport"
            style="margin-left: 8px"
            data-sveltehighlight={gizmo === Gizmos.NONE ? "-" : undefined}
            on:click={() =>settings.updateStore({gizmo: Gizmos.NONE})}>
        <Icon styles="font-size: 1rem; color: #FFC757">highlight_alt</Icon>

        {LocalizationEN.SELECTION}

        <ToolTip content={LocalizationEN.SELECTION}/>
    </button>
    <button data-sveltebuttondefault="-"
            class="button viewport"
            data-sveltehighlight={gizmo === Gizmos.TRANSLATION ? "-" : undefined}
            on:click={() => settings.updateStore({gizmo: Gizmos.TRANSLATION})}>
        <Icon styles="font-size: 1rem; color: var(--pj-color-quaternary)">open_with</Icon>
        {LocalizationEN.T_GIZMO}

        <ToolTip content={LocalizationEN.T_GIZMO}/>
    </button>

    <button data-sveltebuttondefault="-"

            class="button viewport"
            data-sveltehighlight={gizmo === Gizmos.SCALE ? "-" : undefined}
            on:click={() => settings.updateStore({gizmo: Gizmos.SCALE})}>
        <Icon styles="font-size: 1rem; color: var(--pj-color-quaternary)">open_in_full</Icon>
        {LocalizationEN.S_GIZMO}
        <ToolTip content={LocalizationEN.S_GIZMO}/>
    </button>
    <button data-sveltebuttondefault="-"

            class="button viewport"
            data-sveltehighlight={gizmo === Gizmos.ROTATION ? "-" : undefined}
            on:click={() =>ProjectionEngine. SettingsStore.updateStore({gizmo: Gizmos.ROTATION})}>
        <Icon styles="font-size: 1rem; color: var(--pj-color-quaternary)">360</Icon>
        {LocalizationEN.R_GIZMO}

        <ToolTip content={LocalizationEN.R_GIZMO}/>
    </button>
</div>

<style>
    .wrapper {
        display: flex;
        align-items: flex-start;
        gap: 4px;
    }
</style>