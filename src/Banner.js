import React, { useState, useEffect } from "react";
import axios from "./axios";
import requests from "./request";
import "./Banner.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const Banner = () => {
    const [movie, SetMovie] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

    const base_url = `url(https://image.tmdb.org/t/p/original/${movie?.backdrop_path})`;
    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
        },
    };

    const handleCLICK = (movie) => {
        if (trailerUrl) {
            setTrailerUrl("");
        } else {
            movieTrailer(
                movie?.name || movie?.title || movie?.original_title || "",
            )
                .then((url) => {
                    const urlParams = new URLSearchParams(new URL(url).search);
                    setTrailerUrl(urlParams.get("v"));
                })
                .catch((err) => console.log(err));
            // movieTrailer(null, { tmdbId: movie.id })
            //     .then((url) => {
            //         console.log("url is " + url);
            //         const urlParams = new URLSearchParams(new URL(url).search);
            //         setTrailerUrl(urlParams.get("v"));
            //     })
            //     .catch((error) => console.log(error));
        }
    };

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(requests.fetchNetflixOriginals);
            SetMovie(
                request.data.results[
                    Math.floor(Math.random() * request.data.results.length - 1)
                ],
            );

            return request;
        }

        fetchData();
    }, []);

    function truncate(str, n) {
        return str?.length > n ? str.substr(0, n - 1) + "..." : str;
    }

    return (
        <header
            className="banner"
            style={{
                backgroundSize: "cover",
                backgroundImage: `${base_url}`,
                backgroundPosition: "center center",
            }}
        >
            <div className="banner__contents">
                <h1 className="banner__title">
                    {movie?.title || movie?.name || movie?.original_name}
                </h1>
                <div className="banner__buttons">
                    <button
                        className="banner__button"
                        onClick={() => handleCLICK(movie)}
                    >
                        Play
                    </button>
                    <button className="banner__button">My List</button>
                </div>
                <h1 className="banner_description">
                    {truncate(movie?.overview, 150)}
                </h1>
            </div>

            <div className="banner--fadeBottom" />
            <div className="trailer">
                {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
            </div>
        </header>
    );
};

export default Banner;
