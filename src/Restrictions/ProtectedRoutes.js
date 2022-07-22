import React from "react";
import { Navigate, Outlet } from "react-router";
import { useAuth } from "../contexts/AuthContext";

function ProtectedRoutes() {
  const { user } = useAuth();

  return user ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoutes;
