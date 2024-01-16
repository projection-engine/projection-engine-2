<script lang="ts">
    import {InjectVar} from "@lib/Injection";
    import FSService from "@lib/FSService";
    import {onMount} from "svelte";
    import DirectoryDTO from "@lib/dto/fs/DirectoryDTO";
    import ResizableBar from "@lib/components/resizable/ResizableBar.svelte";
    import LocalizationEN from "@enums/LocalizationEN";
    import Icon from "@lib/components/icon/Icon.svelte";

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
        <Icon styles="color: var(--folder-color)">home</Icon>
        {LocalizationEN.HOME}
    </button>
    {#each folders as folder}
        <button
                data-sveltehighlight={currentDirectory === folder ? "-" : ""}
                data-sveltebuttondefault="-"
                on:click={() => setCurrentDirectory(folder)}>
            <Icon styles="color: var(--folder-color)">folder</Icon>
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
        border-radius: 0;
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: .7rem;
    }

    button:nth-child(odd) {
        background: var(--pj-background-tertiary);
    }
</style>