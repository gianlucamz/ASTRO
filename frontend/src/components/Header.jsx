import logo from "../assets/astroLogoHeader.png";
import title from "../assets/astroTitle.png";
import Icon from "./Icon";

export default function Header() {
  return (
    <header
      className="w-full bg-white relative z-10"
      style={{
        boxShadow: "0 4px 16px rgba(0,0,0,0.18)",
        position: "sticky",
        top: 0,
      }}
    >
      <div className="flex items-center">
        {/* Seção da esquerda (logo, search bar) */}
        <div className="p-1 ml-14 flex gap-14 items-center">
          <img
            src={logo}
            className="w-20 max-w-none cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          />

          <div className="relative flex-1 max-w-100">
            <input
              type="text"
              placeholder="Busque na ASTRO..."
              className="w-full border border-gray-400 py-1 text-sm max-h-8 bg-gray-200 pl-5 pr-40 focus:outline-none font-inter"
            />

            <Icon
              name="search-outline"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 text-base cursor-pointer"
            />
          </div>
        </div>

        {/* Seção do centro (logo central) */}
        <img
          src={title}
          className="h-14 absolute left-1/2 -translate-x-1/2 cursor-pointer"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        />

        {/* Seção da direita (contato, cep, carrinho, modo claro/escuro, conta) */}
        <div className="flex items-center ml-auto font-inter mr-16 gap-14">
          <span className="cursor-pointer text-sm">Contato</span>

          <div className="flex items-center gap-1 cursor-pointer">
            <Icon name="location-outline" className="text-xl" />

            <span className="text-sm mr-2">Informe seu CEP</span>
          </div>

          <Icon name="cart-outline" className="text-3xl cursor-pointer" />

          <Icon name="star-outline" className="text-3xl cursor-pointer" />

          <Icon
            name="person-circle-outline"
            className="text-3xl cursor-pointer"
          />
        </div>
      </div>
    </header>
  );
}
