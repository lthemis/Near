import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./auth";

export const RequireAuth = ({ children }) => {
  const auth = useAuth();

  if (!auth.checkIfAuthenticated()) {
    return <Navigate to="/login" />;
  }

  return children;
};
