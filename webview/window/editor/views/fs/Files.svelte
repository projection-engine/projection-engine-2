<script lang="ts">
    import DirectoryDTO from "@lib/dto/fs/DirectoryDTO";
    import {onMount} from "svelte";
    import {InjectVar} from "@lib/Injection";
    import FSService from "@lib/FSService";
    import ItemDTO from "@lib/dto/fs/ItemDTO";
    import LocalizationEN from "@enums/LocalizationEN";
    import Icon from "@lib/components/icon/Icon.svelte";

    export let setCurrentDirectory: GenericVoidFunctionWithP<DirectoryDTO>
    export let currentDirectory: DirectoryDTO
    const fsService = InjectVar(FSService)

    let files: ItemDTO[] = []

    $: {
        if (currentDirectory != null) {
            fsService.readDirectory(currentDirectory.getPath())
                .then(res => files = res)
        }
    }
</script>

<div class="wrapper">
    <div class="header">
        <div>{LocalizationEN.NAME}</div>
        <div>{LocalizationEN.LAST_MODIFIED}</div>
        <div>{LocalizationEN.SIZE}</div>
    </div>
    <div class="entries">
        {#each files as item}
            <div class="entry">
                <div
                        role="button"
                        tabindex="0"
                        aria-pressed="false"
                        on:dblclick={() => {
                            if(item instanceof DirectoryDTO){
                               setCurrentDirectory(item)
                            }
                        }}
                        on:keydown={() => {
                            if(item instanceof DirectoryDTO){
                               setCurrentDirectory(item)
                            }
                        }}
                >
                    {#if item instanceof DirectoryDTO}
                        <Icon styles="color: var(--folder-color)">folder</Icon>
                    {:else}
                        <Icon>description</Icon>
                    {/if}
                    {item.getName()}
                </div>
                <div>{item.getLastModified()}</div>
                <div>{item.getSizeFormatted()}</div>
            </div>
        {/each}
    </div>
</div>

<style>
    .wrapper {
        display: flex;
        flex-direction: column;
        overflow: hidden;
        width: 100%;
        height: 100%;
    }

    .entries {
        display: flex;
        flex-direction: column;
        overflow-y: auto;
        width: 100%;
    }

    .entry:nth-child(odd) {
        background: var(--pj-background-secondary);
    }

    .header {
        display: flex;
        align-items: center;
        min-height: 25px;
        max-height: 25px;
        border-bottom: var(--pj-border-primary) 1px solid;
    }

    .header > div {
        padding: 4px;
        width: 100%;
        font-size: .7rem;
    }

    .entry {
        display: flex;
        align-items: center;
        height: 20px;
        font-size: .7rem;
    }

    .entry > div {
        width: 100%;
        padding: 4px;
        display: flex;
        align-items: center;
    }
</style>