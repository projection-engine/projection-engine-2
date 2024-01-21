<script lang="ts">
    import Icon from "@lib/components/icon/Icon.svelte";
    import EmptyIcon from "@lib/components/icon/EmptyIcon.svelte";
    import {DropdownOption} from "@lib/components/dropdown/DropdownDefinitions";

    export let highlightElementWithId: string = null
    export let option: DropdownOption
</script>
<button data-sveltebuttondefault="-"
        disabled={option.disabled}

        on:click={() => option.onClick()}
        style={option.noPadding ? undefined : "padding-left: 25px;"}
>
    {#if highlightElementWithId !== undefined && highlightElementWithId === option.id}
        <Icon>check</Icon>
    {:else}
        {#if option.icon}
            {#if option.icon === "empty"}
                <EmptyIcon/>
            {:else}
                <Icon>{option.icon}</Icon>
            {/if}
        {/if}
    {/if}
    {option.label}
</button>