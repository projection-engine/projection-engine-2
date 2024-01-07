<script>
    import ContentGroup from "./ContentGroup.svelte"
    import PropertyHeader from "@lib/components/PropertyHeader.svelte"

    export let data
</script>

{#if data}
    <PropertyHeader title={data.label}/>
    <ContentGroup toRender={data}/>
{/if}
