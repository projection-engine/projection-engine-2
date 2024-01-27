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

    export let entity: Entity
    export let lockedEntity: string
    export let isOpen: boolean
    export let isOnSearch: boolean

    let isOnEdit = false
    let ref: HTMLElement
    let containerRef: HTMLElement

    const draggable = dragDrop(true)
    $: draggable.disabled = isOnEdit


    const ID = crypto.randomUUID()
    let entityName = entity.name
    let entityID: string
    let components = []
    let children = 0
    $: {
        if (entityID !== entity.id) {
            if (entityID)
                ProjectionEngine.EntityUpdateService.removeListener(entityID, ID)
            ProjectionEngine.EntityUpdateService.addListener(entity.id, ID, () => {
                entityName = entity.name
                components = HierarchyUtil.mapComponents(entity)
                children = entity.children.array.length
            })
            children = entity.children.array.length
            components = HierarchyUtil.mapComponents(entity)
            entityName = entity.name
            entityID = entity.id
        }
    }

    onMount(() => {
        containerRef.addEventListener("click", e => HierarchyUtil.updateSelection(entity.id, e.ctrlKey))
        ref.addEventListener("dblclick", () => isOnEdit = true)
        draggable.onMount({
            targetElement: ref,
            onDragStart: () => entity,
            dragImage: () => `<div style="display: flex; gap: 4px"><span style="font-size: .9rem;" data-svelteicon="-">view_in_ar</span> ${SelectionStore.getEntitiesSelected().length > 1 ? SelectionStore.getEntitiesSelected().length + " Entities" : entity.name}</div>`,
        })
    })

    onDestroy(() => {
        draggable.onDestroy()
        ProjectionEngine.EntityUpdateService.removeListener(entityID, ID)
    })

    function handleRename(value: string) {
        entityName = entity.name = value
        ProjectionEngine.EntityNamingService.renameEntity(entity.name, entity)
        isOnEdit = false
    }

    $: isLocked = lockedEntity === entity.id
</script>

<div class="info hierarchy-branch" data-sveltenode={entity.id} bind:this={containerRef}>
    <button
            data-sveltelocked={isLocked ? "-" : ""}
            class="button-icon hierarchy-branch"
            style={`--button-color: ${entity.isCollection ? "rgb(" + entity.colorIdentifier + ")" : !isLocked ? "var(--folder-color-darker)" : "var(--folder-color)" }`}
            on:click={() => SelectionStore.setLockedEntity(entity.id)}
    >
        <Icon styles="font-size: 1rem">
            {#if entity.isCollection}
                inventory_2
            {:else}
                view_in_ar
            {/if}
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
        {#each components as component}
            <div class="component">
                <Icon styles="font-size: .9rem">{component.icon}</Icon>
                <ToolTip content={component.label}/>
            </div>
        {/each}
        {#if children > 0}
            <div class="component" style="color: var(--folder-color)">
                <Icon styles="font-size: .9rem">category</Icon>
                <ToolTip content={LocalizationEN.CHILDREN}/>
                <small class="children-quantity">{children}</small>
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
