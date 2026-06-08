import { useState } from "react";
import { IoCloseOutline, IoCheckmarkCircleOutline } from "react-icons/io5";
import LoginForm from "./LoginForm.jsx";
import RegisterCPFForm from "./RegisterCPFForm.jsx";
import RegisterCNPJForm from "./RegisterCNPJForm.jsx";

export default function AuthModal({ onClose }) {
  const [tela, setTela] = useState("login");

  const titulos = {
    login: "Entrar na sua conta",
    cadastroCPF: "Cadastrar CPF",
    cadastroCNPJ: "Cadastrar CNPJ",
    loginSucesso: "Login realizado",
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start md:items-center justify-center overflow-y-auto"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      onClick={tela === "loginSucesso" ? undefined : onClose}
    >
      <div
        className="bg-white p-5 md:p-8 w-full max-w-2xl relative my-4 md:my-8 mx-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer"
        >
          <IoCloseOutline size={24} />
        </button>

        <h2 className="text-lg md:text-xl font-bold text-gray-900 mb-5 md:mb-6">
          {titulos[tela]}
        </h2>

        {tela === "login" && (
          <LoginForm
            onSwitchToCadastro={() => setTela("cadastroCPF")}
            onClose={onClose}
            onSuccess={() => setTela("loginSucesso")}
          />
        )}

        {tela === "cadastroCPF" && (
          <RegisterCPFForm
            onSwitchToCNPJ={() => setTela("cadastroCNPJ")}
            onClose={onClose}
            onSuccess={() => setTela("login")}
          />
        )}

        {tela === "cadastroCNPJ" && (
          <RegisterCNPJForm
            onSwitchToCPF={() => setTela("cadastroCPF")}
            onClose={onClose}
            onSuccess={() => setTela("login")}
          />
        )}

        {tela === "loginSucesso" && (
          <div className="flex flex-col items-center gap-4 py-4">
            <IoCheckmarkCircleOutline size={56} className="text-purple-600" />
            <p className="text-gray-700 text-center text-sm">
              Você entrou na sua conta com sucesso. Bem-vindo(a) de volta!
            </p>
            <button
              onClick={onClose}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-sm transition-colors cursor-pointer mt-2"
            >
              CONTINUAR
            </button>
          </div>
        )}
      </div>
    </div>
  );
}