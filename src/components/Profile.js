import React, { useState } from "react";
import "../css/Profile.css";
import { useNavbar } from "../contexts/ShowNavbarContext";
import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function Profile() {
  const { hideNavbar } = useNavbar();
  const { logout, user } = useAuth();
  const PF = "https://vagary-backend.herokuapp.com/images/";

  async function handleLogout() {
    await logout();
  }

  return (
    <div className="main">
      <div
        className="overlay-bg"
        style={{
          background: `url(${require("../images/bg4.jpg")})no-repeat top center / cover`,
        }}
      >
        <div className="overlay" onClick={hideNavbar}>
          <div className="image-area">
            <div className="img-wrapper">
              <img src={PF + user?.profilePic} alt="Display picture" />
              <h2>{user?.username}</h2>
              <ul>
                <li>
                  <Link
                    to="/edit-profile"
                    style={{ textDecoration: "inherit" }}
                  >
                    <i className="fa-solid fa-pen" />
                    <span>Edit Profile</span>
                  </Link>
                </li>
                <li>
                  <i className="fa-solid fa-right-from-bracket"></i>
                  <span onClick={handleLogout}>Logout</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
