import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IoStar, IoStarOutline } from "react-icons/io5";
import { useAuth } from "../../context/AuthContext";

export default function ProductCard({
  id,
  image,
  name,
  price,
  slug,
  className = "min-w-[260px] max-w-[260px]",
  onWishlistAdd,
}) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [wishlistItemId, setWishlistItemId] = useState(null);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) return;
    const token = localStorage.getItem("token");
    fetch(`${import.meta.env.VITE_API_URL}/wishlist`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((r) => r.json())
      .then((data) => {
        const found = data.items?.find((item) => item.product.id === id);
        setWishlistItemId(found?.id ?? null);
      })
      .catch(() => {});
  }, [isAuthenticated, id]);

  async function handleWishlist(e) {
    e.stopPropagation();
    if (!isAuthenticated || adding) return;

    setAdding(true);
    const token = localStorage.getItem("token");

    try {
      if (wishlistItemId) {
        await fetch(
          `${import.meta.env.VITE_API_URL}/wishlist/items/${wishlistItemId}`,
          {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        setWishlistItemId(null);
        onWishlistAdd?.(name, "removed");
      } else {
        const res = await fetch(
          `${import.meta.env.VITE_API_URL}/wishlist/items`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ productId: id }),
          },
        );
        const data = await res.json();
        const created = data.items?.find((item) => item.product.id === id);
        setWishlistItemId(created?.id ?? null);
        onWishlistAdd?.(name, "added");
      }
    } finally {
      setAdding(false);
    }
  }

  return (
    <div
      className={`relative bg-white rounded-lg p-3 cursor-pointer shadow-md hover:shadow-xl transition-shadow group ${className}`}
      onClick={() => navigate(`/product/${slug}`)}
    >
      {isAuthenticated && (
        <button
          onClick={handleWishlist}
          className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 p-2 cursor-pointer"
          title={
            wishlistItemId
              ? "Remover da lista de desejos"
              : "Adicionar à lista de desejos"
          }
        >
          {wishlistItemId ? (
            <IoStar size={26} className="text-purple-600 drop-shadow" />
          ) : (
            <IoStarOutline size={26} className="text-purple-600 drop-shadow" />
          )}
        </button>
      )}

      <div className="bg-white rounded-lg mb-3 flex items-center justify-center h-[210px]">
        <img
          src={image}
          alt={name}
          className="object-contain h-full w-full rounded-lg"
        />
      </div>
      <p className="text-sm text-gray-800 leading-snug line-clamp-3 mb-2 font-semibold">
        {name}
      </p>
      <p className="text-lg font-bold text-gray-900">
        {price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
      </p>
    </div>
  );
}
