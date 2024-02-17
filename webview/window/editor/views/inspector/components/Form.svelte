<script lang="ts">
    import AbstractFormType from "../forms/AbstractFormType";
    import FormField from "./FormField.svelte";
    import {PropertyType} from "../inspector-definition";

    export let definition: typeof AbstractFormType = null;
    export let data: MutableObject;
    export let postResponse: VoidFunction;

    $: container = new definition;
</script>

{#if container.label}
    <h4>{container.label}</h4>
{/if}
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
        padding-left: clamp(16px, 10%, 64px);
    }

    h4 {
        margin-top: 4px;
        margin-bottom: 0;
        border-bottom: var(--pj-border-primary) 1px solid;
    }
</style>
