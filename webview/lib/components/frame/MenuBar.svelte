<script lang="ts">
    import OptionDropdown from "../dropdown/OptionDropdown.svelte";
    import WebViewService from "../../webview/WebViewService";
    import {InjectVar} from "@lib/Injection";

    export let options: { label: string, options: [{ label: string, onClick: GenericVoidFunction }] }[] = []
    const webView = InjectVar(WebViewService)

    $: optionsMapped = [
        ...options,
        {
            label: "Window",
            options: [{label: "Reload", onClick: () => webView.beam("RELOAD")}]
        }
    ]
</script>


<div class="container">
    {#each optionsMapped as option}
        <OptionDropdown
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