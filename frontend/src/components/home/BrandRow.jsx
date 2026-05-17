import { useState } from "react";
import { IoChevronForward, IoChevronBack } from "react-icons/io5";
import IntelCard from "../../assets/intelCard.png";
import BrandCard from "./BrandCard";

const brands = [
  { id: 1, name: "INTEL", image: IntelCard },
  { id: 2, name: "INTEL", image: IntelCard },
  { id: 3, name: "INTEL", image: IntelCard },
  { id: 4, name: "INTEL", image: IntelCard },
  { id: 5, name: "INTEL", image: IntelCard },
  { id: 6, name: "INTEL", image: IntelCard },
  { id: 7, name: "INTEL", image: IntelCard },
  { id: 8, name: "INTEL", image: IntelCard },
];

export default function BrandRow() {
  const [inicio, setInicio] = useState(0);
  const visiveis = 5;

  function avancar() {
    if (inicio + visiveis < brands.length) {
      setInicio(inicio + 3);
    }
  }

  function voltar() {
    if (inicio > 0) {
      setInicio(inicio - 3);
    }
  }

  const brandsVisiveis = brands.slice(inicio, inicio + visiveis);

  return (
    <div className="bg-white rounded-xl p-4 mb-4">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Marcas</h2>
      <div className="relative flex items-center">
        <div className="flex gap-4 overflow-x-auto scrollbar-hide">
          {brandsVisiveis.map((brand) => (
            <BrandCard key={brand.id} name={brand.name} image={brand.image} />
          ))}
        </div>
        {inicio > 0 && (
          <button
            onClick={voltar}
            className="absolute -left-14 bg-white shadow rounded-full p-2 cursor-pointer"
          >
            <IoChevronBack size={22} className="text-gray-600" />
          </button>
        )}
        {inicio + visiveis < brands.length && (
          <button
            onClick={avancar}
            className="absolute right-6 bg-white shadow rounded-full p-2 ml-2 cursor-pointer"
          >
            <IoChevronForward size={22} className="text-gray-600" />
          </button>
        )}
      </div>
    </div>
  );
}
