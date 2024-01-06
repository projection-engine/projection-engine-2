<script>
    import SideBarItem from "./SideBarItem.svelte"
    import VirtualList from "@sveltejs/svelte-virtual-list"
    import ContentBrowserHierarchyStore from "@lib/stores/ContentBrowserHierarchyStore"
    import {onDestroy, onMount} from "svelte"
    import FileSystemUtil from "@lib/FileSystemUtil"
    import ProjectionEngine from "@lib/ProjectionEngine";

    const COMPONENT_ID = crypto.randomUUID()

    /** @type {function} */
    export let setCurrentDirectory
    /** @type {{id: string}} */
    export let currentDirectory

    let hierarchy = {items: []}
    onMount(() => ProjectionEngine.ContentBrowserHierarchyStore.addListener(COMPONENT_ID, v => hierarchy = v))
    onDestroy(() => ProjectionEngine.ContentBrowserHierarchyStore.removeListener(COMPONENT_ID))
</script>

<div class="wrapper">
    <VirtualList items={hierarchy.items} let:item>
        <SideBarItem
                triggerOpen={() => {
                    let open = ContentBrowserHierarchyStore.getData().open
                    const inv = !open[item.item.id]
                    if(item.item.id === FileSystemUtil.sep && !inv)
                        open = {}
                    else if(!inv){
                        for(let i =0; i < item.children.length; i++)
                            delete open[item.children[i]]
                    }
                    open[item.item.id] = inv
                ProjectionEngine.    ContentBrowserHierarchyStore.updateStore({open})
                }}
                open={hierarchy.open}
                childQuantity={item.childQuantity}
                depth={item.depth}
                setCurrentDirectory={setCurrentDirectory}
                currentDirectory={currentDirectory}
                id={item.item.id}
                name={item.item.name}
        />
    </VirtualList>
</div>

<style>
    .wrapper {
        display: grid;
        gap: 2px;
        overflow-y: auto;
        width: 300px;
        padding-left: 3px;
        padding-right: 3px;

    }
</style>
