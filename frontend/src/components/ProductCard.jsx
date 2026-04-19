export default function ProductCard({ image, name, price }) {
  return (
    <div className="bg-white rounded-lg p-3 min-w-[200px] max-w-[200px] cursor-pointer shadow-md hover:shadow-lg transition-shadow">
      <div className="bg-gray-50 rounded-lg mb-3 flex items-center justify-center h-[160px]">
        <img
          src={image}
          alt={name}
          className="object-contain h-full w-full rounded-lg"
        />
      </div>
      <p className="text-xs text-gray-800 leading-snug line-clamp-3 mb-2 font-semibold">
        {name}
      </p>
      <p className="text-md font-bold text-gray-900">
        {price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
      </p>
    </div>
  );
}
