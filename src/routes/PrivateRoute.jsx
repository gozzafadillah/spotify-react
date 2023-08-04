import React from "react";
import { Navigate, Outlet } from "react-router";

const PrivateRoute = () => {
  if (localStorage.getItem("tokenSet")) {
    return <Navigate to="/home" replace />;
  }
  return (
    <>
      <Outlet />
    </>
  );
};

export default PrivateRoute;
