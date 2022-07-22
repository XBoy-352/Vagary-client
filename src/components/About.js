import React, { useEffect, useState } from "react";
import "../css/Main.css";
import { useNavbar } from "../contexts/ShowNavbarContext";
import "../css/About.css";

function About() {
  const { hideNavbar } = useNavbar();

  return (
    <div className="main">
      <div
        className="overlay-bg"
        style={{
          background: `url(${require("../images/bg1.jpg")})no-repeat top center / cover`,
        }}
      >
        <div className="overlay" onClick={hideNavbar}>
          <div className="post-body-container">
            <div className="post-full-container">
              <div className="post-full-container-sec">
                <div className="about-container">
                  <div className="about-heading">
                    <h1>What is Vagary?</h1>
                  </div>
                  <div className="about-desc">
                    <p>
                      The best ideas can change who we are. Vagary is where
                      those ideas take shape, take off, and spark powerful
                      conversations. We’re an open platform where over 100
                      million readers come to find insightful and dynamic
                      thinking. Here, expert and undiscovered voices alike dive
                      into the heart of any topic and bring new ideas to the
                      surface. Our purpose is to spread these ideas and deepen
                      understanding of the world. We’re creating a new model for
                      digital publishing. One that supports nuance, complexity,
                      and vital storytelling without giving in to the incentives
                      of advertising. It’s an environment that’s open to
                      everyone but promotes substance and authenticity. And it’s
                      where deeper connections forged between readers and
                      writers can lead to discovery and growth. Together with
                      millions of collaborators, we’re building a trusted and
                      vibrant ecosystem fueled by important ideas and the people
                      who think about them.
                    </p>
                    <img src={require("../images/img1.jpg")} />
                  </div>
                </div>
                <div className="about-container2">
                  <div className="about-desc">
                    <img src={require("../images/img2.jpg")} />
                    <p>
                      <div
                        style={{
                          fontSize: "32px",
                          color: "yellow",
                          marginBottom: "10px",
                        }}
                      >
                        A living network of curious minds.
                      </div>
                      Anyone can write on Vagary. Thought-leaders, journalists,
                      experts, and individuals with unique perspectives share
                      their thinking here. You’ll find pieces by independent
                      writers from around the globe, stories we feature and
                      leading authors, and smart takes on our own suite of blogs
                      and publications.
                    </p>
                  </div>
                </div>
                <div className="about-container">
                  <div className="about-desc">
                    <p>
                      <div
                        style={{
                          fontSize: "32px",
                          color: "yellow",
                          marginBottom: "10px",
                        }}
                      >
                        Create the space for your thinking to take off.
                      </div>
                      A blank page is also a door. At Vagary you can walk
                      through it. It's easy and free to share your thinking on
                      any topic, connect with an audience, express yourself with
                      a range of publishing tools, and even earn money for your
                      work.
                    </p>
                    <img src={require("../images/img3.jpg")} />
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

export default About;
