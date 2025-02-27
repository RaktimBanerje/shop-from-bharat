import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const id = window.location.href.split("/").pop();
  const isLoggedIn = localStorage.getItem("BHARAT_TOKEN");

  if (
    !isLoggedIn &&
    (location.pathname === "/signup" ||
      location.pathname === "/verify-otp" ||
      location.pathname === "/forgot-password" ||
      location.pathname === "/login")
  ) {
    return children;
  }

  if (
    isLoggedIn &&
    (location.pathname === "/signup" ||
      location.pathname === "/verify-otp" ||
      location.pathname === "/forgot-password" ||
      location.pathname === "/login")
  ) {
    return <Navigate to="/" replace />;
  }

  if (!id || id === "undefined" || id === "null" || !isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute;
