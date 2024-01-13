<script lang="ts">

    import FrameMetadata from "./components/PerformanceStatistics.svelte"
    import SceneStats from "./components/SceneStats.svelte"
    import Icon from "@lib/components/icon/Icon.svelte"
    import ToolTip from "@lib/components/tooltip/ToolTip.svelte"
    import Engine from "@engine-core/Engine"
    import {onDestroy, onMount} from "svelte"
    import EntityUpdateService from "@services/EntityUpdateService"
    import LocalizationEN from "@enums/LocalizationEN"
    import SettingsStore from "@lib/stores/SettingsStore"
    import ProjectionEngine from "@lib/ProjectionEngine";
    import {Inject, InjectVar} from "@lib/Injection";

    let hideFooter = false

    const unsubSettings = InjectVar(SettingsStore).subscribe(data => {
        hideFooter = data.hideFooter
    }, ["hideFooter"])

    onDestroy(unsubSettings)
</script>

<div class="container" style={hideFooter ? "display: none" : undefined}>

    <div class="meta-data" style="justify-content: flex-start">
        <FrameMetadata/>
    </div>

    <div class="meta-data" style="justify-content: flex-end">
        <SceneStats/>
        <div data-sveltevertdivider="-"></div>
        <!--        <div class="version"-->
        <!--             on:click={() => ElectronResources.shell.openExternal("https://github.com/projection-engine")}>-->
        <!--            {LocalizationEN.VERSION}-->
        <!--        </div>-->
    </div>
</div>

<style>
    .meta-data {
        width: 100%;
        display: flex;
        align-items: center;
        gap: 4px;
    }

    .container {
        border-top: var(--pj-border-primary) 1px solid;
        width: 100%;
        height: 25px;
        background: var(--pj-background-quaternary);

        display: flex;
        align-items: center;
        gap: 8px;
        color: var(--pj-color-secondary);
        padding: 0 2px;
        font-size: .7rem;
    }

    .info-container > * {
        display: flex;
        gap: 4px;
        justify-content: flex-start;
        align-items: center;
    }
</style>