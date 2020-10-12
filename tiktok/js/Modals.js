const showLoginModal = (() => {
    modalTitle.innerHTML = `Login`;
    modalBody.innerHTML = `<form>
        <div class="form-group">
            <label for="login-user">Usuario: </label>
            <input type="text" class="form-control" id="login-user" aria-describedby="usuarioHelp" placeholder="Usuario">
        </div>
        <div class="form-group">
            <label for="login-password">Contraseña: </label>
            <input type="password" class="form-control" id="login-password" placeholder="Contraseña">
        </div>
        <div class="text-center">
            <button type="button" class="border-0 btn btn-brand text-white rounded-0 mt-4 px-4 px-lg-5"
            data-dismiss="modal" onclick="globalLoginUser()">LogIn</button>
        </div>
    </form>`;
});

const showNewUserModal = (() => {
    modalTitle.innerHTML = `Nueva cuenta`;
    modalBody.innerHTML = `<form>
        <div class="form-group">
            <label for="new-account-usuario">Usuario: </label>
            <input type="text" class="form-control" id="new-account-usuario" aria-describedby="usuarioHelp" placeholder="Usuario">
        </div>
        <div class="form-group">
            <label for="contrasena">Nombre: </label>
            <input type="password" class="form-control" id="new-account-nombre" placeholder="Nombre">
        </div>
        <div class="form-group">
            <label for="contrasena">Contraseña: </label>
            <input type="password" class="form-control" id="new-account-contrasena" placeholder="Contraseña">
        </div>
        <div class="form-group">
            <label for="contrasena">Confirmar contraseña: </label>
            <input type="password" class="form-control" id="new-account-contrasena-confirm" placeholder="Contraseña">
        </div>
        <div class="form-group">
            <label for="contrasena">Imagen de perfil: </label>
            <div class="row my-2 justify-content-between">
                <div class="col-3">
                    <img src="assets/profile-pics/picoro.jpg" srcset="assets/profile-pics/picoro.jpg"
                    class="rounded-circle avatar" onclick="globalSetImageNewAccount('picoro.jpg');" alt="Avartar">
                </div>
                <div class="col-3">
                    <img src="assets/profile-pics/androide_18.jpg" srcset="assets/profile-pics/androide_18.jpg"
                    class="rounded-circle avatar" onclick="globalSetImageNewAccount('androide_18.jpg');" alt="Avartar">
                </div>
                <div class="col-3">
                    <img src="assets/profile-pics/chaozu.jpg" srcset="assets/profile-pics/chaozu.jpg"
                    class="rounded-circle avatar" onclick="globalSetImageNewAccount('chaozu.jpg');" alt="Avartar">
                </div>
                <div class="col-3">
                    <img src="assets/profile-pics/patricio.jpg" srcset="assets/profile-pics/patricio.jpg"
                    class="rounded-circle avatar" onclick="globalSetImageNewAccount('patricio.jpg');" alt="Avartar">
                </div>
            </div>
        </div>
        <input type="hidden" name="new-account-image" id="new-account-image" value="">

        <div class="text-center">
            <button type="button" class="border-0 btn btn-brand text-white rounded-0 mt-4 px-4 px-lg-5"
            data-dismiss="modal" onclick="globalRegisterUser();">Crear cuenta</button>
        </div>
    </form>`;
});

const showNewVideoModal = (() => {
    modalTitle.innerHTML = `Nuevo TikTok`;
    modalBody.innerHTML = `<form>
        <div class="form-group">
            <label for="new-tiktok-video">Video: </label>
            <select class="form-control form-control-lg" name="new-tiktok-video" id="new-tiktok-video">
                <option value="" selected disabled>Seleccione un video</option>
                <option value="videos/1.mp4">Video 1</option>
                <option value="videos/2.mp4">Video 2</option>
                <option value="videos/3.mp4">Video 3</option>
                <option value="videos/4.mp4">Video 4</option>
                <option value="videos/5.mp4">Video 5</option>
                <option value="videos/6.mp4">Video 6</option>
                <option value="videos/7.mp4">Video 7</option>
                <option value="videos/8.mp4">Video 8</option>
            </select>
        </div>
        <div class="form-group">
            <label for="new-tiktok-hashtags">Hashtags: </label>
            <input type="text" class="form-control" id="new-tiktok-hashtags" placeholder="new-tiktok-Hashtags">
        </div>
        <div class="form-group">
            <label for="new-tiktok-mensaje">Mensaje: </label>
            <input type="text" class="form-control" id="new-tiktok-mensaje" placeholder="new-tiktok-mensaje">
        </div>        
        <div class="form-group">
            <label for="new-tiktok-titulo">Titulo: </label>
            <input type="text" class="form-control" id="new-tiktok-titulo" placeholder="new-tiktok-mensaje">
        </div>
        <div class="text-center">
            <button type="button" class="border-0 btn btn-brand text-white rounded-0 mt-4 px-4 px-lg-5"
            data-dismiss="modal" onclick="globalRegisterTiktok()">Publicar</button>
        </div>
    </form>`;
});

const setImageNewAccount = ((image) => {
    document.getElementById('new-account-image').value = image;
});

const showCommentsTiktok = ((id) => {
    const tiktok = tiktoksStorage[id];
    let lista = '';
    modalTitle.innerHTML = `Tiktok ${tiktok.titulo}`;

    tiktok.comentarios.forEach((comentario) => {
        let usuario = usuariosStorage[usuariosStorage.findIndex(u => u.usuario == comentario.usuario)];
        lista += `<div class="row my-0 py-3 bg-gray-light">
            <div class="col-2">
                <img src="assets/profile-pics/${usuario.imagen}" srcset="assets/profile-pics/${usuario.imagen}" class="rounded-circle avatar" alt="Avartar">
            </div>
            <div class="col-10 text-left">
                <div><span class="text-dark mx-2" id="usuario-nick"><b>${usuario.nombre}</b></span></div>
                <div class="text-muted">@${usuario.usuario}</div>
            </div>
            <div class="col-12 my-1 pl-5 pr-3 py-2">${comentario.comentario}</div>
        </div>`;
    });
    
    if (usuarioSesion) {
        lista += `<form class="pt-3">
            <div class="form-group">
                <label for="new-tiktok-comentario">Comentar: </label>
                <input type="text" class="form-control" id="new-tiktok-comentario" placeholder="Comenta">
            </div>
            <div class="text-center">
                <button type="button" class="border-0 btn btn-brand text-white rounded-0 mt-4 px-4 px-lg-5"
                data-dismiss="modal" onclick="globalRegisterTiktokComment(${id})">Comentar</button>
            </div>
        </form>`;
    }
    modalBody.innerHTML = lista;
});

export {showLoginModal, showNewUserModal, showNewVideoModal, setImageNewAccount, showCommentsTiktok};