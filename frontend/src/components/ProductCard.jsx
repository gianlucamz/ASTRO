export default function ProductCard({ image, name, price }) {
  return (
    <div className="bg-white rounded-lg p-3 min-w-[160px] max-w-[160px] cursor-pointer hover:shadow-md transition-shadow">
      <div className="bg-gray-50 rounded-lg mb-3 flex items-center justify-center h-[120px]">
        <img
          src={image}
          alt={name}
          className="object-contain h-full w-full rounded-lg"
        />
      </div>
      <p className="text-xs text-gray-700 leading-snug line-clamp-3 mb-2">
        {name}
      </p>
      <p className="text-sm font-bold text-gray-900">
        {price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
      </p>
    </div>
  );
}
