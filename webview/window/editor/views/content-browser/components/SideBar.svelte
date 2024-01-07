<script>
    import SideBarItem from "./SideBarItem.svelte"
    import VirtualList from "@sveltejs/svelte-virtual-list"
    import FileSystemUtil from "@lib/FileSystemUtil"

    export let setCurrentDirectory
    export let currentDirectory


    let openItems = {}
    let hierarchy = []
</script>

<div class="wrapper">
    <VirtualList items={hierarchy} let:item>
        <SideBarItem
                triggerOpen={() => {
                    let open = openItems
                    const inv = !open[item.item.id]
                    if(item.item.id === FileSystemUtil.sep && !inv)
                        open = {}
                    else if(!inv){
                        for(let i =0; i < item.children.length; i++)
                            delete open[item.children[i]]
                    }
                    open[item.item.id] = inv
                    openItems = open
                }}
                open={openItems}
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
