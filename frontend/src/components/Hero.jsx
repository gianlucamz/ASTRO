import bannerHero from "../assets/tempBannerAstroOffers.png";

export default function Hero() {
  return (
    <img
      src={bannerHero} alt="Ofertas do dia na ASTRO" className="w-full mb-6 md:mb-8 rounded-lg"
    />
  );
}