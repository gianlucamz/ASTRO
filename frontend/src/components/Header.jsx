import { useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

import logo from "../assets/astroLogoHeader.png";
import title from "../assets/astroTitle.png";
import Icon from "./Icon";

import AuthModal from "./login/AuthModal";
import ConfirmLogoutModal from "./login/ConfirmLogoutModal";

export default function Header() {
  const navigate = useNavigate();
  const [showAuth, setShowAuth] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const menuRef = useRef(null);

  const { user, logout, isAuthenticated } = useAuth();

  useEffect(() => {
    function handleClickOutside(e) {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setShowUserMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleLogoutConfirmed() {
    logout();
    setShowLogoutConfirm(false);
    setShowUserMenu(false);
    navigate("/");
  }

  return (
    <>
      <header
        className="w-full bg-white relative z-10"
        style={{
          boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
          position: "sticky",
          top: 0,
        }}
      >
        <div className="flex items-center">
          <div className="p-1 ml-14 flex gap-14 items-center">
            <img
              src={logo}
              className="w-20 max-w-none cursor-pointer"
              onClick={() => navigate("/")}
            />

            <div className="relative flex-1 max-w-100">
              <input
                type="text"
                placeholder="Busque na ASTRO..."
                className="w-full border border-gray-400 py-1 text-sm max-h-8 bg-gray-200 pl-5 pr-40 focus:outline-none font-inter"
              />
              <Icon
                name="search-outline"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-base cursor-pointer"
              />
            </div>
          </div>

          <img
            src={title}
            className="h-14 absolute left-1/2 -translate-x-1/2 cursor-pointer"
            onClick={() => navigate("/")}
          />

          <div className="flex items-center ml-auto font-inter mr-16 gap-14">
            <span
              className="cursor-pointer text-sm"
              onClick={() => navigate("/contact")}
            >
              Contato
            </span>

            <div className="flex items-center gap-1 cursor-pointer">
              <Icon name="location-outline" className="text-xl" />
              <span className="text-sm mr-2">Informe seu CEP</span>
            </div>

            <button
              onClick={() => navigate("/cart")}
              className="cursor-pointer flex items-center"
            >
              <Icon name="cart-outline" className="text-3xl" />
            </button>

            <button
              onClick={() => navigate("/wishlist")}
              className="cursor-pointer flex items-center"
            >
              <Icon name="star-outline" className="text-3xl" />
            </button>

            {isAuthenticated ? (
              <div className="relative" ref={menuRef}>
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="cursor-pointer flex items-center gap-2"
                >
                  <Icon
                    name="person-circle-outline"
                    className="text-3xl text-purple-600"
                  />
                  <span className="text-sm font-medium text-gray-700 hidden lg:block">
                    {user?.name?.split(" ")[0] ?? "Minha conta"}
                  </span>
                </button>

                {showUserMenu && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 shadow-lg rounded-sm z-50">
                    <div className="px-4 py-3 border-b border-gray-100">
                      {/* Nome + badge admin */}
                      <p className="text-sm font-semibold text-gray-800 truncate">
                        {user?.name?.split(" ")[0] ?? "Usuário"}
                        {user?.role === "admin" && (
                          <span className="text-gray-800 font-normal ml-1 text-xs">
                            (admin)
                          </span>
                        )}
                      </p>
                      <p className="text-xs text-gray-500 truncate">
                        {user?.email ?? ""}
                      </p>
                    </div>

                    <ul className="py-1">
                      {/* Exclusivo para admin */}
                      {user?.role === "admin" && (
                        <li>
                          <button
                            onClick={() => {
                              navigate("/admin/produto");
                              setShowUserMenu(false);
                            }}
                            className="w-full text-left px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 cursor-pointer font-medium"
                          >
                            Adicionar produto
                          </button>
                        </li>
                      )}

                      <li>
                        <button
                          onClick={() => {
                            navigate("/minha-conta");
                            setShowUserMenu(false);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
                        >
                          Minha conta
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            navigate("/meus-pedidos");
                            setShowUserMenu(false);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
                        >
                          Meus pedidos
                        </button>
                      </li>
                      <li>
                        <button
                          onClick={() => {
                            setShowUserMenu(false);
                            setShowLogoutConfirm(true);
                          }}
                          className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50 cursor-pointer"
                        >
                          Sair
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setShowAuth(true)}
                className="cursor-pointer flex items-center"
              >
                <Icon name="person-circle-outline" className="text-3xl" />
              </button>
            )}
          </div>
        </div>
      </header>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}

      {showLogoutConfirm && (
        <ConfirmLogoutModal
          onConfirm={handleLogoutConfirmed}
          onCancel={() => setShowLogoutConfirm(false)}
        />
      )}
    </>
  );
}
