import {enviados} from "./Enviados.js";
import {recibidos} from "./Recibidos.js";
import {papelera} from "./Papelera.js";

enviadosStorage = localStorage.getItem('enviados');
papeleraStorage = localStorage.getItem('recibidos');
papeleraStorage = localStorage.getItem('papelera');

if (!enviadosStorage) {
    enviadosStorage = enviados;
    localStorage.clear();
    localStorage.setItem('enviados', JSON.stringify(enviadosStorage));
} else {
    enviadosStorage = JSON.parse(enviadosStorage);
}

if (!recibidosStorage) {
    recibidosStorage = recibidos;
    localStorage.setItem('recibidos', JSON.stringify(recibidosStorage));
} else {
    recibidosStorage = JSON.parse(recibidosStorage);
}

if (!papeleraStorage) {
    papeleraStorage = papelera;
    localStorage.setItem('recibidos', JSON.stringify(papeleraStorage));
} else {
    papeleraStorage = JSON.parse(papeleraStorage);
}