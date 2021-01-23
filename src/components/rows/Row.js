import React, { useState, useEffect, useRef } from "react";
import axiosInstance from "../../axios";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";
import "./Row.css";

function Row({ title, fetchURL }) {

  const img_baseURL = "https://image.tmdb.org/t/p/w500";


  const [movies, setMovies] = useState([]);

  const [trailer, setTrailer] = useState({
    trailerUrl: "",
    trailerTitle: "",
  });

//  fetch all movies and set it into movies state
  useEffect(() => {
    async function getMovies() {
      const request = await axiosInstance.get(fetchURL);

      let fetchedMovies = request.data.results;

      setMovies(fetchedMovies);
    }
    getMovies();
  }, [fetchURL]);

 
  //  create wrapper for each movie by maping all movies 
  const pics = movies.map((movie) => (
    <div className="row__poster-wrapper" key={movie.id}>
      <img
        src={
          movie.poster_path
            ? img_baseURL + movie.poster_path
            : "https://via.placeholder.com/100x150/ffffff/21405D?text=NO+IMAGE+AVAILABLE"
        }
        className={`row__poster ${trailer.trailerTitle === movie.title ? "active-poster" : null}`}
        alt={movie.title}
      />
      <img
        src={
          movie.backdrop_path ? img_baseURL + movie.backdrop_path
            : "https://via.placeholder.com/100x150/ffffff/21405D?text=NO+IMAGE+AVAILABLE"
        }
        className="row__poster--back"
        alt={movie.title}
      />
      <button
        className={`row__poster-btn ${trailer.trailerTitle === movie.title ? "active-btn" : null}`}
        onClick={() => showTrailer(movie)}
      >
        {trailer.trailerTitle === movie.title ? "Close Trailer" : "Play Trailer"}
      </button>
    </div>
  ));

//   to get the trailer of clicked movie 
  function showTrailer(movie) {
    if (trailer.trailerUrl) {
      setTrailer({
        trailerUrl: "",
        trailerTitle: "",
      });
    } else {
      movieTrailer(movie?.title || "")
        .then((url) => {
          //  to get video id on youtube
          const urlParams = new URLSearchParams(new URL(url).search);

          setTrailer({
            trailerUrl: urlParams.get("v"),
            trailerTitle: movie.title,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  //  trailer video options
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {autoplay: 1,},
  };


  //  a refrence to each row component
  const row = useRef(null);

  //  animation when no more scroll 
  const endScrollAnimation = (translateVal, shadowXVal) => {
    row.current.animate(
      [
        { ransform: "translateX(0)", boxShadow: "unset" },
        {
          transform: `translateX(${translateVal}px)`,
          boxShadow: `${shadowXVal}px 0 14px -4px goldenrod`,
        },
        { ransform: "translateX(0)", boxShadow: "unset" },
      ], 400);
  };

  //  for scrolling row to right
  const scrollToRight = (translateVal, shadowXVal) => {
    let rightEdge = row.current.scrollWidth - row.current.offsetWidth;

    if (row.current.scrollLeft === rightEdge) {
      endScrollAnimation(-10, 14);
    } else {
      row.current.scrollLeft += row.current.offsetWidth - 158;
    }
  };

  //  for scrolling row to left
  const scrollToLeft = (translateVal, shadowXVal) => {
    if (row.current.scrollLeft === 0) {
      endScrollAnimation(10, -14);
    } else {
      row.current.scrollLeft -= row.current.offsetWidth - 150;
    }
  };

    return (
      <div className="row">
        <h2 className="row__title">{title}</h2>
        <div className={"row__posters"} ref={row}>
          {pics}
        </div>
        {trailer.trailerUrl && (
          <Youtube videoId={trailer.trailerUrl} opts={opts} />
        )}
        <button className="row__btn row__btn-right" onClick={scrollToRight}></button>
        <button className="row__btn row__btn-left" onClick={scrollToLeft}></button>
      </div>
    );
}

export default Row;
