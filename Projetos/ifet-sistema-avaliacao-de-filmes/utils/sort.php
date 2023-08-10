<?php
function sortMostRatedMoviesArray($a, $b)
{
  $aNumberOfRatings = count($a->getRatings());
  $bNumberOfRatings = count($b->getRatings());
  if ($aNumberOfRatings === $bNumberOfRatings) return 0;
  return ($aNumberOfRatings < $bNumberOfRatings) ? 1 : -1;
}
