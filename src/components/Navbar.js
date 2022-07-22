import React from "react";
import { useNavbar } from "../contexts/ShowNavbarContext";
import { Link } from "react-router-dom";
import "../css/Navbar.css";
import { useAuth } from "../contexts/AuthContext";

function Navbar() {
  const { navbar, showNavbar, hideNavbar } = useNavbar();
  const { user } = useAuth();

  function handleClick() {
    if (navbar === "") {
      showNavbar();
    } else {
      hideNavbar();
    }
  }

  function Login() {
    if (user === null) {
      return (
        <Link to="/login" className="link">
          Login
        </Link>
      );
    } else {
      return (
        <Link to="/profile" className="link">
          Profile
        </Link>
      );
    }
  }

  return (
    <>
      <div className="navbar">
        <div className="menu">
          <h3 className="logo">
            Vag<span>ary</span>
          </h3>
          <div className="hamburger-menu" onClick={handleClick}>
            <div className="bar"></div>
          </div>
        </div>
      </div>
      <div className={`links ${navbar}`}>
        <ul>
          <li>
            <Link to="/" className="link">
              Home
            </Link>
          </li>
          <li>
            <Link to="/blogs" className="link">
              Blogs
            </Link>
          </li>
          <li>
            <Link to="/write" className="link">
              Write
            </Link>
          </li>
          <li>
            <Link to="/about" className="link">
              About
            </Link>
          </li>
          <li>{Login()}</li>
        </ul>
      </div>
    </>
  );
}

export default Navbar;
