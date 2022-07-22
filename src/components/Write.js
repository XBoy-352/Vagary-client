import React, { useState } from "react";
import { useNavbar } from "../contexts/ShowNavbarContext";
import "../css/Write.css";
import axios from "./Axios";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function Write() {
  const { hideNavbar } = useNavbar();
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const newPost = {
      username: user?.username,
      title,
      desc,
    };

    if (image) {
      const data = new FormData();
      const fileName = Date.now() + image.name;
      data.append("name", fileName);
      data.append("file", image);
      newPost.photo = fileName;

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

    if (categories !== []) {
      newPost.categories = categories;
    }

    try {
      const res = await axios({
        method: "post",
        url: "/post/create",
        data: newPost,
      });

      navigate(`/blogs/${res.data._id}`);
    } catch (err) {
      setError("Unable to publish the blog!");
    }
  }

  function addCategory(e) {
    e.preventDefault();
    const cat = e.target.textContent;
    if (categories.includes(cat) === false) {
      setCategories((categories) => [...categories, cat]);
    }
  }

  function removeCategory(e) {
    e.preventDefault();
    const cat = e.target.id;
    setCategories(categories.filter((item) => item !== cat));
  }

  return (
    <div className="main">
      <div
        className="overlay-bg"
        style={{
          background: `url(${require("../images/bg6.jpg")})no-repeat top center / cover`,
        }}
      >
        <div className="overlay" onClick={hideNavbar}>
          <div className="post-body-container">
            <div className="post-full-container">
              <div className="post-full-container-sec">
                {error && <div className="login-error">{error}</div>}
                {image && (
                  <img
                    src={URL.createObjectURL(image)}
                    className="write-img"
                    alt="Uploaded Image"
                  />
                )}
                <form className="write-form">
                  <div className="write-form-group">
                    <label htmlFor="file-input">
                      <i className="write-icon fas fa-plus" />
                    </label>
                    <input
                      type="file"
                      id="file-input"
                      onChange={(e) => setImage(e.target.files[0])}
                      accept=".jpg, .jpeg, .png"
                      style={{ display: "none" }}
                    />
                    <input
                      type="text"
                      placeholder="Title"
                      className="write-input"
                      onChange={(e) => setTitle(e.target.value)}
                      autoFocus={true}
                    />
                  </div>
                  <div style={{ display: "flex" }}>
                    <div className="dropdown">
                      <button className="dropbtn" type="button">
                        Categories
                      </button>
                      <div className="dropdown-content">
                        <div onClick={addCategory}>Tech</div>
                        <div onClick={addCategory}>Travel</div>
                        <div onClick={addCategory}>Music</div>
                        <div onClick={addCategory}>Lifestyle</div>
                        <div onClick={addCategory}>Beauty</div>
                      </div>
                    </div>
                    <div style={{ display: "flex" }}>
                      {categories.map((category) => {
                        return (
                          <p key={category} className="category">
                            {category}
                            <i
                              id={category}
                              className="fa-solid fa-xmark"
                              style={{ marginLeft: "7px", cursor: "pointer" }}
                              onClick={removeCategory}
                            />
                          </p>
                        );
                      })}
                    </div>
                  </div>
                  <div className="write-form-group">
                    <div className="hide-scroll">
                      <textarea
                        placeholder="Tell your story..."
                        type="text"
                        onChange={(e) => setDesc(e.target.value)}
                        className="write-input write-text"
                      />
                    </div>
                  </div>
                  <button
                    className="write-button"
                    type="submit"
                    onClick={handleSubmit}
                  >
                    Publish
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Write;
