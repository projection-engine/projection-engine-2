import ProjectionEngine from "../../../ProjectionEngine";

interface DragDropAttributes {
    noTransformation?: boolean
    targetElement?: HTMLElement
    onDragStart?: Function
    onDrop?: Function
    onMouseMove?: Function
    dragImage?: Function
    onDragOver?: Function
    onDragEnd?: Function
}

export default function dragDrop(draggable?:boolean) {
	let dragImageElement,
		noTargetTransformation,
		onDragStartEvent,
		onDragOverEvent,
		draggableElement,
		onDragEndEvent,
		getDragImage


	const handler = (event) => {
		switch (event.type) {
		case "dragleave":
			if (!draggableElement.contains(event.relatedTarget))
				ProjectionEngine.DragDropService.onLeave()
			break
		case "drag":

			if (this.onMouseMove)
				this.onMouseMove(event, draggableElement, ProjectionEngine.DragDropService.dragData)
			break
		case "dragstart":
			if (draggableElement.isDisabled) {
				event.preventDefault()
				return
			}
			if (dragImageElement) {
				dragImageElement.style.position = "absolute"
				dragImageElement.style.top = "0px"
				dragImageElement.style.right = "100%"
				if (!dragImageElement.parentElement)
					document.body.appendChild(dragImageElement)
				if (getDragImage)
					dragImageElement.innerHTML = getDragImage()
				event.dataTransfer.setDragImage(dragImageElement, 0, 0)
			}
			ProjectionEngine.DragDropService.dragData = onDragStartEvent(event)


			ProjectionEngine.DragDropService.dragImageElement = dragImageElement
			ProjectionEngine.DragDropService.onDragTarget = draggableElement

			break
		case "dragend":
			event.preventDefault()
			if (onDragEndEvent)
				onDragEndEvent()

			ProjectionEngine.DragDropService.dragData = undefined
			break
		case "dragover":
			event.preventDefault()
			ProjectionEngine.DragDropService.dropTarget = draggableElement
			ProjectionEngine.DragDropService.changedElements.push(draggableElement)
			draggableElement.style.opacity = ".5"
			draggableElement.dragDropListeners?.dragOver?.(event)
			break
		case "drop":
			event.preventDefault()
			if (!ProjectionEngine.DragDropService.dropTarget || !draggableElement.dragDropListeners?.onDrop)
				return
			draggableElement.dragDropListeners?.onDrop?.(ProjectionEngine.DragDropService.dragData, event)
			ProjectionEngine.DragDropService.onLeave()
			break
		}
	}


	return {
		onMount: (attributes: DragDropAttributes) => {
			const {
				noTransformation,
				targetElement,
				onDragStart,
				onDrop,
				onMouseMove,
				dragImage,
				onDragOver,
				onDragEnd
			} = attributes
			draggableElement = targetElement
			noTargetTransformation = noTransformation
			if (typeof dragImage === "function")
				getDragImage = dragImage
			dragImageElement = ProjectionEngine.DragDropService.createElement(getDragImage ? getDragImage() : dragImage)

			onDragOverEvent = onDragOver
			onDragEndEvent = onDragEnd

			draggableElement.dragDropListeners = {
				onDrop,
				dragOver: (event) => {
					if(!onDragOverEvent)
						return
					const target = ProjectionEngine.DragDropService.alertModal
					const html = onDragOverEvent(ProjectionEngine.DragDropService.dragData, event)

					if (!html)
						return
					target.innerHTML = html
					target.style.zIndex = "9999"
				}
			}
			onDragStartEvent = onDragStart
			this.onMouseMove = onMouseMove

			if (draggable) {
				draggableElement.draggable = true
				draggableElement.addEventListener("dragstart", handler)
				draggableElement.addEventListener("dragend", handler)
				draggableElement.addEventListener("drag", handler)
			}

			draggableElement.addEventListener("dragover", handler)
			draggableElement.addEventListener("dragleave", handler)
			draggableElement.addEventListener("drop", handler)
		},
		onDestroy: () => {
			if (draggableElement) {
				draggableElement.removeEventListener("dragstart", handler)
				draggableElement.removeEventListener("dragend", handler)
				draggableElement.removeEventListener("drag", handler)
				draggableElement.removeEventListener("dragleave", handler)
				draggableElement.removeEventListener("dragover", handler)
				draggableElement.removeEventListener("drop", handler)
			}
		},

		set onDragStart(data) {
			onDragStartEvent = data
		},
		set onDragOver(data) {
			onDragOverEvent = data
		},
		set dragImage(data) {
			if (dragImageElement)
				dragImageElement.innerHTML = data
		},

		set disabled(data) {
			if (draggableElement != null) {
				draggableElement.isDisabled = !!data
				draggableElement.draggable = !data
			}
		}
	}
}
