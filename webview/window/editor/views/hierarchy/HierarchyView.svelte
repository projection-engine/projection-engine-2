<script lang="ts">

    import Tree from "./components/Tree.svelte"
    import {onDestroy, onMount} from "svelte"
    import HotKeysController from "@lib/HotKeysController"
    import dragDrop from "@lib/components/drag-drop/drag-drop"
    import Header from "./components/Header.svelte"
    import HierarchyUtil from "../../util/HierarchyUtil"
    import SerializedState from "../../components/view/SerializedState.svelte";
    import getViewportContext from "../../templates/get-viewport-context";
    import HierarchyToRenderElement from "./template/ToRenderElement";
    import ProjectionEngine from "@lib/ProjectionEngine";

    const ID = crypto.randomUUID()
    const draggable = dragDrop()
    let ref: HTMLElement
    let search = ""
    let filteredComponent = undefined
    let openTree = {}
    let toRender: HierarchyToRenderElement[] = []
    let selectedList: string[] = []
    let lockedEntity

    function updateHierarchy(op?: MutableObject) {
        const openLocal = op ?? openTree
        if (op !== openTree && op !== undefined)
            ProjectionEngine.EntityHierarchyService.updateHierarchy()
        openTree = openLocal
        toRender = HierarchyUtil.buildTree(openTree, search, filteredComponent)
    }

    onMount(() => {
        HierarchyUtil.initializeView(draggable, ref)
        ProjectionEngine.EntityHierarchyService.registerListener(ID, updateHierarchy)
        ProjectionEngine.ContextMenuService.mount(getViewportContext(), ID)
        ProjectionEngine.EntitySelectionStore.addListener(ID, data => {
            selectedList = data.array
            lockedEntity = data.lockedEntity
        })
    })

    onDestroy(() => {
        HotKeysController.unbindAction(ref)
        draggable.onDestroy()
        ProjectionEngine.EntitySelectionStore.removeListener(ID)
        ProjectionEngine.EntityHierarchyService.removeListener(ID)
        ProjectionEngine.ContextMenuService.destroy(ID)
    })
</script>

<SerializedState
        state={{search, filteredComponent, openTree}}
        onStateInitialize={ state => {
             search = state.search
             filteredComponent = state.filteredComponent
             openTree  = state.openTree
             updateHierarchy()
        }}
/>
<Header
        setFilteredComponent={v => {filteredComponent = v; updateHierarchy()}}
        setSearch={v => {search = v; updateHierarchy()}}
        {filteredComponent}
        {search}
/>
<div
        data-svelteself={"-"}
        class="wrapper"
        id={ID}
        bind:this={ref}
>
    <div class="content" style={toRender.length === 0 ? "background: var(--pj-background-quaternary)" : undefined}>
        <Tree
                isOnSearch={search || filteredComponent}
                updateOpen={() => updateHierarchy(openTree)}
                {openTree}
                {toRender}
                {selectedList}
                {lockedEntity}
                {filteredComponent}
                {ID}
                testSearch={node => HierarchyUtil.testSearch(filteredComponent, search, node)}
        />
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
