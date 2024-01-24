<script lang="ts">
    import WorldOptions from "./WorldOptions.svelte";
    import Entity from "@engine-core/instances/Entity";
    import {InjectVar} from "@lib/Injection";
    import Engine from "@engine-core/Engine";
    import WorldEntity from "./WorldEntity.svelte";
    import SettingsStore from "@lib/stores/SettingsStore";
    import SelectionStore from "@lib/stores/SelectionStore";
    import {onDestroy, onMount} from "svelte";
    import WorldOutlineService from "@services/WorldOutlineService";

    let search: string = ""
    let rootEntity: Entity
    let lockedEntity: string
    let selectionArray: string[] = []

    const engine = InjectVar(Engine)
    const selectionStore = InjectVar(SelectionStore)
    const settingsStore = InjectVar(SettingsStore)
    const worldOutlineService = InjectVar(WorldOutlineService)

    const unsubscribeSettings = settingsStore.subscribe(() => {
        rootEntity = engine.getRootEntity()
    }, ["projectID"])

    const unsubscribeSelection = selectionStore.subscribe(data => {
        selectionArray = data.array
        lockedEntity = data.lockedEntity
    })

    onDestroy(() => {
        unsubscribeSelection()
        unsubscribeSettings()
    })
</script>

<div class="wrapper">
    <WorldOptions/>
    <div class="content">
        <WorldEntity entity={rootEntity}
                     setSelected={worldOutlineService.setSelected}
                     depth={0}
                     setLockedEntity={worldOutlineService.setLockedEntity}
                     {search}
                     {selectionArray}
                     {lockedEntity}/>
    </div>
</div>

<style>

    .wrapper {
        position: relative;
        width: 100%;
        overflow-x: visible;
        overflow-y: hidden;
        height: 100%;
        max-height: 100%;
    }

    .content {
        min-width: 100%;
        height: 100%;
        width: fit-content;
        overflow: visible;
    }
</style>
