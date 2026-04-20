import { IoSearchOutline } from "react-icons/io5";

export default function CartSummary({ subtotal, total }) {
  return (
    <div className="bg-white rounded-xl border border-gray-200 p-6 flex flex-col gap-4 w-[380px] shrink-0">
      <div className="flex justify-between items-center">
        <p className="text-lg font-semibold text-gray-900">Subtotal:</p>
        <p className="text-lg font-semibold text-gray-900">
          {subtotal.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </p>
      </div>

      <hr className="border-gray-200" />

      <div className="flex flex-col gap-2">
        <p className="text-xs font-bold text-gray-700 tracking-wide">
          CONSULTE SEU FRETE
        </p>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Insira seu CEP*"
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-800"
          />
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-sm transition-colors cursor-pointer">
            <IoSearchOutline size={18} />
          </button>
        </div>
        <a href="#" className="text-xs text-purple-600 hover:underline">
          Não lembro meu CEP
        </a>
      </div>

      <hr className="border-gray-200" />

      <div className="flex flex-col gap-2">
        <p className="text-xs font-bold text-gray-700 tracking-wide">
          CONSULTE SEUS CUPONS
        </p>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Insira seu Cupom"
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-800"
          />
          <button className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded-sm transition-colors cursor-pointer">
            <IoSearchOutline size={18} />
          </button>
        </div>
      </div>

      <hr className="border-gray-200" />

      <div className="flex justify-between items-center">
        <p className="text-lg font-bold text-gray-900">Total:</p>
        <p className="text-lg font-bold text-gray-900">
          {total.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </p>
      </div>

      <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-sm text-base transition-colors cursor-pointer">
        Finalizar Compra
      </button>
    </div>
  );
}
