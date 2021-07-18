import React, { useEffect, useState } from "react";
import axios from "./axios";
import requests from "./requests";
import "./Banner.css";

const baseURL = "https://image.tmdb.org/t/p/original/";

function Banner() {
  const [banner, setBanner] = useState([]);
  useEffect(() => {
    async function fetchBannerData() {
      const bannerData = await axios.get(requests.fetchNetflixOriginals);
      setBanner(
        bannerData.data.results[
          Math.floor(Math.random() * bannerData.data.results.length - 1)
        ]
      );
      return bannerData;
    }
    fetchBannerData();
  }, []);

  function truncate(str, n) {
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    <div>
      <header
        className="banner"
        style={{
          backgroundImage: `url(${baseURL + banner?.backdrop_path})`,
        }}
      >
        <div className="banner_contents">
          <h1 className="banner_title">
            {banner?.name || banner?.original_name}{" "}
          </h1>

          <div className="banner_buttons">
            <button className="banner_button">Play</button>
            <button className="banner_button">My List</button>
          </div>

          <h1 className="banner_description">
            {truncate(banner?.overview, 150)}
          </h1>
        </div>
        <div className="banner_fadeBottom"></div>
      </header>
    </div>
  );
}

export default Banner;
