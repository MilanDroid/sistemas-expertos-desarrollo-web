import {market, list} from "./Market.js";
import appDetail from "./Apps.js";
import {options,  appsByCategory} from './Categories.js';

var store = localStorage.getItem('appstore');
const storeMenu = document.getElementById('apps-menu');
const categories = document.getElementById('categoria');
const showDetailApp = appDetail;

if (!store) {
    store = market();
    localStorage.setItem('appstore', JSON.stringify(store));
} else {
    store = JSON.parse(store);
}

storeMenu.innerHTML = list(store);
categories.innerHTML = options(store);

categories.addEventListener('change', () => {
    const category = categories.value;
    if (category === "") {
        storeMenu.innerHTML = list(store);
    } else {
        storeMenu.innerHTML = appsByCategory(category, store);
    }
});