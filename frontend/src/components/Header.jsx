import { useNavigate, useLocation } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../context/AuthContext";

import logo from "../assets/astroLogoHeader.png";
import title from "../assets/astroTitle.png";
import Icon from "./Icon";

import AuthModal from "./login/AuthModal";
import ConfirmLogoutModal from "./login/ConfirmLogoutModal";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showAuth, setShowAuth] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const menuRef = useRef(null);

  const { user, logout, isAuthenticated } = useAuth();

  // CEP
  const [showCepModal, setShowCepModal] = useState(false);
  const [cepInput, setCepInput] = useState("");
  const [cepInfo, setCepInfo] = useState(() => {
    const saved = localStorage.getItem("astro_cep");
    return saved ? JSON.parse(saved) : null;
  });
  const [cepError, setCepError] = useState("");
  const [cepLoading, setCepLoading] = useState(false);
  const [cepFound, setCepFound] = useState(null);

  const [query, setQuery] = useState(() => {
    const params = new URLSearchParams(location.search);
    return params.get("q") || "";
  });

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setQuery(params.get("q") || "");
  }, [location.search]);

  useEffect(() => {
    setMobileMenuOpen(false);
    setMobileSearchOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  function handleSearch() {
    const trimmed = query.trim();
    if (trimmed) {
      navigate(`/busca?q=${encodeURIComponent(trimmed)}`);
      setMobileSearchOpen(false);
      setMobileMenuOpen(false);
    }
  }

  function handleKeyDown(e) {
    if (e.key === "Enter") handleSearch();
  }

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
    localStorage.removeItem("astro_cep");
    setCepInfo(null);

    logout();

    setShowLogoutConfirm(false);
    setShowUserMenu(false);
    setMobileMenuOpen(false);

    navigate("/");
  }

  async function handleBuscarCep() {
    const cep = cepInput.replace(/\D/g, "");
    if (cep.length !== 8) {
      setCepError("CEP inválido. Digite 8 números.");
      return;
    }
    setCepLoading(true);
    setCepError("");
    setCepFound(null);
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await res.json();
      if (data.erro) {
        setCepError("CEP não encontrado.");
      } else {
        setCepFound(data);
      }
    } catch {
      setCepError("Erro ao buscar CEP. Tente novamente.");
    } finally {
      setCepLoading(false);
    }
  }

  async function handleConfirmarCep() {
    if (!cepFound) return;
    const info = {
      cep: cepFound.cep,
      cidade: cepFound.localidade,
      uf: cepFound.uf,
    };
    setCepInfo(info);
    localStorage.setItem("astro_cep", JSON.stringify(info));

    if (isAuthenticated) {
      try {
        const token = localStorage.getItem("token");
        await fetch(`${import.meta.env.VITE_API_URL}/auth/users/${user.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ cep: cepFound.cep }),
        });
      } catch {}
    }

    setShowCepModal(false);
    setCepInput("");
    setCepFound(null);
    setCepError("");
  }

  function handleAbrirCep() {
    setShowCepModal(true);
    setCepInput("");
    setCepFound(null);
    setCepError("");
  }

  return (
    <>
      <header
        className="w-full bg-white sticky z-40"
        style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.18)", top: 0 }}
      >
        {/* Desktop */}
        <div className="hidden lg:flex items-center">
          <div className="p-1 ml-14 flex gap-14 items-center">
            <img
              src={logo}
              className="w-20 max-w-none cursor-pointer"
              onClick={() => navigate("/")}
            />
            <div className="relative flex-1 max-w-100">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Busque na ASTRO..."
                className="w-full border border-gray-400 py-1 text-sm max-h-8 bg-gray-200 pl-5 pr-40 focus:outline-none font-inter"
              />
              <Icon
                name="search-outline"
                onClick={handleSearch}
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

            <div
              className="flex items-center gap-1 cursor-pointer"
              onClick={handleAbrirCep}
            >
              <Icon name="location-outline" className="text-xl" />
              <span className="text-sm mr-2">
                {cepInfo
                  ? `${cepInfo.cidade} - ${cepInfo.uf}`
                  : "Informe seu CEP"}
              </span>
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

        {/* Mobile */}
        <div className="flex lg:hidden items-center h-16 px-4 relative">
          <img
            src={logo}
            className="w-12 max-w-none cursor-pointer flex-shrink-0"
            onClick={() => navigate("/")}
          />
          <img
            src={title}
            className="h-9 absolute left-1/2 -translate-x-1/2 cursor-pointer"
            onClick={() => navigate("/")}
          />
          <div className="flex items-center ml-auto gap-3">
            <button
              onClick={() => setMobileSearchOpen(true)}
              className="flex items-center cursor-pointer"
            >
              <Icon name="search-outline" className="text-2xl text-gray-600" />
            </button>
            <button
              onClick={() => navigate("/cart")}
              className="cursor-pointer flex items-center"
            >
              <Icon name="cart-outline" className="text-2xl" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="cursor-pointer flex items-center p-1"
              aria-label="Abrir menu"
            >
              <Icon name="menu-outline" className="text-2xl text-gray-700" />
            </button>
          </div>
        </div>

        {/* Busca mobile */}
        {mobileSearchOpen && (
          <div className="lg:hidden fixed inset-0 z-50 bg-white flex flex-col">
            <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-200">
              <button
                onClick={() => setMobileSearchOpen(false)}
                className="flex items-center"
              >
                <Icon
                  name="arrow-back-outline"
                  className="text-2xl text-gray-600"
                />
              </button>
              <input
                autoFocus
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Busque na ASTRO..."
                className="flex-1 border border-gray-300 py-2 px-4 text-sm bg-gray-100 focus:outline-none rounded"
              />
              <button
                onClick={handleSearch}
                className="bg-gray-800 text-white text-sm px-4 py-2 rounded cursor-pointer"
              >
                Buscar
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Overlay gaveta */}
      {mobileMenuOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Gaveta mobile */}
      <div
        className={`lg:hidden fixed top-0 right-0 h-full w-72 bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <img src={logo} className="w-10" />
          <button
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Fechar menu"
          >
            <Icon name="close-outline" className="text-2xl text-gray-600" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 flex flex-col gap-1">
          {isAuthenticated ? (
            <div className="px-5 py-3 mb-2 bg-gray-50 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <Icon
                  name="person-circle-outline"
                  className="text-3xl text-purple-600"
                />
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    {user?.name?.split(" ")[0] ?? "Usuário"}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {user?.email ?? ""}
                  </p>
                </div>
              </div>
            </div>
          ) : (
            <div className="px-5 mb-3">
              <button
                onClick={() => {
                  setShowAuth(true);
                  setMobileMenuOpen(false);
                }}
                className="w-full py-2 text-sm font-medium text-white bg-gray-800 rounded cursor-pointer"
              >
                Entrar / Criar conta
              </button>
            </div>
          )}

          {[
            { label: "Início", path: "/" },
            { label: "Contato", path: "/contact" },
            { label: "Minha Wishlist", path: "/wishlist" },
            { label: "Meu Carrinho", path: "/cart" },
          ].map(({ label, path }) => (
            <button
              key={path}
              onClick={() => navigate(path)}
              className="w-full text-left px-5 py-3 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
            >
              {label}
            </button>
          ))}

          {isAuthenticated && (
            <>
              <div className="h-px bg-gray-100 my-2 mx-5" />
              <button
                onClick={() => navigate("/minha-conta")}
                className="w-full text-left px-5 py-3 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
              >
                Minha conta
              </button>
              <button
                onClick={() => navigate("/meus-pedidos")}
                className="w-full text-left px-5 py-3 text-sm text-gray-700 hover:bg-gray-50 cursor-pointer"
              >
                Meus pedidos
              </button>
              {user?.role === "admin" && (
                <button
                  onClick={() => navigate("/admin/produto")}
                  className="w-full text-left px-5 py-3 text-sm text-blue-600 hover:bg-blue-50 cursor-pointer font-medium"
                >
                  Adicionar produto
                </button>
              )}
            </>
          )}

          <div className="h-px bg-gray-100 my-2 mx-5" />
          <div
            className="flex items-center gap-2 px-5 py-3 cursor-pointer"
            onClick={handleAbrirCep}
          >
            <Icon name="location-outline" className="text-xl text-gray-500" />
            <span className="text-sm text-gray-700">
              {cepInfo
                ? `${cepInfo.cidade} - ${cepInfo.uf}`
                : "Informe seu CEP"}
            </span>
          </div>
        </div>

        {isAuthenticated && (
          <div className="border-t border-gray-100 px-5 py-4">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                setShowLogoutConfirm(true);
              }}
              className="w-full text-left text-sm text-red-500 hover:text-red-600 cursor-pointer"
            >
              Sair da conta
            </button>
          </div>
        )}
      </div>

      {/* Modal CEP */}
      {showCepModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          onClick={() => setShowCepModal(false)}
        >
          <div
            className="bg-white rounded-xl p-6 w-full max-w-sm flex flex-col gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-lg font-bold text-gray-900">Informe seu CEP</h2>

            <div className="flex gap-2">
              <input
                type="text"
                value={cepInput}
                onChange={(e) =>
                  setCepInput(e.target.value.replace(/\D/g, "").slice(0, 8))
                }
                onKeyDown={(e) => e.key === "Enter" && handleBuscarCep()}
                placeholder="00000-000"
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-purple-400"
                maxLength={8}
              />
              <button
                onClick={handleBuscarCep}
                disabled={cepLoading}
                className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold px-4 py-2 rounded-lg cursor-pointer disabled:opacity-60"
              >
                {cepLoading ? "..." : "Buscar"}
              </button>
            </div>

            {cepError && <p className="text-sm text-red-500">{cepError}</p>}

            {cepFound && (
              <div className="bg-gray-50 rounded-lg p-3 flex flex-col gap-1">
                <p className="text-sm font-semibold text-gray-800">
                  {cepFound.localidade} - {cepFound.uf}
                </p>
                <p className="text-xs text-gray-500">
                  {cepFound.logradouro}
                  {cepFound.bairro ? `, ${cepFound.bairro}` : ""}
                </p>
                <p className="text-xs text-gray-400">CEP: {cepFound.cep}</p>
              </div>
            )}

            {cepFound && (
              <button
                onClick={handleConfirmarCep}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg cursor-pointer"
              >
                Confirmar localização
              </button>
            )}

            <button
              onClick={() => setShowCepModal(false)}
              className="text-sm text-gray-400 hover:text-gray-600 cursor-pointer text-center"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

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
