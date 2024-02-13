<script lang="ts">
    import {PropertyType} from "../inspector-definition";
    import LocalizationEN from "@enums/LocalizationEN";
    import Input from "@lib/components/input/Input.svelte";
    import Range from "@lib/components/range/Range.svelte";
    import Checkbox from "@lib/components/checkbox/Checkbox.svelte";
    import Dropdown from "@lib/components/dropdown/Dropdown.svelte";
    import ColorPicker from "@lib/components/color-picker/ColorPicker.svelte";
    import Icon from "@lib/components/icon/Icon.svelte";
    import EmptyIcon from "@lib/components/icon/EmptyIcon.svelte";
    import Selector from "../../../components/selector/Selector.svelte";
    import AbstractFormType from "../forms/AbstractFormType";

    export let data: MutableObject;
    export let property: AbstractFormType;
    export let postResponse: VoidFunction;

    $: value = property.key != null ? data[property.key] : null;

    let selectorType: string;

    $: {
        if (property.type === PropertyType.IMAGE) {
            selectorType = "image";
        } else if (property.type === PropertyType.MATERIAL) {
            selectorType = "material";
        } else if (property.type === PropertyType.TERRAIN) {
            selectorType = "terrain";
        } else if (property.type === PropertyType.MESH) {
            selectorType = "mesh";
        }
    }

    function submit(newValue: any) {
        if(property.key != null) {
            data[property.key] = newValue;
        }
        postResponse()
    }

    function isDisabled(): boolean {
        if(property.disabledIf != null) {
            return property.disabledIf(data);
        }
        return false;
    }

</script>

<div data-svelteform="-">
    {#if property.type === PropertyType.NUMBER}
        <Range
                onFinish={v => submit(v)}
                minValue={property.settings.min}
                maxValue={property.settings.max}
                integer={property.settings.increment === 1}
                incrementPercentage={property.settings.increment}
                label={property.label}
                value={value}
                isAngle={property.settings.isAngle}
                disabled={isDisabled()}
        />
    {:else if property.type === PropertyType.ARRAY}
        {#each property.settings.labels as partial, index}
            <Range
                    disabled={isDisabled()}
                    isAngle={property.settings.isAngle}
                    onFinish={v => submit(v)}
                    minValue={property.settings.min}
                    maxValue={property.settings.max}
                    label={LocalizationEN[partial] || partial}
                    value={value[index]}
            />
        {/each}
    {:else if property.type === PropertyType.BOOLEAN}
        <Checkbox
                handleCheck={() => submit(!value)}
                label={property.label}
                checked={value}
                disabled={isDisabled()}
        />
    {:else if property.type === PropertyType.OPTIONS}
        <Dropdown disabled={isDisabled()} width="100%"
                  buttonStyles="border-radius: 3px; border: var(--pj-border-primary) 1px solid">
            {#each property.settings.options as option}
                <button data-sveltebuttondefault="-" on:click={() =>  submit(option.value)}>
                    {#if value === option.value}
                        <Icon>check</Icon>
                    {:else}
                        <EmptyIcon/>
                    {/if}
                    {option.label}
                </button>
            {/each}
        </Dropdown>
    {:else if property.type === PropertyType.STRING}
        <Input
                inputValue={value}
                onEnter={v => submit(v)}
                onBlur={(_,v) => submit(v)}
                placeholder={property.label}
                disabled={isDisabled()}
        />
    {:else if property.type === PropertyType.COLOR}
        <ColorPicker
                disabled={isDisabled()}
                submit={({r,g,b}) => submit([r, g, b])}
                label={property.label}
                value={value}
        />
    {:else}
        <Selector
                disabled={isDisabled()}
                handleChange={src => submit(src)}
                type={selectorType}
                selected={value}
        />
    {/if}
</div>
