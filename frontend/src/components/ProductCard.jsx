export default function ProductCard({ image, name, price }) {
  return (
    <div className="bg-white rounded-lg p-3 min-w-[230px] max-w-[230px] cursor-pointer shadow-md hover:shadow-xl transition-shadow">
      <div className="bg-gray-50 rounded-lg mb-3 flex items-center justify-center h-[190px]">
        <img
          src={image}
          alt={name}
          className="object-contain h-full w-full rounded-lg"
        />
      </div>
      <p className="text-sm text-gray-800 leading-snug line-clamp-3 mb-2 font-semibold">
        {name}
      </p>
      <p className="text-lg font-bold text-gray-900">
        {price.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
      </p>
    </div>
  );
}
