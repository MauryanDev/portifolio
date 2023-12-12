import { getUserByEmail,admin } from "./userModel.js";

let logButton = document.getElementById('button');
let emailInput = document.getElementById('emailInput');
let passwordInput = document.getElementById('passwordInput')


logButton.addEventListener('click',function(){
    getUserByEmail(emailInput.value).then((emailExists) => {
        if (emailExists && emailExists.password == passwordInput.value){
            const user = {name:emailExists.name,email:emailExists.email,pts:emailExists.pts}
            saveSession(user)
            window.location.href = '/userView/perfil.html'
            if(emailExists.email == admin){
               window.location.href='/userView/admin.html'
            }
        }else{
            alert('Senha ou Email incorretos')
        }})
    
})
function saveSession(usuario) {
    const usuarioString = JSON.stringify(usuario);
    sessionStorage.setItem('usuario', usuarioString);
  }
 
