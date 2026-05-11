import {getResourceFromStorage} from "../utils/getResourceFromStorage.js"

export function loadTileSwitcher(tileCol, tileRow) {
    const tileSwitcherList = document.getElementById("tile-list");
    if(!tileSwitcherList) return;
    tileSwitcherList.innerHTML = "";

    const data = getResourceFromStorage("data");
    const buildingsData = getResourceFromStorage("buildings");
    if (!data || !buildingsData) {
        console.warn("[loadTileSwitcher] Dados necessários não foram encontrados no Storage.");
        return;
    };

    const { tiles } = data;
    buildingsData.forEach((build) => {
        let canChange = build.maxUnits && (tiles.filter((t) => t.name === build.name).length < build.maxUnits);
        let currentTile = tiles.find((t) => t.position_col == tileCol && t.position_row == tileRow)


        tileSwitcherList.innerHTML += renderTileOption(build, currentTile, canChange);
    });
}

function renderTileOption(tile, currentTile, canChange) {
    const { name, translatedName, category, baseCost } = tile;

    let selected = currentTile.name === name;

    return `
        <li class="tile-item" data-tile-selected="${selected}" data-can-change-tile="${canChange}">
            <div class="tile-header"><p>${translatedName}</p></div>
            <img src="./assets/images/${category}s/${name}.png" alt="${name}">
            <div class="tile-footer">
                <p class="tile-price"><i class="ph-fill ph-coins"></i><span>${baseCost}</span></p>
            </div>
        </li>
    `;
}

function setTileEvents() {}