import { getUserByEmail, addUser, showAlert,logout } from "./userModel.js";

let addButton = document.getElementById('button');
let nameInput = document.getElementById('nameInput');
let emailInput = document.getElementById('emailInput');
let passwordInput = document.getElementById('passwordInput')

addButton.addEventListener('click', async function () {
  try {
    const emailExists = await getUserByEmail(emailInput.value);

    if (!emailExists) {
      if (emailInput.value !== '' && passwordInput.value !== '') {
        await addUser(nameInput.value, emailInput.value, passwordInput.value, 0);
        console.log('Este e-mail ainda não existe no banco de dados.');
        clear();
        logout()
        window.location.href = '../userView/logar.html';
      } else {
        showAlert('Preencha os campos');
      }
    } else {
      showAlert('Email existente');
      console.log('Este e-mail já existe no banco de dados.');
    }
  } catch (error) {
    console.error('Erro durante a operação:', error);

  }
});

function clear() {
  nameInput.value = '', emailInput.value = '', passwordInput.value = ''
}
