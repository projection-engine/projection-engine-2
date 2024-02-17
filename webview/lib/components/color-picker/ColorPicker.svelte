<script lang="ts">
    import ToolTip from "../tooltip/ToolTip.svelte";

    export let submit: GenericVoidFunctionWith2P<{ r: number, g: number, b: number }, [number, number, number]>;
    export let height: string = "25px";
    export let value: [number, number, number];
    export let timeout: number = 250;
    export let label: string;
    export let disabled: boolean = false;

    let submitTimeout;

    function rgbToHex(r: number, g: number, b: number): string {
        return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
    }

    function hexToRgb(hex: string): { r: number, g: number, b: number } {
        const replaced = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (_, r, g, b) => {
            return r + r + g + g + b + b;
        });

        const result = replaced.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : null;
    }
</script>

<div class="wrapper" >
    {#if label}
        <div class="label">{label}</div>
        <ToolTip content={label}/>
    {/if}
    <input disabled={disabled}
           style={"height: " +height}
           type="color"
           value={value ? rgbToHex(value[0], value[1], value[2]) : null}
           on:change={event => {
                const inputValue = hexToRgb(event.currentTarget.value)
                if(!inputValue)
                    return
                if(timeout === 0){
                    submit(inputValue,[inputValue.r,inputValue.g,inputValue.b])
                }else{
                    clearTimeout(submitTimeout)
                    submitTimeout = setTimeout(() => {
                        submit(inputValue, [inputValue.r,inputValue.g,inputValue.b])
                    }, timeout)
                }
            }}
    />
</div>

<style>
    .wrapper {
        width: 100%;
    }

    input {
        width: 100%;
        height: 100%;
        outline: none;
        border: none;
        padding: 0;
        border-radius: 3px;
        overflow: hidden;
    }


    input[type="color"]::-webkit-color-swatch-wrapper {
        padding: 0;
        border-radius: 0;
    }

    input[type="color"]::-webkit-color-swatch {
        border: none;
    }

    .label {
        font-size: .7rem;
        margin-bottom: 2px;
    }
</style>


