import { useParams } from "react-router-dom";
import ProductRow from "../components/home/ProductRow";
import BrandRow from "../components/home/BrandRow";

const CATEGORY_MAP = {
  hardware: { fileira: "hardware", title: "Hardware" },
  perifericos: { fileira: "perifericos", title: "Periféricos" },
  computadores: { fileira: "computadores", title: "Computadores" },
  smartphones: { fileira: "smartphones", title: "Smartphones" },
  games: { fileira: "games", title: "Games" },
  diversos: { fileira: "diversos", title: "Diversos" },
};

export default function CategoryPage() {
  const { slug } = useParams();
  const category = CATEGORY_MAP[slug];

  if (!category) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500">
        <p className="text-xl font-semibold">Categoria não encontrada.</p>
      </div>
    );
  }

  return (
    <div className="flex">
      <main className="flex-1 min-w-0 flex flex-col text-gray-400 text-sm px-4 md:px-10 lg:px-20 mt-6 md:mt-8 lg:mt-10 mb-10">
        <ProductRow fileira="destaques" title="Destaques" />
        <ProductRow fileira="promocoes" title="Promoções" />
        <BrandRow />
        <ProductRow fileira={category.fileira} title={category.title} />
      </main>
    </div>
  );
}