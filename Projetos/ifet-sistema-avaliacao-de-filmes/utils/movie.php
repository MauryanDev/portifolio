<?php
function makeMovieBackdropPath($path)
{
  return 'https://image.tmdb.org/t/p/original' . $path;
}

function makeMoviePoster($path)
{
  return 'https://image.tmdb.org/t/p/w300' . $path;
}
