import { useNavigate } from "react-router-dom";
import { useState } from "react";

import { IoLogoFacebook, IoLogoInstagram } from "react-icons/io5";
import logo from "../assets/astroLogo.png";

import AuthModal from "./login/AuthModal";

export default function Footer() {
  const navigate = useNavigate();
  const [showAuth, setShowAuth] = useState(false);

  return (
    <footer
      className="bg-white border-t border-gray-200 pt-10 pb-2 px-6 md:px-8 mt-8 font-inter"
      style={{ boxShadow: "0px -8px 16px rgba(0,0,0,0.18)" }}
    >
      <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-16">
        {/* Logo + redes sociais */}
        <div className="flex flex-col gap-4 px-0 md:px-6 items-start">
          <img
            src={logo}
            alt="ASTRO"
            className="h-10 w-auto max-w-[160px] cursor-pointer"
            onClick={() => navigate("/")}
          />
          <div className="flex gap-1 items-center">
            <p className="text-sm text-black">Siga-nos</p>
            <div className="flex gap-1">
              <a
                href="https://www.facebook.com/profile.php?id=61590357466336&sk=directory_interests"
                target="_blank"
                rel="noreferrer"
              >
                <IoLogoFacebook
                  size={19}
                  className="text-black cursor-pointer"
                />
              </a>
              <a
                href="https://www.instagram.com/astro_site_tech/"
                target="_blank"
                rel="noreferrer"
              >
                <IoLogoInstagram
                  size={19}
                  className="text-black cursor-pointer"
                />
              </a>
            </div>
          </div>
        </div>

        {/* Colunas de links */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 flex-1 md:mr-[18%]">
          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-2">
              INSTITUCIONAL
            </h3>
            <ul className="flex flex-col gap-1">
              <li>
                <a
                  className="text-xs text-gray-700 font-semibold cursor-pointer"
                  onClick={() => navigate("/about")}
                >
                  Sobre nós
                </a>
              </li>
              <li>
                <a href="#" className="text-xs text-gray-700 font-semibold">
                  ASTRO Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-xs text-gray-700 font-semibold">
                  Trabalhe conosco
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-2">
              ATENDIMENTO
            </h3>
            <ul className="flex flex-col gap-1">
              <li>
                <a
                  className="text-xs text-gray-700 font-semibold cursor-pointer"
                  onClick={() => navigate("/contact")}
                >
                  Fale conosco
                </a>
              </li>
              <li>
                <a
                  className="text-xs text-gray-700 font-semibold cursor-pointer"
                  onClick={() => navigate("/contact")}
                >
                  Trocas & devoluções
                </a>
              </li>
              <li>
                <a
                  className="text-xs text-gray-700 font-semibold cursor-pointer"
                  onClick={() => navigate("/contact")}
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-2">
              MINHA CONTA
            </h3>
            <ul className="flex flex-col gap-1">
              <li>
                <a
                  className="text-xs text-gray-700 font-semibold cursor-pointer"
                  onClick={() => setShowAuth(true)}
                >
                  Login/Cadastro
                </a>
              </li>
              <li>
                <a href="#" className="text-xs text-gray-700 font-semibold">
                  Meus pedidos
                </a>
              </li>
              <li>
                <a
                  className="text-xs text-gray-700 font-semibold cursor-pointer"
                  onClick={() => navigate("/wishlist")}
                >
                  Lista de desejos
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-gray-900 mb-2">POLÍTICAS</h3>
            <ul className="flex flex-col gap-1">
              <li>
                <a href="#" className="text-xs text-gray-700 font-semibold">
                  Termos de uso
                </a>
              </li>
              <li>
                <a href="#" className="text-xs text-gray-700 font-semibold">
                  Política de privacidade
                </a>
              </li>
              <li>
                <a href="#" className="text-xs text-gray-700 font-semibold">
                  Política de cookies
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </footer>
  );
}
