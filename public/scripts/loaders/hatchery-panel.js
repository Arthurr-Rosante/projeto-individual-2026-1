import { getResourceFromStorage } from "../utils/getResourceFromStorage.js";
import { formatDinoHatchTime, formatDinoHatchSuccess } from "../utils/formatDinoFields.js";

export function loadHatchery() {
    const hatcheryList = document.getElementById("hatchery-list");
    if (!hatcheryList) return;
    hatcheryList.innerHTML = "";

    const data = getResourceFromStorage("data");
    const speciesData = getResourceFromStorage("species");
    if (!speciesData || !data || !data.park) {
        console.warn("[loadHatchery] Dados necessários não foram encontrados no Storage.");
        return;
    }

    const { park } = data;

    let speciesList = "";
    speciesData.forEach((specie) => {
        const canAfford = park.dinoCoins >= specie.hatchCost;

        speciesList += `
            <li class="hatchery-item" style="background-image: url('./assets/images/dinosaurs/${specie.name}_icon.png');">
                <p class="hatchery-title">${specie.name}</p>
                <div class="hatchery-item-info">
                    <p><span><i class="ph-fill ph-coins"></i> ${specie.hatchCost}</span></p>
                    <p><span><i class="ph-fill ph-timer"></i> ${formatDinoHatchTime(specie.hatchTimeInSeconds)}</span></p>
                    <p><span><i class="ph-fill ph-egg-crack"></i> ${formatDinoHatchSuccess(specie.hatchSuccessRate)}</span></p>
                </div>
                <div class="hatchery-item-footer">
                    <button 
                        class="hatch-btn" 
                        data-species-id="${specie.id}" 
                        ${canAfford ? "" : "disabled"}
                    >
                        Incubar
                    </button>
                </div>
            </li>
        `;
    });

    hatcheryList.innerHTML = speciesList;
    setHatcheryEvents(hatcheryList);
}

function setHatcheryEvents(hatcheryList) {
    const buttons = hatcheryList.querySelectorAll(".hatch-btn");

    buttons.forEach((button) => {
        button.addEventListener("click", (e) => {
            const speciesId = Number(e.currentTarget.dataset.speciesId);
            console.log(`Lógica para para incubar dinossauro: Espécie ${speciesId}`);
        });
    });
}