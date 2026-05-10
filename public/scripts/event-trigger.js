import { storage } from "./utils/storage.js";
import { updateParkBalance } from "./update-park.js";

export const events = {
    save: () => {
        console.log("SALVOU! ", new Date().toLocaleString());
        const data = storage.get("JPWG_DATA");
        if(!data) {}
        
        events.copyStorage("JPWG_DATA");
    },
    copyStorage: (key) => {
        const data = storage.get(key);
        storage.set(`${key}_COPY`, data);

        console.log("COPIOU! ", new Date().toLocaleString());
    },
    increaseBalance: () => {
        const { park } = storage.get("JPWG_DATA");
        if(!park) {}
        
        let newBalance = (5 + Math.ceil(5 * park.rating)) + park.dinoCoins;
        updateParkBalance(newBalance);

        console.log("INCREMENTOU SALDO! ", new Date().toLocaleString());
    },
    randomEvent: () => {},
    sabotage: () => {},
    pouringRain: () => {}
};

// const SHOW_EVENT_LOGS = false;
// function triggerEvent(event, params = []) {
//     const d = new Date().toLocaleString();
//     const fn = events[event];

//     if(typeof fn !== "function") {
//         console.log(`[event.js] Erro: "${event}" não é um evento válido!`);
//         return;
//     }

//     fn(...params);
//     SHOW_EVENT_LOGS && console.log(`Evento: ${event} | ${d}`);
// }