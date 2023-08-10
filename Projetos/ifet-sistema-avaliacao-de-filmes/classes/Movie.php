<?php
class Movie
{
    private $id;
    private $title;
    private $posterPath;
    private $backdropPath;
    private $averageScore = null;
    private $overview;
    private $ratings = [];

    function __construct($id, $title, $posterPath, $backdropPath, $overview)
    {
        $this->id = $id;
        $this->title = $title;
        $this->posterPath = $posterPath;
        $this->backdropPath = $backdropPath;
        $this->overview = $overview;
    }

    public function getId()
    {
        return $this->id;
    }

    public function getTitle()
    {
        return $this->title;
    }

    function getPosterPath()
    {
        return $this->posterPath;
    }

    function getBackdropPath()
    {
        return $this->backdropPath;
    }

    public function getAverageScore()
    {
        return $this->averageScore;
    }

    public function getRatings()
    {
        return $this->ratings;
    }

    function getOverview()
    {
        return $this->overview;
    }

    public function addRating($rating)
    {
        array_unshift($this->ratings, $rating);

        $sum = 0;

        foreach ($this->ratings as $rating) {
            $sum += $rating->getScore();
        }

        $averageScore = $sum / count($this->ratings);
        $this->averageScore = $averageScore;
    }

    function deleteRating($ratingId) {
        foreach ($this->ratings as $deleteIndex => $rating) {
            if ($rating->getId() == $ratingId) {
                unset($this->ratings[$deleteIndex]);
            }
        }
    }
}
