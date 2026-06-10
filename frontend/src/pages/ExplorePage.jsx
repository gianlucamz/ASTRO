import { useParams } from "react-router-dom";
import ProductRow from "../components/home/ProductRow";

const EXPLORE_MAP = {
  "mais-vendidos": { fileira: "destaques", title: "Mais Vendidos" },
  "novidades": { fileira: "novidades", title: "Novidades na ASTRO" },
  "avaliacao-estelar": { fileira: "avaliacao-estelar", title: "Avaliação Estelar" },
};

export default function ExplorePage() {
  const { slug } = useParams();
  const explore = EXPLORE_MAP[slug];

  if (!explore) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500">
        <p className="text-xl font-semibold">Página não encontrada.</p>
      </div>
    );
  }

  return (
    <div className="flex">
      <main className="flex-1 min-w-0 flex flex-col text-gray-400 text-sm px-4 md:px-10 lg:px-20 mt-6 md:mt-8 lg:mt-10 mb-10">
        <ProductRow fileira={explore.fileira} title={explore.title} />
      </main>
    </div>
  );
}