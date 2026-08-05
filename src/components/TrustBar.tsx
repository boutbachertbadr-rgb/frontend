import { Truck, ShieldCheck, BadgeCheck } from "lucide-react";

const items = [
  { icon: Truck, text: "Llega en 3-5 días a tu puerta" },
  { icon: ShieldCheck, text: "Pagas solo cuando lo tienes" },
  { icon: BadgeCheck, text: "30 días para sentir la diferencia" },
];

export default function TrustBar() {
  return (
    <div className="bg-brand text-white">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm font-medium">
          {items.map(({ icon: Icon, text }) => (
            <div key={text} className="flex items-center gap-2">
              <Icon size={16} className="shrink-0" />
              <span>{text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
