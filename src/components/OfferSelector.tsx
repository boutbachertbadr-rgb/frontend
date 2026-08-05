"use client";

import { useState } from "react";
import { useCartStore } from "@/store/cart";
import { trackAddToCart } from "@/lib/pixels";

export interface Offer {
  qty: number;
  price: number;
  label: string;
}

interface Props {
  productId: string;
  productName: string;
  offers: Offer[];
  image: string;
}

export default function OfferSelector({ productId, productName, offers, image }: Props) {
  const [selected, setSelected] = useState(0);
  const { addItem, openCart } = useCartStore();

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

  return (
    <div className="space-y-3">
      {offers.map((offer, i) => (
        <button
          key={offer.qty}
          onClick={() => setSelected(i)}
          className={`w-full flex items-center justify-between rounded-xl border-2 px-4 py-3 transition-all ${
            selected === i
              ? "border-brand bg-brand-light"
              : "border-border bg-white hover:border-brand/40"
          }`}
        >
          <span className="text-sm font-semibold">{offer.label}</span>
          <span className="font-heading font-bold text-brand">₡{offer.price.toLocaleString("es-CR")} CRC</span>
        </button>
      ))}
      <button onClick={handleAdd} className="btn-primary w-full text-base py-4 mt-2">
        Añadir al Carrito →
      </button>
    </div>
  );
}
