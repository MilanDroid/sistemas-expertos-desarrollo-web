import {market, list} from "./Market.js";
import appDetail from "./Apps.js";
import {options,  appsByCategory} from './Categories.js';

var store = localStorage.getItem('appstore');
const storeMenu = document.getElementById('apps-menu');
const categories = document.getElementById('categoria');
const appDetailModal = document.getElementById('apps-detail-content');

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

$(document).ready(() => {
    $('.card.card-app:not([data-app-code=""])').click((el) => {
        const appCode = el.currentTarget.dataset.appCode - 1;
        const appCategory = el.currentTarget.dataset.appCategory;
        appDetailModal.innerHTML = showDetailApp(store[appCategory].aplicaciones[appCode]);
    });
});