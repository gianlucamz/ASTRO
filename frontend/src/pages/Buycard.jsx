import {
  FaStar,
  FaStarHalfAlt,
  FaShoppingCart,
  FaThumbsUp,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";


import AMD from "../assets/AMD.jpg";
import PlacaDeVideo from "../assets/placaDeVideo.png";

export default function BuyCard() {
    const navigate = useNavigate();

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* BREADCRUMB */}
      <div className="text-sm font-semibold flex gap-2 mb-6">
        <span className="hover:underline cursor-pointer ">Hardware</span>
        <span> &rsaquo; </span>
        <span className="hover:underline cursor-pointer">Placa de Vídeo</span>
        <span> &rsaquo; </span>
        <span className="hover:underline cursor-pointer">AMD</span>
      </div>

      {/* TOPO */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* IMAGENS */}
        <div className="flex flex-col gap-4">
          <img src={PlacaDeVideo} alt="produto" className="w-full rounded-lg" />

          {/* MINIATURAS */}
          <div className="flex gap-2">
            <div className="w-16 h-16 border border-gray-300">
              <img src={PlacaDeVideo} />
            </div>
            <div className="w-16 h-16 border cursor-pointer"></div>
            <div className="w-16 h-16 border cursor-pointer"></div>
            <div className="w-16 h-16 border cursor-pointer"></div>
            <div className="w-16 h-16 border cursor-pointer"></div>
            <div className="w-16 h-16 border cursor-pointer"></div>
            <div className="w-16 h-16 border cursor-pointer"></div>
            <div className="w-16 h-16 border cursor-pointer"></div>
          </div>

          {/* DESCRIÇÃO RESUMIDA */}
          <div className="flex flex-col gap-3 mt-4">
            <h2 className="text-lg font-bold uppercase">
              Descrição do Produto
            </h2>
            <p className="text-sm text-gray-700">
              A Radeon RX 7600 GAMING OC 8G é uma placa de vídeo voltada para
              jogos em Full HD e Quad HD, com bom desempenho em títulos atuais.
              Possui clock boost de até 2.755 MHz e 8GB de memória GDDR6, com
              velocidade de 18Gbps e barramento de 128 bits.
            </p>
            <p className="text-sm text-gray-700">
              É compatível com DirectX 12 Ultimate, oferecendo suporte a
              tecnologias como Ray Tracing e Variable Rate Shading. Também conta
              com recursos como AMD FidelityFX Super Resolution (FSR), para
              ganho de desempenho, e Radeon Image Sharpening (RIS), que melhora
              a nitidez das imagens.
            </p>
            <p className="text-sm text-gray-700">
              Indicada para quem busca rodar jogos modernos com boa taxa de
              quadros e qualidade visual equilibrada.
            </p>
          </div>

          {/* AVALIAÇÕES */}
          <div className="flex flex-col gap-4 mt-4">
            <h2 className="text-lg font-bold uppercase">Avaliações</h2>
            <div className="flex items-center gap-2">
              <span className="text-5xl font-bold">4.8</span>
              <div className="flex flex-col">
                <div className="flex gap-1">
                  <FaStar className="text-purple-600" />
                  <FaStar className="text-purple-600" />
                  <FaStar className="text-purple-600" />
                  <FaStar className="text-purple-600" />
                  <FaStarHalfAlt className="text-purple-600" />
                </div>
                <span className="text-sm text-gray-500">925 Avaliações</span>
              </div>
            </div>

            {/* COMENTÁRIOS */}
            {[
              {
                name: "Lucas Almeida",
                text:
                  "Placa muito boa pelo preço. Roda todos os jogos que testei em qualidade alta sem travar. Instalação simples e desempenho consistente.",
              },
              {
                name: "Rafael Costa",
                text:
                  "Desempenho excelente em Full HD. Os jogos ficam fluidos e a qualidade gráfica é bem nítida. Atendeu totalmente o que eu precisava.",
              },
              {
                name: "Bruno Martins",
                text:
                  "Gostei bastante. Silenciosa, não esquenta muito e entrega uma performance estável. Ótima opção para quem quer jogar bem sem gastar tanto.",
              },
            ].map((review, i) => (
              <div key={i} className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{review.name}</span>
                  <div className="flex gap-1">
                    <FaStar className="text-purple-600 text-sm" />
                    <FaStar className="text-purple-600 text-sm" />
                    <FaStar className="text-purple-600 text-sm" />
                    <FaStar className="text-purple-600 text-sm" />
                    <FaStar className="text-purple-600 text-sm" />
                  </div>
                </div>

                <p className="text-sm text-gray-700">{review.text}</p>
                <div key={i} className="flex flex-col gap-1 max-w-28">
                  <button className="flex items-center gap-2 border rounded-full px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 cursor-pointer">
                    É útil <FaThumbsUp /> (0)
                  </button>
                </div>
              </div>
            ))}

            <span className="text-purple-600 text-sm cursor-pointer underline">
              Ver mais
            </span>
          </div>
        </div>

        {/* INFO */}
        <div className="flex flex-col gap-4">
          <h1 className="text-2xl font-semibold">
            Placa de Vídeo RX 7600 GAMING OC 8G AMD Radeon Gigabyte, 8GB, GDDR6,
            128bits, RGB - GV-R76GAMING OC-8GD
          </h1>

          {/* ESTRELAS */}
          <div className="flex items-center gap-1">
            <FaStar className="text-purple-600" />
            <FaStar className="text-purple-600" />
            <FaStar className="text-purple-600" />
            <FaStar className="text-purple-600" />
            <FaStarHalfAlt className="text-purple-600" />
            <span className="text-sm ml-1">
              (925)
              <img src={AMD} alt="AMD" className="inline w-12 ml-2" />
            </span>
          </div>

          {/* PREÇO */}
          <div className="flex flex-col">
            <span className="text-3xl font-bold text-purple-600">
              R$ 1.699,99
            </span>
            <span className="text-sm text-gray-500">À vista</span>
            <span className="text-sm text-gray-500">
              Em até 12X de 141,66 sem juros
            </span>
            <span className="text-sm text-purple-600">Em estoque</span>
          </div>

          {/* BOTÕES */}
          <div className="flex flex-col gap-3">
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-lg cursor-pointer">
              Comprar agora
            </button>
            <button className="w-full border-2 border-purple-600 hover:bg-purple-50 text-purple-600 font-semibold py-3 rounded-lg cursor-pointer" onClick={() => navigate("/cart")}>
              <div className="flex items-center justify-center gap-2">
                <FaShoppingCart />
                Adicionar ao carrinho
              </div>
            </button>
          </div>

          {/* FRETE */}
          <div className="flex flex-col gap-2">
            <span className="font-bold uppercase">Consulte seu frete</span>
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Insira seu CEP*"
                className="border rounded-lg px-3 py-2 w-full text-sm"
              />
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg cursor-pointer">
                <FaSearch />
              </button>
            </div>
            <span className="text-purple-600 text-sm cursor-pointer underline">
              Não lembro meu CEP
            </span>
          </div>

          {/* DESCRIÇÃO DO PRODUTO */}
          <div className="mt-10 flex flex-col gap-4">
            <h2 className="text-xl font-bold uppercase">
              Descrição do Produto
            </h2>

            <div>
              <p className="font-bold">Características:</p>
              <p>- Marca: Gigabyte</p>
              <p>- Modelo: GV-R76GAMING OC-8GD</p>
            </div>

            <div>
              <p className="font-bold">Processamento Gráfico:</p>
              <p>- Radeon RX 7600</p>
            </div>

            <div>
              <p className="font-bold">Relógio central:</p>
              <p>- Processadores de fluxo: 2048</p>
              <p>- Relógio de memória: 18Gbps</p>
              <p>- Tamanho da memória: 8GB</p>
              <p>- Tipo de memória: GDDR6</p>
              <p>- Barramento de memória: 128 bits</p>
              <p>- Ônibus de cartão: PCI-E 4.0</p>
              <p>- Resolução máxima digital: 7680x4320</p>
              <p>- Visualização múltipla: 4</p>
              <p>- Tamanho do cartão: C=282 L=115 A=50 mm</p>
              <p>- Formulário PCB: ATX</p>
              <p>- DirectX: 12 final</p>
              <p>- OpenCL: 4.5</p>
              <p>- Fonte de alimentação recomendada: 550W</p>
            </div>

            <div>
              <p className="font-bold">Conectores de energia:</p>
              <p>- 8 pinos * 1</p>
            </div>

            <div>
              <p className="font-bold">Saída:</p>
              <p>- DisplayPort 1.4a *2</p>
              <p>- HDMI 2.1a *2</p>
            </div>

            <div>
              <p className="font-bold">Observação:</p>
              <p>
                * "Boost Clock" é a frequência máxima alcançável na GPU
                executando uma carga de trabalho intermitente.
              </p>
              <p>
                * "Game Clock" é o clock esperado da GPU ao executar aplicativos
                de jogos típicos.
              </p>
            </div>

            <div>
              <p className="font-bold">Conteúdo da Embalagem:</p>
              <p>- Placa de Vídeo</p>
              <p>- Guia rápido</p>
            </div>

            <div>
              <p className="font-bold">Garantia:</p>
              <p>
                1 ano de garantia (3 meses de garantia legal + 9 meses de
                garantia contratual junto ao fabricante)
              </p>
            </div>

            <div>
              <p className="font-bold">Peso:</p>
              <p>2500 gramas (bruto com embalagem)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
