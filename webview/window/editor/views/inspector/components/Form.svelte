<script lang="ts">
    import AbstractFormType from "../forms/AbstractFormType";
    import FormField from "./FormField.svelte";
    import {PropertyType} from "../inspector-definition";

    export let definition: typeof AbstractFormType;
    export let data: MutableObject;
    export let postResponse: VoidFunction;

    const instance = new definition;
</script>

{#if data != null}
    {#each instance.listProperties() as property}
        {#if property.type === PropertyType.GROUP}
            <div>
                <h3>{property.label}</h3>
            </div>
            {#each property.listProperties() as child}
                <FormField property={child} {data} {postResponse}/>
            {/each}
        {:else}
            <FormField {property} {data} {postResponse}/>
        {/if}
    {/each}
{/if}
