import React, { useState } from "react";
import "../css/EditProfile.css";
import { useNavbar } from "../contexts/ShowNavbarContext";
import { useAuth } from "../contexts/AuthContext";
import axios from "./Axios";
import { useNavigate } from "react-router-dom";

function Profile() {
  const { hideNavbar } = useNavbar();
  const PF = "https://vagary-backend.herokuapp.com/images/";
  const { user, setUser } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const newUser = {
      userId: user?._id,
    };
    if (username !== "") {
      newUser.username = username;
    }
    if (email !== "") {
      newUser.email = email;
    }
    if (password !== "") {
      newUser.password = password;
    }

    if (image) {
      const data = new FormData();
      const fileName = Date.now() + image.name;
      data.append("name", fileName);
      data.append("file", image);
      newUser.profilePic = fileName;

      try {
        const res = await axios({
          method: "post",
          url: "/upload",
          data: data,
        });
      } catch (err) {
        setError("Unable to upload image");
      }
    }
    try {
      const res = await axios({
        method: "put",
        url: `/update-user/${user?._id}/update`,
        data: newUser,
      });

      setUser(res.data);
      navigate("/profile");
    } catch (err) {
      setError("Unable to publish the blog!");
    }
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
              <h2 className="profile-button" onClick={handleSubmit}>
                Update
              </h2>
              <div className="update-profile">
                <form className="update-form">
                  <div className="update-form-group">
                    <label htmlFor="profile-pic">
                      <div className="profile-pic-container">
                        {image ? (
                          <img
                            src={URL.createObjectURL(image)}
                            alt="Uploaded Image"
                          />
                        ) : (
                          <img src={PF + user?.profilePic} alt="DP" />
                        )}
                      </div>
                    </label>
                    <input
                      type="file"
                      id="profile-pic"
                      style={{ display: "none" }}
                      onChange={(e) => setImage(e.target.files[0])}
                    />
                  </div>

                  {error && <div className="login-error">{error}</div>}
                  <input
                    type="text"
                    placeholder="Username"
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
