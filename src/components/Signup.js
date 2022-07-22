import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import "../css/Login.css";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const { signup } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setSuccess("");
    setLoading(true);

    signup(username, email, password)
      .then((res) => {
        setSuccess("User registered successfully!");
        setUsername("");
        setEmail("");
        setPassword("");
        setLoading(false);
      })
      .catch((err) => {
        setError("Unable to signup");
        setLoading(false);
      });
  }

  return (
    <>
      <div className="general-form signup-container">
        <form onSubmit={handleSubmit}>
          <h1 className="login-form-title">Sign Up</h1>
          <br />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <br />
          <button
            disabled={loading}
            className="login-form-button"
            type="submit"
          >
            Sign Up
          </button>

          {error && <div className="login-error">{error}</div>}
          {success && <div className="login-success">{success}</div>}
        </form>
      </div>
    </>
  );
}

export default Signup;
