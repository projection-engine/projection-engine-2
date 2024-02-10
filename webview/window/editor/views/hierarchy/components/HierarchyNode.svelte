<script lang="ts">
    import EntityNode from "./EntityNode.svelte";
    import Icon from "@lib/components/icon/Icon.svelte";
    import ToolTip from "@lib/components/tooltip/ToolTip.svelte";
    import LocalizationEN from "@enums/LocalizationEN";
    import {EntityDTO} from "../hierarchy-definitions";
    import EngineService from "../../../services/EngineService";
    import ComponentNode from "./ComponentNode.svelte";

    export let testSearch: GenericNonVoidFunctionWithP<MutableObject, boolean>
    export let depth: number
    export let isOnSearch: boolean
    export let entity: EntityDTO
    export let open: Record<number, boolean>
    export let updateOpen: GenericVoidFunction
    export let selectedList: number[]
    export let lockedEntity: number

    function onExpand() {
        if (!open[entity.entityID]) {
            open[entity.entityID] = true
            updateOpen()
        } else {
            delete open[entity.entityID]
            closeHierarchy(entity)
            updateOpen()
        }
    }

    function closeHierarchy(entity: EntityDTO) {
        entity.children.forEach(c => {
            delete open[c.entityID]
            closeHierarchy(c)
        })
    }

    $: isOpen = open[entity.entityID]
    $: isNodeSelected = selectedList.includes(entity.entityID)
    $: childQuantity = Math.max(entity.children.length, entity.components.length)
    $: hasChildren = childQuantity > 0
    $: isMatchToSearch = isOnSearch && testSearch(entity)

    function toggleVisibility() {
        EngineService.toggleEntityVisibility(entity.entityID)
    }
</script>

<div
        data-svelteselected={isNodeSelected || isMatchToSearch? "-" : ""}
        data-sveltenode={entity.entityID}
        class="wrapper hierarchy-branch"
        style={(isMatchToSearch && !isNodeSelected ? "--pj-accent-color-light: var(--pj-accent-color-tertiary);" : "")+ "padding-left:" +  (depth * 18 + "px;") + (entity.isActive ? "" : "opacity: .5") }
>

    {#if hasChildren}
        {#each {length: depth} as _, i}
            <div data-sveltevertdivider="-"
                 style={`border-left-style: ${i === 0 ? "solid" : "dashed"}; left: ${i * 18}px`} class="divider"></div>
        {/each}
        <button
                data-sveltebuttondefault="-"
                data-svelteopen={isOpen ? "-" : ""}
                class="button-small hierarchy-branch"
                style="position: relative; z-index: 11;"
                on:click={onExpand}
        >
            <Icon>arrow_drop_down</Icon>
        </button>
    {:else}
        <div class="button-small hierarchy-branch"></div>
    {/if}
    <EntityNode {isOpen} {entity} {lockedEntity} {isOnSearch}/>
    <button
            data-sveltebuttondefault="-"
            class="button-visibility"
            on:click={toggleVisibility}
    >
        <ToolTip content={LocalizationEN.DEACTIVATE}/>
        <Icon styles="font-size: .8rem">
            {#if entity.isActive}
                visibility
            {:else}
                visibility_off
            {/if}
        </Icon>
    </button>
</div>
{#if isOpen}
    {#each entity.components as component}
        <ComponentNode
                entityID={entity.entityID}
                isEntityActive={entity.isActive}
                componentType={component}
                depth={depth + 1}
        />
    {/each}
    {#each entity.children as child}
        <svelte:self
                {testSearch}
                {isOnSearch}
                entity={child}
                depth={depth + 1}
                {selectedList}
                {lockedEntity}
                {open}
                {updateOpen}
        />
    {/each}
{/if}

<style>
    .button-visibility {
        opacity: inherit;
        position: sticky;
        right: 0;
        background: inherit;
        min-height: 23px;
        min-width: 23px;
        max-height: 23px;
        max-width: 23px;

        display: flex;
        align-items: center;
        justify-content: center;
        border: none;
        border-radius: 0;
        background: var(--pj-background-quaternary);
    }

    .divider {
        position: absolute;
        height: 23px;
        transform: translateX(.3rem);
        z-index: 10;
        background: none;
        border-left: var(--pj-border-secondary) 1px dashed;
    }
</style>
