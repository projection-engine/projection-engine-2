<script lang="ts">
    import {InjectVar} from "@lib/Injection";
    import ProjectService from "@services/ProjectService";
    import {DropdownOption} from "@lib/components/dropdown/DropdownDefinitions";
    import Engine from "@engine-core/Engine";
    import ToasterService from "@services/ToasterService";
    import LocalizationEN from "@enums/LocalizationEN";
    import WebViewService from "@lib/webview/WebViewService";
    import OptionDropdown from "@lib/components/dropdown/OptionDropdown.svelte";

    const webView = InjectVar(WebViewService);
    const projectService = InjectVar(ProjectService);
    const toasterService = InjectVar(ToasterService);
    const engine = InjectVar(Engine);

    const OPTIONS: { label: string, disabled?: boolean, options: DropdownOption[] }[] = [
        {
            label: "File",
            options: [
                {
                    label: "Project",
                    divider: true,
                    children: [
                        {
                            label: "Open",
                            onClick: () => projectService.open()
                        },
                        {
                            label: "Save",
                            onClick: () => projectService.save(),
                        },
                        {
                            label: "Save as",
                            onClick: () => projectService.saveAs()
                        },
                    ]
                },
                {
                    divider: true,
                    label: "Edit",
                    disabled: true,
                    children: []
                },
                {
                    divider: true,
                    label: "Window",
                    children: [
                        {
                            label: "Recompile shaders",
                            onClick: () => engine.buildShaders().then(() => toasterService.success(LocalizationEN.SHADERS_REBUILT))
                        },
                        {
                            label: "Reload",
                            onClick: () => webView.beam("RELOAD")
                        }
                    ]
                },
                {
                    divider: true,
                    label: "Help",
                    disabled: true,
                    children: []
                },

            ]
        },

    ];
</script>


<div class="container">
    {#each OPTIONS as option}
        <OptionDropdown
                disabled={option.disabled}
                cleanLayout={true}
                options={option.options}
                label={option.label}
        />
    {/each}
</div>

<style>
    .container {
        display: flex;
        gap: 4px;
        justify-content: flex-start;
        align-items: center;

        width: 100vw;
        max-height: 40px;
        min-height: 40px;
        padding: 4px;
        border-bottom: 1px var(--pj-border-primary) solid;
    }

</style>
