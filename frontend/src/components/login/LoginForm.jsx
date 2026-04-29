import { useState } from "react";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

export default function LoginForm({ onSwitchToCadastro, onClose }) {
  const [showPassword, setShowPassword] = useState(false);
  const [lembrar, setLembrar] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const response = await fetch("http://localhost:3333/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Erro ao fazer login");
        return;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      onClose();
    } catch {
      alert("Erro ao conectar com o servidor");
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
