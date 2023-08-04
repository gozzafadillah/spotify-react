import React, { useState } from "react";
import "../assets/css/style.css";
import Card from "../components/Card";
import useSearchMusic from "../hooks/useSearch";
import useRecommendation from "../hooks/useRecommendation";

const Home = () => {
  const { searchTerm, searchResults, handleChange } = useSearchMusic();
  const [genre, setGenre] = useState("rock");
  const { recommendation, loading } = useRecommendation({ genre: genre });

  return (
    <div>
      <section className="content-body">
        <div>
          <input
            type="text"
            value={searchTerm}
            onChange={handleChange}
            placeholder="Search..."
          />
        </div>
        {searchResults.length === 1 ? (
          <>
            <div className="all-song">
              <h2 style={{ padding: "10px 20px" }}>Search Songs / Artist</h2>
              <Card songs={searchResults[0].data.tracks.items} />
            </div>
          </>
        ) : (
          <>
            {!loading ? (
              <div className="most-played">
                <h2 style={{ padding: "10px 20px" }}>
                  Recommendation Song Genre {genre}
                </h2>
                <div className="genre">
                  <button onClick={() => setGenre("rock")}>Rock</button>
                  <button onClick={() => setGenre("pop")}>Pop</button>
                  <button onClick={() => setGenre("jazz")}>Jazz</button>
                  <button onClick={() => setGenre("edm")}>EDM</button>
                  <button onClick={() => setGenre("metal")}>Metal</button>
                  <button onClick={() => setGenre("anime")}>Anime</button>
                </div>
                <Card songs={recommendation.tracks} />
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  height: "80vh",
                  alignItems: "center",
                }}
              >
                <h1>Loading</h1>
              </div>
            )}
          </>
        )}
      </section>

      <script
        src="https://kit.fontawesome.com/18c8f9634d.js"
        crossOrigin="anonymous"
      ></script>
    </div>
  );
};

export default Home;
