"use client";

import { Suspense, useState, useEffect } from "react";
import { CheckCircle, Truck, Phone, RefreshCw, ShieldCheck } from "lucide-react";
import { createOrder } from "@/lib/api";
import { trackPurchase } from "@/lib/pixels";

const THEMES: Record<string, { night: string; card: string; accent: string; accentBg: string; ivory: string; logoCircle: string; logoV: string; tagline: string }> = {
  "/guard": {
    night: "#0A0A0A", card: "#111111", accent: "#E65C00", accentBg: "rgba(230,92,0,0.15)",
    ivory: "#F4F4F6", logoCircle: "#E65C00", logoV: "#FFFFFF", tagline: "#E65C00",
  },
  "/guard-v2": {
    night: "#0A0A0A", card: "#111111", accent: "#E65C00", accentBg: "rgba(230,92,0,0.15)",
    ivory: "#F4F4F6", logoCircle: "#1A1A1A", logoV: "#FFFFFF", tagline: "#E65C00",
  },
  "/guard-v3": {
    night: "#2A0E00", card: "#3D1A00", accent: "#C0690A", accentBg: "rgba(192,105,10,0.18)",
    ivory: "#FFF8F0", logoCircle: "#C0690A", logoV: "#FFFFFF", tagline: "#C0690A",
  },
};
const DEFAULT_THEME = THEMES["/guard"];

interface OrderItem { product_name: string; quantity: number; price_per_item: number; }
interface Addr { name: string; phone: string; state: string; city: string; distrito: string; address: string; reference: string; }

