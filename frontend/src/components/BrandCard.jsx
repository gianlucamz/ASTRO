export default function BrandCard({ name, image }) {
  return (
    <div
      className="min-w-[240px] max-w-[240px] cursor-pointer hover:shadow-xl transition-shadow"
      style={{ boxShadow: "0px 2px 8px rgba(0,0,0,0.15)" }}
    >
      <div className="rounded-lg overflow-hidden h-[150px] bg-white flex items-center justify-center">
        <img src={image} alt={name} className="w-[90%] h-[90%] object-cover" />
      </div>
      <p className="text-base font-bold text-gray-900 text-center -mt-1">
        {name}
      </p>
    </div>
  );
}
