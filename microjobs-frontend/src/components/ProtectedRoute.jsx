// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children, role }) => {
  const { user } = useAuth();

  if (!user) {
    // Not logged in
    return <Navigate to="/login" replace />;
  }

  if (role && user.role !== role) {
    // Logged in but wrong role
    // Redirect freelancers to explore, clients to dashboard
    return <Navigate to={user.role === "client" ? "/dashboard" : "/explore-jobs"} replace />;
  }

  return children;
};

export default ProtectedRoute;