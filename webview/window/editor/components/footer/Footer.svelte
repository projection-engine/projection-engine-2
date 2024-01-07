<script>

    import FrameMetadata from "./components/PerformanceStatistics.svelte"
    import SceneStats from "./components/SceneStats.svelte"
    import Icon from "@lib/components/icon/Icon.svelte"
    import ToolTip from "@lib/components/tooltip/ToolTip.svelte"
    import Engine from "@engine-core/Engine"
    import {onDestroy, onMount} from "svelte"
    import EntityUpdateService from "../../../services/EntityUpdateService"
    import LocalizationEN from "@enums/LocalizationEN"
    import SettingsStore from "@lib/stores/SettingsStore"
    import ProjectionEngine from "@lib/ProjectionEngine";

    const COMPONENT_ID = crypto.randomUUID()
    let settings = {}

    let loadedLevel
    let entityID

    function load() {
        loadedLevel = ProjectionEngine.Engine.loadedLevel?.name
        entityID = ProjectionEngine.Engine.loadedLevel?.id

        if (entityID)
            ProjectionEngine.EntityUpdateService.removeListener(entityID, COMPONENT_ID)

        if (!loadedLevel)
            return
        ProjectionEngine.EntityUpdateService.addListener(entityID, COMPONENT_ID, () => {
            loadedLevel = ProjectionEngine.Engine.loadedLevel.name
        })
    }

    onMount(() => {
        ProjectionEngine.SettingsStore.addListener(COMPONENT_ID, data => settings = data, ["hideFooter"])
        ProjectionEngine.Engine.addLevelLoaderListener(COMPONENT_ID, load)
        load()
    })

    onDestroy(() => {
        ProjectionEngine.SettingsStore.removeListener(COMPONENT_ID)
        ProjectionEngine.Engine.removeLevelLoaderListener(COMPONENT_ID)
    })
</script>

<div class="container" style={settings.hideFooter ? "display: none" : undefined}>

    <div class="meta-data" style="justify-content: flex-start">
        {#if loadedLevel}
            <div class="wrapper footer-header"
                 style="max-width: clamp(100px, 5vw, 100px); background: var(--pj-background-primary)">
                <Icon styles="font-size: .9rem">forest</Icon>
                <small data-svelteoverflow="-">{loadedLevel}</small>
                <ToolTip content={LocalizationEN.LOADED_LEVEL}/>
            </div>
            <div data-sveltevertdivider="-" style="margin: 0 2px"></div>
        {/if}
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