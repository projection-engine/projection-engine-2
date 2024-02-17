<script lang="ts">
    import Icon from "@lib/components/icon/Icon.svelte";
    import EditorUtil from "../../../util/EditorUtil";
    import {onMount} from "svelte";
    import EngineService from "../../../services/EngineService";
    import {ComponentType} from "../../../services/engine-definitions";

    export let depth: number
    export let isEntityActive: boolean
    export let componentType: ComponentType
    export let entityID: number

    let ref: HTMLElement

    onMount(() => {
        ref.addEventListener("click", e => EngineService.updateSelection(entityID, e.ctrlKey))
    })

    $: icon = EditorUtil.getComponentIcon(componentType)
    $: label = EditorUtil.getComponentLabel(componentType)
</script>


<div
        class="wrapper hierarchy-branch"
        class:element={true}
        data-svelteentity={entityID}
        style={"padding-left:" +  (depth * 18 + "px;") + (isEntityActive ? "" : "opacity: .5") }
>
    <div class="info hierarchy-branch" data-sveltenode={entityID} bind:this={ref}>
        {#each {length: depth} as _, i}
            <div data-sveltevertdivider="-"
                 style={`border-left-style: ${i === 0 ? "solid" : "dashed"}; left: ${i * 18}px`} class="divider"></div>
        {/each}
        <div class="button-small hierarchy-branch"></div>
        <button
                class="button-icon hierarchy-branch"
                on:click={() => EngineService.setLockedEntity(entityID)}
        >
            <Icon styles="font-size: 1rem; color: var(--pj-accent-color-tertiary)">{icon}</Icon>
        </button>
        <small>{label}</small>
    </div>
</div>

<style>
    small {
        font-size: .7rem;
    }

    .divider {
        position: absolute;
        height: 23px;
        transform: translateX(.3rem);
        z-index: 10;
        background: none;
        border-left: var(--pj-border-secondary) 1px dashed;
    }
</style>
