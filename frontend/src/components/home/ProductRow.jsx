import { useState } from "react";
import ProductCard from "./ProductCard";
import { IoChevronForward, IoChevronBack } from "react-icons/io5";
import PlacaDeVideo from "../../assets/placaDeVideo.png";

export default function ProductRow({ title }) {
  const [inicio, setInicio] = useState(0);
  const visiveis = 5;

  const products = [
    {
      id: 1,
      name: "Placa de Vídeo RX 7600 GAMING OC 8G AMD Radeon Gigabyte,8GB...",
      price: 1699.99,
      image: PlacaDeVideo,
    },
    {
      id: 2,
      name: "Placa de Vídeo RX 7600 GAMING OC 8G AMD Radeon Gigabyte,8GB...",
      price: 1699.99,
      image: PlacaDeVideo,
    },
    {
      id: 3,
      name: "Placa de Vídeo RX 7600 GAMING OC 8G AMD Radeon Gigabyte,8GB...",
      price: 1699.99,
      image: PlacaDeVideo,
    },
    {
      id: 4,
      name: "Placa de Vídeo RX 7600 GAMING OC 8G AMD Radeon Gigabyte,8GB...",
      price: 1699.99,
      image: PlacaDeVideo,
    },
    {
      id: 5,
      name: "Placa de Vídeo RX 7600 GAMING OC 8G AMD Radeon Gigabyte,8GB...",
      price: 1699.99,
      image: PlacaDeVideo,
    },
    {
      id: 6,
      name: "Placa de Vídeo RX 7600 GAMING OC 8G AMD Radeon Gigabyte,8GB...",
      price: 1699.99,
      image: PlacaDeVideo,
    },
    {
      id: 7,
      name: "Placa de Vídeo RX 7600 GAMING OC 8G AMD Radeon Gigabyte,8GB...",
      price: 1699.99,
      image: PlacaDeVideo,
    },
    {
      id: 8,
      name: "Placa de Vídeo RX 7600 GAMING OC 8G AMD Radeon Gigabyte,8GB...",
      price: 1699.99,
      image: PlacaDeVideo,
    },
  ];

  function avancar() {
    if (inicio + visiveis < products.length) {
      setInicio(inicio + 3);
    }
  }

  function voltar() {
    if (inicio > 0) {
      setInicio(inicio - 3);
    }
  }

  const produtosVisiveis = products.slice(inicio, inicio + visiveis);

  return (
    <div className="bg-white rounded-xl p-4 mb-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-900">{title}</h2>
      </div>
      <div className="relative flex items-center">
        <div className="flex gap-4 overflow-x-auto scrollbar-hide">
          {produtosVisiveis.map((product) => (
            <ProductCard
              key={product.id}
              image={product.image}
              name={product.name}
              price={product.price}
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
  );
}
