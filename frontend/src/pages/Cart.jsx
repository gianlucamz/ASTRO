import CartItem from '../components/cart/CartItem'
import CartSummary from '../components/cart/CartSummary'
import PlacaDeVideo from '../assets/placaDeVideo.png'

export default function Cart() {
  return (
    <div className="px-16 py-8 mb-22">
      <h1 className="text-3xl font-bold text-gray-900 mb-6 ml-30">Meu carrinho</h1>
      <div className="flex justify-between items-start">
        <div className="flex-1 flex flex-col gap-4 mr-8">
          <CartItem
            name="Placa de Vídeo RX 7600 GAMING OC 8G AMD Radeon Gigabyte, 8GB, GDDR6, 128bits, RGB - GV-R76GAMING OC-8GD"
            price={1699.99}
            image={PlacaDeVideo}
          />
        </div>
        <CartSummary subtotal={1699.99} total={1699.99} />
      </div>
    </div>
  )
}