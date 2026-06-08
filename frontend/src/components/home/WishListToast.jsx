import { useEffect, useState } from "react";
import { IoStar, IoStarOutline } from "react-icons/io5";

export default function WishlistToast({ message, type = "added", onDone }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const hide = setTimeout(() => setVisible(false), 2500);
    const done = setTimeout(() => onDone(), 3200);
    return () => {
      clearTimeout(hide);
      clearTimeout(done);
    };
  }, [onDone]);

  const isAdded = type === "added";

  return (
    <div
      className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-white border border-purple-200 shadow-lg rounded-full px-5 py-3 transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
      }`}
    >
      {isAdded ? (
        <IoStar size={16} className="text-purple-600 shrink-0" />
      ) : (
        <IoStarOutline size={16} className="text-purple-600 shrink-0" />
      )}
      <p className="text-sm text-gray-700 font-medium whitespace-nowrap">
        <span className="text-purple-600 font-semibold">"{message}"</span>{" "}
        {isAdded ? "adicionado à" : "removido da"} lista de desejos
      </p>
    </div>
  );
}
