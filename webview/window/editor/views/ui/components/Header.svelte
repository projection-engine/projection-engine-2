<script lang="ts">
    import COMPONENTS from "@engine-core/static/Components"
    import GUIService from "@engine-core/services/GUIService"
    import ViewHeader from "../../../components/view/ViewHeader.svelte"
    import Icon from "@lib/components/icon/Icon.svelte"
    import ToolTip from "@lib/components/tooltip/ToolTip.svelte"
    import EngineStateService from "@services/EngineStateService"
    import EntityAPI from "@engine-core/services/EntityAPI"
    import LocalizationEN from "@enums/LocalizationEN"
    import SelectionStore from "@lib/stores/SelectionStore";
    import type Entity from "@engine-core/instances/Entity";
    import ProjectionEngine from "@lib/ProjectionEngine";

    export let isOnSelection:boolean
    export let toggleOnSelection:GenericVoidFunction
    export let selected:Entity
    export let isAutoUpdateEnabled:boolean
    export let toggleAutoUpdate:GenericVoidFunction

    function selectAll() {
    	const m = [], size = ProjectionEngine.Engine.getEntities().array.length
    	for (let i = 0; i < size; i++) {
    		const e = ProjectionEngine.ProjectionEngine.Engine.getEntities().array[i]
    		if (e.uiComponent)
    			m.push(e.id)
    	}
    	SelectionStore.setEntitiesSelected(m)
    }

    function addUI() {
    	const e = EntityAPI.getNewEntityInstance()
    	e.name = "UI-ShaderNode"
    	e.addComponent(COMPONENTS.UI)
    	EngineStateService.add(e)
    }
</script>

<ViewHeader>
    <div class="left-content">
        <button data-sveltebuttondefault="-" on:click={addUI} data-svelteview-header-button="-"
                style="max-width: unset">
            <Icon styles="font-size: .9rem">add</Icon>
            {LocalizationEN.ADD_ELEMENT}
        </button>
        <button data-sveltebuttondefault="-" on:click={selectAll} data-svelteview-header-button="-"
                style="max-width: unset">
            {LocalizationEN.SELECT_ALL}
        </button>
        <div data-sveltevertdivider="-"></div>
        <button data-sveltebuttondefault="-"
                on:click={() => {
                    GUIService.updateAllElements().then(() => {
                        ProjectionEngine.ToastNotificationSystem.log(LocalizationEN.UPDATING_UI)
                    })
                }}
                data-svelteview-header-button="-"
                style="max-width: unset">
            <Icon styles="font-size: .9rem">refresh</Icon>
            <ToolTip content={LocalizationEN.FORCE_UPDATE}/>
        </button>
        <button data-sveltebuttondefault="-" on:click={toggleAutoUpdate} data-svelteview-header-button="-"
                style="max-width: unset">
            <Icon styles="font-size: .9rem">
                {#if isAutoUpdateEnabled}
                    update
                {:else}
                    update_disabled
                {/if}
            </Icon>
            {LocalizationEN.AUTO_UPDATE}
        </button>
        {#if selected}
            <div data-sveltevertdivider="-"></div>
            <small class="entity-selected">
                {selected.name}
            </small>
        {/if}
    </div>

    <div class="right-content">
        <button data-sveltebuttondefault="-" data-sveltehighlight={isOnSelection ? "-" : ""}
                on:click={toggleOnSelection} data-svelteview-header-button="-">
            <Icon>
                highlight_alt
            </Icon>
            <ToolTip content={LocalizationEN.PICKER}/>
        </button>
    </div>

</ViewHeader>

<style>
    .entity-selected {
        padding: 4px;
        height: 20px;
        font-size: .7rem;
        color: var(--pj-color-primary);
        border-radius: 3px;
        background: var(--pj-accent-color);
    }

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
        justify-content: flex-end;
        width: 100%;
    }

    button {
        display: flex;
        gap: 4px;
        align-items: center;
        padding: 0 4px;
        font-size: 0.7rem !important;

        border: none;
    }
</style>
