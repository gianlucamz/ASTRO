import BannerLitoral from "../assets/bannerLitoral.png";

import Hero from "../components/Hero";
import Sidebar from "../components/Sidebar";
import ProductRow from "../components/home/ProductRow";
import BrandRow from "../components/home/BrandRow";

export default function Home() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 flex flex-col text-gray-400 text-sm px-20 mt-10 mb-10">
        <Hero />
        <ProductRow title="Destaques" />
        <ProductRow title="Promoções" />
        <BrandRow />
        <ProductRow title="Hardware" />
        <ProductRow title="Periféricos" />
        <ProductRow title="Computadores" />
        <ProductRow title="Smartphones" />
        <ProductRow title="Games" />
        <ProductRow title="Diversos" />
        <div className="mt-14 mb-14">
          <img
            src={BannerLitoral}
            alt="Frete grátis para todo o Litoral Norte - SP"
            className="w-full rounded-2xl shadow-lg"
          />
        </div>
      </main>
    </div>
  );
}
