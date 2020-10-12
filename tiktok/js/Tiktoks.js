const tiktoks = [
    {
        usuario: 1,
        titulo: "¡Ya basta freezer 1!",
        fecha: "1/12/2020",
        video: "videos/1.mp4",
        tituloCancion: "Cha la head cha la 1!",
        likes: 2*1,
        shares: 3*1,
        comentarios: [
            { usuario: "vegeta", comentario: "Insecto!!!!!" },
            { usuario: "vegeta", comentario: "Insecto!!!!!" },
            { usuario: "vegeta", comentario: "Insecto!!!!!" },
            { usuario: "vegeta", comentario: "Insecto!!!!!" },
        ],
        hashtags: ["Dogs 1", "Freezer", "DragonBall"]
    },
    {
        usuario: 3,
        titulo: "¡Ya basta freezer 2!",
        fecha: "2/12/2020",
        video: "videos/2.mp4",
        tituloCancion: "Cha la head cha la 2!",
        likes: 2*2,
        shares: 3*2,
        comentarios: [
            { usuario: "krilin", comentario: "Gokuuuuuuuuu!!!!!" },
            { usuario: "krilin", comentario: "Gokuuuuuuuuu!!!!!" },
            { usuario: "krilin", comentario: "Gokuuuuuuuuu!!!!!" },
            { usuario: "krilin", comentario: "Gokuuuuuuuuu!!!!!" },
            { usuario: "krilin", comentario: "Gokuuuuuuuuu!!!!!" },
            { usuario: "krilin", comentario: "Gokuuuuuuuuu!!!!!" },
            { usuario: "krilin", comentario: "Gokuuuuuuuuu!!!!!" },
            { usuario: "krilin", comentario: "Gokuuuuuuuuu!!!!!" },
            { usuario: "vegeta", comentario: "Insecto!!!!!" },
        ],
        hashtags: ["Dogs 2", "Freezer", "DragonBall"],
    },
    {
        usuario: 2,
        titulo: "¡Ya basta freezer 3!",
        fecha: "3/12/2020",
        video: "videos/3.mp4",
        tituloCancion: "Cha la head cha la 3!",
        likes: 2*3,
        shares: 3*3,
        comentarios: [
            { usuario: "krilin", comentario: "Gokuuuuuuuuu!!!!!" },
            { usuario: "krilin", comentario: "Gokuuuuuuuuu!!!!!" },
            { usuario: "vegeta", comentario: "Insecto!!!!!" },
        ],
        hashtags: ["Dogs 3", "Freezer", "DragonBall"],
    },
    {
        usuario: 0,
        titulo: "¡Ya basta freezer 4!",
        fecha: "4/12/2020",
        video: "videos/4.mp4",
        tituloCancion: "Cha la head cha la 4!",
        likes: 2*4,
        shares: 3*4,
        comentarios: [
            { usuario: "krilin", comentario: "Gokuuuuuuuuu!!!!!" },
            { usuario: "krilin", comentario: "Gokuuuuuuuuu!!!!!" },
            { usuario: "vegeta", comentario: "Insecto!!!!!" },
        ],
        hashtags: ["Dogs", "Freezer", "DragonBall"],
    },
    {
        usuario: 2,
        titulo: "¡Ya basta freezer 5!",
        fecha: "5/12/2020",
        video: "videos/5.mp4",
        tituloCancion: "Cha la head cha la 5!",
        likes: 2*5,
        shares: 3*5,
        comentarios: [
            { usuario: "krilin", comentario: "Gokuuuuuuuuu!!!!!" },
        ],
        hashtags: ["Dogs", "Freezer", "DragonBall"],
    },
    {
        usuario: 4,
        titulo: "¡Ya basta freezer 6!",
        fecha: "6/12/2020",
        video: "videos/6.mp4",
        tituloCancion: "Cha la head cha la 6!",
        likes: 2*6,
        shares: 3*6,
        comentarios: [
            { usuario: "vegeta", comentario: "Insecto!!!!!" },
        ],
        hashtags: ["Dogs", "Freezer", "DragonBall"],
    },
    {
        usuario: 1,
        titulo: "¡Ya basta freezer 7!",
        fecha: "7/12/2020",
        video: "videos/7.mp4",
        tituloCancion: "Cha la head cha la 7!",
        likes: 2*7,
        shares: 3*7,
        comentarios: [
            { usuario: "krilin", comentario: "Gokuuuuuuuuu!!!!!" },
            { usuario: "vegeta", comentario: "Insecto!!!!!" },
            { usuario: "krilin", comentario: "Gokuuuuuuuuu!!!!!" },
            { usuario: "vegeta", comentario: "Insecto!!!!!" },
        ],
        hashtags: ["Dogs", "Freezer", "DragonBall"],
    },
    {
        usuario: 4,
        titulo: "¡Ya basta freezer 8!",
        fecha: "8/12/2020",
        video: "videos/8.mp4",
        tituloCancion: "Cha la head cha la 8!",
        likes: 2*8,
        shares: 3*8,
        comentarios: [
            { usuario: "krilin", comentario: "Gokuuuuuuuuu!!!!!" },
            { usuario: "vegeta", comentario: "Insecto!!!!!" },
            { usuario: "krilin", comentario: "Gokuuuuuuuuu!!!!!" },
            { usuario: "vegeta", comentario: "Insecto!!!!!" },
            { usuario: "krilin", comentario: "Gokuuuuuuuuu!!!!!" },
            { usuario: "vegeta", comentario: "Insecto!!!!!" },
            { usuario: "krilin", comentario: "Gokuuuuuuuuu!!!!!" },
            { usuario: "vegeta", comentario: "Insecto!!!!!" }
        ],
        hashtags: ["Dogs", "Freezer", "DragonBall"],
    },
];

