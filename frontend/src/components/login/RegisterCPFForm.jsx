import { useState } from "react";
import {
  IoEyeOutline,
  IoEyeOffOutline,
  IoInformationCircleOutline,
} from "react-icons/io5";

export default function RegisterCPFForm({ onSwitchToCNPJ, onClose }) {
  const [showPassword, setShowPassword] = useState(false);
  const [receberOfertas, setReceberOfertas] = useState(false);
  const [aceitarPoliticas, setAceitarPoliticas] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    onClose();
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-4">
        <input
          type="email"
          name="email"
          placeholder="Email*"
          required
          className="w-full border border-gray-400 px-4 py-3 text-sm outline-none focus:border-gray-600"
        />
        <input
          type="text"
          name="cpf"
          placeholder="CPF*"
          required
          className="w-full border border-gray-400 px-4 py-3 text-sm outline-none focus:border-gray-600"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <input
          type="tel"
          name="telefone"
          placeholder="Telefone celular (opcional)"
          className="w-full border border-gray-400 px-4 py-3 text-sm outline-none focus:border-gray-600"
        />
        <input
          type="date"
          name="nascimento"
          placeholder="dd/mm/aaaa"
          className="w-full border border-gray-400 px-4 py-3 text-sm outline-none focus:border-gray-600 text-gray-400"
        />
      </div>

      <input
        type="text"
        name="nome"
        placeholder="Nome completo*"
        required
        className="w-full border border-gray-400 px-4 py-3 text-sm outline-none focus:border-gray-600"
      />

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Senha*"
          required
          className="w-full border border-gray-400 px-4 py-3 text-sm outline-none focus:border-gray-600 pr-10 [&::-ms-reveal]:hidden [&::-webkit-credentials-auto-fill-button]:hidden"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer"
        >
          {showPassword ? (
            <IoEyeOffOutline size={18} />
          ) : (
            <IoEyeOutline size={18} />
          )}
        </button>
      </div>

      <p className="text-xs text-red-500 -mt-3">obrigatório *</p>

      <div className="flex flex-col">
        <div className="flex items-start gap-2 text-xs text-gray-700 ml-0.5">
          <IoInformationCircleOutline
            size={16}
            className="shrink-0 mt-0.5 text-gray-700"
          />
          <p>
            A senha deve conter no mínimo 8 caracteres, 1 caractere especial, 1
            letra maiúscula e 1 número.
          </p>
        </div>

        <label className="flex items-center gap-2 text-sm text-gray-800 cursor-pointer pl-1">
          <input
            type="checkbox"
            checked={receberOfertas}
            onChange={() => setReceberOfertas(!receberOfertas)}
            className="accent-purple-600"
          />
          Quero receber ofertas e novidades enviadas por e-mail.
        </label>

        <label className="flex items-center gap-2 text-sm text-gray-800 cursor-pointer pl-1">
          <input
            type="checkbox"
            checked={aceitarPoliticas}
            required
            onChange={() => setAceitarPoliticas(!aceitarPoliticas)}
            className="accent-purple-600"
          />
          <span>
            Li e estou de acordo com as{" "}
            <a href="#" className="text-purple-600 hover:underline">
              políticas da empresa
            </a>{" "}
            e{" "}
            <a href="#" className="text-purple-600 hover:underline">
              políticas de privacidade
            </a>
            .*
          </span>
        </label>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-2">
        <button
          type="button"
          onClick={onSwitchToCNPJ}
          className="w-full border border-gray-300 text-gray-700 font-semibold py-2 text-sm bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
        >
          CADASTRAR CNPJ
        </button>
        <button
          type="submit"
          className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 text-sm transition-colors cursor-pointer"
        >
          CONTINUAR
        </button>
      </div>
    </form>
  );
}
