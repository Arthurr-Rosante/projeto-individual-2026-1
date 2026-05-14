import { toast } from "./utils/toast.js";
import { storage } from "./utils/storage.js";
import { updateParkBalance } from "./update-park.js";
import { getResourceFromStorage } from "./utils/getResourceFromStorage.js";

export const events = {
    save: () => {
        console.log("SALVOU! ", new Date().toLocaleString());
        const gameData = storage.get("JPWG_DATA");
        
        if(!gameData) {
            console.warn("[save] Aviso: Objeto JPWG_DATA está incompleto...");
            return;
        }

        // Salvando dados no banco
        
        toast({
            variant: "success",
            title: "Jogo Salvo!"
        });
        events.copyStorage("JPWG_DATA");
    },
    copyStorage: (key) => {
        const data = storage.get(key);
        storage.set(`${key}_COPY`, data);

        console.log("COPIOU! ", new Date().toLocaleString());
    },
    increaseBalance: () => {
        const { park } = storage.get("JPWG_DATA");
        if(!park) {
            console.warn("[increaseBalance] Aviso: Objeto JPWG_DATA está incompleto...");
            return;
        }
        
        let newBalance = (5 + Math.ceil(5 * park.rating)) + park.dinoCoins;
        updateParkBalance(newBalance);

        console.log("INCREMENTOU SALDO! ", new Date().toLocaleString());
    },
    randomEvent: () => {
        const eventList = getResourceFromStorage("events");
        if(!eventList) {
            return;
        }
        const currentEvent = eventList[Math.floor(Math.random() * eventList.length)]; 

        toast({
            variant: "warn",
            title: `Evento: ${currentEvent.translatedName}`,
            message: currentEvent.consequences,
            duration: 5000
        })
    },
    sabotage: () => {},
    pouringRain: () => {}
};