import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

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

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
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

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/products/id/${id}`, 
        );
        if (!res.ok) throw new Error("Produto não encontrado");

        const data = await res.json();
        setForm({
          name: data.name ?? "",
          description: data.description ?? "",
          price: data.price ?? "",
          stock: data.stock ?? "",
          imageUrl: data.imageUrl ?? "",
          slug: data.slug ?? "",
          destaques: data.destaques ?? false,
          promocoes: data.promocoes ?? false,
          hardware: data.hardware ?? false,
          perifericos: data.perifericos ?? false,
          computadores: data.computadores ?? false,
          smartphones: data.smartphones ?? false,
          games: data.games ?? false,
          diversos: data.diversos ?? false,
        });
      } catch (err) {
        setError(err.message);
      } finally {
        setFetching(false);
      }
    }

    fetchProduct();
  }, [id]);

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
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/products/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...form,
            price: Number(form.price),
            stock: Number(form.stock) || 0,
          }),
        },
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Erro ao atualizar produto");
      }

      setSuccess(true);
      setTimeout(() => navigate("/"), 2000);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (fetching) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-10 text-sm text-gray-500">
        Carregando produto...
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Editar produto</h1>

      {success && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm">
          Produto atualizado com sucesso! Redirecionando...
        </div>
      )}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {/* Nome */}
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

        {/* Slug */}
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
          />
          <p className="text-xs text-gray-400 mt-1">
            Gerado a partir do nome. Edite se necessário.
          </p>
        </div>

        {/* Descrição */}
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
          />
        </div>

        {/* Preço + Estoque */}
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
            />
          </div>
        </div>

        {/* URL da imagem */}
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

        {/* Fileiras */}
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
          {form.destaques && (
            <p className="text-xs text-purple-500 mt-2">
              Com "Destaques" ativo, o produto aparecerá apenas nessa fileira.
            </p>
          )}
        </div>

        <div className="flex gap-3 mt-2">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex-1 border border-gray-300 text-gray-700 font-semibold py-3 rounded-lg text-sm hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg text-sm transition-colors disabled:opacity-60 cursor-pointer"
          >
            {loading ? "Salvando..." : "Salvar alterações"}
          </button>
        </div>
      </form>
    </div>
  );
}
