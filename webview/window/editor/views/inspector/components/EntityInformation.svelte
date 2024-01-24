<script lang="ts">
    import Engine from "@engine-core/Engine";

    import Selector from "../../../components/selector/Selector.svelte";
    import Checkbox from "@lib/components/checkbox/Checkbox.svelte";
    import EntityFactoryService from "@services/EntityFactoryService";

    import Input from "@lib/components/input/Input.svelte";
    import ColorPicker from "@lib/components/color-picker/ColorPicker.svelte";
    import Entity from "@engine-core/instances/Entity";
    import PropertyHeader from "@lib/components/PropertyHeader.svelte";
    import Accordion from "@lib/components/accordion/Accordion.svelte";
    import TransformationForm from "./TransformationForm.svelte";
    import {onDestroy} from "svelte";
    import AddComponent from "./AddComponent.svelte";
    import LocalizationEN from "@enums/LocalizationEN";
    import ProjectionEngine from "@lib/ProjectionEngine";

    export let entity: Entity

    const ID = crypto.randomUUID()
    let entityName = entity.name
    let entityID
    $: {
        if (entityID !== entity.id) {
            if (entityID)
                ProjectionEngine.EntityUpdateService.removeListener(entityID, ID)
            ProjectionEngine.EntityUpdateService.addListener(entity.id, ID, () => {
                entityName = entity.name
            })
            entityName = entity.name
            entityID = entity.id
        }
    }

    onDestroy(() => {
        ProjectionEngine.EntityUpdateService.removeListener(entityID, ID)
    })
</script>


<PropertyHeader title={entityName}/>
<AddComponent entity={entity}/>
{#if !entity.isCollection}
    <TransformationForm/>
{/if}
<Accordion title={LocalizationEN.BASIC} startOpen={entity.isCollection}>
    <div data-svelteform="-">
        <Input
                width="100%"
                hasBorder={true}
                onBlur={(_,v) => ProjectionEngine.EntityNamingService.renameEntity(v, entity)}
                onEnter={v => ProjectionEngine.EntityNamingService.renameEntity(v, entity)}
                inputValue={entityName}
                height="23px"
                placeholder={LocalizationEN.MY_ENTITY}
        >
            <small slot="label">{LocalizationEN.NAME}</small>
        </Input>
        {#if entity.parent}
            <Selector
                    type="parent"
                    selected={entity.parent}
                    handleChange={v => {
                        if(v === entity){
                            ProjectionEngine.ToastNotificationSystem.error(LocalizationEN.COULD_NOT_LINK_ENTITIES)
                            return
                        }
                        entity.addParent(v)
                         if(entity.parent !== v){
                            ProjectionEngine.ToastNotificationSystem.error(LocalizationEN.COULD_NOT_LINK_ENTITIES)
                            return
                        }
                        ProjectionEngine.EntityHierarchyService.updateHierarchy()
                    }}
            />
        {/if}
    </div>
</Accordion>
<Accordion title={LocalizationEN.VIEWPORT}>
    <div data-svelteform="-">
        <Checkbox
                checked={entity.active}
                handleCheck={_ =>  {
                const inv = !entity.active
                EntityFactoryService.toggleEntityVisibility(entity.id)
                entity.active = inv
            }}
                label={LocalizationEN.ACTIVE}
        />

        <ColorPicker
                label={LocalizationEN.COLOR}
                value={entity.colorIdentifier||[255,255,255]}
                submit={(_, arr) => {
                entity.colorIdentifier = arr
                ProjectionEngine.EntityHierarchyService.updateHierarchy()
            }}
        />
    </div>
</Accordion>

<style>
    fieldset {
        background: none;
    }
</style>
