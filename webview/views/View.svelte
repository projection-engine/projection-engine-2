<script>

    import {InjectVar} from "@lib/Injection";
    import WebViewService from "@lib/webview/WebViewService";
    import {onMount} from "svelte";
    import {ViewEvents} from "./definitions";

    const webView = InjectVar(WebViewService);
    let res = "";
    onMount(() => {
        webView.wire(ViewEvents.GET_VIEW_METADATA).then(response => {
            res = JSON.stringify(response);
        });
    });
</script>


<div style="background: blue; width: 100vw; height: 100vh; display: flex; justify-content: center; align-items: center">
    <span>{res}</span>
</div>
