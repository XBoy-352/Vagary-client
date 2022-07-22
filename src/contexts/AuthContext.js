import axios from "../components/Axios";
import React, { useContext, useEffect, useState } from "react";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  function signup(username, email, password) {
    return axios({
      method: "post",
      url: "/auth/register",
      data: {
        username: username,
        email: email,
        password: password,
        profilePic: "displaypicture.jpg",
      },
    });
  }

  function login(username, password) {
    return axios({
      method: "post",
      url: "/auth/login",
      data: {
        username: username,
        password: password,
      },
    });
  }

  function logout() {
    setUser(null);
  }

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const value = {
    user,
    signup,
    login,
    setUser,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
