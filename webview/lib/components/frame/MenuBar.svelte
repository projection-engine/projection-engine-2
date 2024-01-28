<script lang="ts">
    import OptionDropdown from "../dropdown/OptionDropdown.svelte";
    import WebViewService from "../../webview/WebViewService";
    import {InjectVar} from "@lib/Injection";
    import ProjectService from "@services/ProjectService";
    import {DropdownOption} from "@lib/components/dropdown/DropdownDefinitions";
    import Engine from "@engine-core/Engine";
    import ToasterService from "@services/ToasterService";
    import LocalizationEN from "@enums/LocalizationEN";

    const webView = InjectVar(WebViewService)
    const projectService = InjectVar(ProjectService)
    const toasterService = InjectVar(ToasterService)
    const engine = InjectVar(Engine)

    const OPTIONS: {label: string, disabled?: boolean, options: DropdownOption[]}[] = [
        {
            label: "File",
            options: [
                {label: "Open", onClick: () => projectService.open()},
                {divider: true},
                {label: "Save", icon: "save", onClick: () => projectService.save(), noPadding: true},
                {label: "Save as", onClick: () => projectService.saveAs()},
            ]
        },
        {label: "Edit", disabled: true, options: []},
        {
            label: "Window",
            options: [
                {label: "Recompile shaders", onClick: () => engine.buildShaders().then(() => toasterService.success(LocalizationEN.SHADERS_REBUILT))},
                {label: "Reload", onClick: () => webView.beam("RELOAD")}
            ]
        },
        {label: "Help", disabled: true, options: []},
    ]
</script>


<div class="container">
    {#each OPTIONS as option}
        <OptionDropdown
                disabled={option.disabled}
                cleanLayout={true}
                options={option.options}
                label={option.label}
                buttonStyles="border: none !important; height: 25px !important;"
                autoClose={true}/>
    {/each}
</div>

<style>
    .container {
        display: flex;
        gap: 4px;
        justify-content: flex-start;
        align-items: center;
        width: 100vw;
        height: 25px;
        padding: 0 4px;
    }

</style>