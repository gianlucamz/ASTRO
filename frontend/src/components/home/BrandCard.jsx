export default function BrandCard({ name, image, className = "min-w-[265px] max-w-[265px]" }) {
  return (
    <div
      className={`cursor-pointer hover:shadow-xl transition-shadow flex-shrink-0 ${className}`}
      style={{ boxShadow: "0px 2px 8px rgba(0,0,0,0.15)" }}
    >
      <div className="rounded-lg overflow-hidden h-[90px] md:h-[120px] lg:h-[150px] bg-white flex items-center justify-center">
        <img src={image} alt={name} className="w-[90%] h-[90%] object-cover" />
      </div>
      <p className="text-sm md:text-base font-bold text-gray-900 text-center -mt-1">
        {name}
      </p>
    </div>
  );
}