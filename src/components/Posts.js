import React, { useEffect, useState } from "react";
import { useNavbar } from "../contexts/ShowNavbarContext";
import "../css/Posts.css";
import Post from "./Post";
import axios from "./Axios";

function Posts() {
  const { hideNavbar } = useNavbar();
  const [posts, setPosts] = useState([]);
  const [cats, setCat] = useState([]);

  useEffect(() => {
    function fetchPosts() {
      axios({
        method: "get",
        url: "/post/get",
      })
        .then((res) => {
          setPosts(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    fetchPosts();
  }, []);

  useEffect(() => {
    function fetchCat() {
      axios({
        method: "get",
        url: "/category",
      })
        .then((res) => {
          setCat(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    fetchCat();
  }, []);

  function changeCategory(e) {
    e.preventDefault();

    const category = e.target.textContent;

    if (category === "All") {
      axios({
        method: "get",
        url: "/post/get",
      })
        .then((res) => {
          setPosts(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios({
        method: "get",
        url: `/post/get?cat=${category}`,
      })
        .then((res) => {
          setPosts(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  return (
    <div className="main">
      <div
        className="overlay-bg"
        style={{
          background: `url(${require("../images/bg3.jpg")})no-repeat top center / cover`,
        }}
      >
        <div className="overlay" onClick={hideNavbar}>
          <div className="post-body-container">
            <div className="post-full-container">
              <div className="post-full-container-sec">
                <div className="categories-container">
                  <h2 onClick={changeCategory}>All</h2>
                  {cats.map((cat) => {
                    return (
                      <h2 key={cat._id} onClick={changeCategory}>
                        {cat.name}
                      </h2>
                    );
                  })}
                </div>
                <div className="posts">
                  <div className="posts-secondary">
                    {posts.map((post) => {
                      return <Post key={post._id} post={post} />;
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Posts;
