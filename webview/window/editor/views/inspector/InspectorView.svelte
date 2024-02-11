<script lang="ts">

    import {onDestroy} from "svelte";
    import Icon from "@lib/components/icon/Icon.svelte";
    import ToolTip from "@lib/components/tooltip/ToolTip.svelte";
    import InspectorUtil from "../../util/InspectorUtil";
    import EngineService from "../../services/EngineService";
    import {ComponentDTO} from "./inspector-definition";
    import {EntityDTO} from "../hierarchy/hierarchy-definitions";
    import {EngineStateDTO, SettingsDTO} from "../../services/engine-definitions";
    import CameraPreferencesForm from "./forms/CameraPreferencesForm";
    import RenderingPreferencesForm from "./forms/RenderingPreferencesForm";
    import ViewportPreferencesForm from "./forms/ViewportPreferencesForm";
    import AbstractFormType from "./forms/AbstractFormType";
    import COMPONENT_DEFINITIONS from "./static/COMPONENT_DEFINITIONS";
    import TABS from "./static/TABS";
    import Form from "./components/Form.svelte";
    import EntityMetadataForm from "./forms/EntityMetadataForm";

    let selectedEntity: EntityDTO;
    let components: ComponentDTO[];
    let engineState: EngineStateDTO;
    let componentDefinitions: typeof AbstractFormType[];
    let settings: SettingsDTO;
    let tabIndex = 0;
    let tabs = [];

    const unsubSelection = EngineService.listenToSelectionChanges(selection => updateSelection(selection[0]));
    const unsubLockedEntity = EngineService.listenToLockedEntityChanges(updateSelection);
    const unsubEngineState = EngineService.listenToEngineState(payload => {
        engineState = payload;
    });
    const unsubSettings = EngineService.listenToSettings(payload => {
        settings = payload;
    });

    function updateSelection(payload: number | undefined) {
        if (payload != null) {
            selectedEntity = EngineService.getEntityByID(payload);
            components = EngineService.getEntityComponents(payload);
            tabIndex = 3;
            componentDefinitions = components.map(c => COMPONENT_DEFINITIONS[c.componentType]);
            if (selectedEntity) {
                tabs = InspectorUtil.getEntityTabs(components);
            } else {
                tabs = [];
            }
            return;
        }
        tabIndex = 0;
        selectedEntity = undefined;
        components = [];
    }

    onDestroy(() => {
        unsubSelection();
        unsubLockedEntity();
        unsubSettings();
        unsubEngineState();
    });

</script>

<div class="wrapper">
    <div class="tabs">
        {#each TABS as button, index}
            <button data-sveltebuttondefault="-"
                    data-sveltehighlight={tabIndex === index ? "-" : undefined}
                    class="tab-button shared"
                    on:click={() => tabIndex = index}
            >
                <Icon styles="font-size: .9rem">{button.icon}</Icon>
                <ToolTip content={button.label}/>
            </button>
        {/each}
        <div data-sveltedivider="-"></div>
        {#each tabs as button, index}
            <button data-sveltebuttondefault="-"
                    data-sveltehighlight={tabIndex === index ? "-" : undefined}
                    class="tab-button shared"
                    on:click={() => tabIndex = index}
            >
                <Icon styles="font-size: .9rem">{button.icon}</Icon>
                <ToolTip content={button.label}/>
            </button>
        {/each}
    </div>
    <div class="content">
        {#if tabIndex === 0}
            <Form definition={CameraPreferencesForm}/>
        {:else if tabIndex === 1}
            <Form definition={ViewportPreferencesForm}/>
        {:else if tabIndex === 2}
            <Form definition={RenderingPreferencesForm}/>
        {:else if tabIndex === 3}
            <Form definition={EntityMetadataForm}/>
        {:else if componentDefinitions[tabIndex] != null}
            <Form definition={componentDefinitions[tabIndex]}/>
        {/if}
    </div>
</div>


<style>
    .wrapper {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        padding: 0 2px;
        gap: 3px;
        max-height: 100%;
        overflow-y: auto;
        overflow-x: hidden;
    }

    .tabs {
        height: 100%;

        display: grid;
        align-content: flex-start;
        justify-content: center;
        gap: 2px;

        overflow-x: hidden;
        min-width: 25px;
        width: 25px;
        overflow-y: auto;
    }

    .content {
        background: var(--pj-background-tertiary);
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-items: flex-start;
        overflow-y: auto;
        overflow-x: hidden;

        align-content: flex-start;
        gap: 4px;
        padding: 4px 4px 25%;
    }

</style>
