export const storage = {
    set: (key, value) => {
        try {
            const stringifiedValue = JSON.stringify(value);
            sessionStorage.setItem(key, stringifiedValue);
        } catch (error) {
            console.error(`[storage.js] Erro ao salvar no sessionStorage (Chave: ${key}): ${error}`);
        }
    },
    get:(key) => {
        try {
            const result = sessionStorage.getItem(key);
            return result ? JSON.parse(result) : null;
        } catch (error) {
            console.error(`[storage.js] Erro ao ler sessionStorage (Chave: ${key}): ${error}`);
            return null;
        }
    },
    remove:(key) => {
        sessionStorage.removeItem(key);
    },
    clear:() => {
        sessionStorage.clear();
    },
};

// function setItem(key, value) {
//     sessionStorage.setItem(key, value);
// };

// function getItem(key) {
//     return sessionStorage.getItem(key);
// };

// function clearItem(key) {
//     if(!getItem(key)) return;
//     sessionStorage.removeItem(key);
// }

// function clearStorage() {
//     sessionStorage.clear();
// }