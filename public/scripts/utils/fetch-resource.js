async function fetchResource(endpoint) {
    try {
        const response = await fetch(endpoint);

        if(!response.ok) {
            throw new Error(`[fetchResource.js] Erro ao retornar dados de: ${endpoint}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error.message || error);
    }
}