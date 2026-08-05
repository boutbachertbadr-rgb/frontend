import { Star, ChevronUp } from "lucide-react";

interface BreakdownItem {
  stars: number;
  count: number;
}

interface RatingBreakdownProps {
  rating: number;
  totalCount: number;
  breakdown: BreakdownItem[];
  showBadge?: boolean;
}

export default function RatingBreakdown({
  rating,
  totalCount,
  breakdown,
  showBadge = true,
}: RatingBreakdownProps) {
  const maxCount = Math.max(...breakdown.map((b) => b.count), 1);

  return (
    <div className="w-full max-w-sm mx-auto">
      {showBadge && (
        <div className="inline-flex items-center gap-2 border border-border rounded-lg px-3 py-1.5 mb-4">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                size={14}
                className="fill-accent text-accent"
              />
            ))}
          </div>
          <span className="text-sm font-bold text-text-primary">
            {totalCount.toLocaleString("es-CR")} Reseñas
          </span>
          <ChevronUp size={14} className="text-text-secondary" />
        </div>
      )}

      {/* Big rating */}
      <div className="flex items-center justify-center gap-2 mb-4">
        <Star size={32} className="fill-accent text-accent" />
        <span className="font-heading font-bold text-4xl text-text-primary">
          {rating.toFixed(1)}
        </span>
      </div>

      {/* Bars */}
      <div className="space-y-2">
        {breakdown.map((item) => {
          const percent =
            maxCount > 0 ? (item.count / maxCount) * 100 : 0;
          return (
            <div key={item.stars} className="flex items-center gap-3">
              {/* Stars label */}
              <div className="flex items-center gap-0.5 shrink-0 w-[72px]">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className={
                      i < item.stars
                        ? "fill-text-primary text-text-primary"
                        : "fill-gray-200 text-gray-300"
                    }
                  />
                ))}
              </div>

              {/* Bar */}
              <div className="flex-1 h-2.5 bg-gray-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gray-400 rounded-full transition-all"
                  style={{ width: `${percent}%` }}
                />
              </div>

              {/* Count */}
              <span className="text-sm text-text-secondary w-16 text-right shrink-0">
                ({item.count.toLocaleString("es-CR")})
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