const loadTiktoks = (() => {
    tiktoksStorage.forEach((tiktok) => {
        console.log(tiktok);
    });
});

const renderListTiktoks = (() => {
    const element = document.getElementById('list-tiktoks');
    let list = '';

    tiktoksStorage.forEach((tiktok, key) => {
        const usuario = usuariosStorage[tiktok.usuario];

        if (
            (!globalHashtag && (!usuarioSesion ||
            usuariosStorage[usuarioSesion.id].siguiendo.includes(usuario.usuario) )) ||
            (globalHashtag && tiktok.hashtags.includes(globalHashtag)) ||
            (!globalHashtag && usuario.usuario == usuarioSesion.usuario)
        ) {
            list += `
            <div class="mb-4">
                <div class="row">
                    <div class="col-2">
                        <img src="assets/profile-pics/${usuario.imagen}" srcset="assets/profile-pics/${usuario.imagen}" class="rounded-circle avatar" alt="Avartar">
                    </div>
                    <div class="col-10 col-sm-6 text-left">
                        <div><b id="usuario">${usuario.usuario}</b> <span class="text-muted mx-2" id="usuario-nick">${usuario.nombre}</span></div>
                        <div>
                            <b class="text-dark" id="hashtags">${tiktok.hashtags.length > 0 ? '#':''}${tiktok.hashtags.join(' #')}</b>
                            <span class="text-muted mx-2" id="descripcion">${tiktok.titulo}</span>
                            <p class="text-dark"><b class="title-cancion">${tiktok.tituloCancion}</b></p>
                        </div>
                    </div>
                    <div class="col-4 d-none d-sm-block">
                        <button type="button" class="border-0 btn btn-brand-white text-brand text-nowrap rounded-0 px-4 my-2" onclick="globalFollowUser('${usuario.usuario}')"><b>Follow</b></button>
                    </div>
                </div>
                <div class="row mb-2 justify-content-center justify-content-md-start">
                    <div class="col-2 d-none d-sm-block"></div>
                    <div class="col-12 col-md-6 col-xl-4 text-center">
                        <video controls loop playsinline class="card-app card-rounded" poster="assets/images/tiktok-banner.jpg" loading="lazy">
                            <source src="assets/${tiktok.video}" type="video/${tiktok.video.split('.')[1]}">
                            <source src="movie.ogg" type="video/ogg">
                            Lo sentimos no puedes reproducir el video
                        </video>
                    </div>
                    <div class="col-12 col-md-2 col-xl-2 mt-4">
                        <div class="row justify-content-center">
                            <div class="col-3 col-md-12">
                                <div class="rounded-circle avatar bg-gray position-relative"><i class="fas fa-heart text-dark social-interactions"></i></div>
                                <div class="rounded-circle avatar bg-none position-relative"><span class="social-interactions"><h6>${tiktok.likes}</h6></span></div>
                            </div>
                            <div class="col-3 col-md-12" data-toggle="modal" data-target="#modal-tiktok" onclick="globalShowCommentsTiktok(${key})">
                                <div class="rounded-circle avatar bg-gray position-relative"><i class="fas fa-comment-dots text-dark social-interactions"></i></div>
                                <div class="rounded-circle avatar bg-none position-relative"><span class="social-interactions"><h6>${tiktok.comentarios.length}</h6></span></div>
                            </div>
                            <div class="col-3 col-md-12">
                                <div class="rounded-circle avatar bg-gray position-relative"><i class="fas fa-reply text-dark social-interactions"></i></div>
                                <div class="rounded-circle avatar bg-none position-relative"><span class="social-interactions"><h6>${tiktok.shares}</h6></span></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row mb-2 justify-content-center justify-content-md-start">
                    <div class="col-2 d-none d-sm-block"></div>
                    <div class="col-12 col-md-6 col-xl-4 text-center"><hr></div>
                    <div class="col-12 col-md-2 col-xl-2 my-1"></div>
                </div>
            </div>`;
        }
    });


    if (list == '') {
        list += `<div class="mb-4"><div class="row my-4"><div class="col-12"><b>No hay Tiktoks</b></div></div></div>`;
    }
    element.innerHTML = list;
});

const addTiktok = (() => {    
    if (!usuarioSesion) {
        alert('Tienes que haberte logueado para publicar un TikTok');
        return;
    }

    const videoInput = document.getElementById('new-tiktok-video').value;
    const hashtagInput = document.getElementById('new-tiktok-hashtags').value;
    const mensajeInput = document.getElementById('new-tiktok-mensaje').value;
    const tituloInput = document.getElementById('new-tiktok-titulo').value;

    let hashtags = hashtagInput.split(' ');
    hashtags.forEach((hashtag) => {
        if (hashtagsStorage.findIndex(h => h.hashtag == hashtag) < 0) {
            hashtagsStorage.push(
                {
                    hashtag: hashtag,
                    videos: 0
                }
            );
        }
    });

    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    today = mm + '/' + dd + '/' + yyyy;

    tiktoksStorage.unshift(
        {
            usuario: usuarioSesion.id,
            titulo: tituloInput,
            fecha: today,
            video: videoInput,
            tituloCancion: tituloInput,
            likes: 0,
            shares: 0,
            comentarios: [],
            hashtags: hashtags
        }
    );

    renderListTiktoks();
    globalLoadHashtags();
});

const registerTiktokComment = ((id) => {
    const comentario = document.getElementById('new-tiktok-comentario').value;
    
    tiktoksStorage[id].comentarios.push({
        usuario: usuarioSesion.usuario,
        comentario: comentario
    });
});

export {tiktoks, loadTiktoks, renderListTiktoks, addTiktok, registerTiktokComment};