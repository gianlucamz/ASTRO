import { IoCloseOutline } from "react-icons/io5";

export default function ConfirmLogoutModal({ onConfirm, onCancel }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      onClick={onCancel}
    >
      <div
        className="bg-white p-8 w-full max-w-md relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer"
        >
          <IoCloseOutline size={24} />
        </button>

        <h2 className="text-xl font-bold text-gray-900 mb-2">Sair da conta</h2>
        <p className="text-sm text-gray-600 mb-8">
          Tem certeza que deseja sair da sua conta?
        </p>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 border border-gray-400 text-gray-700 font-semibold py-2 rounded-sm hover:bg-gray-50 transition-colors cursor-pointer"
          >
            CANCELAR
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-sm transition-colors cursor-pointer"
          >
            SAIR
          </button>
        </div>
      </div>
    </div>
  );
}
