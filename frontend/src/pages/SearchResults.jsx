import { useSearchParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { IoAlertCircleOutline } from "react-icons/io5";
import ProductCard from "../components/home/ProductCard";

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const query = searchParams.get("q") || "";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) return;

    setLoading(true);
    fetch(
      `${import.meta.env.VITE_API_URL}/products?search=${encodeURIComponent(query)}`,
    )
      .then((r) => r.json())
      .then(setProducts)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="mb-8">
        <p className="text-sm text-gray-400 mb-1">
          {!loading &&
            `${products.length} resultado${products.length !== 1 ? "s" : ""} encontrado${products.length !== 1 ? "s" : ""}`}
        </p>
        <h1 className="text-2xl font-bold text-gray-900">
          Resultados para <span className="text-purple-600">"{query}"</span>
        </h1>
      </div>

      {loading && (
        <div className="flex items-center justify-center h-64">
          <div className="flex flex-col items-center gap-3 text-gray-400">
            <div className="w-10 h-10 border-4 border-purple-600 border-t-transparent rounded-full animate-spin" />
            <span className="text-sm">Buscando produtos...</span>
          </div>
        </div>
      )}

      {!loading && products.length === 0 && (
        <div className="flex flex-col items-center justify-center h-64 gap-3 text-gray-400">
          <IoAlertCircleOutline size={48} className="text-gray-300" />
          <p className="text-lg font-semibold text-gray-500">
            Nenhum produto encontrado
          </p>
          <p className="text-sm">Tente buscar por outro termo</p>
          <button
            onClick={() => navigate("/")}
            className="mt-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg text-sm cursor-pointer"
          >
            Voltar para a home
          </button>
        </div>
      )}

      {!loading && products.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              image={product.imageUrl}
              name={product.name}
              price={product.price}
              slug={product.slug}
              className="w-full" 
            />
          ))}
        </div>
      )}
    </div>
  );
}
