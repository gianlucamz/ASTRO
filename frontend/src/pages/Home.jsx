import Hero from "../components/Hero";
import Sidebar from "../components/Sidebar";
import ProductRow from "../components/ProductRow";

export default function Home() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 flex flex-col text-gray-400 text-sm px-20 mt-8">
        <Hero />
        <ProductRow title="Destaques" />
        <ProductRow title="Promoções" />
      </main>
    </div>
  );
}