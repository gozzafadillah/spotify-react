import React from "react";
import { useNavigate } from "react-router-dom";
import ApiSpotify from "../apis/spotify.api";

const Card = ({ songs }) => {
  const navigate = useNavigate();
  const submitTrack = async ({ ids }) => {
    await ApiSpotify.SaveCurrTrackUser({ ids });
    window.location.reload();
  };
  return (
    <div className="card">
      {songs.map((song) => (
        <div key={song.id} className="card-content">
          <div className="card-list">
            <img
              onClick={() => navigate(`/tracks/${song.id}`)}
              src={song.album.images[0].url}
              alt={song.name}
            />
            <div className="card-title">
              <h3>{song.name}</h3>
              <div className="card-artist">
                {song.artists.map((artist, index) => (
                  <p key={index}>{artist.name}</p>
                ))}
              </div>
            </div>
            <button
              onClick={() => submitTrack({ ids: song.id })}
              className="add-to-playlist-button"
            >
              Tambah ke Playlist
            </button>
          </div>
        </div>
      ))}
      {/* ... tambahkan card-content lainnya ... */}
      <div className="logo-more">More +</div>
    </div>
  );
};

export default Card;
