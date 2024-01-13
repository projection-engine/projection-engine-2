<script lang="ts">

    import Checkbox from "@lib/components/checkbox/Checkbox.svelte"
    import ColorPicker from "@lib/components/color-picker/ColorPicker.svelte"
    import Range from "@lib/components/range/Range.svelte"
    import Component from "@engine-core/instances/components/Component"
    import {InjectVar} from "@lib/Injection";
    import VisualsStore from "@lib/stores/VisualsStore";
    import SettingsStore from "@lib/stores/SettingsStore";
    import CAMERA_PROPS from "@engine-core/static/component-props/CAMERA_PROPS";
    import {onDestroy} from "svelte";

    export let toRender

    let fieldValue
    let timeout

    const settingsStore = InjectVar(SettingsStore)
    const visualsStore = InjectVar(VisualsStore)


    function getValue(s) {
        if (!toRender)
            return
        let current = s
        const key = toRender.key
        if (Array.isArray(key)) {
            for (let i = 0; i < key.length; i++)
                current = current[key[i]]
            return current
        }
        return current[key]
    }

    function setValue(value, save) {
        if (!toRender)
            return
        const key = toRender.key
        let s = toRender?.target === "settings" ? settingsStore.getData() : visualsStore.getData()
        if (save)
            s = {...s}
        if (Array.isArray(key)) {
            let current = s
            for (let i = 0; i < key.length - 1; i++)
                current = current[key[i]]
            current[[...key].pop()] = value

        } else
            s[key] = value
        if (save) {
            if (toRender?.target === "settings")
                settingsStore.updateStore(s)
            else
                visualsStore.updateStore(s)
        }
    }

    const unsubSettings = settingsStore.subscribe(data => {
        if (toRender?.target === "settings")
            fieldValue = getValue(data)
    })

    const unsubVisuals = visualsStore.subscribe(data => {
        if (toRender?.target !== "settings")
            fieldValue = getValue(data)
    })

    onDestroy(() => {
        unsubVisuals()
        unsubSettings()
    })
</script>


{#if toRender.type === Component.propTypes.NUMBER}
    <Range
            label={toRender.label}
            incrementPercentage={toRender.increment}
            minValue={toRender.min}
            maxValue={toRender.max}
            value={fieldValue}
            handleChange={v => {
                if(toRender.updateOnChange)
                     setValue(v, false)
                toRender.onChange?.(v)
            }}
            onFinish={v => {
                let value = toRender.onChange?.(v)
                if(value === undefined)
                    value = v
               setValue(value, true)
            }}
            disabled={toRender.disabled}
    />
{:else if toRender.type === Component.propTypes.BOOLEAN}
    <Checkbox
            disabled={toRender.disabled}
            checked={fieldValue}
            handleCheck={() => setValue(!fieldValue, true)}
            label={toRender.label}
    />

{:else if toRender.type === Component.propTypes.COLOR}
    <ColorPicker
            disabled={toRender.disabled}
            value={fieldValue?.map(v => v * 255) || [0,0,0]}
            label={toRender.label}
            timeout={0}
            submit={({r,g,b}) => {
                if(toRender.updateOnChange)
                    setValue([r/255,g/255,b/255], false)
                clearTimeout(timeout)
                timeout = setTimeout(() => setValue([r/255,g/255,b/255], true),150)
            }}
    />
{/if}