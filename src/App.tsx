import React from "react";
import Navbar from "./components/Navbar.tsx";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage.tsx";
import HomePage from "./pages/HomePage.tsx";
import RegisterPage from "./pages/RegisterPage.tsx";
import ProductPage from "./pages/ProductPage.tsx";
import CreateProductPage from "./pages/CreateProductPage.tsx";
import { useSelector } from "react-redux";
import PrivateRoute from "./components/PrivateRoute.tsx";
import { CssBaseline } from "@mui/material";
import SingleProductPage from "./pages/SingleProductPage.tsx";
import NotFound from "./pages/NotFound.tsx";
import CheckoutPage from "./pages/CheckoutPage.tsx";
function App() {
  const user = useSelector((state: any) => state.user.user);

  function PrivateRouteWrapper({ children, message }: { children: React.ReactNode, message?: string }) {
    return (
      <React.Fragment>
        <PrivateRoute message={message} user={user}>
          {children}
        </PrivateRoute>
      </React.Fragment>
    );
  }

  return (
    <>
      <CssBaseline />
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<PrivateRouteWrapper message="You must be logged in to view this page. "><ProductPage /></PrivateRouteWrapper>} />
        <Route path="/products/:id" element={<SingleProductPage />} />
        <Route path="/products/create" element={<PrivateRouteWrapper message="You must be logged in to view this page. "><CreateProductPage /></PrivateRouteWrapper>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<NotFound />}></Route>
        <Route path="/checkout" element={<PrivateRouteWrapper><CheckoutPage /></PrivateRouteWrapper>}></Route>
      </Routes>
    </>
  );
}

export default App;
