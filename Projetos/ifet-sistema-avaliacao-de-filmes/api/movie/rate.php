<?php
require_once '../../classes/System.php';
require_once '../../classes/Movie.php';
require_once '../../classes/Rating.php';
require_once '../../services/movie.php';

session_start();

$system = new System();

$email = $_SESSION['userEmail'];
$userResponse = $system->findUser($email);

if ($userResponse[0] === false) {
  // Fazer algo se o usuário logado por algum
  // motivo não existe no banco de dados
  exit();
}

$score = $_POST['score'];
$comment = $_POST['comment'];
$movieId = $_GET['movieId'];

$movie = $system->findMovie(intval($movieId));

if ($movie[0] !== true) {
  $movieData = getMovieFromApi($movieId);
  $movie = new Movie($movieData[1]->id, $movieData[1]->title, $movieData[1]->poster_path, $movieData[1]->backdrop_path, $movieData[1]->overview);
} else {
  $movie = $movie[1];
}

$rating = new Rating($userResponse[1], $movie, intval($score), $comment);
$system->createRating($rating);

header('Location: ../../filme.php?movieId=' . $movieId . '#ratings');
