import Gean from "../assets/banner.jpeg";
import MainLayout from "../layouts/MainLayout";
export default function About() {
  return (
    <main className="bg-[#f5f5f5] text-black px-6 md:px-12 py-10">
      
      {/* heroisao */}
 
<div className="grid items-stretch min-h-[500px] rounded-2xl overflow-hidden mb-20">
          

          {/* fotinha */}
<div className="h-full w-full">
  <img
    src={Gean}
    alt="Banner"
    className="w-full h-full object-cover rounded-2xl"
  />
</div>
        </div>
     

      {/* sobrE */}
      <section className="grid lg:grid-cols-2 gap-10 mt-24">
        
        {/* testao */}
        <div>
          <span className="text-[#5b00d6] font-bold uppercase text-sm tracking-wider">
            Quem somos
          </span>

          <h2 className="text-5xl font-bold leading-tight mt-4">
            Tecnologia mais acessível
            <br />
            para a nossa região
          </h2>

          <div className="mt-8 space-y-6 text-xl text-black/75 leading-relaxed">
            <p>
              A ASTRO surgiu ao identificarmos uma necessidade real
              do Litoral Norte: a falta de opções confiáveis para compra
              de eletrônicos e assistência técnica especializada.
            </p>

            <p>
              Nosso objetivo é aproximar tecnologia, atendimento e suporte
              em um só lugar, oferecendo praticidade, segurança e soluções
              pensadas para quem vive na região.
            </p>
          </div>
        </div>

        {/* CARD */}
        <div className="bg-[#f2ebff] rounded-[30px] p-10">
          <div className="flex items-center justify-between">
            <h3 className="text-4xl font-bold text-[#5b00d6]">
              Nosso propósito
            </h3>

            <div className="w-16 h-16 rounded-full border-4 border-[#5b00d6] flex items-center justify-center text-[#5b00d6] text-3xl">
              🎯
            </div>
          </div>

          <p className="mt-10 text-xl text-black/75 leading-relaxed">
            Resolver o déficit de demanda e acesso a aparelhos
            eletrônicos no Litoral Norte, conectando clientes
            a produtos, suporte e assistência de forma mais rápida,
            organizada e confiável.
          </p>
        </div>
      </section>

      {/* CARDS */}
      <section className="bg-white rounded-[30px] mt-24 p-10 md:p-16 shadow-sm">
        
        <div className="text-center">
          <h2 className="text-5xl font-bold">
            O que buscamos resolver
          </h2>

          <p className="text-black/60 text-xl mt-4">
            A ASTRO foi pensada para atender necessidades reais da região.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-16">
          
          {/* CARD 1 */}
          <div className="bg-white border border-black/5 rounded-[25px] p-8 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-[#5b00d6] flex items-center justify-center text-white text-3xl">
              🛒
            </div>

            <h3 className="text-3xl font-bold mt-6">
              Compra de eletrônicos
            </h3>

            <p className="text-black/70 text-lg leading-relaxed mt-4">
              Mais facilidade para encontrar aparelhos e acessórios
              tecnológicos com qualidade e garantia.
            </p>
          </div>

          {/* CARD 2 */}
          <div className="bg-white border border-black/5 rounded-[25px] p-8 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-[#5b00d6] flex items-center justify-center text-white text-3xl">
              🔧
            </div>

            <h3 className="text-3xl font-bold mt-6">
              Assistência técnica
            </h3>

            <p className="text-black/70 text-lg leading-relaxed mt-4">
              Apoio completo para manutenção, reparos e suporte técnico
              especializado na região.
            </p>
          </div>

          {/* CARD 3 */}
          <div className="bg-white border border-black/5 rounded-[25px] p-8 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-[#5b00d6] flex items-center justify-center text-white text-3xl">
              📍
            </div>

            <h3 className="text-3xl font-bold mt-6">
              Foco no Litoral Norte
            </h3>

            <p className="text-black/70 text-lg leading-relaxed mt-4">
              Atendimento próximo e personalizado para Caraguatatuba,
              Ubatuba, São Sebastião e região.
            </p>
          </div>
        </div>
      </section>

      {/* MISSÃO */}
      <section className="mt-24 bg-gradient-to-r from-[#3f00a0] to-[#5b00d6] rounded-[30px] p-10 md:p-14">
        
        <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
          
          <div className="text-7xl">
            🚀
          </div>

          <div>
            <h2 className="text-5xl font-bold text-white">
              Nossa missão
            </h2>

            <p className="text-white/90 text-xl leading-relaxed mt-4 max-w-[900px]">
              Tornar o acesso à tecnologia mais simples, próximo e confiável
              no Litoral Norte, oferecendo produtos eletrônicos, suporte
              e assistência com qualidade e compromisso.
            </p>
          </div>
        </div>
      </section>

    </main>
  )
}