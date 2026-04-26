import { useState } from "react";
import { IoInformationCircleOutline } from "react-icons/io5";

export default function WishlistSummary({ total, totalItems }) {
  const [notificar, setNotificar] = useState(false);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6 flex flex-col gap-4 w-[320px] shrink-0">
      <div className="flex justify-between items-start">
        <p className="text-base font-bold text-gray-900 leading-snug">
          Guarde os produtos que quer comprar bem aqui!
        </p>
        <IoInformationCircleOutline
          size={20}
          className="text-gray-400 shrink-0 ml-2"
        />
      </div>

      <p className="text-sm text-gray-600 -mt-2">
        Salve produtos para comprar depois e acompanhe mudanças de preço e
        disponibilidade.
      </p>

      <p className="text-sm text-gray-600">
        Seus produtos na sua lista de desejos serão notificados em caso de
        promoções.
      </p>

      <p className="text-sm font-semibold text-gray-700">Aproveite!</p>

      <label className="flex items-start gap-2 text-sm text-gray-600 cursor-pointer -mt-2">
        <input
          type="checkbox"
          checked={notificar}
          onChange={() => setNotificar(!notificar)}
          className="accent-purple-600 mt-0.5"
        />
        Notifique-me se algum produto estiver com estoque acabando.
      </label>

      <hr className="border-gray-200" />

      <div className="flex justify-between items-center">
        <p className="text-base font-bold text-gray-900">Total da lista:</p>
        <p className="text-lg font-bold text-purple-600">
          {total.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL",
          })}
        </p>
      </div>

      <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-lg transition-colors cursor-pointer">
        Comprar tudo
      </button>

      <p className="text-sm text-gray-600">Total de itens: {totalItems}</p>
    </div>
  );
}
