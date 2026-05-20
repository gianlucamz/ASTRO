import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";

import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Buycard from "./pages/Buycard";
import WishList from "./pages/WishList";
import Contact from "./pages/Contact";
import About from "./pages/About";

import Sidebar from "./components/Sidebar";
import ScrollToTop from "./components/ScrollToTop";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ScrollToTop />
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

        <Route
          path="/desejos"
          element={
            <MainLayout>
              <WishList />
            </MainLayout>
          }
        />

        <Route
          path="/wishlist"
          element={
            <MainLayout>
              <WishList />
            </MainLayout>
          }
        />

        <Route path="/contato" element={
          <MainLayout>
            <Contact />
          </MainLayout>
        } />

        <Route path="/contact" element={
          <MainLayout>
            <Contact />
          </MainLayout>
        } />

        <Route
  path="/about"
  element={
    <MainLayout>
      <About />
    </MainLayout>
  }
/>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
