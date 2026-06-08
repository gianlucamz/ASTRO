import { useState, useEffect, useCallback } from "react";
import ProductCard from "./ProductCard";
import WishlistToast from "./WishListToast";
import { IoChevronForward, IoChevronBack } from "react-icons/io5";

export default function ProductRow({ fileira, title }) {
  const [products, setProducts] = useState([]);
  const [inicio, setInicio] = useState(0);
  const [toast, setToast] = useState(null);
  const visiveis = 5;

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/products?fileira=${fileira}`)
      .then((r) => r.json())
      .then(setProducts)
      .catch(console.error);
  }, [fileira]);

  const handleWishlistAdd = useCallback((name, type) => {
    setToast({ name, type, key: Date.now() });
  }, []);

  if (products.length === 0) return null;

  const produtosVisiveis = products.slice(inicio, inicio + visiveis);

  function avancar() {
    if (inicio + visiveis < products.length) setInicio(inicio + visiveis);
  }

  function voltar() {
    if (inicio > 0) setInicio(Math.max(0, inicio - visiveis));
  }

  return (
    <>
      <div className="bg-white rounded-xl p-4 mb-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
        </div>
        <div className="relative flex items-center">
          <div className="flex gap-4 overflow-x-auto scrollbar-hide">
            {produtosVisiveis.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                image={product.imageUrl}
                name={product.name}
                price={product.price}
                slug={product.slug}
                onWishlistAdd={handleWishlistAdd}
              />
            ))}
          </div>
          {inicio > 0 && (
            <button
              onClick={voltar}
              className="absolute -left-14 bg-white shadow rounded-full p-2 cursor-pointer"
            >
              <IoChevronBack size={24} className="text-gray-600" />
            </button>
          )}
          {inicio + visiveis < products.length && (
            <button
              onClick={avancar}
              className="absolute right-6 bg-white shadow rounded-full p-2 ml-2 cursor-pointer"
            >
              <IoChevronForward size={24} className="text-gray-600" />
            </button>
          )}
        </div>
      </div>

      {toast && (
        <WishlistToast
          key={toast.key}
          message={toast.name}
          type={toast.type}
          onDone={() => setToast(null)}
        />
      )}
    </>
  );
}
