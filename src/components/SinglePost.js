import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useNavbar } from "../contexts/ShowNavbarContext";
import "../css/SinglePost.css";
import axios from "./Axios";
import { useAuth } from "../contexts/AuthContext";

function Posts() {
  const { hideNavbar } = useNavbar();
  const location = useLocation();
  const path = location.pathname.split("/")[2];
  const [post, setPost] = useState();
  const PF = "https://vagary-backend.herokuapp.com/images/";
  const { user } = useAuth();
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    function fetchPosts() {
      axios({
        method: "get",
        url: `/post/${path}/get`,
      })
        .then((res) => {
          setPost(res.data);
          setTitle(res.data.title);
          setDesc(res.data.desc);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    fetchPosts();
  }, [path]);

  function handleDelete() {
    axios({
      method: "put",
      url: `/post/${post?._id}/delete`,
      data: post,
    })
      .then(() => {
        navigate("/blogs");
      })
      .catch((err) => {
        setError("Unable to delete the post!");
        console.log(err);
      });
  }

  function submitChange(e) {
    e.preventDefault();

    setLoading(true);
    axios({
      method: "put",
      url: `/post/${post?._id}/update`,
      data: {
        username: user.username,
        title: title,
        desc: desc,
      },
    })
      .then((res) => {
        setLoading(false);
        window.location.reload();
      })
      .catch((err) => {
        setError("Unable to edit the post!");
      });
  }

  return (
    <div className="main">
      <div
        className="overlay-bg"
        style={{
          background: `url(${require("../images/bg5.jpg")})no-repeat top center / cover`,
        }}
      >
        <div className="overlay" onClick={hideNavbar}>
          <div className="post-body-container">
            <div className="post-full-container">
              <div className="post-full-container-sec">
                <div className="single-post-wrapper">
                  {post?.photo && (
                    <img
                      src={PF + post.photo}
                      alt="Post Image"
                      className="single-post-image"
                    />
                  )}
                  {error && <div className="login-error">{error}</div>}
                  {editMode ? (
                    <input
                      value={title}
                      className="single-post-title-input"
                      autoFocus={true}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  ) : (
                    <h1 className="single-post-title">
                      {post?.title}
                      {post?.username === user?.username && (
                        <>
                          <i
                            className="single-post-icon far fa-trash-alt"
                            onClick={handleDelete}
                          />
                          <i
                            className="single-post-icon far fa-edit"
                            onClick={() => setEditMode(true)}
                          />
                        </>
                      )}
                    </h1>
                  )}
                  <div className="single-post-info">
                    <span className="single-post-author">
                      Author: <b>{post?.username}</b>
                    </span>
                    <span className="single-post-date">
                      {new Date(post?.createdAt).toDateString()}
                    </span>
                  </div>
                  {editMode ? (
                    <input
                      className="single-post-content-input"
                      value={desc}
                      onChange={(e) => setDesc(e.target.value)}
                    />
                  ) : (
                    <p className="single-post-content">{post?.desc}</p>
                  )}
                </div>
                {editMode && (
                  <button
                    disabled={loading}
                    className="publish-button"
                    onClick={submitChange}
                  >
                    Publish
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
