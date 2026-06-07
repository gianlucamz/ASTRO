import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import "./index.css";

import MainLayout from "./layouts/MainLayout";

import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Buycard from "./pages/Buycard";
import WishList from "./pages/WishList";
import Contact from "./pages/Contact";
import About from "./pages/About";
import AddProduct from "./pages/AddProduct";
import AdminRoute from "./components/AdminRoute";
import EditProduct from "./pages/EditProduct";
import SearchResults from "./pages/SearchResults";

import Sidebar from "./components/Sidebar";
import ScrollToTop from "./components/ScrollToTop";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
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
            path="/product/:slug"
            element={
              <MainLayout>
                <Buycard />
              </MainLayout>
            }
          />

          <Route
            path="/admin/produto/editar/:id"
            element={
              <AdminRoute>
                <MainLayout>
                  <EditProduct />
                </MainLayout>
              </AdminRoute>
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

          <Route
            path="/contato"
            element={
              <MainLayout>
                <Contact />
              </MainLayout>
            }
          />

          <Route
            path="/contact"
            element={
              <MainLayout>
                <Contact />
              </MainLayout>
            }
          />

          <Route
            path="/about"
            element={
              <MainLayout>
                <About />
              </MainLayout>
            }
          />

          <Route
            path="/sobrenos"
            element={
              <MainLayout>
                <About />
              </MainLayout>
            }
          />

          <Route
            path="/admin/produto"
            element={
              <AdminRoute>
                <MainLayout>
                  <AddProduct />
                </MainLayout>
              </AdminRoute>
            }
          />

          <Route
            path="/busca"
            element={
              <MainLayout>
                <SearchResults />
              </MainLayout>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>,
);
