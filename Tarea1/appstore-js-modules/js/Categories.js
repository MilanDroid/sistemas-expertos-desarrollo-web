const options = ((store) => {
    let content = '<option value="">Categoria</option>';
    store.forEach((category, key) => {
        content += `<option value="${key}">${category.nombreCategoria}</option>`;
    });

    return content;
});

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

export {options, appsByCategory};