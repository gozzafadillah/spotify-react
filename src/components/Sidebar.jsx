import React, { useState } from "react";
import styles from "../assets/css/Sidebar.module.css";
import useGetTracks from "../hooks/useGetTrack";
import ApiSpotify from "../apis/spotify.api";

const Sidebar = ({ sidebarVisible, user }) => {
  const [deleteStatus, setDeleteStatus] = useState(false);
  const { tracks, loading } = useGetTracks({
    deleteStatus: deleteStatus,
    setDeleteStatus,
  });
  const deletetrack = async ({ ids }) => {
    console.log(ids);
    try {
      await ApiSpotify.RemoveCurrTrackUser({ ids });
      setDeleteStatus(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles["sidebar-container"]}>
      <div
        className={`${styles.sidebar} ${
          sidebarVisible ? styles.visible : styles.hidden
        }`}
      >
        <div className={styles.content}>
          {/* Your sidebar content goes here */}
          <h1>Spotify Clone</h1>
          <div
            className="user"
            style={{ borderBottom: "2px solid #fff", width: "100%" }}
          >
            <img
              style={{ borderRadius: "50%", width: "100px", height: "100px" }}
              src={user?.images[0].url}
              alt={user?.display_name}
            />
            <h3>{user?.display_name}</h3>
          </div>
          <div className="user-track-list">
            <h2>Track List</h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
              }}
            >
              {!loading
                ? tracks.items.map((track) => (
                    <>
                      <p>
                        {track.track.name}{" "}
                        <button
                          onClick={() => deletetrack({ ids: track.track.id })}
                        >
                          Delete
                        </button>
                      </p>
                    </>
                  ))
                : "Loading"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
