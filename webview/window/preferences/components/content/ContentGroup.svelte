<script lang="ts">
    import ContentField from "./ContentField.svelte"
    import Accordion from "@lib/components/accordion/Accordion.svelte"
    import {onDestroy, onMount} from "svelte"
    import {InjectVar} from "@lib/Injection";
    import VisualsStore from "@lib/stores/VisualsStore";
    import SettingsStore from "@lib/stores/SettingsStore";

    const COMPONENT_ID = crypto.randomUUID()
    export let toRender

    let settings
    let visualSettings
    const visualsStore = InjectVar(VisualsStore) as VisualsStore
    const settingsStore = InjectVar(SettingsStore) as SettingsStore

    onMount(() => {
        visualsStore.addListener(COMPONENT_ID, v => visualSettings = v)
        settingsStore.addListener(COMPONENT_ID, v => settings = v)
    })

    onDestroy(() => {
        visualsStore.removeListener(COMPONENT_ID)
        settingsStore.removeListener(COMPONENT_ID)
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
