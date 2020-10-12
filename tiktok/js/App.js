import {usuarios, loadUsuarios, loadUsuariosToFollow, followToUser, registerUser, loginUser} from "./Users.js";
import {hashtags, loadHashtags, renderListHashtags, setGlobalHashtag} from "./Hashtags.js";
import {tiktoks, loadTiktoks, renderListTiktoks, addTiktok, registerTiktokComment} from "./Tiktoks.js";
import {showLoginModal, showNewUserModal, showNewVideoModal, setImageNewAccount, showCommentsTiktok} from "./Modals.js";

usuariosStorage = localStorage.getItem('usuarios');
hashtagsStorage = localStorage.getItem('hashtags');
tiktoksStorage = localStorage.getItem('tiktoks');
modalTitle = document.getElementById('modal-title');
modalBody = document.getElementById('modal-body');

if (!usuariosStorage || usuariosStorage != JSON.stringify(usuarios)) {
    usuariosStorage = usuarios;
    localStorage.clear();
    localStorage.setItem('usuarios', JSON.stringify(usuariosStorage));
    console.log('Se actualizo el localstorage de los usuarios');
} else {
    usuariosStorage = JSON.parse(usuariosStorage);
}

if (!hashtagsStorage || hashtagsStorage != JSON.stringify(hashtags)) {
    hashtagsStorage = hashtags;
    localStorage.setItem('hashtags', JSON.stringify(hashtagsStorage));
    console.log('Se actualizo el localstorage de los hashtags');
} else {
    hashtagsStorage = JSON.parse(hashtagsStorage);
}

if (!tiktoksStorage || tiktoksStorage != JSON.stringify(tiktoks)) {
    tiktoksStorage = tiktoks;
    localStorage.setItem('tiktoks', JSON.stringify(tiktoksStorage));
    console.log('Se actualizo el localstorage de los tiktoks');
} else {
    tiktoksStorage = JSON.parse(tiktoksStorage);
}

// loadUsuarios();
// loadHashtags();
// loadTiktoks();

globalUsersToFollow = loadUsuariosToFollow;
globalLoadTiktoks = renderListTiktoks;
globalFollowUser = followToUser;
globalShowLoginModal = showLoginModal;
globalShowNewUserModal = showNewUserModal;
globalShowNewVideoModal = showNewVideoModal;
globalRegisterUser = registerUser;
globalSetImageNewAccount = setImageNewAccount;
globalLoginUser = loginUser;
globalLoadHashtags = renderListHashtags;
globalsetHashtag = setGlobalHashtag;
globalRegisterTiktok = addTiktok;
globalShowCommentsTiktok = showCommentsTiktok;
globalRegisterTiktokComment= registerTiktokComment;

globalLoadHashtags();
globalLoadTiktoks();
globalUsersToFollow();