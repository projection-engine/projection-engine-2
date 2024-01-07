<script>
    import CameraTracker from "../../../../../engine/tools/utils/CameraTracker"
    import Layout from "./dynamic-form/Layout.svelte"
    import CAMERA_PROPS from "@engine-core/static/component-props/CAMERA_PROPS"
    import {onDestroy, onMount} from "svelte"
    import Accordion from "@lib/components/accordion/Accordion.svelte"
    import PropertyHeader from "@lib/components/PropertyHeader.svelte"
    import LocalizationEN from "@enums/LocalizationEN"
    import CAMERA_PREFERENCES from "../static/CAMERA_PREFERENCES"
    import ProjectionEngine from "@lib/ProjectionEngine";
    import ContentField from "../../preferences/components/content/ContentField.svelte";

    const COMPONENT_ID = crypto.randomUUID()
    let cameraSettings = {}
    let settings
    let camera

    onMount(() => {
        ProjectionEngine.SettingsStore.addListener(COMPONENT_ID, data => {
    		cameraSettings = {...data.camera, props: CAMERA_PROPS}
    		settings = data
    		camera = data.camera
    	}, ["camera"])
    })

    onDestroy(() => ProjectionEngine.SettingsStore.removeListener(COMPONENT_ID))

    const updateCamera = (key, value, full) => {
    	if (full)
            ProjectionEngine.	SettingsStore.updateStore({camera: {...camera, [key]: value}})
    	if (CameraTracker[key] !== undefined)
    		CameraTracker[key] = value
    }
</script>

<PropertyHeader title={LocalizationEN.EDITOR_CAMERA}/>
<Accordion startOpen={true} title={LocalizationEN.MOVEMENT}>
    {#if settings !== undefined}
        <div data-svelteform="-">
            {#each CAMERA_PREFERENCES as toRender}
                <ContentField {settings} toRender={toRender}/>
            {/each}
        </div>
    {/if}
</Accordion>
<Layout component={cameraSettings} submit={updateCamera}/>

