import React, { useState } from "react";
import "../css/Login.css";
import Login from "./Login";
import Signup from "./Signup";
import { useNavbar } from "../contexts/ShowNavbarContext";

function LoginContainer() {
  const [change, setChange] = useState(false);
  const [style, setStyle] = useState("login-inner-container");
  const { hideNavbar } = useNavbar();

  function changeToOther() {
    setChange(!change);
    if (change) {
      setStyle("login-inner-container right-panel-active");
    } else {
      setStyle("login-inner-container");
    }
  }

  return (
    <div className="main">
      <div
        className="overlay-bg"
        style={{
          background: `url(${require("../images/bg2.jpg")})no-repeat top center / cover`,
        }}
      >
        <div className="overlay" onClick={hideNavbar}>
          <div className="login-full-container">
            <div className={style}>
              <Login />
              <Signup />
              <div className="login-overlay-container">
                <div className="login-overlay">
                  <div className="login-overlay-panel login-overlay-left">
                    <h1>Welcome Back!</h1>
                    <p>
                      To keep connected with us please login with your personal
                      info
                    </p>
                    <br />
                    <button
                      className="login-form-button ghost"
                      onClick={changeToOther}
                    >
                      Login
                    </button>
                  </div>
                  <div className="login-overlay-panel login-overlay-right">
                    <h1>Hello, Friend!</h1>
                    <p>Enter your personal details and start journey with us</p>
                    <br />
                    <button
                      className="login-form-button ghost"
                      onClick={changeToOther}
                    >
                      Sign Up
                    </button>
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

export default LoginContainer;
