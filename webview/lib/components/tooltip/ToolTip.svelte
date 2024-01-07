<script lang="ts">
    import {onDestroy, onMount} from "svelte"
    import {InjectVar} from "@lib/Injection";
    import ToolTipService from "../../../window/services/ToolTipService";

    let open = false
    export let content = ""
    let wrapper
    let bBox, bodyBBox
    let isMounted
    let targetParent
    const toolTipService = InjectVar(ToolTipService) as  ToolTipService

    const handleMouseMove = (event) => {

    	toolTipService.element.style.left = (event.clientX + 10) + "px"
    	toolTipService.element.style.top = (event.clientY + 10) + "px"

    	let transform = {x: "0px", y: "0px"}
    	if ((event.clientX + 10 + bBox.width) >= bodyBBox.width)
    		transform.x = "calc(-100% - 10px)"
    	if ((event.clientY + 10 + bBox.height) >= bodyBBox.height)
    		transform.y = "calc(-100% - 10px)"
    	toolTipService.element.style.transform = `translate(${transform.x}, ${transform.y})`
    }

    function close() {
    	document.removeEventListener("mousemove", handleMouseMove)
    	open = false
    	toolTipService.element.setAttribute("data-sveltetooltipanimation", "")
    }

    const hover = (event) => {
    	open = true

    	const instance = toolTipService
    	bBox = instance.element.getBoundingClientRect()
    	bodyBBox = document.body.getBoundingClientRect()

    	instance.element.setAttribute("data-sveltetooltipanimation", "-")
    	instance.element.style.left = (event.clientX + 10) + "px"
    	instance.element.style.top = (event.clientY + 10) + "px"
    	document.addEventListener("mousemove", handleMouseMove)
    	if (targetParent)
    		targetParent.addEventListener(
    			"mouseleave",
    			close,
    			{once: true}
    		)
    }

    $: {
    	const instance = toolTipService

    	if (open) {
    		instance.portal.open()
    		instance.closeCurrent = () => {
    			close()
    			if (targetParent)
    				targetParent.removeEventListener("mouseleave", close)
    		}
    	} else
    		instance.portal.close()
    }

    $: {
    	if (open)
    		toolTipService.element.innerHTML = content
    }
    onMount(() => {
       toolTipService.initialize()
    	targetParent = wrapper.parentElement
    	if (targetParent)
    		targetParent.addEventListener("mouseenter", hover)
    	isMounted = true
    })
    onDestroy(() => {
    	if (targetParent)
    		targetParent.removeEventListener("mouseenter", hover)
    	close()
    })

</script>

{#if !isMounted}
    <div bind:this={wrapper}>
    </div>
{/if}

