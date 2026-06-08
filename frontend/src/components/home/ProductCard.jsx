import { useNavigate } from "react-router-dom";

export default function ProductCard({
  image,
  name,
  price,
  slug,
  className = "min-w-[160px] max-w-[160px] md:min-w-[200px] md:max-w-[200px] lg:min-w-[260px] lg:max-w-[260px]",
}) {
  const navigate = useNavigate();

  return (
    <div
      className={`bg-white rounded-lg p-3 cursor-pointer shadow-md hover:shadow-xl transition-shadow ${className}`}
      onClick={() => navigate(`/product/${slug}`)}
    >
      <div className="bg-white rounded-lg mb-3 flex items-center justify-center h-[120px] md:h-[160px] lg:h-[210px]">
        <img
          src={image}
          alt={name}
          className="object-contain h-full w-full rounded-lg"
        />
      </div>
      <p className="text-xs md:text-sm text-gray-800 leading-snug line-clamp-3 mb-2 font-semibold">
        {name}
      </p>
      <p className="text-base md:text-lg font-bold text-gray-900">
        {price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
      </p>
    </div>
  );
}