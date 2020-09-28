$( document ).ready(function() {});

//Codigo para generar información de categorias y almacenarlas en un arreglo.
const market = (() => {
    let categorias = [];
    //Este arreglo es para generar textos de prueba
    let textosDePrueba=[
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Dolore, modi!",
        "Quos numquam neque animi ex facilis nesciunt enim id molestiae.",
        "Quaerat quod qui molestiae sequi, sint aliquam omnis quos voluptas?",
        "Non impedit illum eligendi voluptas. Delectus nisi neque aspernatur asperiores.",
        "Ducimus, repellendus voluptate quo veritatis tempora recusandae dolorem optio illum."
    ]

    //Genera dinamicamente los JSON de prueba para esta evaluacion,
    //Primer ciclo para las categorias y segundo ciclo para las apps de cada categoria
    let contador = 1;
    for (let i=0;i<5;i++){//Generar 5 categorias
        let categoria = {
            nombreCategoria:"Categoria "+i,
            descripcion:textosDePrueba[Math.floor(Math.random() * (5 - 1))],
            aplicaciones:[]
        };
        for (let j=0;j<10;j++){//Generar 10 apps por categoria
            let aplicacion = {
                codigo:contador,
                nombre:"App "+contador,
                descripcion:textosDePrueba[Math.floor(Math.random() * (5 - 1))],
                icono:`img/app-icons/${contador}.webp`,
                instalada:contador%3==0?true:false,
                app:"app/demo.apk",
                calificacion:Math.floor(Math.random() * (5 - 1)) + 1,
                descargas:1000,
                desarrollador:`Desarrollador ${(i+1)*(j+1)}`,
                cost: Math.floor(Math.random() * 101)/20,
                imagenes:["img/app-screenshots/1.webp","img/app-screenshots/2.webp","img/app-screenshots/3.webp"],
                comentarios:[
                    {comentario:textosDePrueba[Math.floor(Math.random() * (5 - 1))],calificacion:Math.floor(Math.random() * (5 - 1)) + 1,fecha:"12/12/2012",usuario:"Juan"},
                    {comentario:textosDePrueba[Math.floor(Math.random() * (5 - 1))],calificacion:Math.floor(Math.random() * (5 - 1)) + 1,fecha:"12/12/2012",usuario:"Pedro"},
                    {comentario:textosDePrueba[Math.floor(Math.random() * (5 - 1))],calificacion:Math.floor(Math.random() * (5 - 1)) + 1,fecha:"12/12/2012",usuario:"Maria"},
                ]
            };
            contador++;
            categoria.aplicaciones.push(aplicacion);
        }
        categorias.push(categoria);
    }

    return categorias;
});

/**
 * Retorna una lista completa de las palicaciones almacenadas
 * @param {JSON} store 
 */
const list = ((store) => {
    let content = '';
    store.forEach( (element) => {
        const aplicaciones = element.aplicaciones;

        aplicaciones.forEach((aplicacion) => {
            const price = aplicacion.cost > 0.5 ? '$'+aplicacion.cost:'FREE';
            let card = `
            <div class="col-xl-2 col-lg-2 col-md-3 col-sm-6" data-app-category="${element.nombreCategoria}"
            data-app-code="${element.codigo}" data-price-code="${price}" onClick="showDetailApp(this)">
            <div class="card card-active p-2 my-2">
            <img src="${aplicacion.icono}" srcset="${aplicacion.icono}" class="card-img-top" alt="Logo ${aplicacion.nombre}">
            <div class="card-body py-1 px-0">
            <h5 class="card-title">${aplicacion.nombre}</h5>
            <h6 class="card-subtitle">${aplicacion.desarrollador}</h6>
            <div class="icon-star py-2">`;

            for (let index = 1; index <= 5; index++) {
                if (aplicacion.calificacion >= index) {
                    card += '<i class="fas fa-star"></i>';
                } else {
                    card += '<i class="far fa-star"></i>';
                }
            }

            card += `</div>
            <h5 class="card-title font-weight-bold">${price}</h5>
            </div>
            </div>
            </div>`;
            content += card;
        });
    });
    
    return content;
});

/**
 * Genera las opciones para un select con las diferentes categorias almacenadas
 * @param {JSON} store
 * @return {String}
 */
const options = ((store) => {
    let content = '<option value="">Todas las categorias</option>';
    store.forEach((category, key) => {
        content += `<option value="${key}">${category.nombreCategoria}</option>`;
    });

    return content;
});

/**
 * Genera las opciones para un select con las diferentes categorias almacenadas
 * @param {JSON} store
 * @return {String}
 */
const appsByCategory = ((category, store) => {
    let content = '';
    const aplicaciones = store[category].aplicaciones;

    aplicaciones.forEach((aplicacion) => {
        const price = aplicacion.cost > 0.5 ? '$'+aplicacion.cost:'FREE';
        let card = `
        <div class="col-xl-2 col-lg-2 col-md-3 col-sm-6" data-app-category="${store[category].nombreCategoria}"
        data-app-code="${store[category].codigo}" data-price-code="${price}" onClick="showDetailApp(this)">
        <div class="card card-active p-2 my-2">
        <img src="${aplicacion.icono}" srcset="${aplicacion.icono}" class="card-img-top" alt="Logo ${aplicacion.nombre}">
        <div class="card-body py-1 px-0">
        <h5 class="card-title">${aplicacion.nombre}</h5>
        <h6 class="card-subtitle">${aplicacion.desarrollador}</h6>
        <div class="icon-star py-2">`;

        for (let index = 1; index <= 5; index++) {
            if (aplicacion.calificacion >= index) {
                card += '<i class="fas fa-star"></i>';
            } else {
                card += '<i class="far fa-star"></i>';
            }
        }

        card += `</div>
        <h5 class="card-title font-weight-bold">${price}</h5>
        </div>
        </div>
        </div>`;
        content += card;
    });
    
    return content;
});

/**
 * Funcion que al ser llamada obtiene la data y llama a una funcion para filtrar las apps
 * @param {HTMLElement} element 
 */
const cargarAplicaciones =((element) => {
    const category = element.value;
    if (category === "") {
        storeMenu.innerHTML = list(store);
    } else {
        storeMenu.innerHTML = appsByCategory(category, store);
    }
});

var store = localStorage.getItem('appstore');
const storeMenu = document.getElementById('apps-menu');
const categories = document.getElementById('categoria');

if (!store) {
    store = market();
    localStorage.setItem('appstore', JSON.stringify(store));
} else {
    store = JSON.parse(store);
}

storeMenu.innerHTML = list(store);
categories.innerHTML = options(store);