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
      className="bg-white border-t border-gray-200 pt-10 pb-2 px-8 mt-8 font-inter"
      style={{
        boxShadow: "0px -8px 16px rgba(0,0,0,0.18)",
      }}
    >
      <div className="flex items-start gap-16">
        <div className="flex flex-col gap-4 px-6">
          <img
            src={logo}
            alt="ASTRO"
            className="h-14 w-auto cursor-pointer"
            onClick={() => navigate("/")}
          />
          <div className="flex gap-1">
            <p className="text-sm text-black">Siga-nos</p>
            <div className="flex gap-1">
              <IoLogoFacebook size={19} className="text-black cursor-pointer" />
              <IoLogoInstagram
                size={19}
                className="text-black cursor-pointer"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-24 flex-1 justify-end mr-[18%]">
          <div>
            <h3 className="text-sm font-bold text-gray-900">INSTITUCIONAL</h3>
            <ul className="flex flex-col gap-0 leading-1">
              <li>
                <a className="text-xs text-gray-700 font-semibold" onClick={() => navigate("/about")}>
                  Sobre nós
                </a>
              </li>
              <li>
                <a href="#" className="text-xs text-gray-700 font-semibold">
                  ASTRO Blog
                </a>
              </li>
              <li>
                <a href="#" className="text-xs  text-gray-700 font-semibold">
                  Trabalhe conosco
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-gray-900">ATENDIMENTO</h3>
            <ul className="flex flex-col gap-0 leading-1">
              <li>
                <a
                  href="#"
                  className="text-xs text-gray-700 font-semibold"
                  onClick={() => navigate("/contact")}
                >
                  Fale conosco
                </a>
              </li>
              <li>
                <a
                  className="text-xs text-gray-700 font-semibold"
                  onClick={() => navigate("/contact")}
                >
                  Trocas & devoluções
                </a>
              </li>
              <li>
                <a
                  className="text-xs text-gray-700 font-semibold"
                  onClick={() => navigate("/contact")}
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-gray-900">MINHA CONTA</h3>
            <ul className="flex flex-col gap-0 leading-1">
              <li>
                <a
                  href="#"
                  className="text-xs text-gray-700 font-semibold"
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
                  className="text-xs text-gray-700 font-semibold"
                  onClick={() => navigate("/wishlist")}
                >
                  Lista de desejos
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-bold text-gray-900">POLÍTICAS</h3>
            <ul className="flex flex-col gap-0 leading-1">
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
