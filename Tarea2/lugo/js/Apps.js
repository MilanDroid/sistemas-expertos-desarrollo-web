import {users, optionUsers, showOrdersByUser, showAddOrderModal, addOrderToUser} from "./Users.js";
import {categories, categoriesCards, showCategoryDetail} from "./Categories.js";

usersStorage = localStorage.getItem('usuarios');
categoriesStorage = localStorage.getItem('categorias');
const selectUsers = document.getElementById('users');
const categoriesMenu = document.getElementById('categories-menu');

if (!usersStorage) {
    usersStorage = users;
    localStorage.clear();
    localStorage.setItem('usuarios', JSON.stringify(usersStorage));
} else {
    usersStorage = JSON.parse(usersStorage);
}

if (!categoriesStorage) {
    categoriesStorage = categories;
    localStorage.setItem('categorias', JSON.stringify(categoriesStorage));
} else {
    categoriesStorage = JSON.parse(categoriesStorage);
}

optionUsers(selectUsers);
categoriesCards(categoriesStorage, categoriesMenu);

loadOrders = showOrdersByUser;
categoryDetail = showCategoryDetail;
showAddOrder = showAddOrderModal;
addOrder = addOrderToUser;

changeUser = (element) => {
    if (element.value) {
        actualUser = usersStorage[element.value];
        document.getElementById('user-name').innerHTML = actualUser.nombre;
        document.getElementById('btn-view-orders').removeAttribute('disabled');
    } else {
        userName.innerHTML = '@lugo';
        document.getElementById('btn-view-orders').setAttribute('disabled');
    }
}