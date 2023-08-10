<!DOCTYPE html>
<html lang="pt-BR">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="./styles/global.css">
  <link rel="stylesheet" href="./styles/login.css">

  <title>Cadastrar ⭐ StarFilms</title>
</head>

<body>
  <div class="background-plane">
    <img class="" src="assets/login-background.jpg" alt="Plano de fundo">

    <div></div>
  </div>

  <img class="logo-img" src="./assets/starfilms-logo.svg" alt="Logo StarFilms">

  <div>
    <form action="api/user/signup.php" class="login-form" method="post">
      <input type="email" name="email" class="input-text" placeholder="Informe seu email" required maxlength="100">
      <input type="text" name="name" class="input-text" placeholder="Seu nome" required maxlength="30">
      <input type="password" name="password" class="input-text" placeholder="Digite uma senha" required minlength="8" maxlength="30" id="password">
      <input type="password" name="confirmPassword" class="input-text" placeholder="Confirme a senha" required minlength="8" maxlength="30" id="confirmPassword">

      <?php
      if (isset($_COOKIE['registerError'])) {
        echo "<span class='error'>" . $_COOKIE['registerError'] . "</span>";
      }
      ?>

      <button class="button-primary" onclick="validarSenha()">CADASTRAR</button>
      <span class="text">JÁ POSSUI CADASTRO? <a href="entrar.php">ENTRE AQUI</a></span>
    </form>
  </div>

  <div></div>

  <script>
    let password = document.getElementById('password');
    let confirmPassword = document.getElementById('confirmPassword');

    function validarSenha() {
      if (password.value != confirmPassword.value) {
        confirmPassword.setCustomValidity("Senhas diferentes!");
        confirmPassword.reportValidity();
        return false;
      } else {
        confirmPassword.setCustomValidity("");
        return true;
      }
    }

    // verificar também quando o campo for modificado, para que a mensagem suma quando as senhas forem iguais
    confirmPassword.addEventListener('input', validarSenha);
  </script>
</body>

</html>