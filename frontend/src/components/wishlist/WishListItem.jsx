import { IoStar, IoStarHalf, IoStarOutline } from "react-icons/io5";

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => {
        if (rating >= star) {
          return <IoStar key={star} size={16} className="text-purple-600" />;
        } else if (rating >= star - 0.5) {
          return (
            <IoStarHalf key={star} size={16} className="text-purple-600" />
          );
        } else {
          return (
            <IoStarOutline key={star} size={16} className="text-purple-600" />
          );
        }
      })}
    </div>
  );
}

export default function WishlistItem({ image, name, price, rating, addedAt }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4 flex gap-4 items-center relative">
      <button className="absolute top-4 right-4 text-purple-600 cursor-pointer">
        <IoStar size={20} />
      </button>

      <img
        src={image}
        alt={name}
        className="w-32 h-32 object-contain rounded-lg bg-gray-50 shrink-0"
      />

      <div className="flex-1 flex flex-col gap-1">
        <p className="font-bold text-gray-900 leading-snug pr-6">
          {name}
        </p>
        <StarRating rating={rating} />
        <p className="text-xs text-gray-400 mt-1">Adicionado em {addedAt}</p>
      </div>

      <div className="flex flex-col items-end gap-3 shrink-0 mt-6">
        <p className="text-lg font-bold text-gray-900 mt-6">
          {price.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </p>
        <button className="bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold px-8 py-2 rounded-lg transition-colors cursor-pointer">
          Comprar
        </button>
      </div>
    </div>
  );
}
