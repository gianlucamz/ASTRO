import ProductCard from './ProductCard'
import { IoChevronForward } from 'react-icons/io5'
import PlacaDeVideo from '../assets/placaDeVideo.png'

export default function ProductRow({ title }) {
  const products = [
    { id: 1, name: 'Placa de Vídeo RX 7600 GAMING OC 8G AMD Radeon Gigabyte,8GB...', price: 1699.99, image: PlacaDeVideo },
    { id: 2, name: 'Placa de Vídeo RX 7600 GAMING OC 8G AMD Radeon Gigabyte,8GB...', price: 1699.99, image: PlacaDeVideo },
    { id: 3, name: 'Placa de Vídeo RX 7600 GAMING OC 8G AMD Radeon Gigabyte,8GB...', price: 1699.99, image: PlacaDeVideo },
    { id: 4, name: 'Placa de Vídeo RX 7600 GAMING OC 8G AMD Radeon Gigabyte,8GB...', price: 1699.99, image: PlacaDeVideo },
  ]

  return (
    <div className="bg-white rounded-xl p-4 mb-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base font-bold text-gray-900">{title}</h2>
      </div>
      <div className="relative flex items-center">
        <div className="flex gap-3 overflow-x-auto scrollbar-hide">
          {products.map(product => (
            <ProductCard
              key={product.id}
              image={product.image}
              name={product.name}
              price={product.price}
            />
          ))}
        </div>
        <button className="absolute right-0 bg-white shadow rounded-full p-1 ml-2">
          <IoChevronForward size={20} className="text-gray-500" />
        </button>
      </div>
    </div>
  )
}