function GuardThankYouContent() {
  const [orderData, setOrderData] = useState<{
    orderId: string;
    total: number;
    addr: Addr | null;
    items: OrderItem[];
  } | null>(null);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem("guard_pixel_purchase");
      if (raw) {
        const { value, eventId, phone } = JSON.parse(raw);
        sessionStorage.removeItem("guard_pixel_purchase");
        trackPurchase(value, eventId, phone);
      }
    } catch {}
  }, []);

  useEffect(() => {
    let cancelled = false;

    const loadOrder = async () => {
      let storedOrderId: number | null = null;
      let fallbackData: typeof orderData = null;

      try {
        const raw = sessionStorage.getItem("guard_order") ?? localStorage.getItem("guard_order");
        console.log("[thank-you] raw guard_order:", raw);
        if (raw) {
          const parsed = JSON.parse(raw);
          console.log("[thank-you] parsed addr from storage:", parsed.addr);
          storedOrderId = typeof parsed.orderId === "number" ? parsed.orderId : parseInt(parsed.orderId) || null;
          fallbackData = {
            orderId: String(parsed.orderId ?? "-"),
            total: parseFloat(parsed.total ?? "0"),
            addr: parsed.addr ?? null,
            items: parsed.items ?? [],
          };
        }
      } catch (e) {
        console.error("[thank-you] error parsing guard_order:", e);
      }

      if (fallbackData && !cancelled) {
        console.log("[thank-you] using fallback data from storage");
        setOrderData(fallbackData);
      }
    };

    loadOrder();
    return () => { cancelled = true; };
  }, []);

  const orderId = orderData?.orderId ?? "-";
  const total = orderData?.total ?? 0;
  const addr = orderData?.addr;
  const items = orderData?.items ?? [];
  const isExpress = items.some((i: OrderItem) => i.product_name.includes("Envío Express"));

  const [connectionWarning, setConnectionWarning] = useState(false);
  const [retrying, setRetrying] = useState(false);
  const [retrySuccess, setRetrySuccess] = useState(false);
  const [retryFailed, setRetryFailed] = useState(false);
  const [sourcePage, setSourcePage] = useState("/guard");
  const theme = THEMES[sourcePage] ?? DEFAULT_THEME;

  useEffect(() => {
    const src = localStorage.getItem("guard_source");
    if (src) setSourcePage(src);
  }, []);

  const handleRetry = async () => {
    if (!addr || items.length === 0 || retrying) return;
    setRetrying(true);
    try {
      await createOrder({
        customer_name: addr.name,
        customer_phone: addr.phone,
        customer_state: addr.state,
        customer_city: addr.city,
        customer_distrito: addr.distrito,
        customer_address: addr.address,
        customer_reference: addr.reference,
        items,
        is_upsell_accepted: false,
        total_price: total,
        browser_event_id: null,
      });
      setConnectionWarning(false);
      setRetrySuccess(true);
    } catch {
      setRetryFailed(true);
    } finally {
      setRetrying(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const s = sessionStorage.getItem("order_status");
      if (s === "failed") { setConnectionWarning(true); sessionStorage.removeItem("order_status"); clearInterval(interval); }
      else if (s === "confirmed") { sessionStorage.removeItem("order_status"); clearInterval(interval); }
    }, 500);
    const stop = setTimeout(() => { clearInterval(interval); sessionStorage.removeItem("order_status"); }, 10000);
    return () => { clearInterval(interval); clearTimeout(stop); };
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10" style={{ backgroundColor: theme.night }}>
      <div className="w-full max-w-md">

        {/* Brand header */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: theme.logoCircle }}>
            <span className="font-heading font-bold text-base leading-none" style={{ color: theme.logoV }}>V</span>
          </div>
          <div className="flex flex-col items-start leading-none">
            <span className="font-heading font-bold text-xl tracking-tight text-white">VAZLINA</span>
            <span className="text-[10px] font-medium mt-0.5 tracking-widest uppercase" style={{ color: theme.tagline }}>Tecnología curada</span>
          </div>
        </div>

        {/* Success hero */}
        <div className="rounded-3xl p-6 text-center mb-5" style={{ backgroundColor: theme.card }}>
          <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: theme.accentBg }}>
            <CheckCircle size={32} style={{ color: theme.accent }} />
          </div>
          <h1 className="text-2xl font-bold text-white mb-1">¡Pedido Confirmado!</h1>
          <p className="text-gray-400 text-sm mb-4">Pedido <span className="text-white font-semibold">#{orderId}</span></p>

          <div className="rounded-2xl px-6 py-4 text-center" style={{ backgroundColor: theme.night }}>
            <p className="text-xs tracking-widest uppercase text-gray-500 mb-1">Total a pagar al recibir</p>
            <p className="text-2xl font-bold font-heading text-white">₡{total} <span className="text-sm font-medium text-gray-400">CRC</span></p>
          </div>

          <p className="text-gray-500 text-xs mt-4 flex items-center justify-center gap-1.5">
            <ShieldCheck size={12} style={{ color: theme.accent }} /> Nuestro equipo te contactará lo antes posible
          </p>
        </div>

        {connectionWarning && !retrySuccess && (
          <div className="rounded-2xl p-4 border mb-5" style={{ backgroundColor: "#fffbeb", borderColor: "#fcd34d" }}>
            <p className="font-semibold text-sm text-yellow-800 mb-1">⚠️ Problema de conexión detectado</p>
            <p className="text-xs text-yellow-700 mb-3 leading-relaxed">Parece que tu conexión era débil. Tu pedido puede no haberse registrado. Presioná el botón para intentarlo de nuevo.</p>
            <button
              onClick={handleRetry}
              disabled={retrying}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-white text-xs font-bold transition-all disabled:opacity-60"
              style={{ backgroundColor: "#d97706" }}
            >
              <RefreshCw size={13} className={retrying ? "animate-spin" : ""} />
              {retrying ? "Reintentando..." : "Reintentar pedido"}
            </button>
            {retryFailed && <p className="text-red-600 text-xs font-semibold mt-2">❌ Sigue sin conexión. Atendé nuestra llamada para confirmar.</p>}
          </div>
        )}
        {retrySuccess && (
          <div className="rounded-2xl p-4 border text-green-800 text-sm font-semibold mb-5" style={{ backgroundColor: "#f0fdf4", borderColor: "#86efac" }}>
            ✓ Pedido registrado correctamente.
          </div>
        )}

        {/* Order summary */}
        {items.length > 0 && (
          <div className="rounded-3xl overflow-hidden mb-5" style={{ backgroundColor: theme.card }}>
            <div className="px-5 py-4 border-b" style={{ borderColor: theme.ivory }}>
              <p className="font-semibold text-sm text-white">Tu pedido</p>
            </div>
            <div className="divide-y" style={{ borderColor: theme.ivory }}>
              {items.map((item: OrderItem, i: number) => (
                <div key={i} className="px-5 py-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">{item.product_name}</p>
                    <p className="text-xs" style={{ color: theme.ivory }}>x{item.quantity}</p>
                  </div>
                  <p className="text-sm font-semibold" style={{ color: theme.accent }}>₡{item.price_per_item * item.quantity}</p>
                </div>
              ))}
            </div>
            <div className="px-5 py-4 flex items-center justify-between" style={{ backgroundColor: theme.accentBg }}>
              <p className="font-bold text-sm text-white">Total</p>
              <p className="font-bold text-base font-heading" style={{ color: theme.accent }}>₡{total} CRC</p>
            </div>
          </div>
        )}

        {/* Delivery address */}
        {addr && (
          <div className="rounded-3xl p-5 mb-5" style={{ backgroundColor: theme.card }}>
            <p className="font-semibold text-sm mb-4 text-white">Dirección de entrega</p>
            <div className="text-xs space-y-4" style={{ color: theme.accent }}>
              <div>
                <span className="font-semibold text-gray-300 block mb-0.5 sm:inline sm:w-28 sm:shrink-0 sm:mr-3">Nombre</span>
                <span className="text-white break-words">{addr.name}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-300 block mb-0.5 sm:inline sm:w-28 sm:shrink-0 sm:mr-3">Teléfono</span>
                <span className="text-white break-words">{addr.phone}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-300 block mb-0.5 sm:inline sm:w-28 sm:shrink-0 sm:mr-3">Provincia</span>
                <span className="text-white break-words">{addr.state}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-300 block mb-0.5 sm:inline sm:w-28 sm:shrink-0 sm:mr-3">Cantón</span>
                <span className="text-white break-words">{addr.city}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-300 block mb-0.5 sm:inline sm:w-28 sm:shrink-0 sm:mr-3">Distrito</span>
                <span className="text-white break-words">{addr.distrito}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-300 block mb-0.5 sm:inline sm:w-28 sm:shrink-0 sm:mr-3">Dirección</span>
                <span className="text-white break-words">{addr.address}</span>
              </div>
              <div>
                <span className="font-semibold text-gray-300 block mb-0.5 sm:inline sm:w-28 sm:shrink-0 sm:mr-3">Referencia</span>
                <span className="text-white break-words">{addr.reference}</span>
              </div>
            </div>
          </div>
        )}

        {/* Shipping & call info */}
        <div className="rounded-3xl p-5 mb-5" style={{ backgroundColor: theme.ivory }}>
          <div className="flex gap-3 items-start mb-5">
            <Truck size={20} style={{ color: theme.accent }} className="shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-sm mb-1" style={{ color: theme.ivory === "#FFF8F0" ? "#3D1A00" : "#111111" }}>{isExpress ? "Envío Express · Pago al Recibir" : "Envío Gratis · Pago al Recibir"}</p>
              <p className="text-xs text-gray-600 leading-relaxed">{isExpress ? "Recibirás tu pedido en 1-3 días hábiles (envío express)." : "Recibirás tu pedido en 2-5 días hábiles."} Pagás únicamente cuando tengás el producto en tus manos.</p>
            </div>
          </div>
          <div className="flex gap-3 items-start">
            <Phone size={20} style={{ color: theme.accent }} className="shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-sm mb-1" style={{ color: theme.ivory === "#FFF8F0" ? "#3D1A00" : "#111111" }}>Importante: Atendé nuestra llamada</p>
              <p className="text-xs text-gray-600 leading-relaxed">Nuestro equipo se pondrá en contacto con vos lo antes posible para confirmar tu pedido y coordinar la entrega.</p>
            </div>
          </div>
        </div>

        {/* Trust badges */}
        <div className="flex items-center justify-center gap-5 flex-wrap text-xs mb-5" style={{ color: theme.accent }}>
          <span className="flex items-center gap-1.5"><ShieldCheck size={13} style={{ color: theme.accent }} /> Garantía 30 días</span>
          <span className="flex items-center gap-1.5"><CheckCircle size={13} style={{ color: theme.accent }} /> Calidad certificada</span>
          <span className="flex items-center gap-1.5">💳 Pago al recibir</span>
        </div>

        <div className="flex justify-center mb-6">
          <a
href={sourcePage}
            className="inline-flex items-center justify-center px-8 py-3 rounded-2xl text-sm font-bold tracking-widest transition-all active:scale-95 hover:opacity-90"
            style={{ backgroundColor: theme.accent, color: "#fff" }}
          >
            VOLVER AL INICIO
          </a>
        </div>

        <p className="text-center text-xs" style={{ color: theme.accent }}>Gracias por proteger lo que más importa 🤍</p>
      </div>
    </div>
  );
}

export default function GuardThankYouPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: "#0A0A0A", color: "#E65C00" }}><p className="text-gray-400">Cargando...</p></div>}>
      <GuardThankYouContent />
    </Suspense>
  );
}
