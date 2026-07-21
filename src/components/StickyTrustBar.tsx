"use client";

import { Truck, Banknote, RefreshCw, Headphones } from "lucide-react";

const ITEMS = [
  { icon: Truck, line1: "Envío Gratis", line2: "3-5 días a todo Costa Rica" },
  { icon: Banknote, line1: "Pago al Recibir", line2: "Sin tarjeta, sin riesgo" },
  { icon: RefreshCw, line1: "30 Días Sin Riesgo", line2: "Si no sientes la diferencia" },
  { icon: Headphones, line1: "Soporte Real", line2: "Llamada directa" },
];

export default function StickyTrustBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-border shadow-[0_-2px_12px_rgba(0,0,0,0.06)]">
      <div className="max-w-7xl mx-auto px-3 py-2.5">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {ITEMS.map(({ icon: Icon, line1, line2 }) => (
            <div key={line1} className="flex items-center gap-2">
              <Icon className="w-4 h-4 text-text-secondary flex-shrink-0" />
              <div className="leading-tight">
                <p className="text-[11px] font-bold text-text-primary">{line1}</p>
                <p className="text-[10px] text-text-secondary">{line2}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
