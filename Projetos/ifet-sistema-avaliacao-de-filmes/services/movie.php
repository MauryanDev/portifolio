<?php
function searchMovie($search)
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

function getMovieFromApi($movieId)
{
  $curl = curl_init();

  curl_setopt_array($curl, [
    CURLOPT_URL => "https://api.themoviedb.org/3/movie/$movieId?language=pt-BR",
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
    return [false, "Filme não encontrado."];
  } else {
    return [true, $data];
  }
}
