<script>
    import NATIVE_COMPONENTS from "../static/NATIVE_COMPONENTS"
    import Icon from "@lib/components/icon/Icon.svelte"
    import ProjectionEngine from "@lib/ProjectionEngine";

    export let offset
    export let entity
</script>
<div data-sveltebuttongrouprow="-">
    {#each [NATIVE_COMPONENTS[offset], NATIVE_COMPONENTS[offset + 1], NATIVE_COMPONENTS[offset + 2]] as data}
        {#if data}
            <button
                    data-svelteinline="-"
                    on:click={(e) =>{
                    entity.addComponent(data[0])
                    e.target.closeDropdown()

                }}
            >
                <Icon styles="font-size: 1rem">{data[2]}</Icon>
                <small data-svelteoverflow="-">{data[1]}</small>
            </button>
        {/if}
    {/each}
</div>
