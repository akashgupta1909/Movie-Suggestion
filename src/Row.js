import React, { useEffect, useState } from "react";
import axios from "./axios";
import "./Row.css";

const baseURL = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  useEffect(() => {
    async function loadMovies() {
      const fetchedData = await axios.get(fetchUrl);
      setMovies(fetchedData.data.results);
      return fetchedData;
    }
    loadMovies();
    // console.table(movies);
  }, [fetchUrl]);

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row_posters">
        {movies.map((movies) => (
          <img
            key={movies.id}
            src={baseURL + movies.poster_path}
            alt={movies.name}
            className={
              isLargeRow ? "row_poster_larger row_poster" : "row_poster"
            }
          />
        ))}
      </div>
    </div>
  );
}

export default Row;
