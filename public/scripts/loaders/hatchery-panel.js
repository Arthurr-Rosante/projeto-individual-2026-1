import { toast } from "../utils/toast.js";
import { events } from "../event-trigger.js"
import { storage } from "../utils/storage.js"; 
import { togglePanel } from "../utils/toggler.js";
import { updateParkBalance } from "../update-park.js";
import { getResourceFromStorage } from "../utils/getResourceFromStorage.js";
import { formatDinoHatchTime, formatDinoHatchSuccess } from "../utils/formatDinoFields.js";

const STORAGE_KEY = "JPWG_HATCHING_SPECIES";

export function loadHatchery() {
    const hatcheryList = document.getElementById("hatchery-list");
    if (!hatcheryList) return;

    hatcheryList.innerHTML = "";
    
    const gameData = getResourceFromStorage("data");
    const speciesData = getResourceFromStorage("species");
    
    if (!speciesData || !gameData || !gameData.park) {
        console.warn("[loadHatchery] Dados necessários não foram encontrados no Storage.");
        return;
    }

    // 1. Carrega a Lista de Espécies Disponíveis
    hatcheryList.innerHTML = speciesData.map((specie) => specieOptionHTML(specie)).join("");
    
    // 2. Retoma incubações em andamento ao recarregar a página
    resumeHatchingSlots();

    // 3. Eventos HTML
    hatcheryList.onclick = (event) => {
        const clickedBtn = event.target.closest(".hatch-btn");
        if (clickedBtn) {
            hatchDinosaur(clickedBtn.dataset.speciesId);
        }
    };

    document.addEventListener("click", handleSlotActions);
}

function handleSlotActions(event) {
    const placeBtn = event.target.closest(".place-dino-btn");
    const discardBtn = event.target.closest(".discard-dino-btn");

    if (placeBtn) {
        const slot = placeBtn.closest(".hatchery-slot");
        if (slot) placeDinosaurFromSlot(slot.dataset.slotId);
    }

    if(discardBtn) {
        const slot = discardBtn.closest(".hatchery-slot");
        if(slot) {
            cleanSlotAndStorage(slot.dataset.slotId, slot);
            return;
        };
    }
}

function specieOptionHTML(specie) {
    return `
        <li class="hatchery-item" style="background-image: url('./assets/images/dinosaurs/${specie.name}_icon.png');">
            <p class="hatchery-title">${specie.name}</p>
            <div class="hatchery-item-info">
                <p><span><i class="ph-fill ph-coins"></i> ${specie.hatchCost}</span></p>
                <p><span><i class="ph-fill ph-timer"></i> ${formatDinoHatchTime(specie.hatchTimeInSeconds)}</span></p>
                <p><span><i class="ph-fill ph-egg-crack"></i> ${formatDinoHatchSuccess(specie.hatchSuccessRate)}</span></p>
            </div>
            <div class="hatchery-item-footer">
                <button class="hatch-btn" data-species-id="${specie.id}">Incubar</button>
            </div>
        </li>
    `;
}

function hatchDinosaur(speciesId) {
    const gameData = getResourceFromStorage("data");
    const speciesData = getResourceFromStorage("species");
    const hatcherySlots = document.querySelectorAll(".hatchery-slot");

    if (!gameData || !gameData.park || !speciesData) {
        toast({
            variant: "destructive",
            title: "Operação Negada",
            message: "Sessão inválida. Tente recarregar a página."
        });
        return;
    }

    const {park} = gameData;
    const specieToHatch = speciesData.find((sp) => sp.id == speciesId);

    // 1. Busca Primeiro Slot Vazio
    const emptySlot = Array.from(hatcherySlots).find((slot) => slot.dataset.slotStatus === 'empty');
    if (!emptySlot) {
        toast({ variant: "destructive", title: "Incubadora Cheia", message: "Não há espaços disponíveis!" });
        return;
    }

    // 2. Atualiza Saldo
    if (specieToHatch.hatchCost > park.dinoCoins) {
        toast({ variant: "warn", title: "Saldo Insuficiente", message: `Faltam DinoCoins para ${specieToHatch.name}!` });
        return;
    }

    // 3. Monta Objeto de Incubação
    const now = Date.now();
    const endTime = now + (specieToHatch.hatchTimeInSeconds * 1000);
    
    const hatchStorageObject = {
        slotId: emptySlot.dataset.slotId,
        specie: { ...specieToHatch },
        startTime: now,
        endTime: endTime
    };

    // 4. Salva no Storage
    const hatchingList = storage.get(STORAGE_KEY) || [];
    storage.set(STORAGE_KEY, [...hatchingList, hatchStorageObject]);

    // 5. Atualiza UI e Saldo
    emptySlot.dataset.slotStatus = "hatching";
    updateParkBalance(park.dinoCoins - specieToHatch.hatchCost);

    // 6. Inicia Timer de Incubação
    startHatchTimer(hatchStorageObject);

    toast({
        variant: "success",
        title: "Incubação Iniciada",
        message: `${specieToHatch.name} está sendo gerado no Slot-${hatchStorageObject.slotId}`
    });
}

function resumeHatchingSlots() {
    const hatchingList = storage.get(STORAGE_KEY) || [];
    hatchingList.forEach(hatchItem => {
        const slot = document.querySelector(`.hatchery-slot[data-slot-id="${hatchItem.slotId}"]`);
        if (slot) {
            slot.dataset.slotStatus = "hatching";
            startHatchTimer(hatchItem);
        }
    });
}

