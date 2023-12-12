import { getUsersPts,admin } from "./userModel.js";

let link = document.getElementById('link')
let tag = document.getElementById('tag')
let rank1Name = document.getElementById('rank1Name')
let rank2Name = document.getElementById('rank2Name')
let rank3Name = document.getElementById('rank3Name')
let rank1Pts = document.getElementById('rank1Pts')
let rank2Pts = document.getElementById('rank2Pts')
let rank3Pts = document.getElementById('rank3Pts')

rank()

async function rank() {
    let rank = await getUsersPts()
    rank.shift()
    console.log(rank)
    rank1Name.innerHTML = rank[0].name
    rank2Name.innerHTML = rank[1].name
    rank3Name.innerHTML = rank[2].name
    rank1Pts.innerHTML = rank[0].pts
    rank2Pts.innerHTML = rank[1].pts
    rank3Pts.innerHTML = rank[2].pts
}


function obterInformacoesUsuario() {
    const usuarioString = sessionStorage.getItem('usuario');
    const usuario = JSON.parse(usuarioString);
    return usuario;
}


let userLog = obterInformacoesUsuario()
userPerfil()
function userPerfil() {
    if (userLog) {
        if (userLog.email == admin) {
            tag.innerHTML = 'Admin'
            link.addEventListener('click', function () {
                window.location.href = '/userView/admin.html'
            })
        } else {

            nameUser.innerHTML = userLog.name
            tag.innerHTML = 'Perfil'
            ptss.innerHTML = userLog.pts
            link.addEventListener('click', function () {
                window.location.href = '/userView/perfil.html'
            })
        }
    } else {
        tag.innerHTML = 'Logar/Registrar'
        link.addEventListener('click', function () {
            window.location.href = '/userView/logar.html'
        })
    }

}

