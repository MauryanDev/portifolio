<?php

//ROOT constante que armazena o caminho para o diretório raíz do servidor
// E:\xampp\htdocs
define('ROOT', $_SERVER['DOCUMENT_ROOT']);
//PASTASISTEMA constante que armazena o nome da pasta que representa o sistema

define('PASTASISTEMA', 'ifet-sistema-avaliacao-de-filmes');
//PATH constante com o caminho completo até a pasta do sistema (dentro do servidor)
// E:\xampp\htdocs\ifet-sistema-avaliacao-de-filmes
define('PATH', ROOT . '/' . PASTASISTEMA . '/');

require_once 'User.php';
require_once 'Movie.php';
require_once 'Rating.php';

// função do arquivo abaixo declarada neste arquivo porque estava dando erro de importação no PHPUnit
// require_once PATH . 'utils/sort.php';

class System
{
  private $users = [];
  private $movies = [];
  private $ratings = [];
  private $mostRatedMovies = [];

  function __construct()
  {
    //Se já existe um sistema serializado carrega ele para o objeto criado
    if (file_exists(PATH . 'database.save')) {
      $data = file_get_contents(PATH . 'database.save');
      $system = unserialize($data);

      //Copia os dados para os atributos
      $this->users = $system->getUsers();
      $this->movies = $system->getMovies();
      $this->ratings = $system->getRatings();
      $this->mostRatedMovies = $system->getMostRatedMovies();
    } else {
      $administrator = new User('Administrador', 'admin@starfilms.com', 'qpwoeiru');
      $this->createUser($administrator);
    }
  }

  //Antes de destruir serializa o sistema no servidor
  function __destruct()
  {
    $serializado = serialize($this);
    file_put_contents(PATH . 'database.save', $serializado);
  }

  public function getUsers()
  {
    return $this->users;
  }

  public function getMovies()
  {
    return $this->movies;
  }

  public function getRatings()
  {
    return $this->ratings;
  }

  public function getMostRatedMovies()
  {
    return $this->mostRatedMovies;
  }

  public function createUser($user)
  {
    $systemUser = $this->findUser($user->getEmail());

    if ($systemUser[0]) {
      return [false, "E-mail já cadastrado."];
    }

    $this->users[] = $user;

    end($this->users);
    $newId = key($this->users);

    $user->setId($newId);

    return [true, $newId];
  }

  public function createMovie($movie)
  {
    $this->movies[] = $movie;

    return $movie->getId();
  }

  public function createRating($rating)
  {
    $this->ratings[] = $rating;

    end($this->ratings);
    $newId = key($this->ratings);

    $rating->setId($newId);

    $systemMovie = $this->findMovie($rating->getMovie()->getId());

    if ($systemMovie[0] === false) {
      $this->createMovie($rating->getMovie());
    }

    if (!in_array($rating->getMovie(), $this->mostRatedMovies)) {
      $this->mostRatedMovies[] = $rating->getMovie();
    };
    usort($this->mostRatedMovies, "sortMostRatedMoviesArray");
    $newMostRatedMovies = array_slice($this->mostRatedMovies, 0, 5);
    $this->mostRatedMovies = $newMostRatedMovies;
  }

  public function deleteRating($ratingId) {
    // $deleteIndex = null;

    foreach ($this->ratings as $deleteIndex => $rating) {
      if ($rating->getId() == $ratingId) {
        // $deleteIndex = $rating->getId();

        $rating->getMovie()->deleteRating($ratingId);
        $rating->getUser()->deleteRating($ratingId);
        unset($this->ratings[$deleteIndex]);
        usort($this->mostRatedMovies, "sortMostRatedMoviesArray");
      }
    }

    // if ($deleteIndex) {
    //   unset($this->ratings[$deleteIndex]);
    // }
  }

  public function findUser($email)
  {
    foreach ($this->users as $user) {
      if ($user->getEmail() === $email) {
        return [true, $user];
      }
    }

    return [false, null];
  }

  public function authUser($email, $password)
  {
    $systemUser = $this->findUser($email);

    if (!$systemUser[0]) {
      return [false, "E-mail não cadastrado."];
    }

    $verifiedPassword = password_verify($password, $systemUser[1]->getPasswordHash());

    if ($verifiedPassword) {
      return [true, [
        "id" => $systemUser[1]->getId(),
        "name" => $systemUser[1]->getName(),
        "email" => $systemUser[1]->getEmail(),
      ]];
    }

    return [false, "Senha incorreta."];
  }

  public function findMovie($id)
  {
    foreach ($this->movies as $movie) {
      if ($movie->getId() === $id) {
        return [true, $movie];
      }
    }

    return [false, "Esse filme ainda não possui avaliações."];
  }

  public function searchMovie($search)
  {
    $curl = curl_init();
    $search = urlencode($search);

    curl_setopt_array($curl, [
      CURLOPT_URL => "https://api.themoviedb.org/3/search/movie?query=$search&include_adult=false&language=pt-BR&page=1",
      CURLOPT_RETURNTRANSFER => true,
      CURLOPT_ENCODING => "",
      CURLOPT_MAXREDIRS => 10,
      CURLOPT_TIMEOUT => 30,
      CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
      CURLOPT_CUSTOMREQUEST => "GET",
      CURLOPT_HTTPHEADER => [
        "Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkODkzMmFmOTIxMGIxMDYwMTVlMGY3MmEwMmU3NzlkMSIsInN1YiI6IjYxZDNhNWUwYTIyZDNlMDA2N2IyYzExMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.H99HXk-Rk7FtTL56qUkDm7z1nOclfyTBjUmMz1Hzwrw",
        "accept: application/json"
      ],
    ]);

    $response = curl_exec($curl);
    $data = json_decode($response);

    curl_close($curl);

    if (isset($data->success) && $data->success === false) {
      return [false, "Não foi possível realizar a busca. Tente novamente mais tarde."];
    } else {
      return [true, $data];
    }
  }
}

function sortMostRatedMoviesArray($a, $b)
{
  $aNumberOfRatings = count($a->getRatings());
  $bNumberOfRatings = count($b->getRatings());
  if ($aNumberOfRatings === $bNumberOfRatings) return 0;
  return ($aNumberOfRatings < $bNumberOfRatings) ? 1 : -1;
}
