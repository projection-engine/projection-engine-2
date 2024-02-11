<script lang="ts">
    import AbstractFormType from "../forms/AbstractFormType";
    import FormField from "./FormField.svelte";

    export let definition: typeof AbstractFormType;
    export let data: MutableObject;
    export let postResponse: VoidFunction;

    const instance = new definition;
</script>


{#each instance.listProperties() as property}
    <FormField {property} {data} {postResponse} />
{/each}
