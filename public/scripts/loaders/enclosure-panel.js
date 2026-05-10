import { storage } from "../utils/storage.js";
import { togglePanel } from "../utils/toggler.js";
import { renderEnclosureChart } from "../charts/enclosure-chart.js"
import { getResourceFromStorage } from "../utils/getResourceFromStorage.js";
import { formatDinoHeight, formatDinoWeight, formatDinoAggressiveness } from "../utils/formatDinoFields.js";

export function loadEnclosure(tileCol, tileRow) {
    const panel = document.getElementById("enclosure-panel");
    if (!panel) return;
    panel.innerHTML = "";

    const data = getResourceFromStorage("data");
    const speciesData = getResourceFromStorage("species");
    if (!data || !speciesData) {
        console.warn("[loadHatchery] Dados necessários não foram encontrados no Storage.");
        return;
    };

    const { tiles, dinosaur } = data;

    const enclosure = tiles.find((t) => t.position_col == tileCol && t.position_row == tileRow);

    const dino = dinosaur.find((d) => d.tile_col == tileCol && d.tile_row == tileRow);
    if (!dino) {
        renderEmptyEnclosure(panel, enclosure);
    } else {
        const species = speciesData.find((sp) => sp.id == dino.idSpecies);
        renderOccupiedEnclosure(panel, enclosure, dino, species);
    }
}

function renderEnclosureFooter(enclosure, hasDino) {
    return `
        <div class="enclosure-status-footer">
            <div class="enclosure-health">
                <span>HP:</span>
                <div id="enclosure-healthbar">
                    <span>${enclosure.hp}/${enclosure.durability}</span>
                </div>
            </div>
            <div class="enclosure-actions">
                <button id="repair-enclosure-btn"><i class="ph-fill ph-wrench"></i>Reparar (${enclosure.durability})</button>
                ${hasDino ? `<button id="upgrade-enclosure-btn"><i class="ph-fill ph-coins"></i> Melhorar (${enclosure.baseCost})</button>` : ""}
            </div>
        </div>
    `;
}

function renderEmptyEnclosure(panel, enclosure) {
    panel.innerHTML = `
        <h3 class="panel-title">Cercado Vazio</h3>
        <div class="enclosure-dinosaur"></div>
        <div class="enclosure-status">
            <div class="enclosure-status-header">
                <h2>${enclosure.translatedName}</h2>
            </div>
            <div class="enclosure-status-body">
                <div class="empty-enclosure">
                    <p>Cercado Vazio</p>
                    <button id="go-to-hatchery-btn">Ir para a Incubadora</button>  
                </div>
            </div>
            ${renderEnclosureFooter(enclosure, false)}
        </div>
    `;

    panel.querySelector("#go-to-hatchery-btn").addEventListener("click", () => {
        togglePanel("enclosure-panel");
        togglePanel("hatchery-panel");
    });

    panel.querySelector("#repair-enclosure-btn").addEventListener("click", () => {
        console.log(`Lógica para reparar o cercado: ${enclosure.translatedName}`);
    });
}

function renderOccupiedEnclosure(panel, enclosure, dino, species) {
    panel.innerHTML = `
        <h3 class="panel-title">Cercado de ${dino.name}</h3>
        <div class="enclosure-dinosaur">
            <img src="./assets/images/dinosaurs/${dino.name}.png" alt="${dino.name}" class="species-img">
            <div class="enclosure-dinosaur-card">
                <div class="card-image">
                    <img src="./assets/images/dinosaurs/${dino.name}_icon.png" alt="${dino.name}" class="species-icon">
                    <img src="./assets/images/frame.png" alt="frame" class="frame">
                </div>
                <button id="release-dinosaur-btn">Soltar ${dino.name}</button>
            </div>
        </div>
        <div class="enclosure-status">
            <div class="enclosure-status-header">
                <h2>${enclosure.translatedName}</h2>
            </div>
            <div class="enclosure-status-body">
                <div class="enclosure-radar">
                    <canvas id="enclosure-radar-chart"></canvas>
                </div>
                <div class="enclosure-info">
                    <ul>
                        <li>Era: <span>${species.temporalRange}</span></li>
                        <li>Locomoção: <span>${species.locomotionType}</span></li>
                        <li>Dieta: <span>${species.diet}</span></li>
                        <li>Altura: <span>${formatDinoHeight(Number(species.heightInMeters))}</span></li>
                        <li>Peso: <span>${formatDinoWeight(Number(species.weightInKilograms))}</span></li>
                        <li>Agressividade: <span>${formatDinoAggressiveness(dino.aggressiveness)}</span></li>
                    </ul>
                </div>
            </div>
            ${renderEnclosureFooter(enclosure, true)}
        </div>
    `;

    panel.querySelector("#release-dinosaur-btn").addEventListener("click", () => {
        console.log(`Lógica para soltar dinossauro: ${dino.name}`);
    });

    panel.querySelector("#upgrade-enclosure-btn").addEventListener("click", () => {
        console.log(`Lógica para melhorar o cercado: ${enclosure.translatedName}`);
    });

    panel.querySelector("#repair-enclosure-btn").addEventListener("click", () => {
        console.log(`Lógica para reparar o cercado: ${enclosure.translatedName}`);
    });

    renderEnclosureChart(dino, species);
}