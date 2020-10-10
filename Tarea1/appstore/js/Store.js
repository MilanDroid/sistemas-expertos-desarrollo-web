import market from "./Market.js";
import {appDetail, appsByCategory, appsList, formAddApp, addStoreApp, formRemoveApp, removeStoreApp} from "./Apps.js";
import options from './Categories.js';

store = localStorage.getItem('appstore');
const storeMenu = document.getElementById('apps-menu');
const categories = document.getElementById('categoria');

if (!store) {
    store = market();
    localStorage.clear();
    localStorage.setItem('appstore', JSON.stringify(store));
} else {
    store = JSON.parse(store);
}

storeMenu.innerHTML = appsList();
categories.innerHTML = options();

appDetailDispatcher = appDetail;
showFormAddApp = formAddApp;
addApp = addStoreApp;
showRemoveApp = formRemoveApp;
removeApp = removeStoreApp;

categories.addEventListener('change', () => {
    const category = categories.value;
    if (category === "") {
        storeMenu.innerHTML = appsList();
    } else {
        storeMenu.innerHTML = appsByCategory(category);
    }
});