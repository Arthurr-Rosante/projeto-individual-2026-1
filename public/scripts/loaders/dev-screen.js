import { getResourceFromStorage } from "../utils/getResourceFromStorage.js";

export function loadDevScreen() {
    const data = getResourceFromStorage("data");
    if(!data) return;

    const devIptParkName = document.getElementById("dev-ipt-park-name");
    const devIptParkRating = document.getElementById("dev-ipt-park-rating");
    const devIptParkBalance = document.getElementById("dev-ipt-park-balance");
    
    devIptParkName.value = data.park.name;
    devIptParkRating.value = data.park.rating;
    devIptParkBalance.value = data.park.dinoCoins;
}