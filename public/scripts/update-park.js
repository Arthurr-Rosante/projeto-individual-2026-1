import { storage } from "./utils/storage.js";
import { updateUi } from "./utils/ui-updater.js";

function updatePark(updateCallback) {
    try {
        const data = storage.get("JPWG_DATA");
        
        if (!data || !data.park) {
            throw new Error("O objeto 'JPWG_DATA' está incompleto.");
        }

        updateCallback(data.park);
        storage.set("JPWG_DATA", data);
    } catch (error) {
        console.error(`[update-park.js] Erro: ${error.message || error}`);
    }
}

export function updateParkName(newName) {
    updatePark(park => park.name = newName);
    updateUi("park", "name");
}

export function updateParkBalance(newBalance) {
    updatePark(park => {
        let finalBalance = newBalance;
        if(newBalance < 0) finalBalance = 0;
        if(newBalance > 999999) finalBalance = 999999;
        park.dinoCoins = finalBalance
    });
    updateUi("park", "dinoCoins");
    
}

export function updateParkRating(newRating) {
    updatePark(park => {
        let finalRating = newRating;
        if(newRating < 0) finalRating = 0;
        if(newRating > 5) finalRating = 5;
        park.rating = finalRating
    });
    updateUi("park", "rating");
}