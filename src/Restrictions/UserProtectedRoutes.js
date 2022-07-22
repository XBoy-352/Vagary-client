import React from "react";
import { Navigate, Outlet } from "react-router";
import { useAuth } from "../contexts/AuthContext";

function UserProtectedRoutes() {
  const { user } = useAuth();

  return !user ? <Outlet /> : <Navigate to="/" />;
}

export default UserProtectedRoutes;
