import { getUserByEmail, getUserByName, addUser, Update, Remove, admin } from "./userModel.js"
let search = document.getElementById('search');
let listUsers = document.getElementById('list');
let exitEdit = document.getElementById('exitEdit');
let nameInput = document.getElementById('nameInput');
let emailShow = document.getElementById('emailShow');
let buttonEdit = document.getElementById('buttonEdit')
let buttonDel = document.getElementById('buttonDel')
let buttonExit = document.getElementById('buttonExit')
let chave = document.getElementById('onOff')
let starImg = document.getElementById('starImg')
gameStat()


exitEdit.addEventListener('click', function () {
    document.getElementById('popup').style.display = 'none'
})



search.addEventListener('input', function () {
    listUsers.innerHTML = '';
    if (search.value != '') {
        getUserByName(search.value)
            .then((usuariosFiltrados) => {
                listUsers.innerHTML = '';
                for (const key in usuariosFiltrados) {
                    const usuario = usuariosFiltrados[key];
                    const itemLista = document.createElement('li');
                    const spanNome = document.createElement('span');
                    spanNome.textContent = `Nome: ${usuario.name}`;
                    const spanEmail = document.createElement('span');
                    spanEmail.textContent = `Email: ${usuario.email}`;

                    itemLista.appendChild(spanNome);
                    itemLista.appendChild(document.createElement('br'));
                    itemLista.appendChild(spanEmail);
                    itemLista.addEventListener('click', function () {
                        document.getElementById('popup').style.display = 'flex'
                        nameInput.value = usuario.name
                        emailShow.innerHTML = usuario.email
                        console.log('Usuário clicado:', usuario.name);
                    });
                    listUsers.appendChild(itemLista);
                    console.log(usuario)
                }
            }
            )
            .catch((error) => {
                console.error('Erro ao buscar usuários:', error);
            })
    }
})

buttonEdit.addEventListener('click', function () {
    getUserByEmail(emailShow.innerHTML)
        .then((emailExists) => {
            let emailExistset = { name: nameInput.value, email: emailExists.email, password: emailExists.password, pts: emailExists.pts }
            Update(emailShow.innerHTML, emailExistset)
            document.getElementById('popup').style.display = 'none'
            listUsers.innerHTML = ''
            search.value = ''
        })

})
buttonDel.addEventListener('click', function () {
    Remove(emailShow.innerHTML)
    document.getElementById('popup').style.display = 'none'
    listUsers.innerHTML = ''
    search.value = ''
})

chave.addEventListener('click', function(){
    getUserByEmail(admin)
    .then((emailExists) => {
        if (emailExists.chave == 'on') {
            let emailExistset = { name: nameInput.value, email: emailExists.email, password: emailExists.password, chave: 'off' }
            Update(admin, emailExistset)
            starImg.src = "./imagens/Star 18.png";
        } else {
            let emailExistset = { name: nameInput.value, email: emailExists.email, password: emailExists.password, chave: 'on' }
            Update(admin, emailExistset)
            starImg.src = "./imagens/Star 16.svg";
        }
    })
})

function gameStat(){
    getUserByEmail(admin)
    .then((emailExists) => {
        if (emailExists.chave == 'off') {
            starImg.src = "./imagens/Star 18.png";
        } else {
            starImg.src = "./imagens/Star 16.svg";
        }
    })
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
        return
    } else {
        window.location.href = '/userView/logar.html'
    }
}
buttonExit.addEventListener('click', function () {
    sessionStorage.clear();
    window.location.href = '/userView/logar.html'
})

