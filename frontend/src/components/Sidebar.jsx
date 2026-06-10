import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import AuthModal from "./login/AuthModal";

const menuSections = [
  {
    title: "Explorar",
    items: ["Mais Vendidos", "Novidades na ASTRO", "Avaliação Estelar"],
  },
  {
    title: "Categorias",
    items: [
      "Hardware",
      "Periféricos",
      "Computadores",
      "Smartphones",
      "Games",
      "Diversos",
    ],
  },
  {
    title: "Configurações",
    items: ["Minha Conta", "Faça seu Login", "Contato"],
  },
];

const EXPLORE_SLUGS = {
  "Mais Vendidos": "mais-vendidos",
  "Novidades na ASTRO": "novidades",
  "Avaliação Estelar": "avaliacao-estelar",
};

const CATEGORY_SLUGS = {
  Hardware: "hardware",
  Periféricos: "perifericos",
  Computadores: "computadores",
  Smartphones: "smartphones",
  Games: "games",
  Diversos: "diversos",
};

const CONFIG_ROUTES = {
  "Minha Conta": "/minha-conta",
  Contato: "/contato",
};

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <>
      <div className="hidden lg:flex bg-gray-100">
        <aside className="hidden lg:flex w-56 bg-white border-r border-gray-200 flex-col justify-between py-6 px-4 shrink-0 sticky top-16 self-start h-[calc(100vh-4rem)]">
          <nav className="flex flex-col gap-6">
            {menuSections.map((section) => (
              <div key={section.title} className="border-b border-gray-400 pb-4">
                <p className="text-sm font-semibold text-gray-800 mb-2">
                  {section.title}
                </p>
                <ul className="flex flex-col gap-1">
                  {section.items.map((item) => {
                    if (item === "Faça seu Login" && isAuthenticated) return null;
                    if (item === "Minha Conta" && !isAuthenticated) return null;

                    return (
                      <li key={item}>
                        <button
                          onClick={() => {
                            setActiveItem(item);
                            const catSlug = CATEGORY_SLUGS[item];
                            const expSlug = EXPLORE_SLUGS[item];
                            const configRoute = CONFIG_ROUTES[item];
                            if (item === "Faça seu Login") setShowAuth(true);
                            else if (catSlug) navigate(`/categoria/${catSlug}`);
                            else if (expSlug) navigate(`/explorar/${expSlug}`);
                            else if (configRoute) navigate(configRoute);
                          }}
                          className={`w-full text-left text-sm px-2 py-1 rounded-md transition-colors cursor-pointer ${
                            activeItem === item
                              ? "text-gray-700 font-medium"
                              : "text-gray-800 hover:bg-gray-100 hover:text-gray-900"
                          }`}
                        >
                          {item}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </nav>

          <div className="text-sm font-semibold text-purple-900 text-center bg-purple-50 border border-purple-200 rounded-lg py-2 px-3">
            Frete grátis para todo o Litoral Norte - SP
          </div>

          <div className="bg-white shadow rounded-xl p-4 text-black">
            <p className="font-bold text-md mb-1 leading-tight">
              Enfrentando algum problema?
            </p>
            <p className="text-xs text-black mb-3 font-inter font-semibold">
              Entre em contato com nosso suporte especializado!
            </p>
            <button
              onClick={() => navigate("/about")}
              className="w-full bg-purple-900 text-white text-sm font-semibold py-3 rounded-3xl cursor-pointer"
            >
              Sobre nós
            </button>
          </div>
        </aside>
      </div>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </>
  );
}