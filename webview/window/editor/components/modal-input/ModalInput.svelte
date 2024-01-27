<script lang="ts">
    import Modal from "@lib/components/modal/Modal.svelte"
    import KEYS from "../../static/KEYS"

    export let handleClose: GenericVoidFunctionWithP<string>
    export let alignBottom = false
    export let initialValue: string = undefined

    let ref: HTMLElement
    let inputRef: HTMLInputElement

    function getStyle() {
        const bBox = ref.parentElement.getBoundingClientRect()
        return `width: ${bBox.width}px; display: block; padding: 0; background: none; border: none; height: 23px; width: 10vw; top: ${alignBottom ? bBox.top + bBox.height - 15 : bBox.top}px; left: ${bBox.left + bBox.width / 2}px; transform: translate(-50%, 0%); box-shadow: var(--pj-boxshadow)`
    }

    function onKeyDown(e: KeyboardEvent & { currentTarget: (EventTarget & HTMLInputElement) }) {
        if (e.code === KEYS.Enter)
            handleClose(e.currentTarget.value)
    }
</script>

<span style="display: none" bind:this={ref}></span>
<Modal
        styles={ref ? getStyle() : ""}
        handleClose={() => handleClose(inputRef.value)}>
    <input
            bind:this={inputRef}
            value={initialValue}
            on:keydown={onKeyDown}
    />
</Modal>

<style>
    input {
        padding: 0 2px;
        background: none;
        border: none;
        outline: none;
        font-size: .7rem;
        color: var(--pj-color-primary);
        background: var(--pj-background-tertiary);
        border-radius: 3px;
        height: 23px;
        width: 100%;
        border: var(--pj-border-primary);
    }

    input:disabled {
        -webkit-user-select: none !important;
        background: none;
        color: var(--pj-color-quaternary);
    }

</style>