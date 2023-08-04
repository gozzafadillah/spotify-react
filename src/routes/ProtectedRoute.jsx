import React, { useState } from "react";
import { Navigate, Outlet } from "react-router";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import useUser from "../auth/useUser";

const ProtectedRoute = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const { user, mutate, loggedOut } = useUser();

  console.log({ user }, mutate, { loggedOut });

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  if (!localStorage.getItem("tokenSet")) {
    return <Navigate to="/" replace />;
  }
  return (
    <>
      <div style={{ display: "flex" }}>
        <Navbar toggleSidebar={toggleSidebar} />
        <Sidebar sidebarVisible={sidebarVisible} user={user} />
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default ProtectedRoute;
