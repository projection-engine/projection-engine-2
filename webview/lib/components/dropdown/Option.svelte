<script lang="ts">
    import Icon from "@lib/components/icon/Icon.svelte";
    import EmptyIcon from "@lib/components/icon/EmptyIcon.svelte";
    import {DropdownOption} from "@lib/components/dropdown/DropdownDefinitions";
    import LocalizationEN from "@enums/LocalizationEN";

    export let highlightElementWithId: string = null
    export let option: DropdownOption
</script>
{#if option.divider}
    {#if option.children}
        <optgroup label={option.label}>
            <hr/>

            {#each option.children as child}
                <svelte:self option={child} {highlightElementWithId}/>
            {/each}
        </optgroup>
    {/if}
{:else}
    <option
            disabled={option.disabled}
            value={option.id ?? option.label}
            selected={highlightElementWithId != null && highlightElementWithId === option.id}
    >
        {option.label}
    </option>
{/if}

<style>
    optgroup {
        font-weight: 500;
    }
</style>
