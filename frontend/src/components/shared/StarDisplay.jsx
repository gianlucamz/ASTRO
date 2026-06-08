import { FaStar, FaStarHalfAlt } from "react-icons/fa";

export default function StarDisplay({ rating, size = "text-sm" }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => {
        if (rating >= star)
          return <FaStar key={star} className={`${size} text-purple-600`} />;
        if (rating >= star - 0.5)
          return (
            <FaStarHalfAlt key={star} className={`${size} text-purple-600`} />
          );
        return <FaStar key={star} className={`${size} text-gray-200`} />;
      })}
    </div>
  );
}
