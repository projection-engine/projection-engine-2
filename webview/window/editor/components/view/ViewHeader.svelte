<script lang="ts">
    import Icon from "@lib/components/icon/Icon.svelte";
    import {getContext, onMount} from "svelte";
    import {ViewContextPath, ViewPlacement, ViewType, ViewTypeMetadata} from "./ViewDefinitions";
    import Dropdown from "@lib/components/dropdown/Dropdown.svelte";
    import {InjectVar} from "@lib/Injection";
    import SettingsStore from "@lib/stores/SettingsStore";
    import LocalizationEN from "@enums/LocalizationEN";

    const COMPONENT_ID = crypto.randomUUID()
    let view: ViewType
    let index: number
    let isActive: boolean = false
    let placement: ViewPlacement
    const settings = InjectVar(SettingsStore) as SettingsStore

    $: {
        const context = getContext(ViewContextPath) as { view: ViewType, index: number, placement: ViewPlacement }
        view = context.view
        index = context.index
        placement = context.placement
    }

    function updateTab(viewType: [string, { icon: string; label: string; }] | null) {
        if (viewType != null) {
            const type = viewType[0] as ViewType
            const data = settings.getData();
            data.views[data.currentView].replaceViewType(index, type, placement);
            settings.updateStore(data)
        } else {
            const data = settings.getData();
            data.views[data.currentView].removeView(index, placement);
            settings.updateStore(data)
        }
    }

    onMount(() => {
        settings.addListener(COMPONENT_ID, () => {
            const data = settings.getData();
            const currentView = data.views[data.currentView];
            isActive = (currentView.getActiveViewIndex() === index || currentView.getActiveViewPlacement() === ViewPlacement.CENTER) && currentView.getActiveViewPlacement() === placement
        })
    })
</script>

{#if view != null}
    <div class="header">
        <Dropdown asButton={true} hideArrow={true} buttonStyles="border: none">
            <button data-sveltebuttondefault="-"
                    data-sveltehighlight={isActive ? "-" : ""}
                    slot="button"
                    class="button frame button-small frame"
                    style="max-width: 22px;gap: 4px">
                <Icon>{ViewTypeMetadata[view].icon}</Icon>
            </button>

            {#each Object.entries(ViewTypeMetadata) as viewType}
                <button data-sveltebuttondefault="-" style="gap: 4px"
                        on:click={() => updateTab(viewType)}>
                    <Icon>{viewType[1].icon}</Icon>
                    {viewType[1].label}
                </button>
            {/each}
            <button data-sveltebuttondefault="-" style="gap: 4px"
                    on:click={() => updateTab(null)}>
                <Icon>close</Icon>
                {LocalizationEN.CLOSE}
            </button>

        </Dropdown>
        <slot/>
    </div>
{/if}

<style>

    small {
        font-size: .7rem;
    }

    .header {
        position: relative;
        z-index: 10;
        display: flex;
        align-items: center;
        align-content: center;
        width: 100%;
        min-height: 28px;
        max-height: 28px;
        background: var(--pj-background-quaternary);
        padding: 0 2px;
        gap: 2px;

        overflow-y: hidden;
        overflow-x: auto;
        max-width: 100%;
        border-bottom: var(--pj-border-primary) 1px solid;
    }

    fieldset {
        padding: 0;
        width: 100%;
    }
</style>