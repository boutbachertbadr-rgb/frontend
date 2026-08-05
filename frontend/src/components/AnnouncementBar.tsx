"use client";

import { useState, useEffect } from "react";
import { Truck, HandCoins, Clock, Shield } from "lucide-react";

const MESSAGES = [
  { icon: Truck, text: "Envío gratis Costa Rica" },
  { icon: HandCoins, text: "Pago al recibir" },
  { icon: Clock, text: "3-5 días hábiles" },
  { icon: Shield, text: "30 días sin riesgo" },
];

export default function AnnouncementBar() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % MESSAGES.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const { icon: Icon, text } = MESSAGES[index];

  return (
    <div className="bg-brand text-white py-2.5 text-sm font-semibold sticky top-0 z-50 transition-all duration-300">
      <div className="flex items-center justify-center gap-2 px-4">
        <Icon className="w-4 h-4 flex-shrink-0" />
        <span className="transition-opacity duration-300 ease-in-out whitespace-nowrap tracking-wide">
          {text}
        </span>
      </div>
    </div>
  );
}
