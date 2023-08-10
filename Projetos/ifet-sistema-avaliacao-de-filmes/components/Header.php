<?php
session_start();

$isAuthenticated = count($_SESSION) > 0;
?>

<script src="https://unpkg.com/@phosphor-icons/web"></script>
<header class="page-header">
  <nav>
    <div class="logo">
      <img src="assets/starfilms-logo.svg" alt="Logo StarFilms">
    </div>

    <ul class="navigation-menu nav-text">
      <li><a href="index.php">Início</a></li>
    </ul>

    <div class="menu">
      <form action="pesquisar.php" method="get">
        <label class="search-input">
          <input class="input-text" type="text" name="search" placeholder="Procurar filme" autocomplete="off">
          <button>
            <i class="ph-bold ph-magnifying-glass"></i>
          </button>
        </label>
      </form>

      <!-- <a href="" class="icon-button">
        <i class="ph-bold ph-user"></i>
      </a> -->
      <?php
      if ($isAuthenticated) {
        echo "
        <a href='api/user/signout.php' class='login-button'>
          <span>Sair</span>
          <i class='ph-bold ph-sign-out'></i>
        </a>
        ";
      } else {
        echo "
        <a href='entrar.php' class='login-button'>
          <span>Entrar</span>
          <i class='ph-bold ph-sign-in'></i>
        </a>
        ";
      }
      ?>
      <!-- <a href="users.php">ACESSAR USUÁRIOS</a> -->
    </div>
  </nav>
</header>