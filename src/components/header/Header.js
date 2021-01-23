import React, { useEffect, useState } from "react";
import axiosInstance from "../../axios";
import requests from "../../requests";
import "./Header.css";

const Header = () => {
  
  const [movie, setMovie] = useState(null);

  //  fetch rabdom movie to render backdrop image and title when component did mount 
  useEffect(() => {
    async function fetchRandomMovie() {
      const request = await axiosInstance.get(requests.fetchActionMovies);
      const randomMovie =
        request.data.results[
          Math.floor(Math.random() * request.data.results.length - 1)
        ];
      setMovie(randomMovie);
    }
    fetchRandomMovie();
  }, []);


  //  to show 3 dots in too long texts
  const truncateText= (txt, n) => {
      return txt?.length > n ?txt.substr(0, n - 1) + "..." : txt;
  }

  return (
    <header
      className="banner"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/w1280${
          movie?.backdrop_path || movie?.poster_path})`,
        backgroundPosition: "center center",
        backgroundSize: "cover",
      }}
    >
      <div className="banner__content">
        <h1 className="banner__title">
          {movie?.title || movie?.original_title || movie?.name}
        </h1>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        <h4 className="banner__overview">{truncateText(movie?.overview, 150)}</h4>
      </div>
    </header>
  );
};

export default Header;
