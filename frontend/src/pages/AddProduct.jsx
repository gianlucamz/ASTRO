import { useState } from "react";
import { useNavigate } from "react-router-dom";

const FILEIRAS = [
  { key: "destaques", label: "Destaques" },
  { key: "promocoes", label: "Promoções" },
  { key: "hardware", label: "Hardware" },
  { key: "perifericos", label: "Periféricos" },
  { key: "computadores", label: "Computadores" },
  { key: "smartphones", label: "Smartphones" },
  { key: "games", label: "Games" },
  { key: "diversos", label: "Diversos" },
];

function generateSlug(name) {
  return name
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function ProductPreview({ form }) {
  const fileirasAtivas = FILEIRAS.filter(({ key }) => form[key]);
  const hasImage = form.imageUrl?.startsWith("http");
  const price = Number(form.price);
  const parcela = price
    ? (price / 12).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
      })
    : null;

  return (
    <div className="sticky top-24 flex flex-col gap-4">
      <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
        Prévia do produto
      </p>

      {/* Card */}
      <div className="bg-white rounded-lg p-3 shadow-md w-full">
        <div className="bg-gray-50 rounded-lg mb-3 flex items-center justify-center h-[210px] overflow-hidden">
          {hasImage ? (
            <img
              src={form.imageUrl}
              alt="prévia"
              className="object-contain h-full w-full rounded-lg"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          ) : (
            <span className="text-sm text-gray-300">Sem imagem</span>
          )}
        </div>
        <p className="text-sm text-gray-800 leading-snug line-clamp-3 mb-2 font-semibold">
          {form.name || <span className="text-gray-300">Nome do produto</span>}
        </p>
        {price > 0 ? (
          <div className="flex flex-col">
            <span className="text-lg font-bold text-gray-900">
              {price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
            <span className="text-xs text-gray-400">
              12x de {parcela} sem juros
            </span>
          </div>
        ) : (
          <span className="text-sm text-gray-300">Preço não informado</span>
        )}
      </div>

      {/* Fileiras ativas */}
      <div className="flex flex-col gap-2">
        <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
          Fileiras ativas
        </p>
        {fileirasAtivas.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {fileirasAtivas.map(({ key, label }) => (
              <span
                key={key}
                className="bg-purple-50 border border-purple-300 text-purple-700 text-xs font-medium px-3 py-1 rounded-full"
              >
                {label}
              </span>
            ))}
          </div>
        ) : (
          <span className="text-xs text-gray-300">
            Nenhuma fileira selecionada
          </span>
        )}
        {form.destaques && (
          <p className="text-xs text-purple-500">
            Com "Destaques" ativo, o produto aparecerá apenas nessa fileira.
          </p>
        )}
      </div>

      {/* Estoque */}
      {form.stock !== "" && (
        <span
          className={`text-xs font-medium ${
            Number(form.stock) > 0 ? "text-purple-600" : "text-red-500"
          }`}
        >
          {Number(form.stock) > 0
            ? `Em estoque (${form.stock} unidades)`
            : "Fora de estoque"}
        </span>
      )}
    </div>
  );
}

export default function AddProduct() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    imageUrl: "",
    slug: "",
    destaques: false,
    promocoes: false,
    hardware: false,
    perifericos: false,
    computadores: false,
    smartphones: false,
    games: false,
    diversos: false,
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "name" && { slug: generateSlug(value) }),
    }));
  }

  function toggleFileira(key) {
    setForm((prev) => ({ ...prev, [key]: !prev[key] }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`${import.meta.env.VITE_API_URL}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...form,
          price: Number(form.price),
          stock: Number(form.stock) || 0,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Erro ao cadastrar produto");
      }

      setSuccess(true);
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">
        Adicionar produto
      </h1>

      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
          Produto cadastrado com sucesso! Redirecionando...
        </div>
      )}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10">
        {/* FORMULÁRIO */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nome do produto *
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-purple-400"
              placeholder="Ex: Placa de Vídeo RTX 4070"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Slug
            </label>
            <input
              name="slug"
              value={form.slug}
              onChange={handleChange}
              required
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm text-gray-500 focus:outline-none focus:border-purple-400"
              placeholder="gerado automaticamente"
            />
            <p className="text-xs text-gray-400 mt-1">
              Gerado a partir do nome. Edite se necessário.
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descrição *
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              rows={3}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-purple-400 resize-none"
              placeholder="Descreva o produto..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Preço (R$) *
              </label>
              <input
                name="price"
                type="number"
                step="0.01"
                min="0"
                value={form.price}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-purple-400"
                placeholder="0,00"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Estoque
              </label>
              <input
                name="stock"
                type="number"
                min="0"
                value={form.stock}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-purple-400"
                placeholder="0"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              URL da imagem
            </label>
            <input
              name="imageUrl"
              value={form.imageUrl}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-purple-400"
              placeholder="https://..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Fileiras
            </label>
            <div className="grid grid-cols-2 gap-2">
              {FILEIRAS.map(({ key, label }) => (
                <button
                  type="button"
                  key={key}
                  onClick={() => toggleFileira(key)}
                  className={`flex items-center justify-between px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                    form[key]
                      ? "bg-purple-50 border-purple-400 text-purple-700"
                      : "bg-white border-gray-300 text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {label}
                  <span
                    className={`w-3 h-3 rounded-full transition-colors ${
                      form[key] ? "bg-purple-500" : "bg-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg text-sm transition-colors disabled:opacity-60 cursor-pointer"
          >
            {loading ? "Cadastrando..." : "Cadastrar produto"}
          </button>
        </form>

        {/* PRÉVIA */}
        <ProductPreview form={form} />
      </div>
    </div>
  );
}
