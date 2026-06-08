import bannerDivulgacao from "../assets/banner.jpg";
import Icon from "../components/Icon";

export default function About() {
  return (
    <main className="text-black bg-white">
      {/* HERO */}
       <section
        className="relative w-full overflow-hidden"
        style={{
          backgroundImage: `url(${bannerDivulgacao})`,
          backgroundSize: "cover",
          backgroundPosition: "left center",
          minHeight: "clamp(280px, 75vw, 520px)",
        }}
      />


      {/* QUEM SOMOS */}
      <section className="px-6 py-20 mx-auto max-w-7xl grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <span className="text-[#5b00d6] font-bold uppercase text-xs tracking-widest">
            Quem somos
          </span>
          <h2 className="text-4xl font-extrabold leading-tight mt-3 mb-6">
            Tecnologia mais acessível
            <br />
            para a nossa região
          </h2>
          <div className="space-y-4 text-[17px] text-black/65 leading-relaxed">
            <p>
              A ASTRO surgiu ao identificarmos uma necessidade real do Litoral
              Norte: a falta de opções confiáveis para compra de eletrônicos e
              assistência técnica especializada.
            </p>
            <p>
              Nosso objetivo é aproximar tecnologia, atendimento e suporte em um
              só lugar, oferecendo praticidade, segurança e soluções pensadas
              para quem vive na região.
            </p>
          </div>
        </div>

        {/* Card propósito */}
        <div className="bg-[#f2ebff] rounded-3xl p-10 border border-[#5b00d6]/10">
          <div className="flex items-start justify-between gap-4 mb-6">
            <h3 className="text-2xl font-bold text-[#5b00d6] leading-snug">
              Nosso propósito
            </h3>
            <div className="shrink-0 w-14 h-14 rounded-full border-2 border-[#5b00d6]/30 bg-white flex items-center justify-center shadow-sm">
              <Icon name="analytics-outline" className="text-[#5b00d6] text-3xl" />
            </div>
          </div>
          <p className="text-[17px] text-black/70 leading-relaxed">
            Resolver o déficit de demanda e acesso a aparelhos eletrônicos no
            Litoral Norte, conectando clientes a produtos, suporte e assistência
            de forma mais rápida, organizada e confiável.
          </p>
        </div>
      </section>

      {/* O QUE BUSCAMOS RESOLVER */}
      <section className="bg-[#fafafa] border-y border-black/5 py-20 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="text-center mb-14">
            <span className="text-[#5b00d6] font-bold uppercase text-xs tracking-widest">
              Nossos focos
            </span>
            <h2 className="text-4xl font-extrabold mt-3">
              O que buscamos resolver
            </h2>
            <p className="text-black/55 text-lg mt-3 max-w-xl mx-auto">
              A ASTRO foi pensada para atender necessidades reais da região.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: "cart-outline",
                title: "Compra de eletrônicos",
                desc: "Mais facilidade para encontrar aparelhos e acessórios tecnológicos com qualidade e garantia.",
              },
              {
                icon: "construct-outline",
                title: "Assistência técnica",
                desc: "Apoio completo para manutenção, reparos e suporte técnico especializado na região.",
              },
              {
                icon: "location-outline",
                title: "Foco no Litoral Norte",
                desc: "Atendimento próximo e personalizado para Caraguatatuba, Ubatuba, São Sebastião e região.",
              },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                className="bg-white border border-black/[0.07] rounded-3xl p-8"
              >
                <div className="w-14 h-14 rounded-2xl bg-[#5b00d6] flex items-center justify-center mb-6">
                  <Icon name={icon} className="text-white text-2xl" />
                </div>
                <h3 className="text-xl font-bold mb-3">{title}</h3>
                <p className="text-black/60 text-[16px] leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MISSÃO */}
      <section className="px-6 py-20 mx-auto max-w-7xl">
        <div className="bg-gradient-to-br from-[#3a009a] to-[#6d00ff] rounded-3xl p-10 md:p-14 flex flex-col md:flex-row gap-8 items-start md:items-center">
          <div className="shrink-0 w-20 h-20 rounded-2xl bg-white/10 flex items-center justify-center">
            <Icon name="rocket-outline" className="text-white text-5xl" />
          </div>
          <div>
            <h2 className="text-3xl font-extrabold text-white mb-4">
              Nossa missão
            </h2>
            <p className="text-white/85 text-lg leading-relaxed max-w-3xl">
              Tornar o acesso à tecnologia mais simples, próximo e confiável no
              Litoral Norte, oferecendo produtos eletrônicos, suporte e
              assistência com qualidade e compromisso.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}