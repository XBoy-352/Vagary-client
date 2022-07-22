import React, { useEffect, useState } from "react";
import "../css/Main.css";
import { useNavbar } from "../contexts/ShowNavbarContext";
import { useNavigate } from "react-router-dom";

function Main() {
  const { hideNavbar } = useNavbar();
  const navigate = useNavigate();

  const [offsetY, setOffsetY] = useState(0);
  const handleScroll = () => setOffsetY(window.pageYOffset);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="main">
      <div
        className="overlay-bg"
        style={{
          background: `url(${require("../images/bg1.jpg")})no-repeat top center / cover`,
        }}
      >
        <div className="overlay" onClick={hideNavbar}>
          <div
            className="inner-container"
            style={{ transform: `translateY(${offsetY * 0.35}px)` }}
          >
            <h2>Welcome</h2>
            <p>
              Leave nothing but footprints, take nothing but photos, kill
              nothing but time.
            </p>
            <button onClick={() => navigate("/about")}>Read more</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
