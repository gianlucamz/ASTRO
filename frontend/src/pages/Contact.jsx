import {
  FaWhatsapp,
  FaEnvelope,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaPaperPlane,
} from "react-icons/fa";

export default function Contato() {
  return (
    <main className="bg-white text-gray-900">
      {/* Título simples */}
      <section className="border-b border-gray-200 py-12 text-center">
        <h1 className="text-4xl font-bold text-purple-900">Contato</h1>
        <p className="mt-3 text-gray-600">
          Estamos aqui para ajudar você com dúvidas, pedidos e suporte.
        </p>
      </section>

      {/* Conteúdo principal */}
      <section className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Formulário */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <FaPaperPlane className="text-purple-700 text-2xl" />
            <h2 className="text-2xl font-bold">Envie sua mensagem</h2>
          </div>

          <p className="text-gray-600 mb-8">
            Preencha o formulário abaixo e nossa equipe entrará em contato com
            você.
          </p>

          <form className="space-y-5">
            <div>
              <label className="block text-sm font-semibold mb-2">
                Nome completo
              </label>
              <input
                type="text"
                placeholder="Digite seu nome"
                className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:border-purple-700"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">E-mail</label>
              <input
                type="email"
                placeholder="Digite seu e-mail"
                className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:border-purple-700"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Assunto
              </label>
              <select className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:border-purple-700">
                <option>Selecione um assunto</option>
                <option>Dúvida sobre pedido</option>
                <option>Trocas e devoluções</option>
                <option>Formas de pagamento</option>
                <option>Suporte</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2">
                Mensagem
              </label>
              <textarea
                rows="6"
                placeholder="Escreva sua mensagem..."
                className="w-full border border-gray-300 rounded-md px-4 py-3 outline-none focus:border-purple-700 resize-none"
              ></textarea>
            </div>

            <button
              type="button"
              className="bg-purple-700 hover:bg-purple-800 text-white font-bold px-8 py-3 rounded-md flex items-center gap-3 transition"
            >
              <FaPaperPlane />
              Enviar mensagem
            </button>
          </form>
        </div>

        {/* Canais */}
        <div className="lg:border-l lg:pl-16 border-gray-200">
          <h2 className="text-2xl font-bold mb-4">Outros canais</h2>
          <p className="text-gray-600 mb-8">
            Prefere falar por outro canal? Escolha uma das opções abaixo.
          </p>

          <div className="space-y-8">
            <ContactItem
              icon={<FaWhatsapp />}
              title="WhatsApp"
              text="(11) 99999-9999"
              sub="Seg a Sex: 09h às 18h"
            />

            <ContactItem
              icon={<FaEnvelope />}
              title="E-mail"
              text="contato@astro.com.br"
              sub="Respondemos em breve"
            />

            <ContactItem
              icon={<FaPhoneAlt />}
              title="Telefone"
              text="(11) 3333-3333"
              sub="Seg a Sex: 09h às 18h"
            />

            <ContactItem
              icon={<FaMapMarkerAlt />}
              title="Endereço"
              text="Rua das Estrelas, 123"
              sub="São Paulo - SP"
            />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-gray-50 border-t border-gray-200 py-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold">Perguntas frequentes</h2>
          <p className="text-gray-600 mt-3 mb-10">
            Encontre respostas para as dúvidas mais comuns.
          </p>

          <div className="space-y-4 text-left">
            <Faq question="Como acompanho meu pedido?" />
            <Faq question="Quais são as formas de pagamento?" />
            <Faq question="Qual o prazo de entrega?" />
            <Faq question="Posso trocar ou devolver um produto?" />
            <Faq question="Como funciona a garantia?" />
          </div>
        </div>
      </section>
    </main>
  );
}

function ContactItem({ icon, title, text, sub }) {
  return (
    <div className="flex items-center gap-5 border-b border-gray-200 pb-6">
      <div className="w-14 h-14 rounded-full bg-purple-700 text-white flex items-center justify-center text-2xl">
        {icon}
      </div>

      <div>
        <h3 className="font-bold uppercase">{title}</h3>
        <p className="text-gray-800">{text}</p>
        <p className="text-sm text-gray-500">{sub}</p>
      </div>
    </div>
  );
}

function Faq({ question }) {
  return (
    <div className="bg-white border border-gray-200 rounded-md px-5 py-4 flex justify-between items-center">
      <span className="font-semibold">{question}</span>
      <span className="text-xl">⌄</span>
    </div>
  );
}
