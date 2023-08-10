<?php
require_once '../../classes/System.php';
require_once '../../classes/Movie.php';
require_once '../../classes/Rating.php';
require_once '../../services/movie.php';

$system = new System();

$ratingId = $_GET['ratingId'];
$movieId = $_GET['movieId'];

$system->deleteRating($ratingId);

header('Location: ../../filme.php?movieId=' . $movieId . '#ratings');
