<script lang="ts">
    import TABS from "./static/TABS";
    import LocalizationEN from "@enums/LocalizationEN";
    import COMPONENT_TYPES from "./static/COMPONENT_TYPES";
    import EngineService from "../../services/EngineService";
    import Icon from "@lib/components/icon/Icon.svelte";
    import ToolTip from "@lib/components/tooltip/ToolTip.svelte";
    import Dropdown from "@lib/components/dropdown/Dropdown.svelte";
    import {ComponentType, EntityDTO} from "../../services/engine-definitions";
    import {TabDTO} from "./inspector-definition";

    export let selectedEntity: EntityDTO;
    export let tabIndex: number;
    export let setTabIndex: GenericVoidFunctionWithP<number>;
    export let componentMap: ComponentType[];
    export let tabs: TabDTO[];

</script>

<div class="tabs">
    {#each TABS as button, index}
        <button data-sveltebuttondefault="-"
                data-sveltehighlight={tabIndex === index ? "-" : undefined}
                class="tab-button shared"
                on:click={() => setTabIndex(index)}
        >
            <Icon styles="font-size: .9rem">{button.icon}</Icon>
            <ToolTip content={button.label}/>
        </button>
    {/each}
    {#if selectedEntity}
        <div data-sveltedivider="-"></div>
        <button data-sveltebuttondefault="-"
                data-sveltehighlight={tabIndex === 3 ? "-" : undefined}
                class="tab-button shared"
                on:click={() => tabIndex = 3}
        >
            <Icon styles="font-size: .9rem">settings</Icon>
            <ToolTip content={LocalizationEN.ENTITY}/>
        </button>
        {#each tabs as button, index}
            <button data-sveltebuttondefault="-"
                    data-sveltehighlight={tabIndex === index ? "-" : undefined}
                    class="tab-button shared"
                    on:click={() => setTabIndex(index)}
            >
                <Icon styles="font-size: .9rem">{button.icon}</Icon>
                <ToolTip content={button.label}/>
            </button>
        {/each}
        <Dropdown>
            <button data-sveltebuttondefault="-"
                    slot="button"
                    class="tab-button shared"
            >
                <Icon styles="font-size: .9rem">add</Icon>
                <ToolTip content={LocalizationEN.ADD_COMPONENT}/>
            </button>
            {#each COMPONENT_TYPES as component}
                {#if !componentMap.includes(component.value)}
                    <button
                            data-sveltebuttondefault="-"
                            class="tab-button shared"
                            on:click={() => EngineService.addComponent(selectedEntity.entityID, component.value)}
                    >
                        {component.label}
                    </button>
                {/if}
            {/each}
        </Dropdown>
    {/if}
</div>

<style>
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
</style>
