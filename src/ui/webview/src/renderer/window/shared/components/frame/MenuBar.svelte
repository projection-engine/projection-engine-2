<script lang="ts">
    import Dropdown from "../dropdown/Dropdown.svelte";

    export let options: [{ label: string, options: [{ label: string, onClick: GenericVoidFunction }] }]
    console.trace("INITIALIZED")
</script>


<div class="container">

    {#each options as option}
        <Dropdown asButton={true}>
            <span class="btn" slot="button">
                {option.label}
            </span>
            {#each option.options as menuOption}
                <button on:click={menuOption.onClick}>
                    {menuOption.label}
                </button>
            {/each}
        </Dropdown>
    {/each}
</div>

<style>
    .container {
        display: flex;
        gap: 4px;
        justify-content: flex-start;
        align-items: center;
        width: 100vw;
        height: 30px;
        padding: 4px;
    }
    .btn{
        padding: 4px;
        font-size: .7rem;
        text-align: center;
    }
</style>