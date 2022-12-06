import React, { useState, useEffect } from "react";
import axios from "./axios";
import "./Row.css";

// LazyLoadImage
import { LazyLoadImage } from "react-lazy-load-image-component";

// trailer
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

const base_url = "https://image.tmdb.org/t/p/original/";

// tester
const testURL =
    "https://api.themoviedb.org/3/movie/550?api_key=71390efea31787cd50fd350ec76b38d2&language=en-US&append_to_response=videos";

const Row = ({ title, fetchURL, isLargeRow }) => {
    // All movies
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

    useEffect(() => {
        async function fetchData() {
            const request = await axios.get(fetchURL);
            // console.log(request);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchURL]);
    const opts = {
        height: "390",
        width: "100%",
        playerVars: {
            autoplay: 1,
        },
    };

    const handleClick = (movie) => {
        if (trailerUrl) {
            setTrailerUrl("");
        } else {
            // movieTrailer(
            //     movie?.name || movie?.title || movie?.original_title || "",
            // )
            //     .then((url) => {
            //         const urlParams = new URLSearchParams(new URL(url).search);
            //         setTrailerUrl(urlParams.get("v"));
            //     })
            //     .catch((err) => console.log(err));
            movieTrailer(null, { tmdbId: movie.id })
                .then((url) => {
                    // console.log("url is " + url);
                    const urlParams = new URLSearchParams(new URL(url).search);
                    // console.log("urlParamsn" + urlParams);
                    setTrailerUrl(urlParams.get("v"));
                })
                .catch((error) => console.log(error));
        }
    };

    return (
        <div className="row">
            <h2>{title}</h2>
            <div className="row__posters">
                {movies.map((movie) => {
                    return (
                        <LazyLoadImage
                            effect="opacity"
                            key={movie.id}
                            onClick={() => handleClick(movie)}
                            className={`row__poster ${
                                isLargeRow && "row__posterLarge"
                                    ? "row__posterLarge"
                                    : ""
                            }`}
                            src={`${base_url}${
                                isLargeRow
                                    ? movie.poster_path
                                    : movie.backdrop_path
                            }`}
                            alt={movie.name}
                        />
                    );
                })}
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    );
};

export default Row;
