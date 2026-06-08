import { useNavigate } from "react-router-dom";
import { IoCloseCircleOutline } from "react-icons/io5";
import StarDisplay from "../shared/StarDisplay";

export default function WishlistItem({
  itemId,
  image,
  name,
  price,
  rating,
  addedAt,
  slug,
  onRemove,
}) {
  const navigate = useNavigate();

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 flex gap-4 items-center relative">
      <button
        onClick={() => onRemove(itemId)}
        className="absolute top-4 right-4 text-gray-400 hover:text-red-500 cursor-pointer transition-colors"
      >
        <IoCloseCircleOutline size={22} />
      </button>

      <img
        src={image || "/placeholder.png"}
        alt={name}
        className="w-32 h-32 object-contain rounded-lg bg-gray-50 shrink-0"
      />

      <div className="flex-1 flex flex-col gap-1">
        <p className="font-bold text-gray-900 leading-snug pr-6">{name}</p>
        <StarDisplay rating={rating ?? 0} />
        <p className="text-xs text-gray-400 mt-1">Adicionado em {addedAt}</p>
      </div>

      <div className="flex flex-col items-end gap-3 shrink-0 mt-6">
        <p className="text-lg font-bold text-gray-900 mt-6">
          {price.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </p>
        <button
          onClick={() => navigate(`/product/${slug}`)}
          className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold px-8 py-2 rounded-lg transition-colors cursor-pointer"
        >
          Comprar
        </button>
      </div>
    </div>
  );
}
