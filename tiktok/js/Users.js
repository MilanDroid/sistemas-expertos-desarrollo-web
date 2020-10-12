const usuarios = [
    {
        usuario: 'goku',
        password: 'asd123.',
        nombre: 'Son Goku',
        imagen: 'goku.jpg',
        seguidores: ['krillin', 'bulma', 'vegeta'],
        siguiendo: ['dende', 'gohan', 'goten']
   },
   {
        usuario: 'bulma',
        password: 'asd123.',
        nombre: 'Son bulma',
        imagen: 'bulma.jpg',
        seguidores: ['krillin', 'goku', 'vegeta'],
        siguiendo: ['dende', 'gohan', 'goten']
    },
    {
         usuario: 'krilin',
         password: 'asd123.',
         nombre: 'Son krillin',
         imagen: 'patricio.jpg',
         seguidores: ['goku', 'bulma', 'vegeta'],
         siguiendo: ['dende', 'gohan', 'goten']
     },
     {
          usuario: 'vegeta',
          password: 'asd123.',
          nombre: 'Son vegeta',
          imagen: 'vegeta.jpg',
          seguidores: ['krillin', 'bulma', 'goku'],
          siguiendo: ['dende', 'gohan', 'goten']
      },
      {
           usuario: 'goten',
           password: 'asd123.',
           nombre: 'Son goten',
           imagen: 'goten.png',
           seguidores: ['krillin', 'bulma', 'vegeta'],
           siguiendo: ['dende', 'gohan', 'goku']
       }
];

const findIndexUser = ((user) => {
    return usuariosStorage.findIndex(u => u.usuario == user);
});

const loadUsuariosToFollow = (() => {
    const element = document.getElementById('list-suggestions');
    let list = '';
    usuariosStorage.forEach((usuario, key) => {
        if (!usuarioSesion || ( !usuariosStorage[usuarioSesion.id].siguiendo.includes(usuario.usuario) && usuario.usuario != usuarioSesion.usuario)) {
            list += `<div class="row my-4">
                <div class="col-2">
                    <img src="assets/profile-pics/${usuario.imagen}" srcset="assets/profile-pics/${usuario.imagen}" class="rounded-circle avatar" alt="Avartar">
                </div>
                <div class="col-5 text-left">
                    <div><span class="text-dark mx-2" id="usuario-nick"><b>${usuario.nombre}</b></span></div>
                    <div class="text-muted">@${usuario.usuario}</div>
                </div>
                <div class="col-5">
                    <button type="button" class="border-0 btn btn-brand-white text-brand text-nowrap rounded-0 px-5 px-md-4 my-2" onclick="globalFollowUser('${usuario.usuario}')"><b>Follow</b></button>
                </div>
            </div>`;
        }
    });

    if (list == '') {
        list += `<div class="row my-4"><div class="col-12"><b>Sin sugerencias</b></div></div>`;
    }
    element.innerHTML = list;
});

const followToUser = ((usuario) => {
    if (usuarioSesion) {
        if (!usuariosStorage[usuarioSesion.id].siguiendo[usuario]) {
            usuariosStorage[usuarioSesion.id].siguiendo.push(usuario);
            globalUsersToFollow();
        } else {
            alert('Usted ya sigue este usuario');
        }
    }  else {
        alert('No puede seguir este usuario, usted no a iniciado sesion');
    }
});

const loadUsuarios = (() => {
    usuariosStorage.forEach((usuario, key) => {
        console.log(key, usuario);
    });
});

const loginUser = (() => {
    const user = document.getElementById('login-user').value;
    const password = document.getElementById('login-password').value;
    const idUser = findIndexUser(user);

    if (idUser < 0 || usuariosStorage[idUser].password != password) {
        console.log(user, password, idUser, usuariosStorage[idUser].password);
        alert('Datos incorrectos');
    } else {
        usuarioSesion = usuariosStorage[idUser]; 
        usuarioSesion['id'] = idUser; 

        const Obj = document.getElementById('btn-login-tiktok');
        const element = `<img src="assets/profile-pics/${usuarioSesion.imagen}"
        srcset="assets/profile-pics/${usuarioSesion.imagen}"
        class="rounded-circle avatar" alt="Avartar title="${usuarioSesion.usuario}">`;
        if(Obj.outerHTML) {
            Obj.outerHTML=element;
        }
        else {
            let tmpObj=document.createElement("div");
            tmpObj.innerHTML= element+'</div>';
            ObjParent=Obj.parentNode;
            ObjParent.replaceChild(tmpObj,Obj); 
            ObjParent.innerHTML=ObjParent.innerHTML.replace(`<div>${element}</div>`,element);
        }

        document.getElementById('btn-register-tiktok').style.display = "none";
        document.getElementById('btn-register-tiktok-side-panel').style.display = "none";
        document.getElementById('btn-register-ban-tiktok-side-panel').style.display = "none";

        console.log('Usuario logueado');
        globalLoadTiktoks();
        globalUsersToFollow();
        window.scrollTo(0, 0);
    }
});

const registerUser = (() => {
    const user = document.getElementById('new-account-usuario').value;
    const name = document.getElementById('new-account-nombre').value;
    const password = document.getElementById('new-account-contrasena').value;
    const passwordConfirm = document.getElementById('new-account-contrasena-confirm').value;
    const image = document.getElementById('new-account-image').value;

    if (password == passwordConfirm) {        
        if (usuariosStorage.findIndex(u => u.usuario == user)) {
            usuariosStorage.push({
                usuario: user,
                password: password,
                nombre: name,
                imagen: image,
                seguidores: [],
                siguiendo: []
            });
            alert('Registro completado, bienvenido');
        } else {
            console.log('Registro no realizado, el usuario ya existe');
            alert('Registro no realizado, el usuario ya existe');
        }
    } else {
        alert('Registro no realizado, las contrasenas no coinciden');
    }
});

export {
    usuarios, loadUsuarios,
    loadUsuariosToFollow, followToUser,
    registerUser, loginUser
};