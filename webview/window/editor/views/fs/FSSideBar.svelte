<script lang="ts">
    import {InjectVar} from "@lib/Injection";
    import FSService from "@lib/FSService";
    import {onMount} from "svelte";
    import ItemDTO from "@lib/dto/fs/ItemDTO";
    import DirectoryDTO from "@lib/dto/fs/DirectoryDTO";
    import ResizableBar from "@lib/components/resizable/ResizableBar.svelte";
    import LocalizationEN from "@enums/LocalizationEN";

    export let rootDir: string
    export let setCurrentDirectory: GenericVoidFunctionWithP<DirectoryDTO>
    export let currentDirectory: DirectoryDTO

    let folders: DirectoryDTO[] = []
    const fsService = InjectVar(FSService)

    onMount(() => {
        fsService.readDirectory(rootDir)
            .then(res => {
                folders = res.filter(e => e instanceof DirectoryDTO)
            })
    })
</script>

<div class="wrapper">
    <button
            data-sveltehighlight={currentDirectory.getPath() === rootDir ? "-" : ""}
            data-sveltebuttondefault="-"
            on:click={() => setCurrentDirectory(new DirectoryDTO(LocalizationEN.HOME, rootDir))}>
        {LocalizationEN.HOME}
    </button>
    {#each folders as folder}
        <button
                data-sveltehighlight={currentDirectory === folder ? "-" : ""}
                data-sveltebuttondefault="-"
                on:click={() => setCurrentDirectory(folder)}>
            {folder.getName()}
        </button>
    {/each}
</div>
<ResizableBar type="width"/>

<style>
    .wrapper {
        display: flex;
        flex-direction: column;
        overflow-y: auto;
        width: 250px;
    }

    button {
        border: none;
        text-align: left;
        border-bottom: var(--pj-border-primary) 1px solid;
    }
</style>