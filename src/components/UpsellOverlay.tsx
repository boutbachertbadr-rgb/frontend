"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Loader2, Check } from "lucide-react";
import { useCartStore, CartItem } from "@/store/cart";
import { getAvailableUpsells, UpsellProduct } from "@/lib/upsell";
import { generateEventId, trackPurchase } from "@/lib/pixels";
import { createOrder } from "@/lib/api";

const UPSELL_SECONDS = 20;

export default function UpsellOverlay() {
  const { items, ui, customerForm, closeUpsell, clearCart } = useCartStore();
  const [seconds, setSeconds] = useState(UPSELL_SECONDS);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const router = useRouter();
  const availableUpsells = getAvailableUpsells(items);

  useEffect(() => {
    if (!ui.isUpsellOpen) return;

    if (availableUpsells.length === 0) {
      closeUpsell();
      return;
    }

    setIsProcessing(false);
    setSeconds(UPSELL_SECONDS);
    // Auto-select all available by default
    setSelectedIds(new Set(availableUpsells.map((u) => u.id)));

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
    return () => {
      clearInterval(timerRef.current!);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ui.isUpsellOpen]);

  function toggleSelection(id: string) {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }

  function handleContinue(didAccept: boolean) {
    clearInterval(timerRef.current!);
    closeUpsell();

    const selectedUpsells = didAccept
      ? availableUpsells.filter((u) => selectedIds.has(u.id))
      : [];

    const upsellItems: CartItem[] = selectedUpsells.map((u) => ({
      id: u.id,
      name: u.name,
      quantity: 1,
      pricePerItem: u.discountPrice,
      image: u.image,
    }));

    const finalItems: CartItem[] = [...items, ...upsellItems];
    const total = finalItems.reduce((acc: number, i: CartItem) => acc + i.pricePerItem * i.quantity, 0);
    const eventId = generateEventId();
    const orderId = Math.floor(Math.random() * 6700) + 800;

    const orderItems = finalItems.map((i: CartItem) => ({
      product_name: i.name,
      quantity: i.quantity,
      price_per_item: i.pricePerItem,
    }));

    const hasUpsell = upsellItems.length > 0;

    router.push(`/thank-you?order_id=${orderId}&total=${total.toFixed(2)}&upsell=${hasUpsell}`);
    clearCart(); // Always clear immediately — prevents stale items affecting next upsell

    createOrder({
      customer_name: customerForm?.name ?? "",
      customer_phone: customerForm?.phone ?? "",
      customer_state: customerForm?.state ?? "",
      customer_city: customerForm?.city ?? "",
      customer_address: customerForm?.address ?? "",
      items: orderItems,
      is_upsell_accepted: hasUpsell,
      total_price: total,
      browser_event_id: eventId,
    }).then(() => {
      trackPurchase(total, eventId);
    }).catch(() => {
      // Silent fail
    });
  }

  if (!ui.isUpsellOpen) return null;

  const totalSavings = availableUpsells
    .filter((u) => selectedIds.has(u.id))
    .reduce((acc, u) => acc + (u.originalPrice - u.discountPrice), 0);

  const selectedCount = selectedIds.size;

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
        <div className="h-1.5 bg-gray-100">
          <div
            className="h-full bg-brand transition-all duration-1000 ease-linear"
            style={{ width: `${(seconds / UPSELL_SECONDS) * 100}%` }}
          />
        </div>
        <div className="p-6 space-y-4">
          {isProcessing ? (
            <div className="py-12 text-center space-y-4">
              <Loader2 className="w-10 h-10 text-brand mx-auto animate-spin" />
              <div>
                <p className="font-heading font-bold text-lg text-text-primary">Procesando tu pedido...</p>
                <p className="text-sm text-gray-500 mt-1">Esto solo tomará unos segundos</p>
              </div>
            </div>
          ) : (
            <>
              <div className="text-center">
                <span className="inline-block bg-accent/10 text-accent text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                  Solo por tiempo limitado · {seconds}s
                </span>
                <h3 className="font-heading font-bold text-xl mt-3">
                  Completa tu pedido con descuento exclusivo
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  Selecciona los productos que quieres agregar. Precio especial solo disponible ahora.
                </p>
              </div>

              <div className="space-y-3">
                {availableUpsells.map((upsell) => {
                  const isSelected = selectedIds.has(upsell.id);
                  return (
                    <div
                      key={upsell.id}
                      onClick={() => toggleSelection(upsell.id)}
                      className={`flex items-start gap-3 rounded-xl p-4 cursor-pointer transition-all border-2 ${
                        isSelected
                          ? "bg-brand/5 border-brand"
                          : "bg-subtle border-transparent"
                      }`}
                    >
                      {/* Checkbox */}
                      <div
                        className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                          isSelected
                            ? "bg-brand text-white"
                            : "bg-white border-2 border-gray-300"
                        }`}
                      >
                        {isSelected && <Check className="w-4 h-4" />}
                      </div>

                      {/* Image */}
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden shrink-0">
                        <Image
                          src={upsell.image}
                          alt={upsell.name}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm">{upsell.name}</p>
                        <p className="text-gray-400 text-xs line-through">
                          ${upsell.originalPrice.toFixed(2)} MXN
                        </p>
                        <div className="flex items-center gap-2 mt-0.5">
                          <p className="text-brand font-bold text-base">
                            ${upsell.discountPrice.toFixed(2)} MXN
                          </p>
                          <span className="bg-accent/10 text-accent text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                            -${(upsell.originalPrice - upsell.discountPrice).toFixed(0)}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Total savings */}
              {selectedCount > 0 && (
                <div className="text-center">
                  <p className="text-sm text-text-secondary">
                    {selectedCount} producto{selectedCount > 1 ? "s" : ""} seleccionado{selectedCount > 1 ? "s" : ""}
                  </p>
                  <p className="text-brand font-bold text-lg">
                    Ahorras ${totalSavings.toFixed(2)} MXN
                  </p>
                </div>
              )}

              {/* CTA Buttons */}
              <button
                onClick={() => handleContinue(true)}
                disabled={selectedCount === 0}
                className={`w-full text-base py-3 rounded-xl font-bold transition-colors ${
                  selectedCount > 0
                    ? "btn-primary"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"
                }`}
              >
                {selectedCount > 0
                  ? `Sí, agregar ${selectedCount} a mi pedido`
                  : "Selecciona al menos un producto"}
              </button>

              <button
                onClick={() => handleContinue(false)}
                className="w-full text-sm text-gray-400 hover:text-gray-600 transition-colors py-1"
              >
                No, gracias. Solo con mi pedido actual
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
