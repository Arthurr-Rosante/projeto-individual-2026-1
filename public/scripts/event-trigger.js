import { toast } from "./utils/toast.js";
import { storage } from "./utils/storage.js";
import { updateParkBalance } from "./update-park.js";
import { getResourceFromStorage } from "./utils/getResourceFromStorage.js";
import { loadDevScreen, loadStatusBar, loadGrid, loadHatchery, loadGeneral } from "./loaders/index.js";

let isSaving = false;
let isPoppingEvent = false;

export const events = {
    save: async () => {
        if(isSaving) return;
        isSaving = true;

        try {
            const gameData = storage.get("JPWG_DATA");
            if(!gameData || !gameData.user || !gameData.park) {
                throw new Error("Dados da sessão não encontrados. Tente fazer login novamente.");
            }
            
            // 1. Atualiza Parque
            const {user, park} = gameData;
            const updateResponse = await fetch(`/api/parks/${park.idUser}/update`, {
                method: "PUT", 
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(park)
            })

            if(!updateResponse.ok) {
                throw new Error("Não foi possível salvar os dados do parque no servidor.")
            }

            // 2. Retorna dados mais recentes do BD
            const dataResponse = await fetch(`/api/users/${user.id}/data`);
            if(!dataResponse.ok) {
                throw new Error("Erro ao sincronizar os dados atualizados com o servidor. Tente fazer login novamente.");
            }

            const freshGameData = await dataResponse.json();

            // 3. Atualiza sessionStorage atual
            storage.set("JPWG_DATA", {...freshGameData, user});
            toast({
                variant: "success",
                title: "Jogo Salvo com Sucesso!",
            })

            // 4. Recarrega a UI
            refreshGameUI();
       } catch (error) {
            console.error("[save] Erro: ", error);
            toast({
                variant: "destructive",
                title: "Erro ao Salvar",
                message: error.message || "Ocorreu um erro inesperado."
            });
       } finally {
            isSaving = false;
       }
    },
    increaseBalance: () => {
        const gameData = storage.get("JPWG_DATA");
        if (!gameData.park) {
            console.warn("[increaseBalance] Dados do parque incompletos para incremento.");
            return;
        }
        const {park} = gameData;
        
        const baseGain = 5 + Math.ceil(5 * (park.rating || 0));
        const newBalance = park.dinoCoins + baseGain;
        
        updateParkBalance(newBalance);
        console.log(`[DinoCoins]: +${baseGain} adicionados às ${new Date().toLocaleTimeString()}`);
    },
    randomEvent: () => {
        const eventList = getResourceFromStorage("events");
        if (!eventList || eventList.length === 0) return;

        const shouldTrigger = Math.floor(Math.random() * 5) === 1;
        if (!shouldTrigger) return;

        const currentEvent = eventList[Math.floor(Math.random() * eventList.length)];    
        
        toast({
            variant: "warn",
            title: `Evento: ${currentEvent.translatedName}`,
            message: currentEvent.consequences,
            duration: 5000
        });
        console.log(`[randomEvent]: "${currentEvent.translatedName}" ocorreu às ${new Date().toLocaleTimeString()}`);
    },
    sabotage: () => {},
    pouringRain: () => {}
};

function refreshGameUI() {
    loadDevScreen();
    loadStatusBar();
    loadGrid();
    loadHatchery();
    loadGeneral();
}