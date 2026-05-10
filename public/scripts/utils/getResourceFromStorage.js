import { storage } from "./storage.js";

// resource = "data", "species", "buildings", "events"
export function getResourceFromStorage(resource = "data") {
    const key = `JPWG_${String(resource).toUpperCase()}`;
    const result = storage.get(key);

    if (!result) {
        console.warn(`[getResourceFromStorage.js] Aviso: Recurso '${key}' não encontrado ou vazio.`);
    }

    return result;
}