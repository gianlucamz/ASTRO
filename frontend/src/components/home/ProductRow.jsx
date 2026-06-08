import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
import { IoChevronForward, IoChevronBack } from "react-icons/io5";

export default function ProductRow({ fileira, title }) {
  const [products, setProducts] = useState([]);
  const [inicio, setInicio] = useState(0);

  // Quantidade visível só se aplica no desktop (botões nav)
  const visiveis = 5;

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/products?fileira=${fileira}`)
      .then((r) => r.json())
      .then(setProducts)
      .catch(console.error);
  }, [fileira]);

  if (products.length === 0) return null;

  function avancar() {
    if (inicio + visiveis < products.length) setInicio(inicio + visiveis);
  }

  function voltar() {
    if (inicio > 0) setInicio(Math.max(0, inicio - visiveis));
  }

  return (
    <div className="bg-white rounded-xl p-4 mb-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base md:text-xl font-bold text-gray-900">{title}</h2>
      </div>

      {/* Mobile e tablet: scroll nativo */}
      <div className="lg:hidden overflow-x-auto -mx-4 px-4" style={{ WebkitOverflowScrolling: "touch" }}>
        <div className="flex gap-3 pb-2" style={{ width: "max-content" }}>
          {products.map((product) => (
            <ProductCard
              key={product.id}
              image={product.imageUrl}
              name={product.name}
              price={product.price}
              slug={product.slug}
              className="min-w-[150px] max-w-[150px] md:min-w-[200px] md:max-w-[200px]"
            />
          ))}
        </div>
      </div>

      {/* Desktop: paginação com botões */}
      <div className="hidden lg:block relative">
        <div className="flex gap-4">
          {products.slice(inicio, inicio + visiveis).map((product) => (
            <ProductCard
              key={product.id}
              image={product.imageUrl}
              name={product.name}
              price={product.price}
              slug={product.slug}
              className="min-w-[260px] max-w-[260px]"
            />
          ))}
        </div>
        {inicio > 0 && (
          <button
            onClick={voltar}
            className="absolute -left-10 top-1/2 -translate-y-1/2 bg-white shadow rounded-full p-2 cursor-pointer"
          >
            <IoChevronBack size={24} className="text-gray-600" />
          </button>
        )}
        {inicio + visiveis < products.length && (
          <button
            onClick={avancar}
            className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white shadow rounded-full p-2 cursor-pointer"
          >
            <IoChevronForward size={24} className="text-gray-600" />
          </button>
        )}
      </div>
    </div>
  );
}