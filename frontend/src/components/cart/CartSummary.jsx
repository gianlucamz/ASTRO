import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import { useCep } from "../../context/CepContext";

export default function CartSummary({ subtotal, total }) {
  const { cepInfo, salvarCep } = useCep();

  const [cepInput, setCepInput] = useState("");
  const [cepFound, setCepFound] = useState(null);
  const [cepError, setCepError] = useState("");
  const [cepLoading, setCepLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  async function handleBuscarCep() {
    const cep = cepInput.replace(/\D/g, "");
    if (cep.length !== 8) {
      setCepError("CEP inválido. Digite 8 números.");
      return;
    }
    setCepLoading(true);
    setCepError("");
    setCepFound(null);
    try {
      const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await res.json();
      if (data.erro) {
        setCepError("CEP não encontrado.");
      } else {
        setCepFound(data);
        setShowConfirm(true);
      }
    } catch {
      setCepError("Erro ao buscar CEP. Tente novamente.");
    } finally {
      setCepLoading(false);
    }
  }

  function handleConfirmarPadrao() {
    salvarCep({
      cep: cepFound.cep,
      cidade: cepFound.localidade,
      uf: cepFound.uf,
    });
    setShowConfirm(false);
    setCepInput("");
  }

  function handleRecusarPadrao() {
    setShowConfirm(false);
  }

  return (
    <>
      <div className="bg-white rounded-xl border border-gray-200 p-8 flex flex-col gap-5 w-[400px] shrink-0 mr-20">
        <div className="flex justify-between items-center">
          <p className="text-xl font-semibold text-gray-900">Subtotal:</p>
          <p className="text-xl font-semibold text-gray-900">
            {subtotal.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
        </div>

        <hr className="border-gray-200" />

        {!cepInfo && (
          <div className="flex flex-col gap-3">
            <p className="text-xs font-bold text-gray-700 tracking-wide">
              CONSULTE SEU FRETE
            </p>
            <div className="flex gap-2">
              <input
                type="text"
                value={cepInput}
                onChange={(e) =>
                  setCepInput(e.target.value.replace(/\D/g, "").slice(0, 8))
                }
                onKeyDown={(e) => e.key === "Enter" && handleBuscarCep()}
                placeholder="Insira seu CEP*"
                className="flex-1 border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-gray-500"
              />
              <button
                onClick={handleBuscarCep}
                disabled={cepLoading}
                className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2.5 rounded-sm transition-colors cursor-pointer disabled:opacity-60"
              >
                <IoSearchOutline size={18} />
              </button>
            </div>
            {cepError && <p className="text-xs text-red-500">{cepError}</p>}

            <a
              href="https://buscacepinter.correios.com.br/app/endereco/index.php"
              target="_blank"
              rel="noreferrer"
              className="text-xs
              text-purple-600 hover:underline"
              Não
              lembro
              meu
              CEP
            />
          </div>
        )}

        {cepInfo && (
          <>
            <div className="flex flex-col gap-1">
              <p className="text-xs font-bold text-gray-700 tracking-wide">
                ENTREGA PARA
              </p>
              <p className="text-sm text-gray-800 font-medium">
                {cepInfo.cidade} - {cepInfo.uf}
              </p>
              <p className="text-xs text-gray-500">CEP: {cepInfo.cep}</p>
            </div>
          </>
        )}

        <hr className="border-gray-200" />

        <div className="flex flex-col gap-3">
          <p className="text-xs font-bold text-gray-700 tracking-wide">
            CONSULTE SEUS CUPONS
          </p>
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Insira seu Cupom"
              className="flex-1 border border-gray-300 rounded-lg px-3 py-2.5 text-sm outline-none focus:border-gray-800"
            />
            <button className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-2.5 rounded-sm transition-colors cursor-pointer">
              <IoSearchOutline size={18} />
            </button>
          </div>
        </div>

        <hr className="border-gray-200" />

        <div className="flex justify-between items-center">
          <p className="text-xl font-bold text-gray-900">Total:</p>
          <p className="text-xl font-bold text-gray-900">
            {total.toLocaleString("pt-BR", {
              style: "currency",
              currency: "BRL",
            })}
          </p>
        </div>

        <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 rounded-sm text-base transition-colors cursor-pointer">
          Finalizar Compra
        </button>
      </div>

      {/* Modal de confirmação de CEP padrão */}
      {showConfirm && cepFound && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-8 max-w-sm w-full text-center shadow-xl flex flex-col gap-4">
            <h2 className="text-lg font-bold text-gray-900">
              Este é o seu CEP padrão?
            </h2>
            <p className="text-sm text-gray-600">
              {cepFound.localidade} - {cepFound.uf}
              <br />
              <span className="text-gray-400 text-xs">CEP: {cepFound.cep}</span>
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleRecusarPadrao}
                className="flex-1 border border-gray-300 text-gray-700 font-semibold py-2 rounded-md hover:bg-gray-50 transition cursor-pointer"
              >
                Não
              </button>
              <button
                onClick={handleConfirmarPadrao}
                className="flex-1 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-md transition cursor-pointer"
              >
                Sim
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
