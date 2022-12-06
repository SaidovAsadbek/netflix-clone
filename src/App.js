import "./App.css";
import Row from "./Row";
import requests from "./request";
import Banner from "./Banner";
import Nav from "./Nav";
import React, { useState, useEffect } from "react";
import HashLoader from "react-spinners/HashLoader";

function App() {
    const [loader, setLoader] = useState(false);
    useEffect(() => {
        setLoader(true);
        setTimeout(() => {
            setLoader(false);
        }, 5000);
    }, []);

    return (
        <div className="App">
            <>
                {loader ? (
                    <div className="loader">
                        <HashLoader
                            className="hashSpinner"
                            color={"#36d7b7"}
                            loading={true}
                            size={150}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    </div>
                ) : (
                    <>
                        <Nav />
                        <Banner />
                        <Row
                            title="NETFLIX ORIGNALS"
                            fetchURL={requests.fetchNetflixOriginals}
                            isLargeRow={true}
                        />
                        <Row
                            title="Trending Now"
                            fetchURL={requests.fetchTrending}
                        />
                        <Row
                            title="Top Rated"
                            fetchURL={requests.fetchTopRated}
                        />
                        <Row
                            title="Action Movies"
                            fetchURL={requests.fetchActionMovies}
                        />
                        <Row
                            title="Comedy Movies"
                            fetchURL={requests.fetchComedyMovies}
                        />
                        <Row
                            title="Horror Movies"
                            fetchURL={requests.fetchHorrorMovies}
                        />
                        <Row
                            title="Romance Movies"
                            fetchURL={requests.fetchRomanceMovies}
                        />
                        <Row
                            title="Documentaries"
                            fetchURL={requests.fetchDocumentaries}
                        />
                    </>
                )}
            </>
        </div>
    );
}

export default App;
