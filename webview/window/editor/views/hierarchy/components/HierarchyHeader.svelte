<script lang="ts">
    import ViewHeader from "../../../components/view/ViewHeader.svelte"
    import Icon from "@lib/components/icon/Icon.svelte"
    import ToolTip from "@lib/components/tooltip/ToolTip.svelte"
    import Input from "@lib/components/input/Input.svelte"
    import LocalizationEN from "@enums/LocalizationEN"
    import EngineService from "../../../services/EngineService";
    import {EntityDTO} from "../../../services/engine-definitions";

    export let filteredComponent: number
    export let setFilteredComponent: GenericVoidFunctionWithP<number>
    export let search: string
    export let setSearch: GenericVoidFunctionWithP<string>
    export let lockedEntity: number
    export let selected: number[]
    export let root: EntityDTO
    export let open: Record<number, boolean>
    export let updateOpen: VoidFunction

    function showSelected() {
        const target = lockedEntity ?? selected[0]
        if (target != undefined) {
            loopHierarchy(root, target)
            updateOpen()
        }
    }

    function loopHierarchy(entity: EntityDTO, target: number): boolean {
        if (entity.entityID === target) {
            open[entity.entityID] = true
            return true;
        }
        for (const child of entity.children) {
            if (loopHierarchy(child, target)) {
                open[child.entityID] = true
                return true
            }
        }
        return false
    }
</script>

<ViewHeader>
    <div data-svelteinline="-" style="justify-content: flex-start; width: 100%">
        <button data-sveltebuttondefault="-"
                on:click={() => EngineService.addEntity()}
                data-svelteview-header-button="-"
                style="position: relative"
        >
            <ToolTip content={LocalizationEN.CREATE_ENTITY}/>
            <Icon styles="font-size: .9rem">add</Icon>
        </button>
        <button data-sveltebuttondefault="-"
                on:click={showSelected}
                data-svelteview-header-button="-"
        >
            <ToolTip content={LocalizationEN.SHOW_SELECTED}/>
            <Icon styles="font-size: .9rem">center_focus_strong</Icon>
        </button>
        <Input
                hasBorder={true}
                width="100%"
                height="22px"
                placeholder={LocalizationEN.SEARCH}
                inputValue={search}
                onChange={setSearch}
        />
    </div>
</ViewHeader>
