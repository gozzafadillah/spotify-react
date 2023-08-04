import React from "react";
import { Logout } from "../auth/spotify";
import { mutate } from "swr";
import { useNavigate } from "react-router-dom";

const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  return (
    <header className="navbar">
      <div
        className="plalist"
        style={{
          margin: "0px 0px 0px 20rem",
        }}
      >
        <button className="toggle-button" onClick={() => toggleSidebar()}>
          Playlist
        </button>
      </div>
      <div className="logo">Spotifiy</div>
      <div className="nav-content">
        <ul className="nav-list">
          <li className="nav-item" onClick={() => navigate("/home")}>
            Home
          </li>
          <li style={{ listStyle: "none", marginTop: "10px" }}></li>
          <li>
            <button
              onClick={async () => {
                Logout();
                await mutate(null); // optimistically update the data and revalidate
                navigate("/");
              }}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
