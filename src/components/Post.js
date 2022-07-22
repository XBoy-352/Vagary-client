import React from "react";
import "../css/Posts.css";
import { Link } from "react-router-dom";

function Post(post) {
  const PF = "https://vagary-backend.herokuapp.com/images/";

  return (
    <div className="post-container">
      {post.post.photo && (
        <img
          src={PF + post.post.photo}
          alt="Post Image"
          className="post-image"
        />
      )}
      <div className="post-info">
        <Link to={`/blogs/${post.post._id}`} className="post-link">
          <span className="post-title">{post.post.title}</span>
        </Link>
        <hr />
        <span className="post-date">
          {new Date(post.post.createdAt).toDateString()}
        </span>
        <p className="post-content">{post.post.desc}</p>
      </div>
    </div>
  );
}

export default Post;
