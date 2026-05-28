import { useState } from "react";
import {
  IoEyeOutline,
  IoEyeOffOutline,
  IoCheckmarkCircleOutline,
  IoCloseCircleOutline,
  IoEllipseOutline,
  IoChevronDownOutline,
} from "react-icons/io5";
import RegisterSuccessModal from "./RegisterSuccessModal";

function checkPassword(password) {
  return [
    {
      id: "length",
      label: "Mínimo 8 caracteres",
      valid: /^.{8,}$/.test(password),
    },
    { id: "upper", label: "1 letra maiúscula", valid: /[A-Z]/.test(password) },
    { id: "number", label: "1 número", valid: /[0-9]/.test(password) },
    {
      id: "special",
      label: "1 caractere especial",
      valid: /[^A-Za-z0-9]/.test(password),
    },
  ];
}

export default function RegisterCNPJForm({
  onSwitchToCPF,
  onClose,
  onSuccess,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [receberOfertas, setReceberOfertas] = useState(false);
  const [aceitarPoliticas, setAceitarPoliticas] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const checks = checkPassword(password);
  const isValid = checks.every((c) => c.valid);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!isValid) {
      setPasswordTouched(true);
      return;
    }

    const form = e.target;

    try {
      const response = await fetch("http://localhost:3333/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.nomeEmpresa.value,
          email: form.email.value,
          password: form.password.value,
          cnpj: form.cnpj.value,
          telefone: form.celular.value,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Erro ao cadastrar");
        return;
      }

      setShowSuccessModal(true);
    } catch {
      alert("Erro ao conectar com o servidor");
    }
  }

  function handleSuccessClose() {
    setShowSuccessModal(false);
    if (onSuccess) onSuccess();
    else onClose();
  }

  return (
    <>
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
              <option value="" disabled defaultValue>
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => setPasswordTouched(true)}
            className={`w-full border px-4 py-3 text-sm outline-none pr-10
              [&::-ms-reveal]:hidden [&::-webkit-credentials-auto-fill-button]:hidden
              ${
                passwordTouched && !isValid
                  ? "border-red-400 focus:border-red-500"
                  : "border-gray-400 focus:border-gray-600"
              }`}
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

        <ul className="flex flex-col gap-1 -mt-2">
          {checks.map((check) => {
            const isNeutral = !passwordTouched && password === "";
            return (
              <li key={check.id} className="flex items-center gap-1.5">
                {isNeutral ? (
                  <IoEllipseOutline
                    size={14}
                    className="text-gray-400 shrink-0"
                  />
                ) : check.valid ? (
                  <IoCheckmarkCircleOutline
                    size={14}
                    className="text-green-500 shrink-0"
                  />
                ) : (
                  <IoCloseCircleOutline
                    size={14}
                    className="text-red-400 shrink-0"
                  />
                )}
                <span
                  className={`text-xs ${isNeutral ? "text-gray-500" : check.valid ? "text-green-600" : "text-red-400"}`}
                >
                  {check.label}
                </span>
              </li>
            );
          })}
        </ul>

        <div className="flex flex-col">
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

      {showSuccessModal && (
        <RegisterSuccessModal onClose={handleSuccessClose} />
      )}
    </>
  );
}
