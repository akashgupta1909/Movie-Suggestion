import React, { useEffect, useState } from "react";
import axios from "./axios";
import Youtube from "react-youtube";
import movieTrailer from "movie-trailer";
import "./Row.css";

const baseURL = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };
  useEffect(() => {
    async function loadMovies() {
      const fetchedData = await axios.get(fetchUrl);
      setMovies(fetchedData.data.results);
      return fetchedData;
    }
    loadMovies();
  }, [fetchUrl]);

  const handleClick = async (movie) => {
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || movie?.title || "", {
        id: true,
        multi: false,
      })
        .then((url) => {
          setTrailerUrl(url);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row_posters">
        {movies.map((movies) => (
          <img
            key={movies.id}
            src={baseURL + movies.poster_path}
            alt={movies.name}
            onClick={() => handleClick(movies)}
            className={
              isLargeRow ? "row_poster_larger row_poster" : "row_poster"
            }
          />
        ))}
      </div>
      {trailerUrl && <Youtube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
