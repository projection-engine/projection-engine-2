<script lang="ts">
    import ContentField from "./ContentField.svelte"
    import Accordion from "@lib/components/accordion/Accordion.svelte"
    import {onDestroy, onMount} from "svelte"
    import {InjectVar} from "@lib/Injection";
    import VisualsStore from "@lib/stores/VisualsStore";
    import SettingsStore from "@lib/stores/SettingsStore";
    import SettingsStateDTO from "@lib/stores/state/SettingsStateDTO";
    import VisualsStateDTO from "@lib/stores/state/VisualsStateDTO";

    export let toRender

    let settings: SettingsStateDTO
    let visualSettings: VisualsStateDTO
    const unsubVisuals = InjectVar(VisualsStore).subscribe(data => visualSettings = data)
    const unsubSettings = InjectVar(SettingsStore).subscribe(data => settings = data)

    onDestroy(() => {
        unsubVisuals()
        unsubSettings()
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
