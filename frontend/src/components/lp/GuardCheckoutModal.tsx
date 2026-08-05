"use client";

import { useState } from "react";
import { X, ShieldCheck, Truck, ChevronDown, Zap } from "lucide-react";
import { createOrder } from "@/lib/api";
import { generateEventId } from "@/lib/pixels";

const PROVINCES = ["San José", "Alajuela", "Cartago", "Heredia", "Guanacaste", "Puntarenas", "Limón"];

export interface LPVariant {
  name: string;
  price: number;
  items: { product_name: string; quantity: number; price_per_item: number }[];
}

const ACCENT = "#111111";
const DARK = "#14161A";
const LIGHT = "#FCFAF8";
const SOFT = "#EEF1F4";

export default function GuardCheckoutModal({
  isOpen,
  onClose,
  variant,
}: {
  isOpen: boolean;
  onClose: () => void;
  variant: LPVariant | null;
}) {
  const [express, setExpress] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const EXPRESS_FEE = 2000;
  const total = (variant?.price ?? 0) + (express ? EXPRESS_FEE : 0);

  const handleNativeSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!variant) return;
    setSubmitting(true);
    setSubmitError("");

    const formData = new FormData(e.currentTarget);
    const addr = {
      name: String(formData.get("name") ?? ""),
      phone: String(formData.get("phone") ?? ""),
      state: String(formData.get("state") ?? ""),
      city: String(formData.get("city") ?? ""),
      distrito: String(formData.get("distrito") ?? ""),
      address: String(formData.get("address") ?? ""),
      reference: String(formData.get("reference") ?? ""),
    };
    console.log("[checkout] FormData addr:", addr);

    const errors: Record<string, string> = {};
    if (!addr.name.trim()) errors.name = "Ingresá tu nombre completo";
    if (!addr.phone.trim()) errors.phone = "Ingresá tu teléfono";
    if (!addr.state.trim()) errors.state = "Seleccioná tu provincia";
    if (!addr.city.trim()) errors.city = "Ingresá tu cantón";
    if (!addr.address.trim()) errors.address = "Ingresá tu dirección exacta";
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setSubmitting(false);
      return;
    }
    setFormErrors({});
    setSubmitError("");

    const eventId = generateEventId();

    const orderItems = express
      ? [...variant.items, { product_name: "Envío Express (1-3 días)", quantity: 1, price_per_item: EXPRESS_FEE }]
      : variant.items;

    try {
      const response = await createOrder({
        customer_name: addr.name,
        customer_phone: addr.phone,
        customer_state: addr.state,
        customer_city: addr.city,
        customer_distrito: addr.distrito,
        customer_address: addr.address,
        customer_reference: addr.reference,
        items: orderItems,
        is_upsell_accepted: false,
        total_price: total,
        browser_event_id: eventId,
      });
      console.log("[checkout] createOrder response:", response);
      const realOrderId = response.order_id;
      const updatedPayload = JSON.stringify({
        orderId: realOrderId,
        total: total.toFixed(2),
        addr,
        items: orderItems,
      });
      localStorage.setItem("guard_order", updatedPayload);
      sessionStorage.setItem("guard_order", updatedPayload);
      sessionStorage.setItem("order_status", "confirmed");
      sessionStorage.setItem("guard_pixel_purchase", JSON.stringify({ value: total, eventId, phone: addr.phone }));
      window.location.href = "/guard/thank-you";
    } catch (err) {
      console.error("[checkout] createOrder failed:", err);
      setSubmitError("No se pudo registrar el pedido. Verificá tu conexión o contactá soporte.");
      setSubmitting(false);
    }
  };

  if (!isOpen || !variant) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div
        className="relative w-full sm:max-w-md rounded-t-3xl sm:rounded-2xl shadow-2xl max-h-[92vh] overflow-y-auto"
        style={{ backgroundColor: LIGHT }}
      >
        <div
          className="sticky top-0 z-10 flex items-center justify-between px-5 py-4 rounded-t-3xl sm:rounded-t-2xl"
          style={{ backgroundColor: DARK }}
        >
          <div>
            <p className="text-xs font-semibold tracking-widest" style={{ color: "#C9CDD3" }}>TU PEDIDO</p>
            <p className="text-white font-semibold text-sm mt-0.5 max-w-[200px] truncate">{variant.name}</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="font-heading font-bold text-lg text-white tracking-tight"><span className="text-xs align-top mr-0.5">₡</span>{variant.price}</span>
            <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
              <X size={20} />
            </button>
          </div>
        </div>

        <div className="px-5 py-5 space-y-4">
          <div className="flex justify-around rounded-xl py-3 text-xs font-medium text-gray-600" style={{ backgroundColor: SOFT }}>
            <span className="flex items-center gap-1.5"><Truck size={13} /> Envío gratis</span>
            <span className="flex items-center gap-1.5"><ShieldCheck size={13} /> Pago al recibir</span>
          </div>

          <form onSubmit={handleNativeSubmit} className="space-y-3">
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Nombre completo</label>
              <input name="name" type="text" placeholder="Ana García" className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-neutral-400 bg-white ${formErrors.name ? "border-red-500" : "border-gray-200"}`} />
              {formErrors.name && <p className="text-red-600 text-xs mt-1">{formErrors.name}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Teléfono</label>
              <input name="phone" type="tel" placeholder="8888-0000" className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-neutral-400 bg-white ${formErrors.phone ? "border-red-500" : "border-gray-200"}`} />
              {formErrors.phone && <p className="text-red-600 text-xs mt-1">{formErrors.phone}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Provincia</label>
              <div className="relative">
                <select
                  name="state"
                  className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none appearance-none bg-white ${formErrors.state ? "border-red-500" : "border-gray-200"}`}
                >
                  <option value="">Selecciona tu provincia</option>
                  {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
                <ChevronDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
              {formErrors.state && <p className="text-red-600 text-xs mt-1">{formErrors.state}</p>}
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Cantón</label>
              <input name="city" type="text" placeholder="Escazú" className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-neutral-400 bg-white ${formErrors.city ? "border-red-500" : "border-gray-200"}`} />
              {formErrors.city && <p className="text-red-600 text-xs mt-1">{formErrors.city}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Distrito</label>
              <input name="distrito" type="text" placeholder="San Rafael" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-neutral-400 bg-white" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Dirección exacta</label>
              <input name="address" type="text" placeholder="Calle 5, Casa #12" className={`w-full border rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-neutral-400 bg-white ${formErrors.address ? "border-red-500" : "border-gray-200"}`} />
              {formErrors.address && <p className="text-red-600 text-xs mt-1">{formErrors.address}</p>}
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Punto de referencia</label>
              <input name="reference" type="text" placeholder="Frente al supermercado" className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-neutral-400 bg-white" />
            </div>

            <div className="pt-1">
              <label className="block text-xs font-semibold text-gray-700 mb-2">Método de envío</label>
              <div className="space-y-2">
                <button
                  type="button"
                  onClick={() => setExpress(false)}
                  className={`w-full flex items-center justify-between rounded-xl border-2 px-4 py-3 text-left transition-all bg-white ${!express ? "border-neutral-900" : "border-gray-200"}`}
                >
                  <div>
                    <p className="text-sm font-semibold text-gray-800 flex items-center gap-1.5"><Truck size={14} className="text-gray-500" /> Envío Estándar</p>
                  </div>
                  <span className="text-sm font-bold" style={{ color: "#16a34a" }}>Gratis</span>
                </button>
                <button
                  type="button"
                  onClick={() => setExpress(true)}
                  className={`w-full flex items-center justify-between rounded-xl border-2 px-4 py-3 text-left transition-all bg-white ${express ? "border-neutral-900" : "border-gray-200"}`}
                >
                  <div>
                    <p className="text-sm font-semibold text-gray-800 flex items-center gap-1.5"><Zap size={14} style={{ color: "#F5B301" }} /> Envío Express</p>
                    <p className="text-xs text-gray-400 mt-0.5">1-3 días hábiles</p>
                  </div>
                  <span className="text-sm font-bold text-gray-800">+₡2000</span>
                </button>
              </div>
            </div>

            <div className="rounded-xl px-4 py-3 space-y-1.5" style={{ backgroundColor: SOFT }}>
              <div className="flex justify-between text-xs text-gray-500"><span>{variant.name}</span><span>₡{variant.price}</span></div>
              <div className="flex justify-between text-xs text-gray-500"><span>{express ? "Envío Express (1-3 días)" : "Envío Estándar"}</span><span>{express ? "₡2000" : "Gratis"}</span></div>
              <div className="flex justify-between text-sm font-extrabold pt-1.5 border-t border-gray-200" style={{ color: ACCENT }}><span>Total a pagar</span><span className="font-heading tracking-tight"><span className="text-xs align-top mr-0.5">₡</span>{total}</span></div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-4 rounded-2xl text-white font-bold text-sm tracking-widest transition-all disabled:opacity-60 active:scale-95 mt-1"
              style={{ backgroundColor: ACCENT }}
            >
              {submitting ? "Procesando..." : "✓ CONFIRMAR PEDIDO"}
            </button>
            {submitError && <p className="text-center text-xs text-red-600 mt-2">{submitError}</p>}
            <p className="text-center text-xs text-gray-400 pb-2">Pagas únicamente al recibir tu pedido. 100% sin riesgo.</p>
          </form>
        </div>
      </div>
    </div>
  );
}
