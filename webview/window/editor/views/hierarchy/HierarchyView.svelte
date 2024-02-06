<script lang="ts">
    import VirtualList from "@sveltejs/svelte-virtual-list"
    import {onDestroy, onMount} from "svelte"
    import HotKeysController from "@lib/HotKeysController"
    import dragDrop from "@lib/components/drag-drop/drag-drop"
    import Header from "./components/HierarchyHeader.svelte"
    import HierarchyUtil from "../../util/HierarchyUtil"
    import {InjectVar} from "@lib/Injection";
    import LocalizationEN from "@enums/LocalizationEN";
    import ComponentBranch from "./components/ComponentBranch.svelte";
    import EntityTreeBranch from "./components/EntityBranchWrapper.svelte";
    import Icon from "@lib/components/icon/Icon.svelte";
    import {HierarchyEvents, HierarchyToRenderElement} from "./hierarchy-definitions";
    import WebViewService from "@lib/webview/WebViewService";


    let ref: HTMLElement
    let search = ""
    let filteredComponent = undefined
    let openTree = {}
    let toRender: HierarchyToRenderElement[] = []
    let selectedList: number[] = []
    let lockedEntity: number

    const draggable = dragDrop()
    const webViewService = InjectVar(WebViewService)

    const unsubSelection = webViewService.listen(
        HierarchyEvents.GET_SELECTED_ENTITIES,
        payload => selectedList = JSON.parse(payload.getPayload())
    )

    const unsubHierarchy = webViewService.listen(HierarchyEvents.GET_HIERARCHY, payload => {
            // TODO
        // toRender = HierarchyUtil.buildTree(openTree, search, filteredComponent)
    })

    const unsubLockedEntity = webViewService.listen(
        HierarchyEvents.GET_LOCKED_ENTITY,
        payload => lockedEntity = JSON.parse(payload.getPayload()).id
    )

    onMount(() => {
        webViewService.beam(HierarchyEvents.GET_HIERARCHY)
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
        webViewService.beam(HierarchyEvents.GET_HIERARCHY)
    }

    function setFilteredComponent(v: string) {
        filteredComponent = v;
        webViewService.beam(HierarchyEvents.GET_HIERARCHY)
    }
</script>

<Header {setFilteredComponent} {setSearch} {filteredComponent} {search}/>
<div class="wrapper"  bind:this={ref}>
    <div class="content" style={toRender.length === 0 ? "background: var(--pj-background-quaternary)" : undefined}>
        {#if toRender.length > 0}
            <VirtualList items={toRender} itemHeight={23} let:item>
                {#if item.component}
                    <ComponentBranch
                            component={item.component} depth={item.depth}/>
                {:else}
                    <EntityTreeBranch
                            testSearch={node => HierarchyUtil.testSearch(filteredComponent, search, node)}
                            {isOnSearch}
                            entity={item.node}
                            depth={item.depth}
                            {selectedList}
                            {lockedEntity}
                            open={openTree}
                            updateOpen={() => webViewService.beam(HierarchyEvents.GET_HIERARCHY)}
                    />
                {/if}
            </VirtualList>
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
