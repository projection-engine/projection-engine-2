<script lang="ts">
    import VirtualList from "@sveltejs/svelte-virtual-list"
    import {onDestroy, onMount} from "svelte"
    import HotKeysController from "@lib/HotKeysController"
    import dragDrop from "@lib/components/drag-drop/drag-drop"
    import Header from "./components/HierarchyHeader.svelte"
    import HierarchyUtil from "../../util/HierarchyUtil"
    import {InjectVar} from "@lib/Injection";
    import LocalizationEN from "@enums/LocalizationEN";
    import ComponentBranch from "./components/ComponentNode.svelte";
    import EntityTreeBranch from "./components/HierarchyNode.svelte";
    import Icon from "@lib/components/icon/Icon.svelte";
    import {EntityDTO, HierarchyToRenderElement} from "./hierarchy-definitions";
    import WebViewService from "@lib/webview/WebViewService";
    import EngineService from "../../services/EngineService";
    import EngineEvents from "../../services/EngineEvents";
    import HierarchyNode from "./components/HierarchyNode.svelte";


    let ref: HTMLElement
    let search = ""
    let filteredComponent = undefined
    let openTree = {}
    let rootEntity: EntityDTO = null
    let selectedList: number[] = []
    let lockedEntity: number

    const webViewService = InjectVar(WebViewService)
    const draggable = dragDrop()
    const unsubSelection = EngineService.listenToSelectionChanges(payload => selectedList = payload)
    const unsubHierarchy = EngineService.listenToHierarchyChanges(payload => rootEntity = payload)
    const unsubLockedEntity = EngineService.listenToLockedEntityChanges(payload => lockedEntity = payload)

    onMount(() => {
        webViewService.beam(EngineEvents.GET_HIERARCHY)
        HierarchyUtil.initializeView(draggable, ref)
    })

    onDestroy(() => {
        HotKeysController.unbindAction(ref)
        draggable.onDestroy()
        unsubSelection()
        unsubLockedEntity()
        unsubHierarchy()
    })

    $: isOnSearch = search || filteredComponent;

    function setSearch(v: string) {
        search = v;
    }

    function setFilteredComponent(v: string) {
        filteredComponent = v;
    }
</script>

<Header {setFilteredComponent} {setSearch} {filteredComponent} {search}/>
<div class="wrapper" bind:this={ref}>
    <div class="content" style={rootEntity == null ? "background: var(--pj-background-quaternary)" : undefined}>
        {#if rootEntity != null}
            <HierarchyNode
                    testSearch={node => HierarchyUtil.testSearch(filteredComponent, search, node)}
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
