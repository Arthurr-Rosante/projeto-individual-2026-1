function setItem(key, value) {
    sessionStorage.setItem(key, value);
};

function getItem(key) {
    return sessionStorage.getItem(key);
};

function clearItem(key) {
    if(!getItem(key)) return;
    sessionStorage.removeItem(key);
}

function clearStorage() {
    sessionStorage.clear();
}