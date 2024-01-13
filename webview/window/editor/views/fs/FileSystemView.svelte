<script lang="ts">
    import ViewHeader from "../../components/view/ViewHeader.svelte";
    import Input from "@lib/components/input/Input.svelte";
    import FSSideBar from "./FSSideBar.svelte";
    import {onMount} from "svelte";
    import {InjectVar} from "@lib/Injection";
    import FSService from "@lib/FSService";
    import DirectoryDTO from "@lib/dto/fs/DirectoryDTO";
    import LocalizationEN from "@enums/LocalizationEN";
    import Files from "./Files.svelte";

    let currentDirectory: DirectoryDTO
    let rootDir: string
    const fsService = InjectVar(FSService)

    onMount(() => {
        fsService.getRootDirectory()
            .then(res => {
                currentDirectory = new DirectoryDTO(LocalizationEN.HOME, res)
                rootDir = res
            })
    })
</script>

{#if rootDir != null}
    <ViewHeader>
        <Input
                width="50%"
                hasBorder={true}
                height="22px"
                inputValue={currentDirectory ? currentDirectory.getPath() : null}
        />
    </ViewHeader>

    <div class="wrapper">
        <FSSideBar {rootDir} {currentDirectory} setCurrentDirectory={v => currentDirectory = v}/>
        <Files {currentDirectory} {rootDir}/>
    </div>
{/if}

<style>
    .wrapper {
        width: 100%;
        height: 100%;
        display: flex;
        overflow: hidden;
    }
</style>
