import { useNavigate } from "react-router-dom";
import { IoStar, IoStarHalf, IoStarOutline, IoCloseCircleOutline } from "react-icons/io5";

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => {
        if (rating >= star) return <IoStar key={star} size={16} className="text-purple-600" />;
        if (rating >= star - 0.5) return <IoStarHalf key={star} size={16} className="text-purple-600" />;
        return <IoStarOutline key={star} size={16} className="text-purple-600" />;
      })}
    </div>
  );
}

export default function WishlistItem({ itemId, image, name, price, rating, addedAt, slug, onRemove }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 flex gap-4 relative">
      <button
        onClick={() => onRemove(itemId)}
        className="absolute top-4 right-4 text-gray-400 hover:text-red-500 cursor-pointer transition-colors"
      >
        <IoCloseCircleOutline size={22} />
      </button>

      <img
        src={image || "/placeholder.png"}
        alt={name}
        className="w-24 h-24 md:w-32 md:h-32 object-contain rounded-lg bg-gray-50 shrink-0"
      />

      <div className="flex-1 min-w-0 flex flex-col gap-1 pr-6">
        <p className="font-bold text-gray-900 leading-snug text-sm md:text-base line-clamp-3">{name}</p>
        <StarRating rating={rating ?? 0} />
        <p className="text-xs text-gray-400 mt-1">Adicionado em {addedAt}</p>

        {/* Mobile: preço e botão abaixo do texto */}
        <div className="flex items-center justify-between mt-3 lg:hidden">
          <p className="text-base font-bold text-gray-900">
            {price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
          </p>
          <button
            onClick={() => navigate(`/product/${slug}`)}
            className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold px-5 py-2 rounded-lg transition-colors cursor-pointer"
          >
            Comprar
          </button>
        </div>
      </div>

      {/* Desktop: preço e botão à direita */}
      <div className="hidden lg:flex flex-col items-end gap-3 shrink-0">
        <p className="text-lg font-bold text-gray-900 mt-6">
          {price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
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