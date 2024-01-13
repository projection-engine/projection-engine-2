<script lang="ts">
    import DirectoryDTO from "@lib/dto/fs/DirectoryDTO";
    import {onMount} from "svelte";
    import {InjectVar} from "@lib/Injection";
    import FSService from "@lib/FSService";
    import ItemDTO from "@lib/dto/fs/ItemDTO";

    export let rootDir: string
    export let currentDirectory: DirectoryDTO
    const fsService = InjectVar(FSService)

    let files: ItemDTO[] = []

    $: {
        if(currentDirectory != null) {
            fsService.readDirectory(currentDirectory.getPath())
                .then(res => files = res)
        }
    }
</script>

{#each files as item}
    <div>
        {item.getName()}
    </div>
{/each}


