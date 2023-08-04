import React, { useEffect, useState } from "react";
import styles from "../assets/css/DetailTrack.module.css";
import { useParams } from "react-router-dom";
import ApiSpotify from "../apis/spotify.api";

const DetailTrack = () => {
  const param = useParams();
  const [track, setTrack] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getTrack = async () => {
      const { data } = await ApiSpotify.GetTrack({ id: param.id });
      setTrack(data);
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };
    getTrack();
  }, [param.id]);
  const { album, artists, name, duration_ms, popularity } = track;
  const artist = artists?.[0]; // Use optional chaining to handle missing artists data

  return (
    <>
      {loading === false ? (
        <div className={styles["detail-track-container"]}>
          <div className={styles["sidebar"]}>
            <img src={album.images[0].url} alt={artist.name} />
            <h1>Artist {artist.name}</h1>
          </div>
          <div className={styles["body-content"]}>
            <h2>Track {name}</h2>
            <p>Duration: {duration_ms} ms</p>
            <p>Popularity: {popularity}</p>

            <h3>Album</h3>
            <p>Album Name: {album.name}</p>
            <p>Album Type: {album.album_type}</p>
            <p>Release Date: {album.release_date}</p>
            <p>Total Tracks: {album.total_tracks}</p>
            {/* Add more album details here as needed */}

            <h3>Artists</h3>
            <p>Artist Name: {artist.name}</p>
            <p>
              <a
                href={artist.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
              >
                Open Artist on Spotify
              </a>
            </p>
            {/* <p>Genres: {artist.genres.join(", ")}</p> */}
            {/* Add more artist details here as needed */}
          </div>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <h1>Loading</h1>
        </div>
      )}
    </>
  );
};

export default DetailTrack;
