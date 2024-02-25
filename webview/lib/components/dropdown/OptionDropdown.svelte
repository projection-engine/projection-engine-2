<script lang="ts">
    import ToolTip from "../tooltip/ToolTip.svelte";
    import Dropdown from "./Dropdown.svelte";
    import getDropdownHeaderStyles from "./utils/get-dropdown-header-styles";
    import Icon from "../icon/Icon.svelte";
    import Option from "@lib/components/dropdown/Option.svelte";
    import {DropdownOption} from "@lib/components/dropdown/DropdownDefinitions";
    import LocalizationEN from "@enums/LocalizationEN";

    export let label: string = null;
    export let options: DropdownOption[];
    export let cleanLayout: boolean = false;
    export let disabled: boolean = false;
    export let highlightElementWithId: string = null;

    let ref: HTMLSelectElement;

    function onChange() {
        const optionFound = options.map(o => o.children ?? o).flat().find(o => (o.id ?? o.label) === ref.value);
        if (optionFound != null) {
            optionFound.onClick();
            ref.value = "";
        }
    }
</script>

<select
        style={cleanLayout ? "appearance: none;" : undefined}
        on:change={onChange} bind:this={ref} disabled={disabled}
>
    <option value="">{label}</option>
    {#each options as option}
        <Option {option} {highlightElementWithId}/>
    {/each}
</select>

<style>
    select {
        border: none;
        outline: none;
        cursor: pointer;

        max-height: 25px;
        min-height: 25px;
        width: fit-content;
        padding: 0 4px;
        border-radius: 3px;
        background: var(--pj-background-quaternary);

        color: var(--pj-color-secondary);
        font-size: .7rem;
    }

    select:hover {
        background: var(--pj-background-secondary);
    }
</style>

