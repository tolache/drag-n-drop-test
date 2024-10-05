const mainContainer = document.getElementById("main-container")
const dragTargets = document.querySelectorAll(".drag-area")

enableItemDragging()
enableDragTargets()

function enableItemDragging() {
    const items = document.querySelectorAll(".item")
    items.forEach(item => {
        item.setAttribute("draggable", "true")
        item.addEventListener("dragstart", (e) => dragStartHandler(e as DragEvent))
        item.addEventListener("dragend", dragEndHandler)
    })
}

function enableDragTargets() {
    dragTargets.forEach(dragArea => {
        dragArea.addEventListener("dragover", (e) => dragOverHandler(e as DragEvent))
        dragArea.addEventListener("dragenter", (e) => dragEnterHandler(e as DragEvent))
        dragArea.addEventListener("dragleave", (e) => dragLeaveHandler(e as DragEvent))
        dragArea.addEventListener("drop", (e) => dropHandler(e as DragEvent))
    })
}

function dragStartHandler(event: DragEvent) {
    mainContainer?.classList?.add("is-drag-in-progress")
    const eventTarget = event.target as HTMLElement
    if (!event.dataTransfer) return
    event.dataTransfer.effectAllowed = "move"
    event.dataTransfer.setData("text/plain", eventTarget.id)
}

function dragEndHandler() {
    dragTargets.forEach(dragArea => {
        if (dragArea.classList.contains("hovered")) {
            dragArea.classList.remove("hovered")
        }
    })
    mainContainer?.classList?.remove("is-drag-in-progress")
}

function dragOverHandler(event: DragEvent) {
    event.preventDefault()
    if (event.dataTransfer) {
        event.dataTransfer.dropEffect = "move"
    }
}

function dragEnterHandler(event: DragEvent) {
    const eventTarget = event.target as HTMLElement
    if (eventTarget.classList.contains("drag-area")) {
        eventTarget.classList.add("hovered")
    }
}

function dragLeaveHandler(event: DragEvent) {
    const eventTarget = event.target as HTMLElement
    if (eventTarget.classList.contains("drag-area")) {
        eventTarget.classList.remove("hovered")
    }
}

function dropHandler(event: DragEvent) {
    event.stopPropagation()
    const data = event.dataTransfer?.getData("text/plain")
    if (!data) return
    const itemToMove = document.getElementById(data)
    if (!itemToMove) return;
    const targetArea = event.target as HTMLElement
    targetArea.appendChild(itemToMove)
    mainContainer?.classList?.remove("is-drag-in-progress")
}