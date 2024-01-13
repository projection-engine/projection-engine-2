<script lang="ts">

    import FileSystemUtil from "@lib/FileSystemUtil"
    import TextureItem from "./TextureItem.svelte"
    import CodeItem from "./CodeItem.svelte"
    import ItemMetadata from "./ItemMetadata.svelte"
    import MaterialItem from "./MaterialItem.svelte"
    import MeshItem from "./MeshItem.svelte"
    import Icon from "@lib/components/icon/Icon.svelte"
    import LocalizationEN from "@enums/LocalizationEN"
    import FileTypes from "@enums/FileTypes"
    import {onDestroy, onMount} from "svelte";
    import ContentBrowserStore from "@lib/stores/ContentBrowserStore";
    import ProjectionEngine from "@lib/ProjectionEngine";
    import {InjectVar} from "@lib/Injection";

    const VALID = [FileTypes.TEXTURE, FileTypes.COLLECTION, FileTypes.MATERIAL]

    let selectedFile
    let data
    let fileType

    const unsubCB= InjectVar(ContentBrowserStore).subscribe(data => {
        selectedFile = data.selectedItems[0]
    }, ["selectedItems"])

    $: {
        if (selectedFile) {
            fileType = "." + selectedFile.type
            data = undefined
            if (fileType !== FileTypes.PRIMITIVE ) {
                const fType = VALID.includes(fileType) ? "json" : undefined
                FileSystemUtil.readFile(FileSystemUtil.ASSETS_PATH + selectedFile.id, fType)
                    .then(res => data = res)
            }
        }
    }

    onDestroy(unsubCB)
</script>

<div class="wrapper">
    {#if selectedFile}
        <ItemMetadata item={selectedFile}/>
        {#if fileType === FileTypes.TEXTURE && data != null}
            <TextureItem data={data} item={selectedFile}/>
        {:else if fileType === FileTypes.COMPONENT || fileType === FileTypes.UI_LAYOUT}
            <CodeItem data={data} item={selectedFile}/>
        {:else if data != null && fileType === FileTypes.MATERIAL}
            <MaterialItem data={data} item={selectedFile}/>
        {:else if fileType === FileTypes.PRIMITIVE}
            <MeshItem item={selectedFile}/>
        {/if}
    {:else}
        <div class="empty-wrapper">
            <div data-svelteempty="-" style="position: relative">
                <Icon styles="font-size: 75px">category</Icon>
                {LocalizationEN.CONTENT_BROWSER}
            </div>
        </div>
    {/if}
</div>

<style>
    .empty-wrapper {
        position: relative;
        height: 100%;
    }

    .wrapper {
        width: 300px;
        height: 100%;
        padding: 4px;
        overflow-y: auto;
        overflow-x: hidden;
    }
</style>
