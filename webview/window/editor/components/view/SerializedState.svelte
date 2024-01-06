<script lang="ts">
    import {getContext, onDestroy, onMount} from "svelte";
    import ViewStateStore from "@lib/stores/ViewStateStore";
    import ViewMetadataContext from "./static/ViewMetadataContext";
    import ProjectionEngine from "@lib/ProjectionEngine";

    export let state: MutableObject
    export let onStateInitialize: GenericVoidFunctionWithP<MutableObject> | undefined
    export let onBeforeDestroy: GenericNonVoidFunction<MutableObject> | undefined
    let isInitialized = false
    const context = getContext<string>(ViewMetadataContext)

    $: {
        if (isInitialized) {
            ProjectionEngine.ViewStateStore.updateViewState(context, state)
        }
    }

    onMount(() => {
        ProjectionEngine.ViewStateStore.onViewMount(context, onStateInitialize)
        isInitialized = true
    })
    onDestroy(() => {
        if (onBeforeDestroy) {
            ProjectionEngine.ViewStateStore.onViewDestroy(context, onBeforeDestroy())
        }
    })
</script>
