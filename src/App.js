import React from "react";
import requests from "./requests";
import "./App.css";
import Row from "./components/rows//Row";
import Header from "./components/header/Header";
import Navbar from "./components/navbar/Navbar";

function App() {

  return (
    <div className="App">
      <Navbar />
      <Header />
      <div className="row__wrapper">
        <Row title="Trending Now" fetchURL={requests.fetchTrending} />
        {/* <Row title="Latest" fetchURL={requests.fetchLatest} /> */}
        <Row title="TopRated" fetchURL={requests.fetchTopRated} />
        <Row title="Action Movies" fetchURL={requests.fetchActionMovies} />
        <Row title="Comedy Movies" fetchURL={requests.fetchComedyMovies} />
        <Row title="Horror Movies" fetchURL={requests.fetchHorrorMovies} />
        {/* <Row title="Romantic" fetchURL={requests.fetchRomanticMovies} /> */}
        {/* <Row title="Documentaries" fetchURL={requests.fetchDocumentaries} /> */}
      </div>
    </div>
  ); 
}

export default App;
