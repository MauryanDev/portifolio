<?php

use PHPUnit\Framework\TestCase;

require_once './System.php';
require_once './User.php';
require_once './Movie.php';
require_once './Rating.php';

class MovieTest extends TestCase
{
  function testAddRatingAndCalculateAverage()
  {
    $user = new User("Usuário", "user@email.com", "12345678");
    $movie = new Movie(0, "Interestelar", "/nCbkOyOMTEwlEV0LtCOvCnwEONA.jpg", "/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg", "As reservas naturais da Terra estão chegando ao fim e um grupo de astronautas recebe a missão de verificar possíveis planetas para receberem a população mundial, possibilitando a continuação da espécie. Cooper é chamado para liderar o grupo e aceita a missão sabendo que pode nunca mais ver os filhos. Ao lado de Brand, Jenkins e Doyle, ele seguirá em busca de um novo lar.");
    new Rating($user, $movie, 3, "O melhor filme da saga!!");
    new Rating($user, $movie, 4, "O melhor filme da saga!!");

    $this->assertEquals(3.5, $movie->getAverageScore());
    $this->assertEquals(2, count($movie->getRatings()));
    $this->assertEquals(2, count($user->getRatings()));
  }
}
