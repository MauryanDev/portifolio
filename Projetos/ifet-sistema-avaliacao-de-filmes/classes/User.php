<?php
class User
{
  private $id;
  private $name;
  private $email;
  private $passwordHash;
  private $ratings = [];

  function __construct($name, $email, $password)
  {
    $passwordHash = password_hash($password, PASSWORD_BCRYPT);

    $this->name = $name;
    $this->email = $email;
    $this->passwordHash = $passwordHash;
  }

  function getId()
  {
    return $this->id;
  }

  function setId($id)
  {
    $this->id = $id;
  }

  function getName()
  {
    return $this->name;
  }

  function getEmail()
  {
    return $this->email;
  }

  function getPasswordHash()
  {
    return $this->passwordHash;
  }

  function getRatings()
  {
    return $this->ratings;
  }

  function addRating($rating)
  {
    array_unshift($this->ratings, $rating);
  }

  function deleteRating($ratingId) {
    foreach ($this->ratings as $deleteIndex => $rating) {
        if ($rating->getId() == $ratingId) {
          unset($this->ratings[$deleteIndex]);
        }
    }
}
}