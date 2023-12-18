import { getUserByEmail, admin, Login, showAlert } from "./userModel.js";

let logButton = document.getElementById('button');
let emailInput = document.getElementById('emailInput');
let passwordInput = document.getElementById('passwordInput')


logButton.addEventListener('click', async function () {
  if (await Login(emailInput.value, passwordInput.value)) {
    await getUserByEmail(emailInput.value).then((emailExists) => {
      {
        const user = { name: emailExists.name, email: emailExists.email, pts: emailExists.pts }
        saveSession(user)

        if (emailInput.value == admin) {
          window.location.href = '../userView/admin.html'
        } else {
          window.location.href = '../userView/perfil.html'
        }

      }
    })
  } else {
    showAlert('Senha ou Email Incorretos')
  }

})
function saveSession(usuario) {
  const usuarioString = JSON.stringify(usuario);
  sessionStorage.setItem('usuario', usuarioString);
}

