import { getResourceFromStorage } from "../utils/getResourceFromStorage.js";
import { renderGeneralCharts } from "../charts/general-charts.js";

export function loadGeneral() {
    const panel = document.getElementById("general-panel");
    if (!panel) return;
    panel.innerHTML = "";

    const data = getResourceFromStorage("data");
    const speciesData = getResourceFromStorage("species");

    if (!data || !data.park || !data.dinosaur || !data.tiles || !speciesData) {
        console.warn("[loadGeneral] Dados necessários não foram encontrados no Storage.");
        return;
    }

    const { park, dinosaur, tiles } = data;

    const dinosaurCards = getDinosaurCards(dinosaur, tiles);

    const parkInfoTemplate = `
        <div class="park-info">
            <div class="park-info-header">
                <h1 data-ui-resource="park:name">${park.name}</h1>
            </div>
            <div class="park-info-body">
                <div class="park-info--left">
                    <div class="rating-info">
                        <h3>AVALIAÇÃO</h3>
                        <p><span data-ui-resource="park:rating">${park.rating}</span> <i class="ph-fill ph-star-half"></i></p>
                    </div>
                    <ul class="kpi-list">
                        <li class="kpi-card">
                            <div class="kpi-main">
                                <p>${dinosaur.length}</p>
                                <span>Dinossauros no Parque</span>
                            </div>
                            <div class="kpi-footer">
                                <p>de um total de ${speciesData.length}</p>
                            </div>
                        </li>
                        <li class="kpi-card">
                            <div class="kpi-main">
                                <p>2</p>
                                <span>Imprevistos ocorrendo</span>
                            </div>
                            <div class="kpi-footer">
                                <p>Chuva Torrencial, Sabotagem</p>
                            </div>
                        </li>
                        <li class="kpi-card">
                            <div class="kpi-main">
                                <p>0</p>
                                <span>Dinossauros na Incubadora</span>
                            </div>
                            <div class="kpi-footer">
                                <p>Velociraptor, Velociraptor</p>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="park-info--right">
                    <div class="balance-info">
                        <p>Saldo Atual</p>
                        <b><i class="ph-fill ph-coins"></i><span data-ui-resource="park:dinoCoins">${Number(park.dinoCoins).toLocaleString("pt-br")}</span></b>
                    </div>
                    <div class="graph-info">
                        <canvas id="dino-diet-graph"></canvas>
                        <canvas id="dino-hatch-graph"></canvas>
                    </div>
                    <ul id="dinosaur-info">
                        ${dinosaurCards}
                    </ul>
                </div>
            </div>
        </div>
    `;

    panel.innerHTML = parkInfoTemplate;
    renderGeneralCharts(dinosaur, speciesData);
}

function getDinosaurCards(dinosaursList, tilesList) {
    if (dinosaursList.length === 0) {
        return `<li class="general-dinosaur-card">Nenhum dinossauro solto no parque ainda.</li>`;
    }

    let dinosaurCards = "";
    dinosaursList.forEach((dino) => {
        const enclosure = tilesList.find((t) => t.position_col == dino.tile_col && t.position_row == dino.tile_row);
        const enclosureName = enclosure.translatedName;

        dinosaurCards += `
            <li class="general-dinosaur-card">
                <div class="card-image">
                    <img src="./assets/images/dinosaurs/${dino.name}.png" alt="${dino.name}" class="species-icon" onerror="this.src='./assets/images/dinosaurs/default_icon.png'">
                    <img src="./assets/images/frame.png" alt="frame" class="frame">
                </div>
                <div class="card-info">
                    <p class="dino-name">${dino.name}</p>
                    <p class="enclosure-name">${enclosureName}</p>
                    <div class="enclosure-position">
                        <p>Coluna: ${dino.tile_col}</p>
                        <p>Linha: ${dino.tile_row}</p>
                    </div>
                </div>
            </li>
        `;
    });

    return dinosaurCards;
}