<script lang="ts">
    import Entity from "@engine-core/instances/Entity";
    import Icon from "@lib/components/icon/Icon.svelte";

    export let entity: Entity
    export let depth: number
    export let setSelected: GenericVoidFunctionWith2P<Entity, boolean>
    export let setLockedEntity: GenericVoidFunctionWithP<Entity>
    export let search: string
    export let selectionArray: string[]
    export let lockedEntity: string

    $: isSelected = selectionArray.includes(entity.getId())
    $: isLocked = lockedEntity === entity.getId()
</script>

<div class="line" style={`padding-left: ${depth * 4}px`}>
    <button data-sveltebuttondefault="-" class="lockButton" on:click={() => setLockedEntity(entity)}
            data-sveltehighlight={isLocked ? "-" : undefined}>
        <Icon>pin</Icon>
    </button>
    <button data-sveltebuttondefault="-" class="entity" on:click={event => setSelected(entity, event.ctrlKey)}
            class:highlightEntity={isSelected}>
        {entity.name}
    </button>
</div>

{#each entity.children.array as childEntity}
    <svelte:self entity={childEntity}
                 depth={depth+1}
                 {setSelected}
                 {setLockedEntity}
                 {search}
                 {selectionArray}
                 {lockedEntity}
    />
{/each}

<style>
    .line {
        height: 25px;
        width: 100%;
        display: flex;
        align-items: center;
        background: var(--pj-background-secondary);
    }

    .line:nth-child(odd){
        background: var(--pj-background-tertiary);
    }

    .lockButton{
        max-width: 25px;
        max-height: 25px;

        min-width: 25px;
        min-height: 25px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .entity {
        width: 100%;
        height: 100%;
    }

    .highlightEntity {
        background: var(--pj-background-primary-light);
    }
</style>