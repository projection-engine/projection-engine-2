<script lang="ts">

    import {onDestroy} from "svelte";
    import EngineService from "../../services/EngineService";
    import {TabDTO} from "./inspector-definition";
    import {ComponentDTO, ComponentType, EngineStateDTO, EntityDTO} from "../../services/engine-definitions";
    import CameraPreferencesForm from "./forms/CameraPreferencesForm";
    import RenderingPreferencesForm from "./forms/RenderingPreferencesForm";
    import ViewportPreferencesForm from "./forms/ViewportPreferencesForm";
    import AbstractFormType from "./forms/AbstractFormType";
    import COMPONENT_DEFINITIONS from "./static/COMPONENT_DEFINITIONS";
    import Form from "./components/Form.svelte";
    import EntityMetadataForm from "./forms/EntityMetadataForm";
    import LocalizationEN from "@enums/LocalizationEN";
    import InspectorTabs from "./InspectorTabs.svelte";
    import EditorUtil from "../../util/EditorUtil";

    let selectedEntity: EntityDTO;
    let components: ComponentDTO[] = [];
    let engineState: EngineStateDTO = {};
    let componentDefinitions: typeof AbstractFormType[];
    let componentMap: ComponentType[] = [];
    let tabIndex = 0;
    let tabs = [];

    const unsubSelection = EngineService.listenToSelectionChanges(selection => updateSelection(selection[0]));
    const unsubLockedEntity = EngineService.listenToLockedEntityChanges(updateSelection);
    const unsubEngineState = EngineService.listenToEngineState(payload => engineState = payload);

    function getEntityTabs(components: ComponentDTO[]): TabDTO[] {
        return [
            {
                icon: "settings",
                label: LocalizationEN.ENTITY_PROPERTIES
            },
            {divider: true},
            ...components.map((c, i) => ({
                icon: EditorUtil.getComponentIcon(c.componentType),
                label: EditorUtil.getComponentLabel(c.componentType),
                index: i
            }))
        ];
    }

    async function updateSelection(payload: number | undefined) {
        selectedEntity = !payload ? undefined : await EngineService.getEntityByID(payload);
        if (selectedEntity == null) {
            tabIndex = 0;
            selectedEntity = undefined;
            components = [];
            return;
        }
        tabIndex = 3;
        components = await EngineService.getEntityComponents(payload);
        componentDefinitions = components.map(c => COMPONENT_DEFINITIONS[c.componentType]);
        componentMap = components.map(c => c.componentType as unknown as ComponentType);
        tabs = selectedEntity ? getEntityTabs(components) : [];
    }

    onDestroy(() => {
        unsubSelection();
        unsubLockedEntity();
        unsubEngineState();
    });

    function postResponse() {
        switch (tabIndex) {
            case 0:
            case 1:
            case 2:
                EngineService.postEngineStateChange(engineState);
                engineState = engineState;
                break;
            case 3:
                EngineService.postEntityChange(selectedEntity);
                selectedEntity = selectedEntity;
                break;
            default:
                EngineService.postComponentChange(selectedEntity.entityID, components[tabIndex - 3]);
                components = components;
                break;
        }
    }
</script>

<div class="wrapper">
    <InspectorTabs
            {tabs}
            {selectedEntity}
            {tabIndex}
            setTabIndex={v => tabIndex = v}
            {componentMap}
    />
    <div class="content">
        {#if tabIndex === 0}
            <Form {postResponse} definition={CameraPreferencesForm} data={engineState}/>
        {:else if tabIndex === 1}
            <Form {postResponse} definition={ViewportPreferencesForm} data={engineState}/>
        {:else if tabIndex === 2}
            <Form {postResponse} definition={RenderingPreferencesForm} data={engineState}/>
        {:else if tabIndex === 3}
            <Form {postResponse} definition={EntityMetadataForm} data={selectedEntity}/>
        {:else if componentDefinitions[tabIndex - 3] != null}
            <Form {postResponse} definition={componentDefinitions[tabIndex - 3]} data={components[tabIndex - 3]}/>
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
