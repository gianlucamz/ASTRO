import { useState } from "react";

const menuSections = [
  {
    title: "Explorar",
    items: ["Mais Vendidos", "Novidades na ASTRO", "Produtos em Alta"],
  },
  {
    title: "Categorias",
    items: [
      "Hardware",
      "Periféricos",
      "Computadores",
      "Smartphones",
      "Games",
      "Diversos",
    ],
  },
  {
    title: "Configurações",
    items: ["Sua Conta", "Faça seu Login", "Contato"],
  },
];

export default function Sidebar() {
  const [activeItem, setActiveItem] = useState(null);

  return (
    <div className="flex bg-gray-100">
      <aside className="w-56 bg-white border-r border-gray-200 flex flex-col justify-between py-6 px-4 shrink-0 sticky top-0 h-screen">
        <nav className="flex flex-col gap-6">
          {menuSections.map((section) => (
            <div key={section.title} className="border-b border-gray-400 pb-4">
              <p className="text-sm font-semibold text-gray-800 mb-2">
                {section.title}
              </p>
              <ul className="flex flex-col gap-1">
                {section.items.map((item) => (
                  <li key={item}>
                    <button
                      onClick={() => setActiveItem(item)}
                      className={`w-full text-left text-sm px-2 py-1 rounded-md transition-colors cursor-pointer ${
                        activeItem === item
                          ? " text-gray-700 font-medium"
                          : "text-gray-800 hover:bg-gray-100 hover:text-gray-900"
                      }`}
                    >
                      {item}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>

        <div className="bg-white shadow rounded-xl p-4 text-black">
          <p className="font-bold text-md mb-1 leading-tight">
            Enfrentando algum problema?
          </p>
          <p className="text-xs text-black mb-3 font-inter font-semibold">
            Entre em contato com nosso suporte especializado!
          </p>
          <button className="w-full bg-purple-900 text-white text-sm font-semibold py-3 rounded-3xl cursor-pointer">
            Saiba Mais
          </button>
        </div>
      </aside>
    </div>
  );
}
