import Hero from "../components/Hero";
import Sidebar from "../components/Sidebar";

export default function Home() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 flex items-start justify-center text-gray-400 text-sm mt-8">
        <Hero />
      </main>
    </div>
  );
}