function startHatchTimer(hatchItem) {
    const slotElement = document.querySelector(`.hatchery-slot[data-slot-id="${hatchItem.slotId}"]`);
    if (!slotElement) return;

    // Atualiza UI
    const timerInterval = setInterval(() => {
        const now = Date.now();
        const timeLeftInMs = hatchItem.endTime - now;

        // Se está pronto, conclui incubação
        if (timeLeftInMs <= 0) {
            clearInterval(timerInterval);
            concludeHatchProcess(hatchItem, slotElement);
            return;
        }

        // Se não, atualiza UI
        slotElement.innerHTML = renderSlotHTML(hatchItem, "hatching", timeLeftInMs);
    }, 1000);

    slotElement.dataset.timerId = timerInterval;
}

function concludeHatchProcess(hatchItem, slotElement) {
    const success = Math.random() <= hatchItem.specie.hatchSuccessRate;

    if (!success) {
        toast({
            variant: "destructive",
            title: "Falha na Incubação",
            message: `O Processo de clonagem falhou e o Espécime "${hatchItem.specie.name}" foi perdido.`
        });
        cleanSlotAndStorage(hatchItem.slotId, slotElement);
        return;
    }

    // 2. Se for sucesso, renderiza o botão para colocar no parque
    slotElement.dataset.slotStatus = "done";
    slotElement.innerHTML = renderSlotHTML(hatchItem, "done", 0);
    
    toast({
        variant: "success",
        title: "Incubação Concluída!",
        message: `O Espécime "${hatchItem.specie.name}" está pronto para ser solto em um Cercado.`
    });
}

function cleanSlotAndStorage(slotId, slotElement) {
    const hatchingList = storage.get(STORAGE_KEY) || [];
    storage.set(STORAGE_KEY, hatchingList.filter(item => item.slotId !== slotId));
    
    if (slotElement) {
        slotElement.dataset.slotStatus = "empty";
        slotElement.innerHTML = "";
    }
}

function renderSlotHTML(hatchItem, status, timeLeftInMs) {
    const { specie, startTime, endTime } = hatchItem;

    if (status === "done") {
        const gameData = getResourceFromStorage("data");
        const options = gameData.tiles
            .filter((t) => t.category === "enclosure" && t.removable === 1)
            .map((t) => `<option value="tileCol=${t.position_col}&tileRow=${t.position_row}">${t.translatedName} [C: ${t.position_col} | L: ${t.position_row}]</option>`)
            .join("");

        return `
            <div class="slot-dinosaur" style="background-image: url('./assets/images/dinosaurs/${specie.name}_icon.png');">
                <button class="discard-dino-btn"><p class="ph-fill ph-trash"></p></button>
                <div class="hatch-done-container">
                    <select class="ipt-place-dinosaur">${options}</select>
                    <button class="place-dino-btn">Colocar Dinossauro</button>
                </div>
            </div>
        `;
    }

    // Tamanho da Progressbar
    const totalDurationInMs = endTime - startTime;
    const elapsedMs = totalDurationInMs - timeLeftInMs;
    const progressPercentage = Math.min((elapsedMs / totalDurationInMs) * 100, 100).toFixed(1);
    const timeLeftInSeconds = formatDinoHatchTime(Math.ceil(timeLeftInMs / 1000));

    return `
        <div class="slot-dinosaur" style="background-image: url('./assets/images/dinosaurs/${specie.name}_icon.png');">
            <button class="discard-dino-btn"><p class="ph-fill ph-trash"></p></button>
            <div class="hatch-progressbar-container">
                <div class="hatch-current-progress" style="width: ${progressPercentage}%;"></div>
            </div>
            <span class="hatch-time-left">${timeLeftInSeconds}</span>
        </div>
    `;
}

function placeDinosaurFromSlot(slotId) {
    const gameData = getResourceFromStorage("data");
    const hatchingList = storage.get(STORAGE_KEY) || [];
    const hatchItem = hatchingList.find((item) => item.slotId === String(slotId));
    const slotElement = document.querySelector(`.hatchery-slot[data-slot-id="${slotId}"]`);

    if (!gameData || !gameData.park || !hatchItem || !slotElement) return;

    const selectElement = slotElement.querySelector(".ipt-place-dinosaur");
    if (!selectElement) return;

    const position = selectElement.value; // ex: tileCol=2&tileRow=3

    // Inicia Chamada à API
    const placeBtn = slotElement.querySelector(".place-dino-btn");
    placeBtn.disabled = true;   //desabilita botão para não "spamar"
    placeBtn.innerText = "Enviando...";

    fetch(`/api/dinosaurs/${gameData.park.idUser}/place?${position}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idSpecies: hatchItem.specie.id })
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error("Erro no servidor ao colocar dinossauro.");
        }

        // Limpa o Slot, remove do SessionStorage e salva estado do parque
        cleanSlotAndStorage(hatchItem.slotId, slotElement);
        events.save();
        togglePanel("hatchery-panel");
        
        toast({ 
            variant: "success", 
            title: "Sucesso!", 
            message: "Dinossauro adicionado ao cercado." 
        });
    })
    .catch((error) => {
        console.error("[placeDinosaurFromSlot] Erro: ", error);
        placeBtn.disabled = false;
        placeBtn.innerText = "Tentar Novamente";
        toast({
            variant: "destructive",
            title: "Operação Negada",
            message: error.message || "Ocorreu um erro inesperado."
        });
    });
}