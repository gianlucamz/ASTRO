import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import WishlistItem from "../components/wishlist/WishListItem";
import WishlistSummary from "../components/wishlist/WishListSummary";
import AuthModal from "../components/login/AuthModal";

export default function Wishlist() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [wishlist, setWishlist] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAuth, setShowAuth] = useState(false);

  const fetchWishlist = useCallback(async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${import.meta.env.VITE_API_URL}/wishlist`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setWishlist(data);
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }
    fetchWishlist().finally(() => setLoading(false));
  }, [isAuthenticated, fetchWishlist]);

  async function handleRemove(itemId) {
    const token = localStorage.getItem("token");
    await fetch(`${import.meta.env.VITE_API_URL}/wishlist/items/${itemId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchWishlist();
  }

  const items = wishlist?.items ?? [];
  const total = items.reduce((sum, item) => sum + item.product.price, 0);

  if (loading)
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
      </div>
    );

  if (!isAuthenticated)
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-4">
        <p className="text-lg font-semibold text-gray-700">
          Faça login para ver sua lista de desejos
        </p>
        <button
          onClick={() => setShowAuth(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg text-sm cursor-pointer"
        >
          Entrar
        </button>
        {showAuth && <AuthModal onClose={() => setShowAuth(false)} />}
      </div>
    );

  if (items.length === 0)
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-4">
        <p className="text-lg font-semibold text-gray-700">
          Sua lista de desejos está vazia
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg text-sm cursor-pointer"
        >
          Explorar produtos
        </button>
      </div>
    );

  return (
    <div className="w-full px-16 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 ml-10">
        Lista de desejos
      </h1>
      <div className="flex gap-6 items-start">
        <div className="flex-1 flex flex-col gap-4">
          {items.map((item) => (
            <WishlistItem
              key={item.id}
              itemId={item.id}
              image={item.product.imageUrl}
              name={item.product.name}
              price={item.product.price}
              rating={item.product.averageRating ?? 0}
              slug={item.product.slug}
              addedAt={new Date(
                item.wishlist?.createdAt ?? Date.now(),
              ).toLocaleDateString("pt-BR", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
              onRemove={handleRemove}
            />
          ))}
        </div>
        <WishlistSummary total={total} totalItems={items.length} />
      </div>
    </div>
  );
}
