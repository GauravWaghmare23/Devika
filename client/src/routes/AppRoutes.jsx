import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ProtectedRoute from "../context/ProtectedRoute";
import Home from "../pages/Home";

const AppRoutes = () => {
  return (
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
  );
};

export default AppRoutes;
