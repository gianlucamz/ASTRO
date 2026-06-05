import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import {
  FaStar,
  FaStarHalfAlt,
  FaShoppingCart,
  FaThumbsUp,
} from "react-icons/fa";
import { IoAlertCircleOutline } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";

const FILEIRA_LABELS = {
  destaques: "Destaques",
  promocoes: "Promoções",
  hardware: "Hardware",
  perifericos: "Periféricos",
  computadores: "Computadores",
  smartphones: "Smartphones",
  games: "Games",
  diversos: "Diversos",
};

function getFileira(product) {
  return Object.keys(FILEIRA_LABELS).find((k) => product[k]) || null;
}

const REVIEWS = [
  {
    nome: "Lucas Almeida",
    texto:
      "Produto excelente! Atendeu todas as minhas expectativas. Entrega rápida e bem embalado.",
  },
  {
    nome: "Rafael Costa",
    texto:
      "Ótima qualidade pelo preço. Recomendo para quem está buscando um bom custo-benefício.",
  },
  {
    nome: "Bruno Martins",
    texto:
      "Muito satisfeito com a compra. Produto chegou rápido e funcionou perfeitamente.",
  },
];

export default function BuyCard() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    setLoading(true);
    setNotFound(false);

    fetch(`${import.meta.env.VITE_API_URL}/products/${slug}`)
      .then((r) => {
        if (!r.ok) {
          setNotFound(true);
          setLoading(false);
          return null;
        }
        return r.json();
      })
      .then((data) => {
        if (!data) return;
        setProduct(data);
        setLoading(false);

        const fileira = getFileira(data);
        if (fileira) {
          fetch(`${import.meta.env.VITE_API_URL}/products?fileira=${fileira}`)
            .then((r) => r.json())
            .then((items) =>
              setRelated(items.filter((p) => p.slug !== slug).slice(0, 6)),
            )
            .catch(() => {});
        }
      })
      .catch(() => {
        setNotFound(true);
        setLoading(false);
      });
  }, [slug]);

  async function handleDelete() {
    setDeleting(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/products/${product.id}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (res.ok) navigate("/");
    } catch {
      setDeleting(false);
    }
  }

  if (loading)
    return (
      <div className="max-w-7xl mx-auto p-6 flex items-center justify-center h-96">
        <div className="flex flex-col items-center gap-3 text-gray-400">
          <div className="w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
          <span className="text-sm">Carregando produto...</span>
        </div>
      </div>
    );

  if (notFound || !product)
    return (
      <div className="max-w-7xl mx-auto p-6 flex items-center justify-center h-96">
        <div className="flex flex-col items-center gap-3 text-gray-500">
          <IoAlertCircleOutline size={48} className="text-gray-300" />
          <p className="text-lg font-semibold">Produto não encontrado</p>
          <button
            onClick={() => navigate("/")}
            className="mt-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg text-sm cursor-pointer"
          >
            Voltar para a home
          </button>
        </div>
      </div>
    );

  const fileira = getFileira(product);
  const parcela = (product.price / 12).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* BARRA ADMIN */}
      {user?.role === "admin" && (
        <div className="flex items-center justify-between bg-gray-50 border border-gray-200 rounded-xl px-5 py-3 mb-6">
          <span className="text-sm text-gray-500">
            Visualizando como{" "}
            <span className="font-semibold text-gray-700">administrador</span>
          </span>
          <div className="flex gap-3">
            <button
              onClick={() => navigate(`/admin/produto/editar/${product.id}`)}
              className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50 font-semibold px-4 py-2 rounded-lg text-sm cursor-pointer transition-colors"
            >
              Editar produto
            </button>
            <button
              onClick={() => setConfirmDelete(true)}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg text-sm cursor-pointer transition-colors"
            >
              Deletar produto
            </button>
          </div>
        </div>
      )}

      {/* MODAL DE CONFIRMAÇÃO DE DELETE */}
      {confirmDelete && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-sm flex flex-col gap-4">
            <h2 className="text-lg font-bold text-gray-900">Deletar produto</h2>
            <p className="text-sm text-gray-600">
              Tem certeza que deseja deletar{" "}
              <span className="font-semibold">"{product.name}"</span>? Essa ação
              não pode ser desfeita.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setConfirmDelete(false)}
                className="flex-1 border-2 border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-2 rounded-lg cursor-pointer transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg cursor-pointer transition-colors disabled:opacity-60"
              >
                {deleting ? "Deletando..." : "Deletar"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* BREADCRUMB */}
      <div className="text-sm flex gap-2 mb-6 font-semibold">
        <span
          className="hover:underline cursor-pointer"
          onClick={() => navigate("/")}
        >
          Home
        </span>
        {fileira && (
          <>
            <span> &rsaquo; </span>
            <span className="hover:underline cursor-pointer capitalize">
              {FILEIRA_LABELS[fileira]}
            </span>
          </>
        )}
        <span> &rsaquo; </span>
        <span className="text-gray-400 font-normal truncate max-w-xs">
          {product.name}
        </span>
      </div>

      {/* TOPO */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* IMAGEM + DESCRIÇÃO + AVALIAÇÕES */}
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-center h-[350px] bg-gray-50 rounded-lg overflow-hidden">
            <img
              src={product.imageUrl || "/placeholder.png"}
              alt={product.name}
              className="w-full h-full object-contain rounded-lg"
            />
          </div>

          {/* DESCRIÇÃO */}
          <div className="flex flex-col gap-3 mt-4">
            <h2 className="text-lg font-bold uppercase">
              Descrição do Produto
            </h2>
            {product.description.split("\n").map((p, i) => (
              <p key={i} className="text-sm text-gray-700">
                {p}
              </p>
            ))}
          </div>

          {/* AVALIAÇÕES */}
          <div className="flex flex-col gap-4 mt-4">
            <h2 className="text-lg font-bold uppercase">Avaliações</h2>
            <div className="flex items-center gap-2">
              <span className="text-5xl font-bold">4.8</span>
              <div className="flex flex-col">
                <div className="flex gap-1">
                  {[...Array(4)].map((_, i) => (
                    <FaStar key={i} className="text-purple-600" />
                  ))}
                  <FaStarHalfAlt className="text-purple-600" />
                </div>
                <span className="text-sm text-gray-500">925 Avaliações</span>
              </div>
            </div>

            {REVIEWS.map((review, i) => (
              <div key={i} className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{review.nome}</span>
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, j) => (
                      <FaStar key={j} className="text-purple-600 text-sm" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-gray-700">{review.texto}</p>
                <div className="flex flex-col gap-1 max-w-28">
                  <button className="flex items-center gap-2 border rounded-full px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 cursor-pointer">
                    É útil <FaThumbsUp /> (0)
                  </button>
                </div>
              </div>
            ))}

            <span className="text-purple-600 text-sm cursor-pointer underline">
              Ver mais
            </span>
          </div>
        </div>

        {/* INFO */}
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-semibold">{product.name}</h1>

          <div className="flex items-center gap-1">
            {[...Array(4)].map((_, i) => (
              <FaStar key={i} className="text-purple-600" />
            ))}
            <FaStarHalfAlt className="text-purple-600" />
            <span className="text-sm ml-1">(925)</span>
          </div>

          {/* PREÇO */}
          <div className="flex flex-col">
            <span className="text-3xl font-bold text-purple-600">
              {product.price.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
            <span className="text-sm text-gray-500">À vista</span>
            <span className="text-sm text-gray-500">
              Em até 12X de {parcela} sem juros
            </span>
            <span
              className={`text-sm font-medium ${product.stock > 0 ? "text-purple-600" : "text-red-500"}`}
            >
              {product.stock > 0
                ? `Em estoque (${product.stock} unidades)`
                : "Fora de estoque"}
            </span>
          </div>

          {/* BOTÕES */}
          <div className="flex flex-col gap-3">
            <button
              disabled={product.stock === 0}
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg cursor-pointer"
            >
              Comprar agora
            </button>
            <button
              disabled={product.stock === 0}
              className="w-full border-2 border-purple-600 hover:bg-purple-50 disabled:opacity-50 disabled:cursor-not-allowed text-purple-600 font-semibold py-3 rounded-lg cursor-pointer"
            >
              <div className="flex items-center justify-center gap-2">
                <FaShoppingCart /> Adicionar ao carrinho
              </div>
            </button>
          </div>

          {/* FRETE */}
          <div className="flex flex-col gap-2">
            <span className="font-bold uppercase">Consulte seu frete</span>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Insira seu CEP*"
                className="border rounded-lg px-3 py-2 w-full text-sm"
              />
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg cursor-pointer">
                <FaSearch />
              </button>
            </div>
            <span className="text-purple-600 text-sm cursor-pointer underline">
              Não lembro meu CEP
            </span>
            <div className="flex items-center gap-1">
              <IoAlertCircleOutline
                size={22}
                className="text-gray-800 shrink-0"
              />
              <span className="text-md">
                Frete grátis para todo o litoral norte
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* PRODUTOS RELACIONADOS */}
      {related.length > 0 && (
        <div className="mt-10">
          <h2 className="text-lg font-bold uppercase mb-6">
            Produtos Relacionados
          </h2>
          <div className="grid grid-cols-6 gap-4">
            {related.map((p) => (
              <div
                key={p.id}
                onClick={() => navigate(`/product/${p.slug}`)}
                className="flex flex-col gap-2 cursor-pointer rounded-lg p-3 shadow-md hover:shadow-xl transition-shadow"
              >
                <div className="h-28 flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden">
                  <img
                    src={p.imageUrl || "/placeholder.png"}
                    alt={p.name}
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="text-xs text-gray-700 font-semibold line-clamp-2">
                  {p.name}
                </p>
                <span className="text-sm font-bold text-black">
                  {p.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
