import { IoChevronForward } from "react-icons/io5";
import IntelCard from "../assets/intelCard.png";
import BrandCard from "./home/BrandCard";

const brands = [
  { id: 1, name: "INTEL", image: IntelCard },
  { id: 2, name: "INTEL", image: IntelCard },
  { id: 3, name: "INTEL", image: IntelCard },
  { id: 4, name: "INTEL", image: IntelCard },
  { id: 5, name: "INTEL", image: IntelCard },
];

export default function BrandRow() {
  return (
    <div className="bg-white rounded-xl p-4 mb-4">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Marcas</h2>
      <div className="relative flex items-center">
        <div className="flex gap-4 overflow-x-auto scrollbar-hide">
          {brands.map((brand) => (
            <BrandCard key={brand.id} name={brand.name} image={brand.image} />
          ))}
        </div>
        <button className="absolute right-6 bg-white shadow rounded-full p-2 ml-2 cursor-pointer">
          <IoChevronForward size={22} className="text-gray-600" />
        </button>
      </div>
    </div>
  );
}
