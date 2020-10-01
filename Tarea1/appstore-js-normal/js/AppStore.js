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
    store.forEach( (element, key) => {
        const aplicaciones = element.aplicaciones;

        aplicaciones.forEach((aplicacion) => {
            const price = aplicacion.cost > 0.5 ? '$'+aplicacion.cost:'FREE';
            let card = `
            <div class="col-xl-2 col-lg-2 col-md-3 col-sm-6">
            <div class="card card-active p-2 my-2" data-app-category="${key}"
            data-app-code="${element.codigo}" data-price-code="${price}"
            data-toggle="modal" data-target="#apps-detail" onClick="showDetailApp(this)">
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
 * Genera la vista de la calificacion con los colores determinados y si se desea el numero de la calificacion
 * @param {Integer} calificacion 
 * @param {String} goodColor 
 * @param {String} badColor 
 * @param {Boolean} text
 * @returns {String}
 */
const stars = ((calificacion, goodColor, badColor, text) => {
    let ranking = '';
    for (let index = 1; index <= 5; index++) {
        if (calificacion >= index) {
            ranking += `<i class="fas fa-star ${calificacion > 2 ? goodColor:badColor}"></i>`;
        } else {
            ranking += `<i class="far fa-star ${calificacion > 2 ? goodColor:badColor}"></i>`;
        }
    }
    if (text) {
        ranking += ` <strong class="${calificacion > 2 ? goodColor:badColor}">${calificacion}.0</strong>`;
    }

    return ranking;
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
        const calificacion = stars(aplicacion.calificacion, '', '', false);
        let card = `
        <div class="col-xl-2 col-lg-2 col-md-3 col-sm-6">
        <div class="card card-active p-2 my-2" data-app-category="${category}"
        data-app-code="${aplicacion.codigo}" data-price-code="${price}"
        data-toggle="modal" data-target="#apps-detail" onClick="showDetailApp(this)">
        <img src="${aplicacion.icono}" srcset="${aplicacion.icono}" class="card-img-top" alt="Logo ${aplicacion.nombre}">
        <div class="card-body py-1 px-0">
        <h5 class="card-title">${aplicacion.nombre}</h5>
        <h6 class="card-subtitle">${aplicacion.desarrollador}</h6>
        <div class="icon-star py-2">${calificacion}</div>
        <h5 class="card-title font-weight-bold">${price}</h5>
        </div>
        </div>
        </div>`;
        content += card;
    });
    
    return content;
});

/**
 * Retorna el detalle de la aplicacion, imagenes, descripcion, nombre, desarrollador y comentarios
 * @param {JSON} appData
 * @returns {String}
 */
const appDetail = ((appData)=> {
    const price = appData.cost > 0.5 ? '$'+appData.cost:'FREE';
    const ranking = stars(appData.calificacion, 'text-success', 'text-danger', true);
    let carousel = '';
    appData.imagenes.forEach((image, key) => {
        carousel += `
        <div class="carousel-item ${key === 0 ? 'active':''}">
            <img src="${image}" class="d-block w-100" alt="${image}">
        </div>`;
    });
    let comentarios = '';
    appData.comentarios.forEach((comentario) => {
        const calificacion = stars(comentario.calificacion, 'text-primary', 'text-danger', true);
        comentarios += `<div class="row">
            <div class="col-2 px-3">
                <img class="rounded-circle" src="img/user.webp" class="d-block w-100" alt="img/user.webp">
            </div>
            <div class="col px-3">
                <h6 class="my-0"><b>${comentario.usuario}</b></h6>
                <small class="text-muted my-0">${comentario.comentario}</small>
                <div class="row justify-content-between">
                    <div class="col">
                        <div><small>${calificacion}</small></div>
                    </div>
                    <div class="col-4">
                        <small class="text-muted">${comentario.fecha}</small>
                    </div>
                </div>
            </div>
        </div>
        <hr>`;
    });

    let content = `<div class="modal-body px-4">
        <div id="carouselExampleFade" class="carousel slide carousel-fade" data-ride="carousel">
            <div class="carousel-inner">${carousel}</div>
        </div>
        <a class="carousel-control-prev" href="#carouselExampleFade" role="button" data-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleFade" role="button" data-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="sr-only">Next</span>
        </a>
        <hr>
        <div class="row">
            <div class="col-4">
                <img src="${appData.icono}" class="d-block w-100" alt="${appData.icono}">
            </div>
            <div class="col-8">
                <h3 class="my-0"><strong>${appData.nombre}</strong></h3>
                <small class="text-muted">${appData.desarrollador}</small>
                <p class="my-0">${appData.descripcion}</p>
                <h5 class="card-title font-weight-bold my-0">${price}</h5>
            </div>
        </div>
        <hr>
        <div class="col-12 text-center">${ranking}</div>
        <hr>
        ${comentarios.slice(0, -4)}
    </div>
    <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Cerrar</button>
        ${appData.instalada === false ? '<button type="button" class="btn btn-success">Instalar</button>':''}
    </div>`;
    console.log(appData);
    return content;
});

/**
 * Funcion que al ser llamada obtiene la data y llama a una funcion para filtrar las apps
 * @param {HTMLElement} element 
 */
const cargarAplicaciones = ((element) => {
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