<script lang="ts">
    import ToolTip from "../tooltip/ToolTip.svelte";
    import Dropdown from "./Dropdown.svelte";
    import getDropdownHeaderStyles from "./utils/get-dropdown-header-styles";
    import Icon from "../icon/Icon.svelte";
    import Option from "@lib/components/dropdown/Option.svelte";
    import {DropdownOption} from "@lib/components/dropdown/DropdownDefinitions";

    export let label: string = null
    export let labelAsIcon: boolean = false
    export let options: DropdownOption[]
    export let cleanLayout: boolean = false
    export let tooltip: string = null
    export let disabled: boolean = false
    export let buttonStyles: string = null
    export let highlightElementWithId: any = null

</script>

<Dropdown buttonStyles={cleanLayout ? undefined : getDropdownHeaderStyles()} hideArrow={cleanLayout}
          disabled={disabled}>
    <button
            disabled={disabled}
            data-sveltebuttondefault="-"
            slot="button"
            data-svelteview-header-dropdown={cleanLayout? "" : "-"}
            style={buttonStyles + (cleanLayout ? "border: none; display: flex; align-items: center" : undefined)}
    >
        {#if labelAsIcon}
            <Icon>{label}</Icon>
            {#if tooltip}
                <ToolTip content={tooltip}/>
            {/if}
        {:else}
            {label}
            <ToolTip content={label}/>
        {/if}
    </button>

    {#each options as option}
        {#if option.divider}
            <div class="group dropdown-list">
                {#if option.label != null}
                    <strong style="white-space: nowrap; padding-left: 4px">{option.label}</strong>
                {/if}
                <div data-sveltedivider="-"></div>
            </div>
        {:else}
            <Option {option} {highlightElementWithId}/>
        {/if}
    {/each}
</Dropdown>

