import stars from "./Stars.js";

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

export default appDetail;