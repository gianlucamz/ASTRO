import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CepProvider } from "./context/CepContext";
import "./index.css";

import MainLayout from "./layouts/MainLayout";
import AltLayout from "./layouts/AltLayout";

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
import Account from "./pages/Account";
import CategoryPage from "./pages/CategoryPage";
import ExplorePage from "./pages/ExplorePage";

import ScrollToTop from "./components/ScrollToTop";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <CepProvider>
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
              path="/categoria/:slug"
              element={
                <MainLayout>
                  <CategoryPage />
                </MainLayout>
              }
            />
            <Route
              path="/explorar/:slug"
              element={
                <MainLayout>
                  <ExplorePage />
                </MainLayout>
              }
            />
            <Route
              path="/cart"
              element={
                <AltLayout>
                  <Cart />
                </AltLayout>
              }
            />
            <Route
              path="/carrinho"
              element={
                <AltLayout>
                  <Cart />
                </AltLayout>
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
                  <AltLayout>
                    <EditProduct />
                  </AltLayout>
                </AdminRoute>
              }
            />
            <Route
              path="/desejos"
              element={
                <AltLayout>
                  <WishList />
                </AltLayout>
              }
            />
            <Route
              path="/wishlist"
              element={
                <AltLayout>
                  <WishList />
                </AltLayout>
              }
            />
            <Route
              path="/contato"
              element={
                <AltLayout>
                  <Contact />
                </AltLayout>
              }
            />
            <Route
              path="/contact"
              element={
                <AltLayout>
                  <Contact />
                </AltLayout>
              }
            />
            <Route
              path="/about"
              element={
                <AltLayout>
                  <About />
                </AltLayout>
              }
            />
            <Route
              path="/sobrenos"
              element={
                <AltLayout>
                  <About />
                </AltLayout>
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
            <Route
              path="/minha-conta"
              element={
                <AltLayout>
                  <Account />
                </AltLayout>
              }
            />
          </Routes>
        </BrowserRouter>
      </CepProvider>
    </AuthProvider>
  </StrictMode>,
);
