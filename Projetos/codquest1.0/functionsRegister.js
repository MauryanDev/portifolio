import {getUserByEmail,addUser } from "./userModel.js";


let addButton = document.getElementById('button');
let nameInput = document.getElementById('nameInput');
let emailInput = document.getElementById('emailInput');
let passwordInput = document.getElementById('passwordInput')

addButton.addEventListener('click',function(){
    getUserByEmail(emailInput.value)
    .then((emailExists) => {
      if (!emailExists ) {
        if(emailInput.value != '' && emailInput.value!= '' && passwordInput.value!=''){
        addUser(nameInput.value,emailInput.value,passwordInput.value,0)
        clear()
        console.log('Este e-mail ainda não existe no banco de dados.');
        window.location.href = '../userView/logar.html'
      }else{
        alert('Preencha os campos')
      }
      } else {
        alert('email existente')
        console.log('Este e-mail já existe no banco de dados.');
      }
    })
    .catch((error) => {
      console.error('Erro ao verificar e-mail:', error);
    });

})

function clear(){
    nameInput.value='', emailInput.value='', passwordInput.value=''
  }
