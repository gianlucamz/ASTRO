import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { FaShoppingCart } from "react-icons/fa";
import { IoAlertCircleOutline } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import AuthModal from "../components/login/AuthModal";
import ReviewSection from "../components/buycard/ReviewSection";
import StarDisplay from "../components/shared/StarDisplay";

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

export default function BuyCard() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const [reviewAverage, setReviewAverage] = useState(0);
  const [reviewTotal, setReviewTotal] = useState(0);

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

  async function handleAddToCart() {
    if (!isAuthenticated) return setShowAuth(true);

    setAddingToCart(true);
    try {
      const token = localStorage.getItem("token");
      await fetch(`${import.meta.env.VITE_API_URL}/cart/items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId: product.id, quantity: 1 }),
      });
      setAddedToCart(true);
      setTimeout(() => setAddedToCart(false), 2000);
    } finally {
      setAddingToCart(false);
    }
  }

  async function handleDelete() {
    setDeleting(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/products/${product.id}`,
        { method: "DELETE", headers: { Authorization: `Bearer ${token}` } },
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
                className="flex-1 border-2 border-gray-300 hover:bg-gray-50 text-gray-700 font-semibold py-2 rounded-lg cursor-pointer"
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-center h-[350px] bg-gray-50 rounded-lg overflow-hidden">
            <img
              src={product.imageUrl || "/placeholder.png"}
              alt={product.name}
              className="w-full h-full object-contain rounded-lg"
            />
          </div>

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

          <ReviewSection
            productId={product.id}
            onLoginRequest={() => setShowAuth(true)}
            onStatsChange={(avg, total) => {
              setReviewAverage(avg);
              setReviewTotal(total);
            }}
          />
        </div>

        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-semibold">{product.name}</h1>

          <StarDisplay rating={reviewAverage} size="text-lg" />

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

          <div className="flex flex-col gap-3">
            <button
              disabled={product.stock === 0}
              className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-lg cursor-pointer"
            >
              Comprar agora
            </button>
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0 || addingToCart}
              className="w-full border-2 border-purple-600 hover:bg-purple-50 disabled:opacity-50 disabled:cursor-not-allowed text-purple-600 font-semibold py-3 rounded-lg cursor-pointer transition-colors"
            >
              <div className="flex items-center justify-center gap-2">
                <FaShoppingCart />
                {addingToCart
                  ? "Adicionando..."
                  : addedToCart
                    ? "Adicionado ✓"
                    : "Adicionar ao carrinho"}
              </div>
            </button>
          </div>

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

      {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
    </div>
  );
}
