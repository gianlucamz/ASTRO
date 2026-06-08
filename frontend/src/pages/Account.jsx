import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";

export default function MinhaConta() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [form, setForm] = useState({
    name: user?.name ?? "",
    email: user?.email ?? "",
    telefone: user?.telefone ?? "",
    nascimento: user?.nascimento ?? "",
    cpf: user?.cpf ?? "",
    cnpj: user?.cnpj ?? "",
  });

  const [senha, setSenha] = useState({ nova: "", confirmar: "" });
  const [showNova, setShowNova] = useState(false);
  const [showConfirmar, setShowConfirmar] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const [savingInfo, setSavingInfo] = useState(false);
  const [savingSenha, setSavingSenha] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const [infoMsg, setInfoMsg] = useState(null);
  const [senhaMsg, setSenhaMsg] = useState(null);

  const token = localStorage.getItem("token");

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSaveInfo(e) {
    e.preventDefault();
    setSavingInfo(true);
    setInfoMsg(null);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/users/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        },
      );
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Erro ao salvar");
      }
      setInfoMsg({
        type: "success",
        text: "Informações atualizadas com sucesso!",
      });
    } catch (err) {
      setInfoMsg({ type: "error", text: err.message });
    } finally {
      setSavingInfo(false);
    }
  }

  async function handleSaveSenha(e) {
    e.preventDefault();
    setSenhaMsg(null);

    if (!senha.nova.trim())
      return setSenhaMsg({ type: "error", text: "Digite a nova senha" });
    if (senha.nova !== senha.confirmar)
      return setSenhaMsg({ type: "error", text: "As senhas não coincidem" });
    if (senha.nova.length < 8)
      return setSenhaMsg({
        type: "error",
        text: "A senha deve ter ao menos 8 caracteres",
      });
    if (!/[A-Z]/.test(senha.nova))
      return setSenhaMsg({
        type: "error",
        text: "A senha deve ter ao menos 1 letra maiúscula",
      });
    if (!/[0-9]/.test(senha.nova))
      return setSenhaMsg({
        type: "error",
        text: "A senha deve ter ao menos 1 número",
      });
    if (!/[^A-Za-z0-9]/.test(senha.nova))
      return setSenhaMsg({
        type: "error",
        text: "A senha deve ter ao menos 1 caractere especial",
      });

    setSavingSenha(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/users/${user.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ password: senha.nova }),
        },
      );
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Erro ao salvar");
      }
      setSenha({ nova: "", confirmar: "" });
      setSenhaMsg({ type: "success", text: "Senha alterada com sucesso!" });
    } catch (err) {
      setSenhaMsg({ type: "error", text: err.message });
    } finally {
      setSavingSenha(false);
    }
  }

  async function handleDelete() {
    setDeleting(true);
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/auth/users/${user.id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (res.ok) {
        logout();
        navigate("/");
      }
    } catch {
      setDeleting(false);
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Minha conta</h1>

      <section className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <h2 className="text-base font-semibold text-gray-800 mb-5">
          Informações pessoais
        </h2>
        <form onSubmit={handleSaveInfo} className="flex flex-col gap-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nome
              </label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-purple-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                E-mail
              </label>
              <input
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-purple-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Telefone
              </label>
              <input
                name="telefone"
                value={form.telefone}
                onChange={handleChange}
                placeholder="(00) 00000-0000"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-purple-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Data de nascimento
              </label>
              <input
                name="nascimento"
                type="date"
                value={form.nascimento}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-purple-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CPF
              </label>
              <input
                name="cpf"
                value={form.cpf}
                onChange={handleChange}
                placeholder="000.000.000-00"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-purple-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                CNPJ
              </label>
              <input
                name="cnpj"
                value={form.cnpj}
                onChange={handleChange}
                placeholder="00.000.000/0000-00"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-purple-400"
              />
            </div>
          </div>

          {infoMsg && (
            <p
              className={`text-sm ${infoMsg.type === "success" ? "text-green-600" : "text-red-500"}`}
            >
              {infoMsg.text}
            </p>
          )}

          <button
            type="submit"
            disabled={savingInfo}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors disabled:opacity-60 cursor-pointer"
          >
            {savingInfo ? "Salvando..." : "Salvar alterações"}
          </button>
        </form>
      </section>

      <section className="bg-white border border-gray-200 rounded-xl p-6 mb-6">
        <h2 className="text-base font-semibold text-gray-800 mb-5">
          Alterar senha
        </h2>
        <form onSubmit={handleSaveSenha} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nova senha
            </label>
            <div className="relative">
              <input
                type={showNova ? "text" : "password"}
                value={senha.nova}
                onChange={(e) =>
                  setSenha((prev) => ({ ...prev, nova: e.target.value }))
                }
                placeholder="Mín. 8 caracteres, maiúscula, número e especial"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:border-purple-400"
              />
              <button
                type="button"
                onClick={() => setShowNova((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                {showNova ? (
                  <IoEyeOffOutline size={18} />
                ) : (
                  <IoEyeOutline size={18} />
                )}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirmar nova senha
            </label>
            <div className="relative">
              <input
                type={showConfirmar ? "text" : "password"}
                value={senha.confirmar}
                onChange={(e) =>
                  setSenha((prev) => ({ ...prev, confirmar: e.target.value }))
                }
                placeholder="Repita a senha"
                className="w-full border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:border-purple-400"
              />
              <button
                type="button"
                onClick={() => setShowConfirmar((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer"
              >
                {showConfirmar ? (
                  <IoEyeOffOutline size={18} />
                ) : (
                  <IoEyeOutline size={18} />
                )}
              </button>
            </div>
          </div>

          {senhaMsg && (
            <p
              className={`text-sm ${senhaMsg.type === "success" ? "text-green-600" : "text-red-500"}`}
            >
              {senhaMsg.text}
            </p>
          )}

          <button
            type="submit"
            disabled={savingSenha}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2.5 rounded-lg text-sm transition-colors disabled:opacity-60 cursor-pointer"
          >
            {savingSenha ? "Salvando..." : "Alterar senha"}
          </button>
        </form>
      </section>

      <section className="bg-white border border-red-200 rounded-xl p-6">
        <h2 className="text-base font-semibold text-red-600 mb-1">
          Zona de perigo
        </h2>
        <p className="text-sm text-gray-500 mb-4">
          Ao deletar sua conta todos os seus dados serão removidos
          permanentemente.
        </p>
        <button
          onClick={() => setConfirmDelete(true)}
          className="border-2 border-red-500 text-red-500 hover:bg-red-50 font-semibold px-6 py-2 rounded-lg text-sm transition-colors cursor-pointer"
        >
          Deletar minha conta
        </button>
      </section>

      {confirmDelete && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-sm flex flex-col gap-4">
            <h2 className="text-lg font-bold text-gray-900">Deletar conta</h2>
            <p className="text-sm text-gray-600">
              Tem certeza? Essa ação é irreversível e todos os seus dados serão
              apagados.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmDelete(false)}
                className="flex-1 border border-gray-300 text-gray-700 font-semibold py-2 rounded-lg hover:bg-gray-50 cursor-pointer"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg cursor-pointer disabled:opacity-60"
              >
                {deleting ? "Deletando..." : "Deletar"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
