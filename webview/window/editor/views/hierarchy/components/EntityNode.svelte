<script lang="ts">
    import dragDrop from "@lib/components/drag-drop/drag-drop";
    import {onDestroy, onMount} from "svelte";
    import ToolTip from "@lib/components/tooltip/ToolTip.svelte";
    import Icon from "@lib/components/icon/Icon.svelte";
    import Entity from "@engine-core/instances/Entity";
    import ModalInput from "../../../components/modal-input/ModalInput.svelte";
    import LocalizationEN from "@enums/LocalizationEN";
    import HierarchyUtil from "../../../util/HierarchyUtil";
    import SelectionStore from "@lib/stores/SelectionStore";
    import ProjectionEngine from "@lib/ProjectionEngine";
    import {EntityDTO} from "../hierarchy-definitions";
    import EngineService from "../../../services/EngineService";
    import EditorUtil from "../../../util/EditorUtil";

    export let entity: EntityDTO
    export let lockedEntity: number
    export let isOpen: boolean
    export let isOnSearch: boolean

    let isOnEdit = false
    let ref: HTMLElement
    let containerRef: HTMLElement

    const draggable = dragDrop(true)
    $: draggable.disabled = isOnEdit

    let entityName = entity.name
    $: entityName = entity.name

    onMount(() => {
        containerRef.addEventListener("click", e => EngineService.updateSelection(entity.entityID, e.ctrlKey))
        ref.addEventListener("dblclick", () => isOnEdit = true)
        draggable.onMount({
            targetElement: ref,
            onDragStart: () => entity,
            dragImage: () => `<div style="display: flex; gap: 4px"><span style="font-size: .9rem;" data-svelteicon="-">view_in_ar</span> ${SelectionStore.getEntitiesSelected().length > 1 ? SelectionStore.getEntitiesSelected().length + " Entities" : entity.name}</div>`,
        })
    })

    onDestroy(() => draggable.onDestroy())

    function handleRename(value: string) {
        entityName = entity.name = value
        isOnEdit = false
    }

    $: isLocked = lockedEntity === entity.entityID
</script>

<div class="info hierarchy-branch" data-sveltenode={entity.entityID} bind:this={containerRef}>
    <button
            data-sveltelocked={isLocked ? "-" : ""}
            class="button-icon hierarchy-branch"
            style={`--button-color: ${!isLocked ? "var(--folder-color-darker)" : "var(--folder-color)" }`}
            on:click={() => EngineService.setLockedEntity(entity.entityID)}
    >
        <Icon styles="font-size: 1rem">
                view_in_ar
        </Icon>
    </button>

    <div bind:this={ref}>
        {entityName}
        <ToolTip content={entityName}/>
    </div>

    {#if isOnEdit}
        <ModalInput initialValue={entityName} handleClose={handleRename}/>
    {/if}

    {#if !isOpen && !isOnSearch}
        {#each entity.components as component}
            <div class="component">
                <Icon styles="font-size: .9rem">{EditorUtil.getComponentIcon(component)}</Icon>
                <ToolTip content={EditorUtil.getComponentLabel(component)}/>
            </div>
        {/each}
        {#if entity.children.length > 0}
            <div class="component" style="color: var(--folder-color)">
                <Icon styles="font-size: .9rem">category</Icon>
                <ToolTip content={LocalizationEN.CHILDREN}/>
                <small class="children-quantity">{entity.children.length}</small>
            </div>
        {/if}
    {/if}
</div>

<style>
    .children-quantity {
        font-size: .5rem;
        position: absolute;
        left: 50%;
        bottom: -3px;
        background: rgba(0, 0, 0, .75);
        padding: 0 2px;
        height: fit-content;
        border-radius: 3px;
    }

    .component {
        color: var(--pj-accent-color-tertiary);
        display: flex;
        align-items: center;
        position: relative;
        justify-content: center;
    }
</style>
