<?php
require_once '../../classes/System.php';
require_once '../../classes/User.php';

// Destrói a sessão por padrão, quando o usuário tenta fazer um novo cadastro.
session_start();
session_destroy();

$system = new System();

$email = $_POST['email'];
$name = $_POST['name'];
$password = $_POST['password'];

$user = new User($name, $email, $password);
$response = $system->createUser($user);

if ($response[0] === false) {
  setcookie('registerError', $response[1], time() + 2, '/ifet-sistema-avaliacao-de-filmes/cadastrar.php');
  header('Location: ../../cadastrar.php');
  exit();
}

session_start();

$_SESSION['userId'] = $user->getId();
$_SESSION['userEmail'] = $user->getEmail();

header('Location: ../../index.php');
