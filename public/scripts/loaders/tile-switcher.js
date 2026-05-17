import { toast } from "../utils/toast.js";
import { storage } from "../utils/storage.js";
import { loadGrid } from "./park-grid.js";
import { togglePanel } from "../utils/toggler.js";
import { updateParkBalance } from "../update-park.js";
import { getResourceFromStorage } from "../utils/getResourceFromStorage.js";

export function loadTileSwitcher(tileCol, tileRow) {
    const tileSwitcherList = document.getElementById("tile-list");
    const changeTileBtn = document.getElementById("change-tile-btn");
    const removeTileBtn = document.getElementById("remove-tile-btn");
    
    const tileElement = document.querySelector(`[data-tile-col="${tileCol}"][data-tile-row="${tileRow}"]`);
    if (!tileSwitcherList || !tileElement) return;
    
    // 1. Limpa a Lista e Deseleciona o Tile
    tileSwitcherList.innerHTML = "";
    tileElement.classList.add("tile-selected");
    
    // 2. Retorna dados do sessionStorage
    const gameData = getResourceFromStorage("data");
    const buildingsData = getResourceFromStorage("buildings");
    if (!gameData || !buildingsData) {
        console.warn("[loadTileSwitcher] Dados necessários não encontrados no Storage.");
        return;
    }
    
    const { tiles } = gameData;
    const selectedTileData = tiles.find((t) => t.position_col == tileCol && t.position_row == tileRow);

    // 3. Carrega a Lista de Opções de Construção
    const optionsHTML = buildingsData.map((build) => {
        const isSelected = selectedTileData.name === build.name;

        const isChangeable = build.maxUnits 
            ? tiles.filter((t) => t.name === build.name).length < build.maxUnits 
            : true;

        return buildingOptionHTML(build, isSelected, isChangeable);
    }).join(""); 
    tileSwitcherList.innerHTML = optionsHTML;

    // 4. Eventos HTML
    tileSwitcherList.onclick = (event) => {
        const clickedOption = event.target.closest(".tile-item");
        if (!clickedOption) return;

        // Deseleciona todos e seleciona o atual
        tileSwitcherList.querySelectorAll(".tile-item").forEach(item => item.dataset.tileSelected = "false");
        clickedOption.dataset.tileSelected = "true";
    };

    changeTileBtn.onclick = () => {
        if (!selectedTileData.removable) {
            toast({
                variant: "warn",
                title: "Tile Especial",
                message: "Este tile não pode ser removido no momento!"
            });
            return;
        }
        
        const selectedOpt = tileSwitcherList.querySelector(".tile-item[data-tile-selected='true']");
        if (!selectedOpt) {
            toast({ 
                variant: "warn", 
                title: "Atenção", 
                message: "Selecione uma construção primeiro!"
            });
            return;
        }

        const newTileData = buildingsData.find((build) => build.name === selectedOpt.dataset.tileType);
        changeTile(selectedTileData, newTileData);
        closeSwitcher(tileElement);
    };
    
    removeTileBtn.onclick = () => {
        closeSwitcher(tileElement);
    };
}

function buildingOptionHTML(build, selected, changeable) {
    return `
        <li class="tile-item" 
            data-tile-type="${build.name}" 
            data-tile-selected="${selected}" 
            data-tile-changeable="${changeable}">
            <div class="tile-header">
                <p>${build.translatedName}</p>
            </div>
            <img src="./assets/images/${build.category}s/${build.name}.png" alt="${build.name}">
            <div class="tile-footer">
                <p class="tile-price">
                    <i class="ph-fill ph-coins"></i><span>${build.baseCost}</span>
                </p>
            </div>
        </li>
    `;
}

function closeSwitcher(tileElement) {
    // Deseleciona Opção e fecha o Overlay
    tileElement.classList.remove("tile-selected");
    togglePanel("tile-switcher");
}

function changeTile(currentTile, newTileData) {
    const gameData = getResourceFromStorage("data");
    if (!gameData || !gameData.park) {
        toast({
            variant: "destructive",
            title: "Operação Negada",
            message: "Sessão inválida. Tente recarregar a página."
        });
        return;
    }

    const { park } = gameData;
    if (newTileData.baseCost > park.dinoCoins) {
        toast({
            variant: "warn",
            title: "Saldo Insuficiente",
            message: "Você não possui DinoCoins suficientes para esta construção!"
        });
        return;
    }

    fetch(`/api/tiles/${park.idUser}/type?tileCol=${currentTile.position_col}&tileRow=${currentTile.position_row}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ idBuilding: newTileData.id })
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error("Erro no servidor ao tentar mudar o tile.");
        }
        return response.json();
    })
    .then((data) => {
        // 1. Decrementar saldo
        const newBalance = park.dinoCoins - newTileData.baseCost;
        updateParkBalance(newBalance);

        // 2. Atualizar sessionStorage
        storage.set("JPWG_DATA", { ...gameData, tiles: data });

        // 3. Recarregar o GRID
        loadGrid();
        toast({ 
            variant: "success", 
            title: "Construção Concluída", 
            message: `${newTileData.translatedName} construído com sucesso!`
        });
    })
    .catch((error) => {
        console.error("[changeTile] Erro: ", error);
        toast({
            variant: "destructive",
            title: "Falha na Construção",
            message: error.message || "Ocorreu um erro inesperado."
        });
    });
}