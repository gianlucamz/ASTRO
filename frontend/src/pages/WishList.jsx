import WishlistItem from "../components/wishlist/WishListItem";
import WishlistSummary from "../components/wishlist/WishListSummary";

import PlacaDeVideo from "../assets/placaDeVideo.png";

export default function Wishlist() {
  const items = [
    {
      id: 1,
      name: "Placa de Vídeo RX 7600 GAMING OC 8G AMD Radeon Gigabyte, 8GB, GDDR6, 128bits, RGB - GV-R76GAMING OC-8GD",
      price: 1699.99,
      rating: 4.5,
      addedAt: "24 de março de 2026",
      image: PlacaDeVideo,
    },
    {
      id: 2,
      name: "Placa de Vídeo RX 7600 GAMING OC 8G AMD Radeon Gigabyte, 8GB, GDDR6, 128bits, RGB - GV-R76GAMING OC-8GD",
      price: 1699.99,
      rating: 4.5,
      addedAt: "1 de abril de 2026",
      image: PlacaDeVideo,
    },
    {
      id: 3,
      name: "Placa de Vídeo RX 7600 GAMING OC 8G AMD Radeon Gigabyte, 8GB, GDDR6, 128bits, RGB - GV-R76GAMING OC-8GD",
      price: 1699.99,
      rating: 4.5,
      addedAt: "8 de abril de 2026",
      image: PlacaDeVideo,
    },
  ];

  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="w-full px-16 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 ml-10">
        Lista de desejos
      </h1>
      <div className="flex gap-6 items-start">
        <div className="flex-1 flex flex-col gap-4">
          {items.map((item) => (
            <WishlistItem key={item.id} {...item} />
          ))}
        </div>
        <WishlistSummary total={total} totalItems={items.length} />
      </div>
    </div>
  );
}
