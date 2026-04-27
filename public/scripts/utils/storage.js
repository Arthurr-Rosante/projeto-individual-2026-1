function setItem(key, value) {
    sessionStorage.setItem(key, value);
};

function getItem(key) {
    return sessionStorage.getItem(key);
};

function removeItem(key) {
    sessionStorage.removeItem(key);
};

function clearStorage() {
    sessionStorage.clear();
}