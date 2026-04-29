import { useState } from "react";
import { IoCloseOutline } from "react-icons/io5";
import LoginForm from "./login/LoginForm";
import RegisterCPFForm from "./login/RegisterCPFForm";
import RegisterCNPJForm from "./login/RegisterCNPJForm";

export default function AuthModal({ onClose }) {
  const [tela, setTela] = useState("login");

  const titulos = {
    login: "Entrar na sua conta",
    cadastroCPF: "Cadastrar CPF",
    cadastroCNPJ: "Cadastrar CNPJ",
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      onClick={onClose}
    >
      <div
        className="bg-white p-8 w-full max-w-2xl relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer"
        >
          <IoCloseOutline size={24} />
        </button>
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          {titulos[tela]}
        </h2>
        {tela === "login" && (
          <LoginForm
            onSwitchToCadastro={() => setTela("cadastroCPF")}
            onClose={onClose}
          />
        )}
        {tela === "cadastroCPF" && (
          <RegisterCPFForm
            onSwitchToCNPJ={() => setTela("cadastroCNPJ")}
            onClose={onClose}
          />
        )}

        {tela === "cadastroCNPJ" && (
          <RegisterCNPJForm
            onSwitchToCPF={() => setTela("cadastroCPF")}
            onClose={onClose}
          />
        )}
      </div>
    </div>
  );
}
