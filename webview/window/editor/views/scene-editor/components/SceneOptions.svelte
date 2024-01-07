<script>
    import OptionDropdown from "@lib/components/dropdown/OptionDropdown.svelte"
    import LocalizationEN from "@enums/LocalizationEN"
    import SceneEditorUtil from "../../../util/SceneEditorUtil"
    import getEntityCreationOptions from "../../../templates/get-entity-creation-options"
    import {getViewportOptionsForDropdown} from "../../../templates/get-viewport-context"
    import getDropdownHeaderStyles from "@lib/components/dropdown/utils/get-dropdown-header-styles"
    import Range from "@lib/components/range/Range.svelte"
    import Checkbox from "@lib/components/checkbox/Checkbox.svelte"
    import Dropdown from "@lib/components/dropdown/Dropdown.svelte"
    import {onDestroy, onMount} from "svelte"
    import ProjectionEngine from "@lib/ProjectionEngine";

    /** @type boolean */
    export let isOnGizmo

    const COMPONENT_ID = crypto.randomUUID()
    let options = []
    let spawnDistanceFromCamera
    let shadingModelLabel
    let shadingModel
    let spawnOnOrigin

    onMount(() => {
        ProjectionEngine.SettingsStore.addListener(COMPONENT_ID, data => {
    		spawnOnOrigin = data.spawnOnOrigin
    		spawnDistanceFromCamera = data.spawnDistanceFromCamera
    		options = SceneEditorUtil.getSceneOptions()
    		shadingModel = data.shadingModel
    		shadingModelLabel = LocalizationEN.SHADING + LocalizationEN[SceneEditorUtil.getLabel(data.shadingModel)]
    	})
    })

    onDestroy(() => {
        ProjectionEngine.SettingsStore.removeListener(COMPONENT_ID)
    })
</script>

<div class="left-content" style={!isOnGizmo ? undefined : "display: none"}>
    <OptionDropdown
            options={getEntityCreationOptions()}
            label={LocalizationEN.ADD}
            autoClose={true}
    />
    <OptionDropdown
            options={getViewportOptionsForDropdown()}
            label={LocalizationEN.OBJECT}
            autoClose={true}
    />
    <Dropdown styles="width: 250px; max-height: 40vh; overflow-y: auto" buttonStyles={getDropdownHeaderStyles()}>
        <button data-sveltebuttondefault="-" slot="button" data-svelteview-header-dropdown="-">
            {LocalizationEN.SPAWNING}
        </button>
        <div class="group">
            <Range
                    label={LocalizationEN.DISTANCE}
                    minValue={.001}
                    value={spawnDistanceFromCamera}
                    onFinish={v =>ProjectionEngine. SettingsStore.updateStore({spawnDistanceFromCamera: v})}
            />
            <div data-sveltedivider="-"></div>
            <Checkbox
                    label={LocalizationEN.SPAWN_ON_ORIGIN}
                    checked={spawnOnOrigin}
                    handleCheck={() =>ProjectionEngine. SettingsStore.updateStore({spawnOnOrigin: !spawnOnOrigin})}
            />
        </div>
    </Dropdown>

</div>
<div class="right-content" style={!isOnGizmo ? undefined : "display: none"}>
    <OptionDropdown
            noPadding={true}
            options={options}
            label="layers"
            labelAsIcon={true}
            tooltip={LocalizationEN.OVERLAY}
    />
    <OptionDropdown
            options={SceneEditorUtil.getShadingModels()}
            label={shadingModelLabel}
            autoClose={true}
            highlightElementWithId={shadingModel}
    />
</div>


<style>

    .left-content {
        display: flex;
        align-items: center;
        gap: 4px;
        justify-content: flex-start;
        width: 100%;
    }

    .right-content {
        display: flex;
        align-items: center;
        gap: 4px;
        justify-content: flex-end;
        width: 100%;

    }

    .group {
        width: 100%;
        padding: 6px;
        display: grid;
        gap: 3px;
    }
</style>
