import { IoCloseOutline, IoCheckmarkCircleOutline } from "react-icons/io5";

export default function RegisterSuccessModal({ onClose }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div
        className="bg-white p-8 w-full max-w-md relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 cursor-pointer"
        >
          <IoCloseOutline size={24} />
        </button>

        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Cadastro realizado
        </h2>

        <div className="flex flex-col items-center gap-4 py-4">
          <IoCheckmarkCircleOutline size={56} className="text-purple-600" />
          <p className="text-gray-700 text-center text-sm">
            Sua conta foi criada com sucesso. Agora você já pode fazer login!
          </p>
          <button
            onClick={onClose}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-sm transition-colors cursor-pointer mt-2"
          >
            FAZER LOGIN
          </button>
        </div>
      </div>
    </div>
  );
}
