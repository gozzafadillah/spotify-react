import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import { CompleteLogin } from "../auth/spotify";
import PrivateRoute from "./PrivateRoute";
import ProtectedRoute from "./ProtectedRoute";
import DetailTrack from "../pages/DetailTrack";

const ConfigRoute = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PrivateRoute />}>
          <Route path="" element={<Login />} />
        </Route>
        <Route path="/" element={<ProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/tracks/:id" element={<DetailTrack />} />
        </Route>
        <Route path="/callback" element={<CompleteLogin />} />
      </Routes>
    </BrowserRouter>
  );
};

export default ConfigRoute;
