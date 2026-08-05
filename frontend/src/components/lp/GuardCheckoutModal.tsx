"use client";

import { useState } from "react";
import { X, ShieldCheck, Truck, ChevronDown, Zap } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { createOrder } from "@/lib/api";
import { generateEventId } from "@/lib/pixels";

const schema = z.object({
  name: z.string().min(2, "Ingresa tu nombre completo."),
  phone: z.string().min(8, "Ingresa tu número de teléfono."),
  state: z.string().min(2, "Selecciona tu provincia."),
  city: z.string().min(2, "Ingresa tu cantón."),
  distrito: z.string().min(2, "Ingresa tu distrito."),
  address: z.string().min(5, "Ingresa tu dirección exacta."),
  reference: z.string().min(3, "Ingresa un punto de referencia."),
});

type GuardForm = z.infer<typeof schema>;

export interface LPVariant {
  name: string;
  price: number;
  items: { product_name: string; quantity: number; price_per_item: number }[];
}

const PROVINCES = ["San José", "Alajuela", "Cartago", "Heredia", "Guanacaste", "Puntarenas", "Limón"];

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
  const router = useRouter();
  const [express, setExpress] = useState(false);
  const EXPRESS_FEE = 2000;
  const total = (variant?.price ?? 0) + (express ? EXPRESS_FEE : 0);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<GuardForm>({ resolver: zodResolver(schema), mode: "onBlur" });

  const onSubmit = async (data: GuardForm) => {
    if (!variant) return;
    const eventId = generateEventId();
    const orderId = parseInt(localStorage.getItem("vazlina_last_order_id") ?? "799") + 1;
    localStorage.setItem("vazlina_last_order_id", String(orderId));
    sessionStorage.setItem("order_status", "pending");

    const addrParam = encodeURIComponent(JSON.stringify({
      name: data.name, phone: data.phone, state: data.state,
      city: data.city, distrito: data.distrito, address: data.address, reference: data.reference,
    }));
    const orderItems = express
      ? [...variant.items, { product_name: "Envío Express (1-3 días)", quantity: 1, price_per_item: EXPRESS_FEE }]
      : variant.items;
    const itemsParam = encodeURIComponent(JSON.stringify(orderItems));

    const thankYouUrl = `/guard/thank-you?order_id=${orderId}&total=${total.toFixed(2)}&addr=${addrParam}&items=${itemsParam}`;

    createOrder({
      customer_name: data.name,
      customer_phone: data.phone,
      customer_state: data.state,
      customer_city: data.city,
      customer_distrito: data.distrito,
      customer_address: data.address,
      customer_reference: data.reference,
      items: orderItems,
      is_upsell_accepted: false,
      total_price: total,
      browser_event_id: eventId,
    }).then(() => {
      sessionStorage.setItem("order_status", "confirmed");
    }).catch(() => {
      sessionStorage.setItem("order_status", "failed");
    });

    reset();
    window.location.href = thankYouUrl;
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

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <Field label="Nombre completo" placeholder="Ana García" error={errors.name?.message} {...register("name")} />
            <Field label="Teléfono" placeholder="8888-0000" type="tel" error={errors.phone?.message} {...register("phone")} />

            <div>
              <label className="block text-xs font-semibold text-gray-700 mb-1">Provincia</label>
              <div className="relative">
                <select
                  {...register("state")}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none appearance-none bg-white"
                >
                  <option value="">Selecciona tu provincia</option>
                  {PROVINCES.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
                <ChevronDown size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
              </div>
              {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state.message}</p>}
            </div>

            <Field label="Cantón" placeholder="Escazú" error={errors.city?.message} {...register("city")} />
            <Field label="Distrito" placeholder="San Rafael" error={errors.distrito?.message} {...register("distrito")} />
            <Field label="Dirección exacta" placeholder="Calle 5, Casa #12" error={errors.address?.message} {...register("address")} />
            <Field label="Punto de referencia" placeholder="Frente al supermercado" error={errors.reference?.message} {...register("reference")} />

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
              disabled={isSubmitting}
              className="w-full py-4 rounded-2xl text-white font-bold text-sm tracking-widest transition-all disabled:opacity-60 active:scale-95 mt-1"
              style={{ backgroundColor: ACCENT }}
            >
              {isSubmitting ? "Procesando..." : "✓ CONFIRMAR PEDIDO"}
            </button>
            <p className="text-center text-xs text-gray-400 pb-2">Pagas únicamente al recibir tu pedido. 100% sin riesgo.</p>
          </form>
        </div>
      </div>
    </div>
  );
}

function Field({
  label, placeholder, error, type = "text", ...rest
}: {
  label: string; placeholder: string; error?: string; type?: string;
  [key: string]: unknown;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-gray-700 mb-1">{label}</label>
      <input
        {...(rest as React.InputHTMLAttributes<HTMLInputElement>)}
        type={type}
        placeholder={placeholder}
        className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-neutral-400 bg-white"
      />
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
