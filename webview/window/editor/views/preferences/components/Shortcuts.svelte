<script lang="ts">
    import ShotcutField from "./ShortcutField.svelte"
    import SettingsStore from "@lib/stores/SettingsStore"
    import PropertyHeader from "@lib/components/PropertyHeader.svelte"
    import LocalizationEN from "@enums/LocalizationEN"
    import {onDestroy} from "svelte"
    import ProjectionEngine from "@lib/ProjectionEngine";
    import SettingsStateDTO from "@lib/stores/state/SettingsStateDTO";
    import {InjectVar} from "@lib/Injection";
    import KEYS from "../../../static/KEYS";

    const settings = InjectVar(SettingsStore) as SettingsStore
    const unsubSettings = settings.subscribe(
        data => {
            const vp = Object.entries(data.viewportHotkeys).map(v => ([...v, "viewportHotkeys", (keys) => updateHotKey("viewportHotkeys", v[0], keys)]))
            const sc = Object.entries(data.shaderEditorHotkeys).map(v => ([...v, "shaderEditorHotkeys", (keys) => updateHotKey("shaderEditorHotkeys", v[0], keys)]))
            const cb = Object.entries(data.contentBrowserHotkeys).map(v => ([...v, "contentBrowserHotkeys", (keys) => updateHotKey("contentBrowserHotkeys", v[0], keys)]))
            allShortcuts = [
                ...Object.values(data.viewportHotkeys),
                ...Object.values(data.shaderEditorHotkeys),
                ...Object.values(data.contentBrowserHotkeys)
            ]
            shortcuts = {
                viewport: vp,
                shaderEditor: sc,
                contentBrowser: cb
            }
        },
        ["contentBrowserHotkeys", "shaderEditorHotkeys", "viewportHotkeys"]
    )
    let shortcuts = {viewport: [], shaderEditor: [], contentBrowser: []}
    let allShortcuts: KEYS[][]

    function update(key, value) {
        ProjectionEngine.SettingsStore.updateStore({[key]: value})
    }

    function updateHotKey(key, objectKey, newValue) {
        const newData = {...settings.getData()[key], [objectKey]: newValue}
        update(key, newData)
    }

    onDestroy(() => unsubSettings())

    const reset = () => {
        const DEFAULT = new SettingsStateDTO
        update("viewportHotkeys", DEFAULT.viewportHotkeys)
        update("contentBrowserHotkeys", DEFAULT.contentBrowserHotkeys)
        update("shaderEditorHotkeys", DEFAULT.shaderEditorHotkeys)
    }
</script>

<PropertyHeader title={LocalizationEN.SHORTCUTS}/>
<fieldset>
    <legend>{LocalizationEN.VIEWPORT}</legend>
    <div class="shortcuts">
        {#each shortcuts.viewport as [key, value, wrapperKey]}
            <ShotcutField all={allShortcuts} wrapperKey={wrapperKey} shortcut={value} key={key}/>
        {/each}
    </div>
</fieldset>
<fieldset>
    <legend>{LocalizationEN.SHADER_EDITOR}</legend>
    <div class="shortcuts">
        {#each shortcuts.shaderEditor as [key, value, wrapperKey]}
            <ShotcutField all={allShortcuts} wrapperKey={wrapperKey} shortcut={value} key={key}/>
        {/each}
    </div>
</fieldset>
<fieldset>
    <legend>{LocalizationEN.CONTENT_BROWSER}</legend>
    <div class="shortcuts">
        {#each shortcuts.contentBrowser as [key, value, wrapperKey]}
            <ShotcutField all={allShortcuts} wrapperKey={wrapperKey} shortcut={value} key={key}/>
        {/each}
    </div>
</fieldset>

<button data-sveltebuttondefault="-" on:click={reset}>
    {LocalizationEN.RESET}
</button>

<style>
    legend {
        font-size: .85rem;
        font-weight: 500;
    }

    fieldset {
        padding-top: 10px;
    }

    .shortcuts {
        max-height: 50vh;
        overflow-y: auto;
        display: flex;
        gap: 8px;
        justify-content: flex-start;
        flex-direction: column;
    }
</style>