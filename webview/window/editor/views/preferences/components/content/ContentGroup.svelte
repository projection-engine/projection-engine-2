<script lang="ts">
    import ContentField from "./ContentField.svelte"
    import Accordion from "@lib/components/accordion/Accordion.svelte"

    export let toRender
</script>

{#each toRender.form as form, i}
    <Accordion title={form.label} startOpen={true}>
        <div data-svelteform="-">
            {#each form.children as field}
                {#if field.divider}
                    <div data-sveltedivider="-"></div>
                {:else}
                    <ContentField
                            toRender={field}
                    />
                {/if}
            {/each}
        </div>
    </Accordion>
{/each}
