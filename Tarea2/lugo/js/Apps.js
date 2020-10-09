import {users, optionUsers} from "./Users.js";
import categories from "./Categories.js";

usersStorage = localStorage.getItem('users');
categoriesStorage = localStorage.getItem('categories');
const selectUsers = document.getElementById('users');
const userName = document.getElementById('user-name');

if (!usersStorage) {
    usersStorage = users;
    localStorage.setItem('users', JSON.stringify(usersStorage));
} else {
    usersStorage = JSON.parse(usersStorage);
}

if (!categoriesStorage) {
    categoriesStorage = categories;
    localStorage.setItem('categories', JSON.stringify(categoriesStorage));
} else {
    categoriesStorage = JSON.parse(categoriesStorage);
}

optionUsers(selectUsers);

changeUser = (element) => {
    if (element.value) {
        userName.innerHTML = element.value;
    } else {
        userName.innerHTML = '@lugo';
    }
}

console.log ('Usuarios', users);
console.log ('Categorias', categories);