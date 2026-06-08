import BannerLitoral from "../assets/bannerLitoral.png";

import Hero from "../components/Hero";
import Sidebar from "../components/Sidebar";
import ProductRow from "../components/home/ProductRow";
import BrandRow from "../components/home/BrandRow";

export default function Home() {
  return (
    <div className="flex">
      {/* Sidebar: visível apenas no desktop */}
      <div className="hidden lg:block">
        <Sidebar />
      </div>

      <main className="flex-1 min-w-0 flex flex-col text-gray-400 text-sm px-4 md:px-10 lg:px-20 mt-6 md:mt-8 lg:mt-10 mb-10">
        <Hero />
        <ProductRow fileira="destaques" title="Destaques" />
        <ProductRow fileira="promocoes" title="Promoções" />
        <BrandRow />
        <ProductRow fileira="hardware" title="Hardware" />
        <ProductRow fileira="perifericos" title="Periféricos" />
        <ProductRow fileira="computadores" title="Computadores" />
        <ProductRow fileira="smartphones" title="Smartphones" />
        <ProductRow fileira="games" title="Games" />
        <ProductRow fileira="diversos" title="Diversos" />
        <div className="mt-10 md:mt-14 mb-14">
          <img
            src={BannerLitoral}
            alt="Frete grátis para todo o Litoral Norte - SP"
            className="w-full shadow-lg rounded-lg"
            style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.18)" }}
          />
        </div>
      </main>
    </div>
  );
}