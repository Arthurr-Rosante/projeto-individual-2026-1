import {toast} from "../utils/toast.js";
import { togglePanel } from "../utils/toggler.js";
import { getResourceFromStorage } from "../utils/getResourceFromStorage.js";

export function loadTileSwitcher(tileCol, tileRow) {
    const tileSwitcherList = document.getElementById("tile-list");
    const changeTileBtn = document.getElementById("change-tile-btn");
    const removeTileBtn = document.getElementById("remove-tile-btn");

    const tileElement = document.querySelector(`[data-tile-col="${tileCol}"][data-tile-row="${tileRow}"]`);
    if (!tileSwitcherList || !tileElement) return;

    // Limpa a lista antes de renderizar opções
    tileSwitcherList.innerHTML = "";

    const data = getResourceFromStorage("data");
    const buildingsData = getResourceFromStorage("buildings");
    if (!data || !buildingsData) {
        console.warn("[loadTileSwitcher] Dados necessários não encontrados.");
        return;
    }

    const { tiles, park } = data;
    const currentTileData = tiles.find((t) => t.position_col == tileCol && t.position_row == tileRow);
    if (!currentTileData) return;

    let tileOptionsList = "";
    buildingsData.forEach((build) => {
        let tileChangeable = build.maxUnits ? (tiles.filter((t) => t.name === build.name).length < build.maxUnits) : true;
        tileOptionsList += renderTileOption(build, currentTileData, tileChangeable);
    });
    tileSwitcherList.innerHTML = tileOptionsList;

    tileSwitcherList.addEventListener("click", (event) => {
        const clickedItem = event.target.closest(".tile-item");
        if (!clickedItem) return;

        // Desmarca todos e marca o clicado
        tileSwitcherList.querySelectorAll(".tile-item").forEach((item) => item.dataset.tileSelected = "false");
        clickedItem.dataset.tileSelected = "true";
    });

    changeTileBtn.onclick = () => {
        const selectedOption = tileSwitcherList.querySelector(".tile-item[data-tile-selected='true']");
        if (!selectedOption) return;

        if(!currentTileData.removable) {
            toast({
                variant: "warn",
                title: "Tile Especial",
                message: "Este tile não pode ser removido no momento!"
            });
            return;
        }
        
        changeTile(tileElement, currentTileData, selectedOption, buildingsData);
        closeSwitcher(tileElement);
    };
    
    removeTileBtn.onclick = () => {
        closeSwitcher(tileElement);
    };
}

function closeSwitcher(tileElement) {
    tileElement.classList.remove("tile-selected");
    togglePanel("tile-switcher");
}

function renderTileOption(tile, currentTile, changeable) {
    const { name, translatedName, category, baseCost, removable } = tile;

    let selected = currentTile.name === name;
    let enclosureCondition = true;

    return `
        <li class="tile-item" data-tile-type="${name}" data-tile-selected="${selected}" data-tile-changeable="${changeable}" data-tile-removeable="${Boolean(removable) && enclosureCondition}">
            <div class="tile-header"><p>${translatedName}</p></div>
            <img src="./assets/images/${category}s/${name}.png" alt="${name}">
            <div class="tile-footer">
                <p class="tile-price"><i class="ph-fill ph-coins"></i><span>${baseCost}</span></p>
            </div>
        </li>
    `;
}


function changeTile(currentTileElement, currentTileData, newTileOption, buildings) {
    const newBuildingType = buildings.find((b) => b.name === newTileOption.dataset.tileType);
    
    currentTileElement.classList = `tile ${newBuildingType.category} ${newBuildingType.name}`;
}