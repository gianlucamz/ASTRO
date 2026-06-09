import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { api } from "../../services/api";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

export default function LoginForm({ onSwitchToCadastro, onClose, onSuccess }) {
  const [showPassword, setShowPassword] = useState(false);
  const [lembrar, setLembrar] = useState(false);
  const { login } = useAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;

    try {
      const data = await api("/auth/login", {
        method: "POST",
        body: JSON.stringify({
          email: form.email.value,
          password: form.password.value,
        }),
      });

      login(data.user, data.token);
      onSuccess();
    } catch (err) {
      alert(err.message || "Erro ao conectar com o servidor");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        name="email"
        placeholder="Email, CPF, CNPJ ou Telefone*"
        required
        className="w-full border border-gray-400 px-4 py-3 text-sm outline-none focus:border-gray-600"
      />

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

      <div className="flex justify-between items-center">
        <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
          <input
            type="checkbox"
            checked={lembrar}
            onChange={() => setLembrar(!lembrar)}
            className="accent-purple-600"
          />
          Lembrar meus dados
        </label>
        <a href="#" className="text-sm text-purple-600 hover:underline">
          Esqueci minha senha
        </a>
      </div>

      <p className="text-sm text-gray-600">
        Não tem conta?{" "}
        <button
          type="button"
          onClick={onSwitchToCadastro}
          className="text-purple-600 hover:underline cursor-pointer"
        >
          Cadastrar
        </button>
      </p>

      <button
        type="submit"
        className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-sm transition-colors cursor-pointer"
      >
        ENTRAR
      </button>
    </form>
  );
}
