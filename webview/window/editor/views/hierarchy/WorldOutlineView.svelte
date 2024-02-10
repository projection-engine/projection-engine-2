<script lang="ts">
    import VirtualList from "@sveltejs/svelte-virtual-list"
    import {onDestroy, onMount} from "svelte"
    import HotKeysController from "@lib/HotKeysController"
    import dragDrop from "@lib/components/drag-drop/drag-drop"
    import Header from "./components/WorldOutlineHeader.svelte"
    import HierarchyUtil from "../../util/HierarchyUtil"
    import HierarchyToRenderElement from "./template/ToRenderElement";
    import {InjectVar} from "@lib/Injection";
    import SelectionStore from "@lib/stores/SelectionStore";
    import LocalizationEN from "@enums/LocalizationEN";
    import ComponentBranch from "./components/ComponentBranch.svelte";
    import EntityTreeBranch from "./components/EntityBranchWrapper.svelte";
    import Icon from "@lib/components/icon/Icon.svelte";
    import WorldOutlineStore from "@lib/stores/WorldOutlineStore";


    let ref: HTMLElement
    let search = ""
    let filteredComponent = undefined
    let openTree = {}
    let toRender: HierarchyToRenderElement[] = []
    let selectedList: string[] = []
    let lockedEntity: string

    const ID = crypto.randomUUID()
    const draggable = dragDrop()
    const store = InjectVar(WorldOutlineStore)

    const unsubscribe = store.subscribe((data, changed) => {
        if(changed.includes("openPath")){
            openTree = {...data.openPath}
        }
        fetchHierarchy()
    })

    const unsubSelection = InjectVar(SelectionStore).subscribe(data => {
        selectedList = data.array
        lockedEntity = data.lockedEntity
    }, ["array", "lockedEntity"])

    function fetchHierarchy() {
        toRender = HierarchyUtil.buildTree(openTree, search, filteredComponent)
    }

    onMount(() => {
        store.updateHierarchy()
        HierarchyUtil.initializeView(draggable, ref)
    })

    onDestroy(() => {
        HotKeysController.unbindAction(ref)
        draggable.onDestroy()
        unsubSelection()
        unsubscribe()
    })

    $: isOnSearch = search || filteredComponent;

    function setSearch(v: string) {
        search = v;
        fetchHierarchy()
    }

    function setFilteredComponent(v: string) {
        filteredComponent = v;
        fetchHierarchy()
    }
</script>

<Header {setFilteredComponent} {setSearch} {filteredComponent} {search}/>
<div class="wrapper" id={ID} bind:this={ref}>
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
                            updateOpen={() => fetchHierarchy()}
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
