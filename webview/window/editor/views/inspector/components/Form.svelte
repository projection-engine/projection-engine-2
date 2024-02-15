<script lang="ts">
    import AbstractFormType from "../forms/AbstractFormType";
    import FormField from "./FormField.svelte";
    import {PropertyType} from "../inspector-definition";

    export let definition: typeof AbstractFormType = null;
    export let instance: AbstractFormType = null;
    export let data: MutableObject;
    export let postResponse: VoidFunction;

    $: container = (instance ?? new definition);
</script>

<div class="wrapper">
    {#each container.listProperties() as property}
        <FormField {property} {data} {postResponse}/>
    {/each}
</div>

<style>
    .wrapper {
        display: flex;
        flex-direction: column;
        gap: 2px;
    }
</style>
