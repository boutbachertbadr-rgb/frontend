"use client";

import { useState, useEffect } from "react";
import { useCartStore } from "@/store/cart";
import { trackAddToCart } from "@/lib/pixels";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";

interface Offer {
  qty: number;
  price: number;
  label: string;
}

interface Props {
  productId: string;
  productName: string;
  offers: Offer[];
  image: string;
  selectedOffer?: number;
  onSelectOffer?: (index: number) => void;
}

export default function StickyAddToCart({ productId, productName, offers, image, selectedOffer, onSelectOffer }: Props) {
  const [visible, setVisible] = useState(false);
  const [internalSelected, setInternalSelected] = useState(1);
  const selected = selectedOffer ?? internalSelected;
  const setSelected = onSelectOffer ?? setInternalSelected;
  const { addItem, openCart } = useCartStore();

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 600);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAdd = () => {
    const offer = offers[selected];
    addItem({
      id: `${productId}-${offer.qty}`,
      name: `${productName} (${offer.qty} ${offer.qty === 1 ? "unidad" : "unidades"})`,
      quantity: 1,
      pricePerItem: offer.price,
      image,
    });
    trackAddToCart(productName, offer.price);
    openCart();
  };

  if (!visible) return null;

  const offer = offers[selected];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-border shadow-[0_-2px_12px_rgba(0,0,0,0.06)] animate-in slide-in-from-bottom duration-300">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-3">
        {/* Product info */}
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-subtle flex-shrink-0">
            {image ? (
              <Image src={image} alt={productName} fill className="object-cover" unoptimized />
            ) : (
              <div className="w-full h-full bg-subtle" />
            )}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-bold text-text-primary truncate">{productName}</p>
            <p className="text-xs text-text-secondary">{offer.label} · ₡{(offer.price * 28).toLocaleString("es-CR")} CRC</p>
          </div>
        </div>

        {/* Offer switcher - small pills */}
        <div className="hidden sm:flex items-center gap-1.5">
          {offers.map((o, i) => (
            <button
              key={o.qty}
              onClick={() => setSelected(i)}
              className={`text-[11px] font-semibold px-2 py-1 rounded-full transition-all ${
                selected === i
                  ? "bg-brand text-white"
                  : "bg-background text-text-secondary hover:bg-subtle"
              }`}
            >
              {o.qty}u
            </button>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={handleAdd}
          className="flex-shrink-0 bg-brand text-white font-bold text-sm rounded-lg h-11 px-5 flex items-center gap-2 hover:bg-brand-dark active:scale-[0.98] transition-all"
        >
          Ordenar ahora
          <ArrowUpRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
