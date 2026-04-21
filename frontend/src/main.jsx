import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home";
import Sidebar from "./components/Sidebar";
import Cart from "./pages/Cart";
import Buycard from "./pages/Buycard";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />
        <Route
          path="/cart"
          element={
            <MainLayout>
              <Cart />
            </MainLayout>
          }
        />
        <Route
          path="/carrinho"
          element={
            <MainLayout>
              <Cart />
            </MainLayout>
          }
        />
        <Route
          path="/product"
          element={
            <MainLayout>
              <Buycard />
            </MainLayout>
          }
        />
        <Route
          path="/produto"
          element={
            <MainLayout>
              <Buycard />
            </MainLayout>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
