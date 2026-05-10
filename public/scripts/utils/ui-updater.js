import { getResourceFromStorage } from "./getResourceFromStorage.js"

// resource = "park", "species", "buildings", "events"
// field = "name", "rating", "speciesId", etc...

const gameDataAttributes = ["user", "park", "tiles", "dinosaur"];
export function updateUi(resource, field) {
    let data;
    if(gameDataAttributes.includes(resource)) {
        data = getResourceFromStorage("data");
    } else {
        data = getResourceFromStorage(resource);
    }

    if(!data) {
        console.warn(`[ui-updater.js] Aviso: Objeto JPWG_${resource.toUpperCase()} não pôde ser encontrado ou está incompleto.`);
        return;
    }

    const value = gameDataAttributes.includes(resource) ? data[resource][field] : data[field];
    const htmlElements = document.querySelectorAll(`[data-ui-resource="${resource}:${field}"]`);
    
    htmlElements.forEach((el) => el.textContent = value);
}