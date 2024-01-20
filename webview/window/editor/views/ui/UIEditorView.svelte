<script lang="ts">
    import {onDestroy, onMount} from "svelte"
    import GUIService from "@engine-core/services/GUIService"
    import QueryAPI from "@engine-core/services/QueryAPI"
    import Header from "./components/Header.svelte"
    import GPUService from "@engine-core/services/GPUService"
    import LocalizationEN from "@enums/LocalizationEN"
    import SelectionStore from "@lib/stores/SelectionStore";
    import type Entity from "@engine-core/instances/Entity";
    import ProjectionEngine from "@lib/ProjectionEngine";

    const COMPONENT_ID = crypto.randomUUID()

    let ref: HTMLElement
    let tooltipRef: HTMLElement
    let isOnSelection = false
    let isAutoUpdateEnabled = true
    let selectedEntity: Entity


    const resizeObserver = new ResizeObserver(() => GUIService.document.style.height = ref.offsetHeight + "px")

    function clickHandler(e) {
        if (!isOnSelection)
            return

        const bBox = e.target.getBoundingClientRect()
        const entity = QueryAPI.getEntityByID(e.target.getAttribute("data-entityid"))

        tooltipRef.style.width = bBox.width + "px"
        tooltipRef.style.height = bBox.height + "px"
        tooltipRef.style.top = bBox.top + "px"
        tooltipRef.style.left = bBox.left + "px"
        tooltipRef.style.zIndex = "500"
        tooltipRef.style.opacity = "1"

        if (e.ctrl)
            SelectionStore.setEntitiesSelected([...SelectionStore.getEntitiesSelected(), tooltipRef.hovered.id])
        else
            SelectionStore.setEntitiesSelected(entity.id)
        selectedEntity = entity
    }

    $: if (!isOnSelection && tooltipRef) tooltipRef.style.zIndex = "-1"

    function update() {
        const targets = document.querySelectorAll("[data-enginewrapper='-']")
        for (let i = 0; i < targets.length; i++) {
            const t = targets[i]
            t.removeEventListener("click", clickHandler)
            t.addEventListener("click", clickHandler)
        }
    }

    let updateInterval
    $: {
        clearInterval(updateInterval)
        if (isAutoUpdateEnabled) {
            updateInterval = setInterval(async () => {
                await GUIService.updateAllElements()
                ProjectionEngine.ToastNotificationSystem.log(LocalizationEN.UPDATING_UI)
            }, 15000)
        }
    }

    onMount(() => {
        resizeObserver.observe(ref)
        GUIService.showUI()

        GUIService.document.style.height = (GPUService.canvas.getBoundingClientRect().height - 28) + "px"
        GUIService.document.style.top = "28px"
        ProjectionEngine.EntityHierarchyService.registerListener(COMPONENT_ID, update)
        update()
    })

    onDestroy(() => {
        clearInterval(updateInterval)
        resizeObserver.disconnect()
        ProjectionEngine.EntityHierarchyService.removeListener(COMPONENT_ID)
        GUIService.hideUI()
        GUIService.document.style.height = "100%"
        GUIService.document.style.top = "0"
    })
</script>

<Header
        selected={selectedEntity}
        isOnSelection={isOnSelection}
        toggleOnSelection={() => isOnSelection = !isOnSelection}
        isAutoUpdateEnabled={isAutoUpdateEnabled}
        toggleAutoUpdate={() => isAutoUpdateEnabled = !isAutoUpdateEnabled}
/>
<div class="wrapper ui" bind:this={ref}>
    <div class="tooltip" id={COMPONENT_ID} bind:this={tooltipRef}></div>
</div>

<style>
    .tooltip {
        position: fixed;
        border: var(--pj-accent-color) 2px solid;

        font-size: .8rem;
        font-weight: 500;
        z-index: -1;
        display: grid;
        align-content: center;
        align-items: center;
        justify-content: right;
        padding: 4px;
    }

    .wrapper.ui {

        overflow: hidden;

        width: 100%;
        height: calc(100% - 25px);
        background: var(--pj-background-quaternary) radial-gradient(var(--pj-border-primary) 1px, transparent 0);
        background-size: 20px 20px;
    }
</style>
