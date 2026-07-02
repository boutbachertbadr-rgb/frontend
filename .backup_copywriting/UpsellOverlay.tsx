"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCartStore, CartItem } from "@/store/cart";
import { pickUpsell } from "@/lib/upsell";
import { generateEventId, trackPurchase } from "@/lib/pixels";
import { createOrder } from "@/lib/api";

const UPSELL_SECONDS = 12;

export default function UpsellOverlay() {
  const { items, ui, customerForm, closeUpsell, clearCart } = useCartStore();
  const [seconds, setSeconds] = useState(UPSELL_SECONDS);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const router = useRouter();
  const upsell = pickUpsell(items);

  useEffect(() => {
    if (!ui.isUpsellOpen) return;
    setSeconds(UPSELL_SECONDS);
    timerRef.current = setInterval(() => {
      setSeconds((s: number) => {
        if (s <= 1) {
          clearInterval(timerRef.current!);
          handleContinue(false);
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ui.isUpsellOpen]);

  async function handleContinue(didAccept: boolean) {
    clearInterval(timerRef.current!);
    closeUpsell();

    const upsellCartItem: CartItem = {
      id: upsell.id,
      name: upsell.name,
      quantity: 1,
      pricePerItem: upsell.discountPrice,
      image: upsell.image,
    };
    const finalItems: CartItem[] = didAccept ? [...items, upsellCartItem] : items;
    const total = finalItems.reduce((acc: number, i: CartItem) => acc + i.pricePerItem * i.quantity, 0);
    const eventId = generateEventId();

    const orderItems = finalItems.map((i: CartItem) => ({
      product_name: i.name,
      quantity: i.quantity,
      price_per_item: i.pricePerItem,
    }));

    try {
      const res = await createOrder({
        customer_name: customerForm?.name ?? "",
        customer_phone: customerForm?.phone ?? "",
        customer_state: customerForm?.state ?? "",
        customer_city: customerForm?.city ?? "",
        customer_address: customerForm?.address ?? "",
        items: orderItems,
        is_upsell_accepted: didAccept,
        total_price: total,
        browser_event_id: eventId,
      });

      trackPurchase(total, eventId);
      clearCart();
      router.push(`/thank-you?order_id=${res.order_id}&total=${total.toFixed(2)}&upsell=${didAccept}`);
    } catch (err) {
      console.error("Error al crear la orden:", err);
      // Even if API fails, show the real total so customer sees what they ordered
      router.push(`/thank-you?order_id=PENDIENTE&total=${total.toFixed(2)}&upsell=${didAccept}`);
    }
  }

  if (!ui.isUpsellOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-sm shadow-2xl overflow-hidden">
        <div className="h-1.5 bg-gray-100">
          <div
            className="h-full bg-brand transition-all duration-1000 ease-linear"
            style={{ width: `${(seconds / UPSELL_SECONDS) * 100}%` }}
          />
        </div>
        <div className="p-6 space-y-4">
          <div className="text-center">
            <span className="inline-block bg-accent/10 text-accent text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
              Solo por tiempo limitado · {seconds}s
            </span>
            <h3 className="font-heading font-bold text-xl mt-3">¿Completa tu experiencia con {upsell.name}?</h3>
            <p className="text-sm text-gray-500 mt-1">{upsell.description}</p>
          </div>
          <div className="flex items-center gap-4 bg-subtle rounded-xl p-4">
            <div className="relative w-20 h-20 rounded-lg overflow-hidden shrink-0">
              <Image src={upsell.image} alt={upsell.name} fill className="object-cover" />
            </div>
            <div>
              <p className="font-semibold text-sm">{upsell.name}</p>
              <p className="text-gray-400 text-sm line-through">${upsell.originalPrice.toFixed(2)} MXN</p>
              <p className="text-brand font-bold text-lg">${upsell.discountPrice.toFixed(2)} MXN</p>
            </div>
          </div>
          <button onClick={() => handleContinue(true)} className="btn-primary w-full text-base">
            Sí, quiero la experiencia completa
          </button>
          <button
            onClick={() => handleContinue(false)}
            className="w-full text-sm text-gray-400 hover:text-gray-600 transition-colors py-1"
          >
            No, con esto es suficiente
          </button>
        </div>
      </div>
    </div>
  );
}
