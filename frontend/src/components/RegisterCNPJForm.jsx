import { useState } from "react";
import {
  IoEyeOutline,
  IoEyeOffOutline,
  IoInformationCircleOutline,
  IoChevronDownOutline,
} from "react-icons/io5";

export default function RegisterCNPJForm({ onSwitchToCPF, onClose }) {
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
          name="cnpj"
          placeholder="CNPJ*"
          required
          className="w-full border border-gray-400 px-4 py-3 text-sm outline-none focus:border-gray-600"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="nomeEmpresa"
          placeholder="Nome da empresa*"
          required
          className="w-full border border-gray-400 px-4 py-3 text-sm outline-none focus:border-gray-600"
        />
        <input
          type="text"
          name="razaoSocial"
          placeholder="Razão social*"
          required
          className="w-full border border-gray-400 px-4 py-3 text-sm outline-none focus:border-gray-600"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="responsavel"
          placeholder="Nome do responsável pela compra*"
          required
          className="w-full border border-gray-400 px-4 py-3 text-sm outline-none focus:border-gray-600"
        />
        <input
          type="tel"
          name="celular"
          placeholder="Celular para contato*"
          required
          className="w-full border border-gray-400 px-4 py-3 text-sm outline-none focus:border-gray-600"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="inscricaoEstadual"
          placeholder="Inscrição Estadual*"
          required
          className="w-full border border-gray-400 px-4 py-3 text-sm outline-none focus:border-gray-600"
        />
        <div className="relative">
          <select
            name="informacoesTributarias"
            required
            className="w-full border border-gray-400 px-4 py-3 text-sm outline-none focus:border-gray-600 text-gray-400 appearance-none bg-white cursor-pointer"
          >
            <option value="" disabled selected>
              Informações tributárias
            </option>
            <option value="simples">Simples Nacional</option>
            <option value="presumido">Lucro Presumido</option>
            <option value="real">Lucro Real</option>
          </select>
          <IoChevronDownOutline
            size={16}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
        </div>
      </div>

      <div className="relative">
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Senha*"
          required
          className="w-full border border-gray-400 px-4 py-3 text-sm outline-none focus:border-gray-600 pr-10"
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
          onClick={onSwitchToCPF}
          className="w-full border border-gray-300 text-gray-700 font-semibold py-2 text-sm bg-gray-100 hover:bg-gray-200 transition-colors cursor-pointer"
        >
          CADASTRAR CPF
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
