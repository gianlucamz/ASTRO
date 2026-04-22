import { IoCloseCircleOutline } from 'react-icons/io5'

export default function CartItem({ image, name, price }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 flex gap-6 items-start ml-20">
      
      <img
        src={image}
        alt={name}
        className="w-32 h-32 object-contain rounded-lg bg-gray-50"
      />

      <div className="flex-1 flex flex-col gap-2">
        <p className="text-base font-bold text-gray-900 leading-snug mb-3 mt-1">{name}</p>
        <p className="text-sm text-gray-800 leading-1">Com desconto no PIX: R$ 334,31</p>
        <p className="text-sm text-gray-800 leading-1">Parcelado no cartão sem juros: R$ 379,90</p>

        <button className="w-fit bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold mt-3 px-6 py-2 rounded-xs transition-colors cursor-pointer">
          Comprar agora
        </button>
      </div>

      <div className="flex flex-col items-end justify-between h-full gap-6">
        <button className="text-gray-600 hover:text-gray-800 cursor-pointer">
          <IoCloseCircleOutline size={24} />
        </button>

        <p className="text-lg font-bold text-gray-900">
          {price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
        </p>

        <div className="flex items-center border border-gray-300 rounded-full px-4 py-1.5 gap-4">
          <button className="text-gray-600 font-bold text-lg cursor-pointer hover:text-gray-800">−</button>
          <span className="text-sm font-semibold text-gray-800">1</span>
          <button className="text-gray-600 font-bold text-lg cursor-pointer hover:text-gray-800">+</button>
        </div>
      </div>

    </div>
  )
}