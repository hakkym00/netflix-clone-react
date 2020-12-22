import React, { useEffect, useState } from "react";
import instance from "../axios";
import "../Row.css";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      // https://developers.google.com/youtube/player_parameters
      autoplay: 1,
    },
  };
  useEffect(() => {
    async function fetchMovies() {
      const request = await instance.get(fetchUrl);
      setMovies(request.data.results);
    }
    fetchMovies();
  }, [fetchUrl]);
  const handleClicl = (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      console.log(movie);
      movieTrailer(movie?.name || "")
        .then((url) => {
          console.log(url);
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  return (
    <div className="row">
      <h2> {title} </h2>
      <div className="row__posters">
        {movies.map((movie) => (
          <img
            onClick={() => handleClicl(movie)}
            key={movie.id}
            className={`row__poster ${isLargeRow && "row__poster__large"}`}
            src={`${base_url}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
