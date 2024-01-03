<script lang="ts">
    import {onMount} from "svelte"
    import ToastNotificationSystem from "../shared/components/alert/ToastNotificationSystem"
    import MenuBar from "../shared/components/frame/MenuBar.svelte";
    import LocalizationEN from "../../shared/enums/LocalizationEN";
    import type ProjectDTO from "./lib/ProjectDTO";
    import ProjectSystem from "./lib/ProjectSystem";

    let projectsToShow: ProjectDTO[] = []
    let isOnAddProject = false
    let projectName = ""

    onMount(() => {
        ToastNotificationSystem.get()
        ProjectSystem.readAllProjects().then(r => projectsToShow = r)
    })

    function toggleProjectCreation() {
        isOnAddProject = !isOnAddProject
        projectName = ""
    }

    function createProject(){
        ProjectSystem.createAndOpenProject(projectName)
    }
</script>

<MenuBar/>
<div class="wrapper">
    {#if isOnAddProject}
        <div>
            <input data-svelteinput="-" on:input={e => projectName = e.currentTarget.value} placeholder={LocalizationEN.NEW_PROJECT}/>
            <div>
                <button data-sveltebuttondefault="-" data-sveltehighlight="-" on:click={createProject} disabled={projectName.length === 0}>
                    {LocalizationEN.CREATE}
                </button>
                <button data-sveltebuttondefault="-" on:click={toggleProjectCreation}>
                    {LocalizationEN.CANCEL}
                </button>
            </div>
        </div>
    {:else}
        <div>
            <h3>{LocalizationEN.PROJECTS}</h3>
            <button
                    data-sveltebuttondefault="-"
                    on:click={toggleProjectCreation}>
                {LocalizationEN.NEW_PROJECT}
            </button>
        </div>
        {#each projectsToShow as project}
            {project.getName()}
        {/each}
    {/if}
</div>

<style>

    .wrapper {
        padding: 16px 32px;
        width: 100vw;
        height: 100vh;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        gap: 4px;
        position: relative;
        background-color: var(--pj-background-tertiary);
    }

    .content {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        gap: 2px;

        align-items: flex-start;
        overflow-x: hidden;
        overflow-y: auto;
        height: 100%;
    }
</style>