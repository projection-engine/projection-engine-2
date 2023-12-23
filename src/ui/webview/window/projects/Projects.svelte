<script lang="ts">
    import {onMount} from "svelte"
    import ToastNotificationSystem from "../shared/components/alert/ToastNotificationSystem"
    import MenuBar from "../shared/components/frame/MenuBar.svelte";
    import LocalizationEN from "../../shared/enums/LocalizationEN";
    import type ProjectDTO from "./lib/ProjectDTO";
    import ProjectSystem from "./lib/ProjectSystem";
    import WebViewSystem from "../shared/WebViewSystem";

    let projectsToShow: ProjectDTO[] = []

    onMount(() => {
        ToastNotificationSystem.get()
        projectsToShow = ProjectSystem.readAllProjects()
    })
</script>

<MenuBar
        options={[{label: "Window", options: [{label: "Reload", onClick: () => WebViewSystem.sendMessage("RELOAD")   }]}]}/>
<div class="wrapper">
    <h3>{LocalizationEN.PROJECTS}</h3>
    <div class="content">

    </div>
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