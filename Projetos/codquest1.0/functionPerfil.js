let nameUser = document.getElementById('nameUser')
let buttonPerfil = document.getElementById('perfil')
let buttonExit = document.getElementById('exit')
let pts = document.getElementById('pts')
let ptss = document.getElementById('ptss')

function obterInformacoesUsuario() {
    const usuarioString = sessionStorage.getItem('usuario');
    const usuario = JSON.parse(usuarioString);
    return usuario;
}


let userLog = obterInformacoesUsuario()
userPerfil()
function userPerfil() {
    if (userLog) {
        nameUser.innerHTML = userLog.name
        pts.innerHTML=userLog.pts
        ptss.innerHTML=userLog.pts
    } else {
        window.location.href = '/userView/logar.html'
    }
}

buttonExit.addEventListener('click', function () {
    sessionStorage.clear();
    window.location.href = '/userView/logar.html'
})