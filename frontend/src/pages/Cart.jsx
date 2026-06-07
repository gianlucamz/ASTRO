import { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import CartItem from "../components/cart/CartItem";
import CartSummary from "../components/cart/CartSummary";
import AuthModal from "../components/login/AuthModal";

export default function Cart() {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showAuth, setShowAuth] = useState(false);

  const fetchCart = useCallback(async () => {
    const token = localStorage.getItem("token");
    const res = await fetch(`${import.meta.env.VITE_API_URL}/cart`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    setCart(data);
  }, []);

  useEffect(() => {
    if (!isAuthenticated) {
      setLoading(false);
      return;
    }
    fetchCart().finally(() => setLoading(false));
  }, [isAuthenticated, fetchCart]);

  async function handleQuantityChange(itemId, quantity) {
    const token = localStorage.getItem("token");
    await fetch(`${import.meta.env.VITE_API_URL}/cart/items/${itemId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ quantity }),
    });
    fetchCart();
  }

  async function handleRemove(itemId) {
    const token = localStorage.getItem("token");
    await fetch(`${import.meta.env.VITE_API_URL}/cart/items/${itemId}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchCart();
  }

  const items = cart?.items ?? [];
  const subtotal = items.reduce(
    (acc, item) => acc + item.product.price * item.quantity,
    0,
  );

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
          Faça login para ver seu carrinho
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
          Seu carrinho está vazio
        </p>
        <button
          onClick={() => navigate("/")}
          className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg text-sm cursor-pointer"
        >
          Continuar comprando
        </button>
      </div>
    );

  return (
    <div className="px-16 py-8 mb-22">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 ml-30">
        Meu carrinho
      </h1>
      <div className="flex justify-between items-start">
        <div className="flex-1 flex flex-col gap-4 mr-8">
          {items.map((item) => (
            <CartItem
              key={item.id}
              itemId={item.id}
              image={item.product.imageUrl}
              name={item.product.name}
              price={item.product.price}
              quantity={item.quantity}
              slug={item.product.slug}
              onRemove={handleRemove}
              onQuantityChange={handleQuantityChange}
            />
          ))}
        </div>
        <CartSummary subtotal={subtotal} total={subtotal} />
      </div>
    </div>
  );
}
