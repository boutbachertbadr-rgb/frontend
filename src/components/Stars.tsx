import { Star } from "lucide-react";

interface StarsProps {
  rating?: number;
  count?: number;
}

export default function Stars({ rating = 4.8, count = 1547 }: StarsProps) {
  const full = Math.floor(rating);
  const partial = rating - full >= 0.5;

  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={16}
            className={
              i < full
                ? "fill-accent text-accent"
                : i === full && partial
                ? "fill-accent/40 text-accent"
                : "fill-gray-200 text-gray-300"
            }
          />
        ))}
      </div>
      <span className="text-sm text-text-secondary font-medium">
        {rating.toFixed(1)} <span className="text-text-secondary/60">({count.toLocaleString("es-CR")} reseñas)</span>
      </span>
    </div>
  );
}
