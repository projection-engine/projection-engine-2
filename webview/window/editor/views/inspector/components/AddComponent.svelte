<script lang="ts">
    import Icon from "@lib/components/icon/Icon.svelte"
    import Dropdown from "@lib/components/dropdown/Dropdown.svelte"
    import LocalizationEN from "@enums/LocalizationEN"
    import NATIVE_COMPONENTS from "../static/NATIVE_COMPONENTS";
    import Entity from "@engine-core/instances/Entity";

    export let entity: Entity
</script>


<Dropdown
        styles="width: 20vw; padding: 4px;  overflow: hidden"
        buttonStyles="min-height: 22px, max-height: 22px; "
>
    <button
            data-sveltebuttondefault="-"
            data-svelteinline="-"
            slot="button"
    >
        <Icon styles="font-size: 1rem">add</Icon>
        {LocalizationEN.ADD_COMPONENT}
    </button>
    {#each NATIVE_COMPONENTS as component}
        {#if !entity.components.has(component[0])}
            <button
                    data-sveltebuttondefault="-"
                    data-svelteinline="-"
                    on:click={(e) =>{
                        entity.addComponent(component[0])
                    }}
            >
                <Icon styles="font-size: 1rem">{component[2]}</Icon>
                <small data-svelteoverflow="-">{component[1]}</small>
            </button>

        {/if}
    {/each}
</Dropdown>

<style>
    button {
        justify-content: flex-start;
        gap: 4px;
        max-height: 22px;
        min-height: 22px;
        border: none;
        width: 100%;
    }
</style>
