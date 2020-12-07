var serverBackendDomain = 'localhost';
var serverBackendPort = '8888';
var serverBackend = `http://${serverBackendDomain}:${serverBackendPort}`;

var xhttp = new XMLHttpRequest();
var onReadyStateChange = ((cb) => {
    xhttp.onreadystatechange = ( () => {
        if (xhttp.readyState == 4) {
            if (xhttp.status == 200) {
                cb(JSON.parse(xhttp.response));
            }
        }
    });
});

xhttp.open("GET", `${serverBackend}/categorias`, true);
xhttp.send();
onReadyStateChange((res) => {
    let categorias = res;

    $("#aplicaciones").html("");
    categorias.forEach(categoria => {
        $("#categoria").append(`<option value="${categoria._id}">${categoria.nombreCategoria}</option>`);
        $("#categoria-app").append(`<option value="${categoria._id}">${categoria.nombreCategoria}</option>`);
        
        imprimirAplicaciones(categoria);
    });

    console.log(categorias);
});

function seleccionarCategoria(){
    $("#aplicaciones").html("");
    console.log('Categoria seleccionada: ' + $("#categoria").val());

    xhttp.open("GET", `${serverBackend}/categorias/${$("#categoria").val()}`, true);
    xhttp.send();
    onReadyStateChange((res) => {
        let categoria = res;
        imprimirAplicaciones(categoria);
        console.log(categoria);
    });
}

function imprimirAplicaciones(categoria){
    let aplicaciones = categoria.aplicaciones;
    aplicaciones.forEach(aplicacion => {
        let estrellas = '';

        for (let k = 0; k < aplicacion.calificacion; k++) {
            estrellas+='<i class="fas fa-star"></i>';
        }
        for (let k = 0; k < 5-aplicacion.calificacion; k++) {
            estrellas+='<i class="far fa-star"></i>';
        }

        $("#aplicaciones").append(`<div class="col-lg-2 col-md-3 col-6">
            <div class="card shadow" onclick="detalleAplicacion('${categoria._id}', '${aplicacion._id}')">
                <div class="card-body">
                    <img src="${aplicacion.icono}" class="img-fluid">
                    <div class="texto-aplicacion">${aplicacion.nombre}</div>
                    <div class="texto-desarrollador">${aplicacion.desarrollador}</div>
                    <div class="estrellas">
                        ${estrellas}
                    </div>
                    <div class="precio">
                        $${aplicacion.precio}
                    </div>
                </div>
            </div>
        </div>`);
    });
}

function detalleAplicacion(codigoCategoria, codigoAplicacion){
    //¿Cual es la aplicacion?
    $('#modal-detalle').modal('show');
    console.log("Categoria: " + codigoCategoria);
    console.log("Codigo Aplicacion: " + codigoAplicacion);

    xhttp.open("GET", `${serverBackend}/categorias/${codigoCategoria}/app/${codigoAplicacion}`, true);
    xhttp.send();
    onReadyStateChange((res) => {
        let aplicacion = res.aplicaciones[0];
        
        console.log('----->Aplicación a mostrar en el modal: ');
        console.log(aplicacion);

        $('#id-app').val(aplicacion._id);
        $('#id-categoria').val(codigoCategoria);
        $('#nombre-app').html(aplicacion.nombre);
        $('#imagen-app').attr('src',aplicacion.icono);
        $('#desarrollador-app').html(aplicacion.desarrollador);
        $('#descripcion-app').html(aplicacion.descripcion);
        
        $('#comentarios-app').html('');
        aplicacion.comentarios.forEach(comentario => {
            $('#comentarios-app').append(`<div class="col-2">
                <img src="img/user.webp" class="rounded-circle">
            </div>
            <div class="col-10">
                <b>${comentario.usuario}</b>
                <p class="text-muted">${comentario.comentario}</p>
            </div>
            `);
        });

        $('#estrellas-app').html("");
        for (let j = 0; j < aplicacion.calificacion; j++) {
            $('#estrellas-app').append('<i class="fas fa-star"></i>');
        }
        for (let j = 0; j < 5-aplicacion.calificacion; j++) {
            $('#estrellas-app').append('<i class="far fa-star"></i>');
        }
        if (aplicacion.calificacion>=3){
            $('#estrellas-app').removeClass('estrella-roja');
            $('#estrellas-app').addClass('estrella-verde');
        }else{
            $('#estrellas-app').removeClass('estrella-verde');
            $('#estrellas-app').addClass('estrella-roja');
        };
    });
}

function agregarComentario() {
    let app = $('#id-app').val();
    let categoria = $('#id-categoria').val();

    xhttp.open("POST", `${serverBackend}/categorias/${categoria}/app/${app}/comentarios`, true);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.send(`comentario= ${$('#nuevoComentario').val()}`);
    onReadyStateChange((res) => {
        console.log(res);

        $('#nuevoComentario').val('');
        detalleAplicacion(categoria, app);
    });
}

function guardarAplicacion() {
    let categoria = $('#categoria-app').val()
    let data = "";

    data += `nombre= ${$('#nombre').val()}`;
    data += `&icono= ${$('#icono').val()}`;
    data += `&descripcion= ${$('#descripcion').val()}`;
    data += `&desarrollador= ${$('#desarrollador').val()}`;
    data += `&precio= ${$('#precio').val()}`;
    data += `&descargas= ${$('#descargas').val()}`;
    data += `&calificacion= ${$('#calificacion').val()}`;

    xhttp.open("POST", `${serverBackend}/categorias/${categoria}/app/add`, true);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhttp.send(data);
    onReadyStateChange((res) => {
        console.log(res);

        $('#nombre').val('');
        $('#icono').val('');
        $('#descripcion').val('');
        $('#desarrollador').val('');
        $('#precio').val('');
        $('#descargas').val('');
        $('#calificacion').val('');
        
        $('#categoria').val(categoria);
        seleccionarCategoria();
    });
}


//NO BORRAR: Llenar selectlist de imagenes del formulario agregar aplicacion
(()=>{
    for(let i=1;i<=50;i++)
        $('#icono').append(`<option value="img/app-icons/${i}.webp">${i}.webp</option>`);
    $('#icono').val(null);
})();

//NO BORRAR: Funcionalidad para mostrar la imagen del app al seleccionarla del select list
function visualizarImagen(){
    if ($('#icono').val()!="")
        $('#formImagenApp').attr('src',$('#icono').val());
    else
        $('#formImagenApp').attr('src','img/app-icons/null.png');
}