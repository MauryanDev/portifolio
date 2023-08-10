<?php
class Rating
{
  private $id;
  private $user;
  private $movie;
  private $score;
  private $comment;

  function __construct($user, $movie, $score, $comment)
  {
    $this->user = $user;
    $this->movie = $movie;
    $this->score = $score;
    $this->comment = $comment;

    $user->addRating($this);
    $movie->addRating($this);
  }

  public function getId()
  {
    return $this->id;
  }

  public function setId($id)
  {
    $this->id = $id;
  }

  public function getUser()
  {
    return $this->user;
  }

  public function getMovie()
  {
    return $this->movie;
  }

  public function getScore()
  {
    return $this->score;
  }

  public function getComment()
  {
    return $this->comment;
  }
}
