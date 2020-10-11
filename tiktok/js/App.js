// import {papelera} from "./Papelera.js";

enviadosStorage = localStorage.getItem('enviados');
papeleraStorage = localStorage.getItem('recibidos');
papeleraStorage = localStorage.getItem('papelera');

// if (!enviadosStorage) {
//     enviadosStorage = enviados;
//     localStorage.clear();
//     localStorage.setItem('enviados', JSON.stringify(enviadosStorage));
// } else {
//     enviadosStorage = JSON.parse(enviadosStorage);
// }