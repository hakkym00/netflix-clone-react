import React, { useEffect, useState } from "react";
import instance from "../axios";
import "../Banner.css";
import requests from "../request";

function Banner() {
  const [movie, setMovie] = useState({});
  useEffect(() => {
    async function fetchMovie() {
      const request = await instance.get(requests.fetchNetflixOriginals);
      setMovie(
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ]
      );
    }
    fetchMovie();
  }, []);
  function truncate(str, max) {
    return str?.length > max ? str.substr(0, max - 1) + "…" : str;
  }

  console.log(movie);
  return (
    <header
      className="banner"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}{" "}
        </h1>
        <diV className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </diV>
        <h1 className="banner__description">
          {truncate(movie?.overview, 150)}
        </h1>
      </div>
      <div className="banner__fadeButton"></div>
    </header>
  );
}

export default Banner;
