import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { RouteSignin } from "../helpers/RouteName";

const ProtectedRoute = () => {
  const user = useSelector((state) => state.user);
  const location = useLocation();
  if (user && user.isLoggedIn) {
    return <Outlet />;
  } else {
    return <Navigate to={RouteSignin} state={{ from: location }} replace />;
  }
};

export default ProtectedRoute;
