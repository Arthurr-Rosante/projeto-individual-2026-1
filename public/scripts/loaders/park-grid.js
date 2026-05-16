import { getResourceFromStorage } from "../utils/getResourceFromStorage.js";

export function loadGrid() {
    const data = getResourceFromStorage("data");
    if(!data) return;

    const {tiles, dinosaur} = data;
    const rowElements = document.querySelectorAll(".row");
    rowElements.forEach((el) => el.innerHTML = "");

    tiles.forEach((tile) => {
        const t = document.createElement("div");
        const tCol = tile.position_col;
        const tRow = tile.position_row;
        t.classList.add("tile", tile.category, tile.name);
        t.dataset.tileCol = tCol;
        t.dataset.tileRow = tRow;

        dinosaur.forEach((dino) => {
                if(dino.tile_col == tCol && dino.tile_row == tRow) {
                    const d = document.createElement("div");
                    d.classList.add("dinosaur", dino.name);
                    t.appendChild(d);
                }
        });

        const row = document.querySelector(`.row.row-${tRow + 1}`)
        row.appendChild(t);
    });
}