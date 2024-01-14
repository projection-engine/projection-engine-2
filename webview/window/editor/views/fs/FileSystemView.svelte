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
    import Icon from "@lib/components/icon/Icon.svelte";

    let currentDirectory: DirectoryDTO
    let rootDir: string
    let previousDirectory: DirectoryDTO | null = null
    const fsService = InjectVar(FSService)

    onMount(() => {
        fsService.getRootDirectory()
            .then(res => {
                currentDirectory = new DirectoryDTO(LocalizationEN.HOME, res)
                rootDir = res
            })
    })


    async function backAction() {
        const SEP = await fsService.getSeparator()
        const parts = currentDirectory.getPath().split(SEP)
        parts.pop();
        const newDirPath = parts.join(SEP)
        previousDirectory = currentDirectory
        currentDirectory = new DirectoryDTO(newDirPath.split(SEP).pop(), newDirPath)
    }

    function forwardAction() {
        currentDirectory = previousDirectory
        previousDirectory = null
    }
</script>

{#if rootDir != null}
    <ViewHeader>
        <button data-sveltebuttondefault="-"
                class="button frame button-small frame"
                style="max-width: 22px;gap: 4px"
                on:click={backAction}
        >
            <Icon>arrow_back</Icon>
        </button>

        <button data-sveltebuttondefault="-"
                disabled={previousDirectory == null}
                class="button frame button-small frame"
                style="max-width: 22px;gap: 4px"
                on:click={forwardAction}
        >
            <Icon>arrow_forward</Icon>
        </button>
        <Input
                width="50%"
                hasBorder={true}
                height="22px"
                inputValue={currentDirectory ? currentDirectory.getPath() : null}
        />
    </ViewHeader>

    <div class="wrapper">
        <FSSideBar {rootDir} {currentDirectory} setCurrentDirectory={v => currentDirectory = v}/>
        <Files {currentDirectory} setCurrentDirectory={v => currentDirectory = v}/>
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
