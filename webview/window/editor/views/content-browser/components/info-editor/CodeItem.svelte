<script>


    import LocalizationEN from "@enums/LocalizationEN"

    export let data
</script>

<fieldset>
    <legend>{LocalizationEN.CODE_PREVIEW}</legend>
    <pre data-sveltepre="-">{data}</pre>
</fieldset>
