<script lang="ts">
    import {onMount} from "svelte";
    import ToolTip from "@lib/components/tooltip/ToolTip.svelte";
    import Icon from "@lib/components/icon/Icon.svelte";
    import ModalInput from "../../../components/modal-input/ModalInput.svelte";
    import LocalizationEN from "@enums/LocalizationEN";
    import EngineService from "../../../services/EngineService";
    import EditorUtil from "../../../util/EditorUtil";
    import {EntityDTO} from "../../../services/engine-definitions";

    export let entity: EntityDTO
    export let lockedEntity: number
    export let isOpen: boolean
    export let isOnSearch: boolean

    let isOnEdit = false
    let ref: HTMLElement
    let containerRef: HTMLElement


    onMount(() => {
        containerRef.addEventListener("click", e => EngineService.updateSelection(entity.entityID, e.ctrlKey))
        ref.addEventListener("dblclick", () => isOnEdit = true)
    })

    function handleRename(value: string) {
        entity.name = value

        EngineService.renameEntity(entity.entityID, entity.name);
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
        {entity.name}
        <ToolTip content={entity.name}/>
    </div>

    {#if isOnEdit}
        <ModalInput initialValue={entity.name} handleClose={handleRename}/>
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
