"use client";

import { X, ShieldCheck, Phone, Truck, AlertCircle } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCartStore } from "@/store/cart";
import { MX_PHONE_REGEX } from "@/lib/phone";
import { useRouter } from "next/navigation";
import { getAvailableUpsells } from "@/lib/upsell";
import { generateEventId, trackPurchase } from "@/lib/pixels";
import { createOrder } from "@/lib/api";
const schema = z.object({
  name: z.string().min(2, "Ingresa tu nombre completo."),
  phone: z.string().regex(MX_PHONE_REGEX, "Número inválido. Ingresa 10 dígitos MX."),
  state: z.string().min(2, "Ingresa tu estado."),
  city: z.string().min(2, "Ingresa tu ciudad o municipio."),
  address: z.string().min(5, "Ingresa tu dirección completa."),
});

type CheckoutForm = z.infer<typeof schema>;

export default function CheckoutModal() {
  const { items, ui, closeCheckout, openUpsell, subtotal, clearCart } = useCartStore();
const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, touchedFields },
  } = useForm<CheckoutForm>({
    resolver: zodResolver(schema),
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  if (!ui.isCheckoutOpen) return null;

  const onSubmit = (data: CheckoutForm) => {
  const available = getAvailableUpsells(items);
  if (available.length === 0) {
    // Client khad koulchi — matel3ch popup
    const lastOrderId = parseInt(localStorage.getItem("vazlina_last_order_id") ?? "799");
    const orderId = lastOrderId + 1;
    localStorage.setItem("vazlina_last_order_id", String(orderId));
    const eventId = generateEventId();
    const total = subtotal();
    const orderItems = items.map((i) => ({
      product_name: i.name,
      quantity: i.quantity,
      price_per_item: i.pricePerItem,
    }));
    router.push(`/thank-you?order_id=${orderId}&total=${total.toFixed(2)}&upsell=false`);
    clearCart();
    createOrder({
      customer_name: data.name,
      customer_phone: data.phone,
      customer_state: data.state,
      customer_city: data.city,
      customer_address: data.address,
      items: orderItems,
      is_upsell_accepted: false,
      total_price: total,
      browser_event_id: eventId,
    }).then(() => {
      trackPurchase(total, eventId);
    }).catch(() => {});
  } else {
    // Kayen products baqiyn — 7el popup
    openUpsell({ name: data.name, phone: data.phone, state: data.state, city: data.city, address: data.address });
  }
};

  return (
    <>
      <div className="fixed inset-0 bg-black/60 z-50" onClick={closeCheckout} aria-hidden="true" />
      <div
        role="dialog"
        aria-label="Confirmar pedido"
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
      >
        <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-5 border-b border-border">
            <h2 className="font-heading font-bold text-xl">Confirma tu pedido</h2>
            <button onClick={closeCheckout} className="p-1 hover:text-brand" aria-label="Cerrar">
              <X size={22} />
            </button>
          </div>

          <div className="p-5 space-y-5">
            {/* Order Summary */}
            <div className="bg-subtle rounded-xl p-4 space-y-2">
              <p className="font-semibold text-sm text-gray-500 uppercase tracking-wide">Tu pedido</p>
              {items.map((item) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-text-primary">
                    {item.name} × {item.quantity}
                  </span>
                  <span className="font-semibold">${(item.pricePerItem * item.quantity).toFixed(2)}</span>
                </div>
              ))}
              <div className="border-t border-border pt-2 flex justify-between font-heading font-bold">
                <span>Total a pagar al recibir</span>
                <span className="text-brand">${subtotal().toFixed(2)} MXN</span>
              </div>
            </div>

            {/* Trust micro */}
            <div className="flex flex-col gap-1.5 text-xs text-gray-600">
              <div className="flex items-center gap-2"><ShieldCheck size={14} className="text-brand" /> Pagas al recibir, sin tarjeta</div>
              <div className="flex items-center gap-2"><Phone size={14} className="text-brand" /> Te llamamos para confirmar tu pedido</div>
              <div className="flex items-center gap-2"><Truck size={14} className="text-brand" /> Llega en 3-5 días a tu puerta</div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold mb-1" htmlFor="name">
                  Nombre y Apellido <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    id="name"
                    type="text"
                    placeholder="Ej. María García"
                    className={`input-field pr-10 ${errors.name ? "border-red-500 bg-red-50 focus:ring-red-200" : ""}`}
                    {...register("name")}
                  />
                  {errors.name && (
                    <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500 pointer-events-none" />
                  )}
                </div>
                {errors.name && (
                  <p className="flex items-center gap-1 text-red-600 text-xs mt-1.5 font-medium">
                    <AlertCircle className="w-3 h-3" />
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold mb-1" htmlFor="phone">
                  Teléfono (10 dígitos MX) <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    id="phone"
                    type="tel"
                    inputMode="numeric"
                    placeholder="Ej. 5512345678"
                    className={`input-field pr-10 ${errors.phone ? "border-red-500 bg-red-50 focus:ring-red-200" : ""}`}
                    {...register("phone")}
                  />
                  {errors.phone && (
                    <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500 pointer-events-none" />
                  )}
                </div>
                {errors.phone && (
                  <p className="flex items-center gap-1 text-red-600 text-xs mt-1.5 font-medium">
                    <AlertCircle className="w-3 h-3" />
                    {errors.phone.message}
                  </p>
                )}
              </div>

              {/* State */}
              <div>
                <label className="block text-sm font-semibold mb-1" htmlFor="state">
                  Provincia / Estado <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    id="state"
                    type="text"
                    placeholder="Ej. CDMX"
                    className={`input-field pr-10 ${errors.state ? "border-red-500 bg-red-50 focus:ring-red-200" : ""}`}
                    {...register("state")}
                  />
                  {errors.state && (
                    <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500 pointer-events-none" />
                  )}
                </div>
                {errors.state && (
                  <p className="flex items-center gap-1 text-red-600 text-xs mt-1.5 font-medium">
                    <AlertCircle className="w-3 h-3" />
                    {errors.state.message}
                  </p>
                )}
              </div>

              {/* City */}
              <div>
                <label className="block text-sm font-semibold mb-1" htmlFor="city">
                  Ciudad / Municipio <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    id="city"
                    type="text"
                    placeholder="Ej. Benito Juárez"
                    className={`input-field pr-10 ${errors.city ? "border-red-500 bg-red-50 focus:ring-red-200" : ""}`}
                    {...register("city")}
                  />
                  {errors.city && (
                    <AlertCircle className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-red-500 pointer-events-none" />
                  )}
                </div>
                {errors.city && (
                  <p className="flex items-center gap-1 text-red-600 text-xs mt-1.5 font-medium">
                    <AlertCircle className="w-3 h-3" />
                    {errors.city.message}
                  </p>
                )}
              </div>

              {/* Address */}
              <div>
                <label className="block text-sm font-semibold mb-1" htmlFor="address">
                  Dirección Completa <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <textarea
                    id="address"
                    rows={3}
                    placeholder="Calle, número, colonia y referencias"
                    className={`input-field resize-none pr-10 ${errors.address ? "border-red-500 bg-red-50 focus:ring-red-200" : ""}`}
                    {...register("address")}
                  />
                  {errors.address && (
                    <AlertCircle className="absolute right-3 top-3 w-5 h-5 text-red-500 pointer-events-none" />
                  )}
                </div>
                {errors.address && (
                  <p className="flex items-center gap-1 text-red-600 text-xs mt-1.5 font-medium">
                    <AlertCircle className="w-3 h-3" />
                    {errors.address.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full text-base py-4"
              >
                {isSubmitting ? "Procesando…" : "Ordenar ahora →"}
              </button>

              <p className="text-center text-xs text-gray-400">
                Sin tarjeta. Sin depósito. Pago al recibir.
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
