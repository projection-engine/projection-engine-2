<script>
    import ContentField from "./ContentField.svelte"
    import Accordion from "../../../shared/components/accordion/Accordion.svelte"
    import {onDestroy, onMount} from "svelte"
    import ProjectionEngine from "../../../ProjectionEngine";

    const COMPONENT_ID = crypto.randomUUID()
    export let toRender

    let settings
    let visualSettings

    onMount(() => {
        ProjectionEngine.VisualsStore.addListener(COMPONENT_ID, v => visualSettings = v)
        ProjectionEngine.SettingsStore.addListener(COMPONENT_ID, v => settings = v)
    })

    onDestroy(() => {
        ProjectionEngine.VisualsStore.removeListener(COMPONENT_ID)
        ProjectionEngine.SettingsStore.removeListener(COMPONENT_ID)
    })
</script>

{#if settings !== undefined && visualSettings !== undefined}
    {#each toRender.form as form, i}
        <Accordion title={form.label} startOpen={true}>
            <div data-svelteform="-">
                {#each form.children as field}
                    {#if field.divider}
                        <div data-sveltedivider="-"></div>
                    {:else}
                        <ContentField
                                {settings}
                                {visualSettings}
                                toRender={field}
                        />
                    {/if}
                {/each}
            </div>
        </Accordion>
    {/each}
{/if}
