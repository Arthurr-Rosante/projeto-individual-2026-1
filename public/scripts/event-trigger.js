import { toast } from "./utils/toast.js";
import { storage } from "./utils/storage.js";
import { updateParkBalance } from "./update-park.js";
import { getResourceFromStorage } from "./utils/getResourceFromStorage.js";
import { loadDevScreen, loadStatusBar, loadGrid, loadHatchery, loadGeneral } from "./loaders/index.js";

let isSaving = false;
let isPoppingEvent = false;

export const events = {
    save: async () => {
        try {
            isSaving = true;
            const gameData = storage.get("JPWG_DATA");
            if(!gameData) {
                throw new Error("Não foi possível retornar dados do sessionStorage. Tente logar-se novamente...");
            }
            
            const {user, park} = gameData;
            // 1. Atualiza Parque
            await fetch(`/api/parks/${park.idUser}/update`, {
                method: "PUT", 
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify(park)
            })

            // 2. Retorna dados mais recentes do BD
            const response = await fetch(`/api/users/${user.id}/data`);
            if(!response.ok) {
                throw new Error("Não foi possível retornar dados do Banco de Dados. Tente logar-se novamente...");
            }

            const freshGameData = await response.json();

            // 3. Atualiza sessionStorage
            storage.set("JPWG_DATA", {user, ...freshGameData});
            toast({
                variant: "success",
                title: "Jogo Salvo!",
            })

            // 4. Recarrega a UI
            loadDevScreen();
            loadStatusBar();
            loadGrid();
            loadHatchery();
            loadGeneral();
       } catch (error) {
            console.error(error);
            toast({
                variant: "destructive",
                title: "Erro ao Salvar",
                message: error.message || error
            });
       } finally {
            isSaving = false;
       }
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

/*
    save: () => {
        if(isSaving) {
            toast({
                variant: "warn",
                title: "Aguarde Salvar!",
                message: "O Jogo está sendo salvo neste momento."
            });
            return;
        };

        const gameData = storage.get("JPWG_DATA");
        if(!gameData) {
            //aviso...
            return;
        }

        // Copia storage atual e salva no banco
        events.copyStorage("JPWG_DATA");
        const copiedData = storage.get("JPWG_DATA_COPY");
        if(!copiedData) {
            // aviso...
            return;
        }
        
        fetch("/api/users/save", {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(copiedData)
        })
        .then((res) => {
            isSaving = true;

            if(!res.ok) {
                // erro...
                throw new Error("erro ao salvar...");
            }
            return res.json();
        })
        .then((data) => {
            storage.set("JPWG_DATA", data);
            toast({
                variant: "success",
                title: "Jogo Salvo!"
            });

            // atualiza dados da UI
            loadDevScreen();
            loadStatusBar();
            loadGrid();
            loadHatchery();
            loadGeneral();
        })
        .catch((error) => {
            toast({
                variant: "destructive",
                title: "Erro ao Salvar!",
                message: error.message || error
            });
        })
        .finally(() => {
            isSaving = false;
        });
    },
*/ 