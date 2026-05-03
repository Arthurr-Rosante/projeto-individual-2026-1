function triggerEvent(event, params = []) {
    const d = new Date().toLocaleString();
    const fn = eventList[event];

    if(typeof fn !== "function") {
        console.log(`[event.js] Erro: "${event}" não é um evento válido!`);
        return;
    }

    fn(...params);
    console.log(`Evento: ${event} | ${d}`);
}

const eventList = {
    save: () => {
        // lógica de save...
        console.log("[DADOS SALVOS!]");
        triggerEvent("printStorage", ["JPWG_DATA"])
    },
    printStorage: (key) => {
        const data = sessionStorage.getItem(key);
        sessionStorage.setItem(`${key}_COPY`, data);
    },
    increaseBalance: () => {},
    randomEvent: () => {},

    sabotage: () => {},
    pouringRain: () => {}

};