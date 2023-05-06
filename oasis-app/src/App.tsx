/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import Navbar from "./components/Navbar.tsx";
import { Container, Typography } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import ProductPage from "./pages/ProductPage.tsx";
import CreateProductPage from "./pages/CreateProductPage.tsx";
import { useSelector } from "react-redux";
import { AuthState } from "./state/redux.ts";
import PrivateRoute from "./components/PrivateRoute.tsx";
import { CssBaseline } from "@mui/material";
function App() {
  const user = useSelector((state) => state.user.user);
  return (
    <>
      <CssBaseline />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<PrivateRoute message="You must be logged in to view this page. " user={user}><ProductPage /></PrivateRoute>} />
        <Route path="/products/create" element={<PrivateRoute message="You must be logged in to view this page. " user={user}><CreateProductPage /></PrivateRoute>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
    </>
  );
}

export default App;
