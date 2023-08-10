<?php

use PHPUnit\Framework\TestCase;

require_once './System.php';
require_once './User.php';
require_once './Movie.php';
require_once './Rating.php';

class SystemTest extends TestCase
{
  function testCreateUser()
  {
    $system = new System();
    $user = new User("Usuário", "user@email.com", "12345678");
    $result = $system->createUser($user);

    $this->assertEquals(true, $result[0]);
  }

  function testFailToCreateUser()
  {
    $system = new System();
    $user1 = new User("Usuário", "user@email.com", "12345678");
    $user2 = new User("Usuário", "user@email.com", "12345678");

    $system->createUser($user1);
    $result = $system->createUser($user2);

    $this->assertEquals(false, $result[0]);
  }

  function testCreateMovie()
  {
    $system = new System();
    $movie = new Movie(0, "Interestelar", "/nCbkOyOMTEwlEV0LtCOvCnwEONA.jpg", "/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg", "As reservas naturais da Terra estão chegando ao fim e um grupo de astronautas recebe a missão de verificar possíveis planetas para receberem a população mundial, possibilitando a continuação da espécie. Cooper é chamado para liderar o grupo e aceita a missão sabendo que pode nunca mais ver os filhos. Ao lado de Brand, Jenkins e Doyle, ele seguirá em busca de um novo lar.");

    $system->createMovie($movie);

    $this->assertEquals(1, count($system->getMovies()));
  }

  function testCreateRatingAndMovie()
  {
    $system = new System();
    $user = new User("Usuário", "user@email.com", "12345678");
    $movie = new Movie(0, "Interestelar", "/nCbkOyOMTEwlEV0LtCOvCnwEONA.jpg", "/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg", "As reservas naturais da Terra estão chegando ao fim e um grupo de astronautas recebe a missão de verificar possíveis planetas para receberem a população mundial, possibilitando a continuação da espécie. Cooper é chamado para liderar o grupo e aceita a missão sabendo que pode nunca mais ver os filhos. Ao lado de Brand, Jenkins e Doyle, ele seguirá em busca de um novo lar.");
    $rating = new Rating($user, $movie, 3, "O melhor filme da saga!!");

    $system->createMovie($movie);
    $system->createRating($rating);
    $system->createRating($rating);

    $this->assertEquals(2, count($system->getRatings()));
    $this->assertEquals(1, count($system->getMovies()));
    $this->assertEquals(1, count($system->getMostRatedMovies()));
    $this->assertLessThanOrEqual(5, count($system->getMostRatedMovies()));
  }

  function testFindUser()
  {
    $system = new System();
    $user = new User("Usuário", "user@email.com", "12345678");
    $system->createUser($user);

    $result = $system->findUser("user@email.com");

    $this->assertEquals(true, $result[0]);
  }

  function testFailToFindUser()
  {
    $system = new System();
    $user = new User("Usuário", "user@email.com", "12345678");
    $system->createUser($user);

    $result = $system->findUser("otherUser@email.com");

    $this->assertEquals(false, $result[0]);
  }

  function testAuthUser()
  {
    $system = new System();
    $user = new User("Usuário", "user@email.com", "12345678");
    $system->createUser($user);

    $result = $system->authUser("user@email.com", "12345678");

    $this->assertEquals(true, $result[0]);
  }

  function testFailToAuthUser()
  {
    $system = new System();
    $user = new User("Usuário", "user@email.com", "12345678");
    $system->createUser($user);

    $resultWrongEmail = $system->authUser("wrong_email@email.com", "12345678");
    $resultWrongPassword = $system->authUser("wrong_email@email.com", "777777");

    $this->assertEquals(false, $resultWrongEmail[0]);
    $this->assertEquals(false, $resultWrongPassword[0]);
  }

  function testFindMovie()
  {
    $system = new System();
    $movie = new Movie(0, "Interestelar", "/nCbkOyOMTEwlEV0LtCOvCnwEONA.jpg", "/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg", "As reservas naturais da Terra estão chegando ao fim e um grupo de astronautas recebe a missão de verificar possíveis planetas para receberem a população mundial, possibilitando a continuação da espécie. Cooper é chamado para liderar o grupo e aceita a missão sabendo que pode nunca mais ver os filhos. Ao lado de Brand, Jenkins e Doyle, ele seguirá em busca de um novo lar.");
    $movieId = $system->createMovie($movie);

    $result = $system->findMovie($movieId);

    $this->assertEquals(true, $result[0]);
  }

  function testFailToFindMovie()
  {
    $system = new System();
    $movie = new Movie(0, "Interestelar", "/nCbkOyOMTEwlEV0LtCOvCnwEONA.jpg", "/rAiYTfKGqDCRIIqo664sY9XZIvQ.jpg", "As reservas naturais da Terra estão chegando ao fim e um grupo de astronautas recebe a missão de verificar possíveis planetas para receberem a população mundial, possibilitando a continuação da espécie. Cooper é chamado para liderar o grupo e aceita a missão sabendo que pode nunca mais ver os filhos. Ao lado de Brand, Jenkins e Doyle, ele seguirá em busca de um novo lar.");
    $movieId = $system->createMovie($movie);
    $wrongMovieId = 10;

    $result = $system->findMovie($wrongMovieId);

    $this->assertEquals(false, $result[0]);
  }

  function testSearchMovie()
  {
    $system = new System();
    $result = $system->searchMovie("Harry Potter");

    $this->assertEquals(true, $result[0]);
  }
}
