<script lang="ts">

    import ViewHeader from "../../components/view/ViewHeader.svelte";
    import {InjectVar} from "@lib/Injection";
    import SettingsStore from "@lib/stores/SettingsStore";

    const settingsStore = InjectVar(SettingsStore)
</script>

<ViewHeader>
    <button on:click={() => settingsStore.updateStore({projectID: settingsStore.getData().projectID})}>
        reload
    </button>
</ViewHeader>