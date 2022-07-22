import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import "../css/Login.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { login, setUser } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();

    setError("");
    setLoading(true);

    login(username, password)
      .then((res) => {
        setUser(res.data);
        setUsername("");
        setPassword("");
        setLoading(false);
      })
      .catch((err) => {
        setError("Unable to login");
        setLoading(false);
      });
  }

  return (
    <>
      <div className="general-form login-container">
        <form onSubmit={handleSubmit}>
          <h1 className="login-form-title">Login</h1>
          <br />
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
            Login
          </button>
          {error && <div className="login-error">{error}</div>}
        </form>
      </div>
    </>
  );
}

export default Login;
