import { getResourceFromStorage } from "../utils/getResourceFromStorage.js";

export function loadStatusBar() {
    const data = getResourceFromStorage("data");
    if(!data) return;

    const { park } = data;

    const pParkName = document.getElementById("park-name");
    const pParkRating = document.getElementById("park-rating");
    const pParkBalance = document.getElementById("park-balance");
    pParkRating.innerHTML = "";
    
    pParkName.innerHTML = park.name;
    pParkBalance.innerHTML = Number(park.dinoCoins).toLocaleString("pt-br");
    
    for (let i = 0; i < 5; i++) {
        const star = document.createElement("i");
        if(park.rating - i === 0.5) {
            star.classList.add("rating", "ph-fill", "ph-star-half");
        } else if(park.rating - i <= 0) {
            star.classList.add("rating", "ph", "ph-star");
        }
        else {
            star.classList.add("rating", "ph-fill", "ph-star");
        }
        pParkRating.appendChild(star);
    }
}