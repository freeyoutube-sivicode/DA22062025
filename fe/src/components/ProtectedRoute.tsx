import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
// No CSS module needed for this component as it's logic-based

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireAdmin?: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  requireAdmin = false,
}) => {
  const { isAuthenticated, isAdmin, loading, user } = useAuth();
  const location = useLocation();

  // console.log("ProtectedRoute Check:");
  // console.log("  loading:", loading);
  // console.log("  isAuthenticated:", isAuthenticated);
  // console.log("  isAdmin:", isAdmin);
  // console.log("  user Role:", user?.Role);

  if (loading) {
    // You might want to render a loading spinner or a different loading indicator
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    // Redirect to login page, saving the current location so the user can be redirected back after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireAdmin && !isAdmin) {
    // Redirect non-admin users to the home page or an unauthorized page
    return <Navigate to="/" replace />;
  }

  // If authenticated and meets role requirements, render the children
  return <>{children}</>;
};

export default ProtectedRoute;
