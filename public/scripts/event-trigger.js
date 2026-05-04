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
        const data = retrieveJPWGData();

        // fetch("/api/users/save", {
        //     method: "PUT",
        //     headers: {"Content-Type": "application/json"},
        //     body: {data}
        // })
        // .then((res) => {
        //     if(!res.ok) {
        //         // tratar erro...
        //     }

        //     console.log("[DADOS SALVOS NO BANCO!]");
        //     triggerEvent("copyStorage", ["JPWG_DATA"])
        // })
        // .catch((error) => {})

        triggerEvent("copyStorage", ["JPWG_DATA"]);
    },
    copyStorage: (key) => {
        const data = sessionStorage.getItem(key);
        sessionStorage.setItem(`${key}_COPY`, data);
    },
    randomEvent: () => {},
    sabotage: () => {},
    pouringRain: () => {}

};

function retrieveJPWGData() {
    return JSON.parse(sessionStorage.getItem("JPWG_DATA"));
}