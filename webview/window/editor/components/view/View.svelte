<script lang="ts">
    import Hierarchy from "../../views/hierarchy/HierarchyView.svelte"
    import ContentBrowser from "../../views/content-browser/ContentBrowserView.svelte"
    import Inspector from "../../views/inspector/InspectorView.svelte"
    import ShaderEditor from "../../views/shader-editor/ShaderEditorView.svelte"
    import UIEditor from "../../views/ui/UIEditorView.svelte"
    import SceneEditor from "../../views/scene-editor/SceneEditorView.svelte"
    import Metrics from "../../views/metrics/MetricsView.svelte"
    import Console from "../../views/console/ConsoleView.svelte"
    import {ViewContextPath, ViewPlacement, ViewType} from "./ViewDefinitions";
    import {onMount, setContext} from "svelte";
    import SettingsStore from "@lib/stores/SettingsStore";
    import {InjectVar} from "@lib/Injection";

    export let styles: string = ""
    export let index: number
    export let view: ViewType
    export let placement: ViewPlacement

    let ref: HTMLElement
    const settings = InjectVar(SettingsStore) as SettingsStore

    function getComponent(view: ViewType) {
        switch (view) {
            case ViewType.SHADER_EDITOR:
                return ShaderEditor
            case ViewType.HIERARCHY:
                return Hierarchy
            case ViewType.INSPECTOR:
                return Inspector
            case ViewType.FILES:
                return ContentBrowser
            case ViewType.UI:
                return UIEditor
            case ViewType.EDITOR:
                return SceneEditor
            case ViewType.METRICS:
                return Metrics
            case ViewType.CONSOLE:
                return Console
        }
    }

    $: component = getComponent(view)
    $: setContext(ViewContextPath, {view, index, placement})

    $: {
        if (ref != null) {
            ref.addEventListener("mousedown", () => {
                const data = settings.getData()
                if(data.views[data.currentView].setActiveView(index, placement)) {
                    settings.updateStore(data)
                }
            })
        }
    }
</script>

{#if component != null}
    <div class="view" style={styles} bind:this={ref}>
        {#key view}
            <svelte:component this={component}/>
        {/key}
    </div>
{/if}

<style>
    .view {
        height: 100%;
        max-width: 100%;
        width: 100%;
        position: relative;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        align-content: flex-start;
        background: var(--pj-background-quaternary);
    }
</style>
