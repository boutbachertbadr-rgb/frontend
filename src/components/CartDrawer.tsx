"use client";

import { X, Trash2, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCartStore, CartItem } from "@/store/cart";
import { trackInitiateCheckout } from "@/lib/pixels";

const EMPTY_IMG = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";

const CROSS_SELL = [
  {
    key: "vazlina-brisa",
    href: "/products/vazlina-brisa",
    name: "Vazlina Brisa",
    price: "₡33,572 CRC",
    image: "/images/products/brisa-hero.jpg",
  },
  {
    key: "vazlina-guardian",
    href: "/products/vazlina-guardian",
    name: "Vazlina Guardián",
    price: "₡34,972 CRC",
    image: "/images/products/guardian-hero.jpg",
  },
  {
    key: "vazlina-mariposa",
    href: "/products/vazlina-mariposa",
    name: "Vazlina Mariposa",
    price: "₡36,372 CRC",
    image: "/images/products/mariposa-hero.jpg",
  },
];

type ProductKey = "vazlina-brisa" | "vazlina-guardian" | "vazlina-mariposa";

function getProductKey(id: string): ProductKey | "" {
  if (id.includes("brisa")) return "vazlina-brisa";
  if (id.includes("guardian")) return "vazlina-guardian";
  if (id.includes("mariposa")) return "vazlina-mariposa";
  return "";
}

function getCrossSells(items: CartItem[]) {
  if (items.length === 0) return [];
  const cartKeys = items.map((item) => getProductKey(item.id)).filter(Boolean) as ProductKey[];
  return CROSS_SELL.filter((product) => !cartKeys.includes(product.key as ProductKey));
}

export default function CartDrawer() {
  const { items, ui, closeCart, removeItem, openCheckout, subtotal } = useCartStore();
  const crossSells = getCrossSells(items);

  const handleCheckout = () => {
    trackInitiateCheckout(subtotal());
    openCheckout();
  };

  if (!ui.isCartOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={closeCart}
        aria-hidden="true"
      />
      <aside
        className="fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 flex flex-col shadow-2xl"
        role="dialog"
        aria-label="Carrito de compras"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="font-heading font-bold text-lg">Tu pedido</h2>
          <button onClick={closeCart} className="p-1 hover:text-brand transition-colors" aria-label="Cerrar carrito">
            <X size={22} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-gray-400">
              <ShoppingBag size={48} strokeWidth={1} />
              <p className="font-medium">Aún no has elegido tu solución.</p>
              <button onClick={closeCart} className="btn-primary text-sm">
                Encuentra lo que necesitas
              </button>
            </div>
          ) : (
            <>
              {/* Items */}
              {items.map((item) => (
                <div key={item.id} className="flex gap-3 items-start">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-subtle shrink-0">
                    <Image src={item.image} alt={item.name} fill className="object-cover" unoptimized />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-sm leading-tight truncate">{item.name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">Cantidad: {item.quantity}</p>
                    <p className="text-sm font-bold text-brand mt-1">
                      ₡{(item.pricePerItem * item.quantity * 28).toLocaleString("es-CR")} CRC
                    </p>
                  </div>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="p-1 text-gray-400 hover:text-brand-dark transition-colors"
                    aria-label="Eliminar"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}

              {/* Cross-sells */}
              {crossSells.length > 0 && (
                <div className="rounded-xl border border-brand/20 bg-brand-light p-3">
                  <p className="text-xs font-semibold text-brand mb-2 uppercase tracking-wide">
                    Completa tu experiencia
                  </p>
                  <div className="space-y-3">
                    {crossSells.map((product) => (
                      <Link key={product.key} href={product.href} onClick={closeCart} className="flex items-center gap-3">
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-white">
                          <Image src={product.image} alt={product.name} fill className="object-cover" unoptimized />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold leading-tight">{product.name}</p>
                          <p className="text-sm text-brand font-bold">{product.price}</p>
                        </div>
                        <span className="text-xs text-brand font-medium border border-brand rounded px-2 py-1 shrink-0">
                          Ver →
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-4 border-t border-border space-y-3">
            <div className="flex justify-between font-heading font-bold text-lg">
              <span>Total</span>
              <span>₡{(subtotal() * 28).toLocaleString("es-CR")} CRC</span>
            </div>
            <p className="text-xs text-gray-500 text-center">
              Pagas al recibir. Sin tarjeta, sin riesgo.
            </p>
            <button onClick={handleCheckout} className="btn-primary w-full text-base">
              Ordenar ahora →
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
