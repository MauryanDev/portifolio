<?php
require_once 'services/movie.php';
require_once 'utils/movie.php';

$search = $_GET['search'];

$result = searchMovie($search);
$success = $result[0];
$data;

if ($success) {
  $data = $result[1]->results;
} else {
  $data = $result[1];
}
?>

<!DOCTYPE html>
<html lang="pt-BR">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <link rel="stylesheet" href="styles/global.css">
  <link rel="stylesheet" href="styles/pesquisar.css">

  <title>
    <?php
    if ($success) {
      echo count($data) . " filmes encontrados";
    } else {
      echo $data;
    }
    ?>
  </title>
</head>

<body class="body">
  <div class="background-plane">
    <img class="img" src="https://www.selecoes.com.br/media/uploads/2023/01/filme-2023-herois.png">
    <div></div>
  </div>

  <?php require_once 'components/Header.php' ?>

  <span class="">Mostrando resultados para <span class="italic">"<?php echo $search; ?>"</span></span>

  <div class="movie-grid">
    <?php
    if (count($data) === 0) {
      echo '
        <span>
          Nenhum filme encontrado.
        </span>
      ';
    } else {
      foreach ($data as $movie) {
        echo '
          <a href="filme.php?movieId=' . $movie->id . '" class="movie-card">
            <img src="' . makeMoviePoster($movie->poster_path) . '">
            <span class="body-text">' . $movie->title . '</span>
          </a>
        ';
      }
    }
    ?>
  </div>
</body>

</html>