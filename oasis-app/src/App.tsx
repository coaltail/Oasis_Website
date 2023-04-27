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
function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
        <Route path="/products" element={<ProductPage />}></Route>
        <Route path="/products/create" element={<CreateProductPage />} ></Route>
      </Routes>
    </>
  );
}

export default App;
