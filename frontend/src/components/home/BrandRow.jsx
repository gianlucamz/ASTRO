import { useState } from "react";
import { IoChevronForward, IoChevronBack } from "react-icons/io5";
import IntelCard from "../../assets/intelCard.png";
import BrandCard from "./BrandCard";

const brands = [
  { id: 1, name: "INTEL", image: IntelCard },
  { id: 2, name: "AMD", image: IntelCard },
  { id: 3, name: "Samsung", image: IntelCard },
  { id: 4, name: "Logitech", image: IntelCard },
  { id: 5, name: "Sony", image: IntelCard },
];

const visiveis = 5;

export default function BrandRow() {
  const [inicio, setInicio] = useState(0);

  function avancar() {
    if (inicio + visiveis < brands.length) setInicio(inicio + visiveis);
  }

  function voltar() {
    if (inicio > 0) setInicio(Math.max(0, inicio - visiveis));
  }

  return (
    <div className="bg-white rounded-xl p-4 mb-4">
      <h2 className="text-base md:text-xl font-bold text-gray-900 mb-4">Marcas</h2>

      {/* Mobile e tablet: scroll nativo */}
      <div className="lg:hidden">
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {brands.map((brand) => (
            <BrandCard
              key={brand.id}
              name={brand.name}
              image={brand.image}
              className="min-w-[130px] max-w-[130px] md:min-w-[180px] md:max-w-[180px]"
            />
          ))}
        </div>
      </div>

      {/* Desktop: paginação com botões */}
      <div className="hidden lg:block relative">
        <div className="flex gap-4">
          {brands.slice(inicio, inicio + visiveis).map((brand) => (
            <BrandCard key={brand.id} name={brand.name} image={brand.image} />
          ))}
        </div>
        {inicio > 0 && (
          <button
            onClick={voltar}
            className="absolute -left-10 top-1/2 -translate-y-1/2 bg-white shadow rounded-full p-2 cursor-pointer"
          >
            <IoChevronBack size={22} className="text-gray-600" />
          </button>
        )}
        {inicio + visiveis < brands.length && (
          <button
            onClick={avancar}
            className="absolute -right-4 top-1/2 -translate-y-1/2 bg-white shadow rounded-full p-2 cursor-pointer"
          >
            <IoChevronForward size={22} className="text-gray-600" />
          </button>
        )}
      </div>
    </div>
  );
}