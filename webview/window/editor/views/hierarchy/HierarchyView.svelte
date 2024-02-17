<script lang="ts">
    import {onDestroy, onMount} from "svelte"
    import HotKeysController from "@lib/HotKeysController"
    import dragDrop from "@lib/components/drag-drop/drag-drop"
    import HierarchyHeader from "./components/HierarchyHeader.svelte"
    import {InjectVar} from "@lib/Injection";
    import LocalizationEN from "@enums/LocalizationEN";
    import HierarchyNode from "./components/HierarchyNode.svelte";
    import Icon from "@lib/components/icon/Icon.svelte";
    import {HierarchyEntityDTO} from "./hierarchy-definitions";
    import WebViewService from "@lib/webview/WebViewService";
    import EngineService from "../../services/EngineService";
    import {EngineEvents, EntityDTO} from "../../services/engine-definitions";

    let ref: HTMLElement
    let search = ""
    let filteredComponent: number = undefined
    let openTree = {}
    let rootEntity: EntityDTO = null
    let selectedList: number[] = []
    let lockedEntity: number

    const draggable = dragDrop()
    const unsubSelection = EngineService.listenToSelectionChanges(payload => selectedList = payload)
    const unsubHierarchy = EngineService.listenToHierarchyChanges(payload => rootEntity = payload)
    const unsubLockedEntity = EngineService.listenToLockedEntityChanges(payload => lockedEntity = payload)

    onDestroy(() => {
        HotKeysController.unbindAction(ref)
        draggable.onDestroy()
        unsubSelection()
        unsubLockedEntity()
        unsubHierarchy()
    })

    $: isOnSearch = search.length > 0 || filteredComponent !== undefined;

    function setSearch(v: string) {
        search = v;
    }

    function setFilteredComponent(v: number) {
        filteredComponent = v;
    }

    function testSearch(search: string, filteredComponent: number, node: EntityDTO) {
        return (!search || search && node.name.includes(search)) && (!filteredComponent || filteredComponent && node.components.includes(filteredComponent))
    }
</script>

<HierarchyHeader
        lockedEntity={lockedEntity}
        open={openTree}
        root={rootEntity}
        updateOpen={() => openTree = openTree}
        selected={selectedList}
        {setFilteredComponent}
        {setSearch}
        {filteredComponent}
        {search}
/>
<div class="wrapper" bind:this={ref}>
    <div class="content" style={rootEntity == null ? "background: var(--pj-background-quaternary)" : undefined}>
        {#if rootEntity != null}
            <HierarchyNode
                    testSearch={node => testSearch(search, filteredComponent, node)}
                    isOnSearch={isOnSearch}
                    entity={rootEntity}
                    depth={0}
                    selectedList={selectedList}
                    lockedEntity={lockedEntity}
                    open={openTree}
                    updateOpen={() => openTree = openTree}
            />
        {:else}
            <div data-svelteempty="-">
                <Icon styles="font-size: 75px">account_tree</Icon>
                {LocalizationEN.HIERARCHY}
            </div>
        {/if}
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
