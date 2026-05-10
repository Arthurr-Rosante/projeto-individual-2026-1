function getElementByIdAndAttachEvent(elementId, event, fn) {
    const element = document.getElementById(elementId);
    if(!element) return;

    element.addEventListener(event, fn);
    return element;
}